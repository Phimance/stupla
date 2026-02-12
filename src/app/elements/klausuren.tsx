'use client';

import { useEffect, useState, Suspense } from 'react';
import GlassContainer from "@/customComponents/GlassContainer";
import { getKlausuren, getVorlesungen, Vorlesung } from "@/app/coreManager/calendarManager";
import { useSearchParams, useParams } from "next/navigation";
import React from "react";

const KlausurenContent = () => {
    const searchParams = useSearchParams();
    const params = useParams();
    const [allKlausuren, setKlausuren] = useState<Vorlesung[]>([]);
    const [loading, setLoading] = useState(true);

    // Prioritize 'kurs' param, then URL slug, then fallback
    const currentSlug = (searchParams.get('kurs') || params.slug || "pia23") as string;

    useEffect(() => {
        let isMounted = true;
        setLoading(true);

        getVorlesungen(currentSlug).then((data) => {
            if (isMounted) {
                // Filter exams immediately from the freshly fetched data
                const filtered = getKlausuren(data);
                setKlausuren(filtered);
                setLoading(false);
            }
        });

        return () => { isMounted = false; };
    }, [currentSlug]);

    if (loading) return <div style={{ color: '#E2E2E2', textAlign: 'center' }}>Lade Klausuren...</div>;
    if (allKlausuren.length === 0) return <div style={{ color: '#E2E2E2', textAlign: 'center', marginTop: '20px' }}>Keine Klausuren gefunden.</div>;

    return (
        <>
            {allKlausuren.map((k, index) => (
                <GlassContainer key={`${k.title}-${index}`} width={380} borderRadius={17}>
                    <table style={{
                        color: '#E2E2E2',
                        width: "90%",
                        margin: "0 auto",
                        borderCollapse: "collapse",
                        padding: "10px 0"
                    }}>
                        <tbody>
                        <tr>
                            <td style={{ width: "70%", paddingBottom: "4px" }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: '500', opacity: 0.9 }}>
                                    {k.title}
                                </div>
                            </td>
                            <td style={{ width: "30%", textAlign: "right", paddingBottom: "4px" }}>
                                <div style={{
                                    fontSize: '0.9rem',
                                    opacity: 0.7,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {k.location || "N/A"}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style={{ width: "70%" }}>
                                <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'normal', opacity: 0.7 }}>
                                    {k.lecturer}
                                </h3>
                            </td>
                            <td style={{ width: "30%", textAlign: "right" }}>
                                <div style={{ fontSize: '0.9rem', color: '#fff' }}>
                                    {new Intl.DateTimeFormat('de-DE', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: '2-digit'
                                    }).format(new Date(k.startTime))}
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </GlassContainer>
            ))}
            <div style={{ height: "20vh" }}></div>
        </>
    );
};

const Klausuren = () => {
    return (
        <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            paddingTop: '1vh'
        }}>
            <Suspense fallback={
                <GlassContainer width={380}>
                    <div style={{ color: '#E2E2E2', textAlign: 'center', padding: '20px' }}>
                        Verarbeite Daten...
                    </div>
                </GlassContainer>
            }>
                <KlausurenContent />
            </Suspense>
        </div>
    );
};

export default Klausuren;