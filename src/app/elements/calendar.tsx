'use client';
import { useEffect, useState, useMemo } from 'react';
import GlassContainer from "@/customComponents/GlassContainer";
import { getVorlesungen, Vorlesung } from "@/app/coreManager/calendarManager";
import { useSearchParams } from "next/navigation";

const Calendar = () => {
    const searchParams = useSearchParams();
    const [allVorlesungen, setAllVorlesungen] = useState<Vorlesung[]>([]);

    const currentSlug = searchParams.get('kurs') || "pia23";
    const selectedDateStr = searchParams.get('date') || new Date().toISOString().split('T')[0];

    useEffect(() => {
        getVorlesungen(currentSlug).then(setAllVorlesungen);
    }, [currentSlug]);

    const dailyVorlesungen = useMemo(() => {
        return allVorlesungen.filter(v => {
            const lectureDate = v.startTime.toISOString().split('T')[0];
            return lectureDate === selectedDateStr;
        });
    }, [allVorlesungen, selectedDateStr]);

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
            {dailyVorlesungen.length > 0 ? (
                dailyVorlesungen.map((v) => (
                    <GlassContainer key={v.id} width={350}>
                        <table style={{
                            color: '#E2E2E2',
                            width: "90%",
                            margin: "0 auto 0 auto",
                            borderCollapse: "collapse"
                        }}>
                            <tbody>
                            <tr>
                                <td style={{ width: "70%", paddingBottom: "4px" }}>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                                        {v.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {v.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </td>
                                <td style={{ width: "30%", textAlign: "left", paddingBottom: "4px" }}>
                                    <div style={{ fontSize: '0.9rem' }}>{v.location}</div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ width: "70%" }}>
                                    <h3 style={{ margin: 0, fontSize: '1rem', lineHeight: '1.2' }}>{v.title.split("-").slice(1).join("-").replaceAll('"', '').trim()}</h3>
                                </td>
                                <td style={{ width: "30%", textAlign: "left", verticalAlign: "top" }}>
                                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{v.lecturer}</div>
                                </td>
                            </tr>
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