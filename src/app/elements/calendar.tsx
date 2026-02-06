'use client';
import { useEffect, useState, useMemo } from 'react';
import GlassContainer from "@/customComponents/GlassContainer";
import { getVorlesungen, Vorlesung } from "@/app/coreManager/calendarManager";
import { useSearchParams } from "next/navigation";
import React from "react";

const Calendar = () => {
    const searchParams = useSearchParams();
    const [allVorlesungen, setAllVorlesungen] = useState<Vorlesung[]>([]);

    const currentSlug = searchParams.get('kurs') || "pia23";
    const selectedDateStr = searchParams.get('date') || new Date().toISOString().split('T')[0];

    useEffect(() => {
        getVorlesungen(currentSlug).then(setAllVorlesungen);
    }, [currentSlug]);

    const dailyVorlesungen = useMemo(() => {
        // 1. Filter for today's lectures
        const todaysLectures = allVorlesungen.filter((v: Vorlesung) => {
            return v.startTime.toISOString().split('T')[0] === selectedDateStr;
        });

        // 2. Group them by Title
        // EXPLICIT TYPE HERE: Record<string, Vorlesung[]>
        const groups: Record<string, Vorlesung[]> = {};

        todaysLectures.forEach((v: Vorlesung) => {
            if (!groups[v.location]) {
                groups[v.location] = [];
            }
            groups[v.location].push(v);
        });

        // 3. Sort the lectures INSIDE each group by time
        const groupArray = Object.values(groups).map((group) => {
            return group.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
        });

        // 4. Sort the GROUPS based on the start time of their FIRST lecture
        groupArray.sort((groupA, groupB) => {
            // We can safely access [0] because a group always has at least one item
            const startA = groupA[0].startTime.getTime();
            const startB = groupB[0].startTime.getTime();

            const timeDiff = startA - startB;

            if (timeDiff !== 0) return timeDiff;
            return groupA[0].title.localeCompare(groupB[0].title);
        });

        // 5. Flatten back to a single array
        return groupArray.flat();

    }, [allVorlesungen, selectedDateStr]);

    const groupedVorlesungen = useMemo(() => {
        const groups: Vorlesung[][] = [];

        dailyVorlesungen.forEach((v: Vorlesung) => {
            // Get the last group in our list
            const lastGroup = groups[groups.length - 1];

            // Check if a group exists AND if the location matches the current lecture
            if (lastGroup && lastGroup[0].location === v.location) {
                lastGroup.push(v);
            } else {
                // Start a new group with the current lecture as the first item
                groups.push([v]);
            }
        });

        return groups;
    }, [dailyVorlesungen]);
    return (
        <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            paddingTop: '2vh'
        }}>
            {groupedVorlesungen.length > 0 ? (
                groupedVorlesungen.map((group, groupIndex) => (
                    <GlassContainer key={groupIndex} width={350}>
                        <table style={{
                            color: '#E2E2E2',
                            width: "90%",
                            margin: "0 auto",
                            borderCollapse: "collapse"
                        }}>
                            <tbody>
                            {group.map((v, i) => (
                                <React.Fragment key={v.id}>
                                    <tr>
                                        <td style={{ width: "70%", paddingBottom: "4px", paddingTop: i > 0 ? "10px" : "0" }}>
                                            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                                {v.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {v.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                        </td>
                                        <td style={{ width: "30%", maxWidth: 0, textAlign: "left", paddingBottom: "4px", paddingTop: i > 0 ? "10px" : "0" }}>
                                            <div style={{
                                                fontSize: '0.9rem',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}>
                                                {v.location}
                                            </div>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{ width: "70%", paddingBottom: i < group.length - 1 ? "10px" : "0" }}>
                                            <h3 style={{ margin: 0, fontSize: '1rem', lineHeight: '1.2' }}>
                                                {v.title.split("-").slice(1).join("-").replaceAll('"', '').trim()}
                                            </h3>
                                        </td>
                                        <td style={{ width: "30%", textAlign: "left", verticalAlign: "top", paddingBottom: i < group.length - 1 ? "10px" : "0" }}>
                                            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                                {v.lecturer.split(" ").slice(-1)}
                                            </div>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                            </tbody>
                        </table>
                    </GlassContainer>
                ))
            ) : (
                <GlassContainer width={350}>
                    <div style={{ color: '#E2E2E2', textAlign: 'center', padding: '20px' }}>
                        Keine Vorlesungen für diesen Tag.
                    </div>
                </GlassContainer>
            )}
        </div>
    );
};

export default Calendar;