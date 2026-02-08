'use client';

import { useState, Suspense } from 'react'; // 1. Import Suspense
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import GlassTitleContainer from "@/customComponents/GlassTitleContainer";
import GlassContainer from "@/customComponents/GlassContainer";
import { KURSE } from "@/app/coreElements/kurse";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

// 2. Rename your existing component to 'FooterContent'
// This component contains the logic that relies on the URL
const FooterContent = () => {
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
        <GlassContainer width={380} height={60} borderRadius={33}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
                padding: '0 10px',
                color: '#E2E2E2'
            }}>
                <div onClick={() => changeDate(-1)} style={{cursor: 'pointer', width: '80px', height: "100%", alignContent:"center", position: "absolute", left: "10px"}}>
                    <SlArrowLeft/>
                </div>
                <div style={{flex: 1, textAlign: 'center', whiteSpace: 'nowrap'}}>
                    <b>{weekdayShort}</b> {currentDate}
                </div>
                <div onClick={() => changeDate(1)} style={{cursor: 'pointer',width: '80px', height: "100%", alignContent:"center", position: "absolute", right: "10px"}}>
                    <SlArrowRight/>
                </div>
            </div>
        </GlassContainer>
    );
}

// 3. Create the Main Wrapper Component
const Footer = () => {
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
            <Suspense fallback={<div style={{height: '60px', width: '350px'}}/>}>
                <FooterContent/>
            </Suspense>
        </div>
    );
}

export default Footer;