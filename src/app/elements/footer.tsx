'use client';

import { useState, Suspense } from 'react'; // 1. Import Suspense
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import GlassTitleContainer from "@/customComponents/GlassTitleContainer";
import GlassContainer from "@/customComponents/GlassContainer";
import { KURSE } from "@/app/coreElements/kurse";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const FooterContent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [footerExpanded, setFooter] = useState<boolean>(false);
    const [klausurenShown, setKlausuren] = useState<boolean>(false);

    // Default to today if no date is in URL
    const currentDate = searchParams.get('date') || new Date().toISOString().split('T')[0];
    const weekdayShort = new Date(currentDate + 'T00:00:00').toLocaleDateString('de-DE', { weekday: 'short' })
        .replace('.', '')
        .toUpperCase();

    const changeDate = (offset: number) => {
        const params = new URLSearchParams(searchParams);
        const [year, month, day] = currentDate.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);

        dateObj.setDate(dateObj.getDate() + offset);

        // While-Schleife muss weitermachen, bis ein gültiger Wochentag gefunden ist
        while(dateObj.getDay() === 0 || (dateObj.getDay() === 6 && searchParams.get('kurs') !== "dm23")) {
            if(offset > 0) {
                dateObj.setDate(dateObj.getDate() + 1);
            } else {
                dateObj.setDate(dateObj.getDate() - 1);
            }
        }

        // Sichere Formatierung ohne Zeitzonenprobleme
        const newDateStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
        params.set('date', newDateStr);
        if (searchParams.get('kurs')) params.set('kurs', searchParams.get('kurs')!);
        router.push(`${pathname}?${params.toString()}`);
    };

    function toggleKlausuren() {
        const params = new URLSearchParams(searchParams);

        if (searchParams.get('klausuren') && searchParams.get('klausuren') === 'true') {
            params.set('klausuren', 'false');
            setKlausuren(false)
        }else{
            params.set('klausuren', 'true');
            setKlausuren(true)
        }
        router.push(`${pathname}?${params.toString()}`)
        setFooter(false);
    }
    const resetToToday = () => {
        const params = new URLSearchParams(searchParams);
        const todayStr = new Date().toISOString().split('T')[0];
        params.set('date', todayStr);
        if (searchParams.get('kurs')) params.set('kurs', searchParams.get('kurs')!);
        router.push(`${pathname}?${params.toString()}`);
        setFooter(false);
    };

    const toggleFooter = () => {
        setFooter(prev => !prev);
    };

    return (
        <>
            <AnimatePresence mode="wait">
                {footerExpanded && (
                    <motion.div
                        initial={{ opacity: 1, x: -450 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 1, x: -450 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <GlassContainer width={380} height={60} borderRadius={33}>
                            <button
                                onClick={resetToToday}
                                style={{
                                    width: '45%',
                                    height: '100%',
                                    background: 'none',
                                    border: 'none',
                                    color: '#E2E2E2',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                Zurück zu heute
                            </button>
                            <button
                                onClick={toggleKlausuren}
                                style={{
                                    width: '45%',
                                    height: '100%',
                                    background: 'none',
                                    border: 'none',
                                    color: '#E2E2E2',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                Klausuren anzeigen
                            </button>
                        </GlassContainer>
                    </motion.div>
                )}
            </AnimatePresence>
            <GlassContainer width={380} height={60} borderRadius={33}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '100%',
                    padding: '0 10px',
                    color: '#E2E2E2'
                }}>
                    <div onClick={() => changeDate(-1)} style={{
                        cursor: 'pointer',
                        width: '80px',
                        height: "100%",
                        alignContent: "center",
                        position: "absolute",
                        left: "10px"
                    }}>
                        <SlArrowLeft/>
                    </div>
                    <div style={{flex: 1, textAlign: 'center', whiteSpace: 'nowrap'}} onClick={toggleFooter}>
                        <b>{weekdayShort}</b> {currentDate}
                    </div>
                    <div onClick={() => changeDate(1)} style={{cursor: 'pointer',width: '80px', height: "100%", alignContent:"center", position: "absolute", right: "10px"}}>
                        <SlArrowRight/>
                    </div>
                </div>
            </GlassContainer>
        </>
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