'use client';
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import GlassTitleContainer from "@/customComponents/GlassTitleContainer";
import GlassContainer from "@/customComponents/GlassContainer";
import { KURSE } from "@/app/coreElements/kurse";
import { SlArrowLeft,SlArrowRight } from "react-icons/sl";

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [showPicker, setShowPicker] = useState(false);

    // Data Logic
    const currentSlug = searchParams.get('kurs') || KURSE[0].slug;
    const selectedKurs = KURSE.find(k => k.slug === currentSlug) || KURSE[0];

    // Default to today if no date is in URL
    const currentDate = searchParams.get('date') || new Date().toLocaleDateString('de-DE');
    const weekdayShort = new Date(searchParams.get('date') + 'T00:00:00').toLocaleDateString('de-DE', { weekday: 'short' })
        .replace('.', '')
        .toUpperCase();

    const handleSelect = (slug: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('kurs', slug);
        // Preserve the date when switching courses
        if (searchParams.get('date')) params.set('date', searchParams.get('date')!);

        router.push(`${pathname}?${params.toString()}`);
        setShowPicker(false);
    };
    const changeDate = (offset: number) => {
        const params = new URLSearchParams(searchParams);

        const dateObj = new Date(currentDate);
        dateObj.setDate(dateObj.getDate() + offset);

        const newDateStr = dateObj.toISOString().split('T')[0];

        params.set('date', newDateStr)
        if (searchParams.get('kurs')) params.set('kurs', searchParams.get('kurs')!);

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
        }}>
            {/* Top Bar */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <div onClick={() => setShowPicker(!showPicker)} style={{ cursor: 'pointer' }}>
                    <GlassTitleContainer title={selectedKurs.title} width={80} />
                </div>
                <div style={{ width: 260, height: 'auto', position: 'relative' }}>
                    <AnimatePresence mode="popLayout" initial={false}>
                        {showPicker ? (
                            // 1. The Picker (Slides in from RIGHT)
                            <motion.div
                                key="picker"
                                initial={{ x: 450, opacity: 1 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 450, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 40 }}
                            >
                                <GlassContainer width={260}>
                                    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', color: '#E2E2E2' }}>
                                        {KURSE.filter((kurs) => kurs.slug !== selectedKurs.slug).map((kurs) => (
                                        <span
                                            key={kurs.slug}
                                            onClick={() => handleSelect(kurs.slug)}
                                            style={{
                                                cursor: 'pointer',
                                                fontWeight: selectedKurs.slug === kurs.slug ? 'bold' : 'normal',
                                                marginLeft: "3px",
                                                marginRight: "3px"
                                            }}
                                        >
                                            {kurs.title}
                                        </span>
                                        ))}
                                    </div>
                                </GlassContainer>
                            </motion.div>
                        ) : (
                            // 2. The Info Display (Slides in from LEFT)
                            <motion.div
                                key="info"
                                initial={{ x: 450, opacity: 1 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 450, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 40 }}
                            >
                                <GlassContainer width={260}>
                                    <div style={{ textAlign: 'center', padding: '10px', color: '#E2E2E2' }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                                            <SlArrowLeft
                                                onClick={() => changeDate(-1)}
                                                style={{ cursor: 'pointer' }}
                                            />

                                            {weekdayShort} {currentDate}

                                            <SlArrowRight
                                                onClick={() => changeDate(1)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </span>
                                    </div>
                                </GlassContainer>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>

            {/* The Swapping Area - Wrapped to prevent layout shifts */}
        </div>
    );
}

export default Header;