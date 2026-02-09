'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import GlassContainer from "@/customComponents/GlassContainer";
import { getVorlesungen, Vorlesung } from "@/app/coreManager/calendarManager";
import { useSearchParams } from "next/navigation";
import React from "react";

const CalendarContent = () => {
    const searchParams = useSearchParams();
    const [allVorlesungen, setAllVorlesungen] = useState<Vorlesung[]>([]);
    const [expandedId, setExpandedId] = useState<string | number | null>(null);
    const [hiddenTitles, setHiddenTitles] = useState<Record<string, boolean>>({});

    const currentSlug = searchParams.get('kurs') || "pia23";
    const selectedDateStr = searchParams.get('date') || new Date().toISOString().split('T')[0];

    useEffect(() => {
        getVorlesungen(currentSlug).then(setAllVorlesungen);
    }, [currentSlug]);

    useEffect(() => {
        if (allVorlesungen.length > 0) {
            const initialHiddenState: Record<string, boolean> = {};
            allVorlesungen.forEach(v => {
                const lsValue = localStorage.getItem(v.title);
                if (lsValue && JSON.parse(lsValue) === true) {
                    initialHiddenState[v.title] = true;
                }
            });
            setHiddenTitles(initialHiddenState);
        }
    }, [allVorlesungen]);

    const toggleSortOut = (title: string) => {
        setHiddenTitles(prev => {
            const isCurrentlyHidden = prev[title] || false;
            const newState = !isCurrentlyHidden;
            localStorage.setItem(title, JSON.stringify(newState));
            return { ...prev, [title]: newState };
        });
    };

    const toggleRow = (id: string | number) => {
        setExpandedId((prev) => (prev === id ? null : id));
    };

    const dailyVorlesungen = useMemo(() => {
        const todaysLectures = allVorlesungen.filter((v: Vorlesung) => {
            return v.startTime.toISOString().split('T')[0] === selectedDateStr;
        });

        const groups: Record<string, Vorlesung[]> = {};

        todaysLectures.forEach((v: Vorlesung) => {
            if (!groups[v.title]) {
                groups[v.title] = [];
            }
            groups[v.title].push(v);
        });

        const groupArray = Object.values(groups).map((group) => {
            return group.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
        });

        groupArray.sort((groupA, groupB) => {
            const startA = groupA[0].startTime.getTime();
            const startB = groupB[0].startTime.getTime();
            const timeDiff = startA - startB;
            if (timeDiff !== 0) return timeDiff;
            return groupA[0].title.localeCompare(groupB[0].title);
        });

        return groupArray.flat();
    }, [allVorlesungen, selectedDateStr]);

    const groupedVorlesungen = useMemo(() => {
        const groups: Vorlesung[][] = [];
        dailyVorlesungen.forEach((v: Vorlesung) => {
            const lastGroup = groups[groups.length - 1];
            if (lastGroup && lastGroup[0].title === v.title) {
                lastGroup.push(v);
            } else {
                groups.push([v]);
            }
        });
        return groups;
    }, [dailyVorlesungen]);

    if (groupedVorlesungen.length === 0) {
        return (
            <GlassContainer width={380}>
                <div style={{ color: '#E2E2E2', textAlign: 'center', padding: '20px' }}>
                    Keine Vorlesungen für diesen Tag.
                </div>
            </GlassContainer>
        );
    }

    return (
        <>
            {groupedVorlesungen.map((originalGroup, groupIndex) => {

                // 1. SPLIT INTO TWO LISTS
                const visibleItems: Vorlesung[] = [];
                const hiddenItems: Vorlesung[] = [];

                originalGroup.forEach(v => {
                    if (hiddenTitles[v.title]) {
                        hiddenItems.push(v);
                    } else {
                        visibleItems.push(v);
                    }
                });

                // 2. CONCATENATE: Visible first, Hidden last
                const sortedGroup = [...visibleItems, ...hiddenItems];

                return (
                    <GlassContainer key={groupIndex} width={380} borderRadius={17}>
                        <table style={{
                            color: '#E2E2E2',
                            width: "90%",
                            margin: "0 auto",
                            borderCollapse: "collapse",
                        }}>
                            <tbody>
                            {sortedGroup.map((v, i) => {
                                const isExpanded = expandedId === v.id;
                                const isHidden = hiddenTitles[v.title] || false;

                                return (
                                    <React.Fragment key={v.id}>
                                        <tr
                                            onClick={() => toggleRow(v.id)}
                                            style={{
                                                cursor: 'pointer',
                                                opacity: isHidden ? 0.4 : 1,
                                                display: (isHidden && i > 0) ? 'none': 'table-row'
                                            }}
                                        >
                                            <td style={{ width: isHidden ? "50%" : "70%", paddingBottom: isHidden? '0px':"4px", paddingTop: i > 0 ? "10px" : "0" }}>
                                                <div style={{ fontSize: '1.1rem', opacity: 0.85 }}>
                                                    {v.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {v.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </td>
                                            <td style={{ width: isHidden ? "50%" : "30%", maxWidth: 0, textAlign: "left", paddingBottom: isHidden? '0px':"4px", paddingTop: i > 0 ? "10px" : "0" }}>
                                                <div style={{
                                                    fontSize: '1.1rem',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    {isHidden? v.title.split("-").slice(1).join("-").replace(/"/g, '').trim() : v.location}
                                                </div>
                                            </td>
                                        </tr>

                                        <tr
                                            onClick={() => toggleRow(v.id)}
                                            style={{
                                                cursor: 'pointer',
                                                opacity: isHidden ? 0.4 : 1,
                                                display: isHidden ? 'none': 'table-row'
                                            }}
                                        >
                                            <td style={{ width: "70%", paddingBottom: i < sortedGroup.length - 1 ? "10px" : "0" }}>
                                                <h3 style={{margin: 0, fontSize: '1rem', lineHeight: '1.2'}}>
                                                    {currentSlug === 'dm23'
                                                        ? v.summary.split("//").slice(0, -1).join("-").trim()
                                                        : v.title.split("-").slice(1).join("-").replace(/"/g, '').trim()
                                                    }
                                                </h3>
                                            </td>
                                            <td style={{
                                                width: "30%",
                                                textAlign: "left",
                                                verticalAlign: "top",
                                                paddingBottom: i < sortedGroup.length - 1 ? "10px" : "0" }}>
                                                <div style={{ fontSize: '1rem', opacity: 0.8 }}>
                                                    {v.lecturer.split(" ").slice(-1)}
                                                </div>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td colSpan={2} style={{ padding: 0, border: 0 }}>
                                                <div style={{
                                                    display: 'grid',
                                                    gridTemplateRows: isExpanded ? '1fr' : '0fr',
                                                    opacity: isExpanded ? 1 : 0,
                                                    transition: 'grid-template-rows 100ms ease-out, opacity 100ms ease-out'
                                                }}>
                                                    <div style={{ overflow: 'hidden' }}>
                                                        <div style={{
                                                            padding: '10px',
                                                            marginTop: '10px',
                                                            borderRadius: '8px',
                                                            fontSize: '0.9rem',
                                                            lineHeight: '1.4'
                                                        }}>
                                                            <div style={{opacity: 0.7, marginBottom: '4px', fontSize: '0.8rem'}}>
                                                                Diese Event-Reihe aussortieren?
                                                            </div>
                                                            <button style={{
                                                                float: 'left',
                                                                padding: '10px',
                                                                width: '100%',
                                                                border: 'solid 3px #22222244',
                                                                borderRadius: '10px',
                                                                cursor: 'pointer',
                                                                background: isHidden ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                                                                color: 'white'
                                                            }}
                                                                    onClick={() => toggleSortOut(v.title)}
                                                            >
                                                                {isHidden ? "Event wieder einblenden" : "Event aussortieren"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                );
                            })}
                            </tbody>
                        </table>
                    </GlassContainer>
                );
            })}
            <div style={{height: "20vh"}}></div>
        </>
    );
};

const Calendar = () => {
    return (
        <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            paddingTop: '1vh'
        }}>
            <Suspense fallback={
                <GlassContainer width={350}>
                    <div style={{ color: '#E2E2E2', textAlign: 'center', padding: '20px' }}>
                        Lade Vorlesungen...
                    </div>
                </GlassContainer>
            }>
                <CalendarContent />
            </Suspense>
        </div>
    );
};

export default Calendar;