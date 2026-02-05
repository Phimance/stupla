'use client';
import { useEffect, useState, useMemo } from 'react';
import GlassContainer from "@/customComponents/GlassContainer";
import { getVorlesungen, Vorlesung } from "@/app/coreManager/calendarManager";
import { useSearchParams } from "next/navigation";

const Calendar = () => {
    const searchParams = useSearchParams();
    const [allVorlesungen, setAllVorlesungen] = useState<Vorlesung[]>([]);

    const currentSlug = searchParams.get('kurs') || "pia23";

    // 1. Get date from URL or default to today (ISO string format: YYYY-MM-DD)
    const selectedDateStr = searchParams.get('date') || new Date().toISOString().split('T')[0];

    useEffect(() => {
        // Fetch all lectures for the course
        getVorlesungen(currentSlug).then(setAllVorlesungen);
    }, [currentSlug]);

    // 2. Filter logic: Only show lectures where the date matches the URL parameter
    const dailyVorlesungen = useMemo(() => {
        return allVorlesungen.filter(v => {
            const lectureDate = v.startTime.toISOString().split('T')[0];
            return lectureDate === selectedDateStr;
        });
    }, [allVorlesungen, selectedDateStr]);

    return (
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            {dailyVorlesungen.length > 0 ? (
                dailyVorlesungen.map((v) => (
                    <GlassContainer key={v.id} width={350}>
                        <div style={{ color: '#E2E2E2', padding: '10px' }}>
                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                                {v.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {v.endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <h3 style={{ margin: '5px 0', fontSize: '1.1rem' }}>{v.title}</h3>
                            <div style={{ fontSize: '0.9rem' }}>📍 {v.location}</div>
                            <div style={{ fontSize: '0.9rem', fontStyle: 'italic', opacity: 0.8 }}>👤 {v.lecturer}</div>
                        </div>
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