'use client';

import { useState, Suspense } from 'react'; // 1. Import Suspense
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import GlassTitleContainer from "@/customComponents/GlassTitleContainer";
import GlassContainer from "@/customComponents/GlassContainer";
import { KURSE } from "@/app/coreElements/kurse";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

// 2. Rename your existing component to 'HeaderContent'
// This component contains the logic that relies on the URL
const HeaderContent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [showPicker, setShowPicker] = useState(false);

    // Data Logic
    const currentSlug = searchParams.get('kurs') || KURSE[0].slug;
    const selectedKurs = KURSE.find(k => k.slug === currentSlug) || KURSE[0];

    // Default to today if no date is in URL
    const currentDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const weekdayShort = new Date(currentDate + 'T00:00:00').toLocaleDateString('de-DE', { weekday: 'short' })
        .replace('.', '')
        .toUpperCase();

    const handleSelect = (slug: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('kurs', slug);
        if (searchParams.get('date')) params.set('date', searchParams.get('date')!);
        router.push(`${pathname}?${params.toString()}`);
        setShowPicker(false);
    };

    const changeDate = (offset: number) => {
        const params = new URLSearchParams(searchParams);
        const dateObj = new Date(currentDate);
        dateObj.setDate(dateObj.getDate() + offset);

        while(dateObj.getDay() === 0 || dateObj.getDay() == 6) {
            if(offset > 0) dateObj.setDate(dateObj.getDate() + 1)
            else dateObj.setDate(dateObj.getDate() - 1)
        }

        const newDateStr = dateObj.toISOString().split('T')[0];
        params.set('date', newDateStr)
        if (searchParams.get('kurs')) params.set('kurs', searchParams.get('kurs')!);
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <div onClick={() => setShowPicker(!showPicker)} style={{ cursor: 'pointer' }}>
                <GlassTitleContainer title={selectedKurs.title} width={90} borderRadius={33} />
            </div>
            <div style={{ width: 280, height: 'auto', position: 'relative' }}>
                <motion.div
                    key="picker"
                    initial={{ x: 450, opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 450, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 40 }}
                >
                    <GlassContainer width={280} height={60} borderRadius={33}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', color: '#E2E2E2' }}>
                            {KURSE.filter((kurs) => kurs.slug !== selectedKurs.slug).map((kurs) => (
                                <span
                                    key={kurs.slug}
                                    onClick={() => handleSelect(kurs.slug)}
                                    style={{
                                        cursor: 'pointer',
                                        fontWeight: 'normal',
                                        fontSize: '1.1rem',
                                        marginLeft: "7px",
                                        marginRight: "7px"
                                    }}
                                >
                                    {kurs.title}
                                </span>
                            ))}
                        </div>
                    </GlassContainer>
                </motion.div>
            </div>
        </div>
    );
}

// 3. Create the Main Wrapper Component
const Header = () => {
    return (
        <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
        }}>
            {/* The fallback renders while the URL is being read */}
            <Suspense fallback={<div style={{ height: '60px', width: '350px' }} />}>
                <HeaderContent />
            </Suspense>
        </div>
    );
}

export default Header;