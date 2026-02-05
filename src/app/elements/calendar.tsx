'use client';
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import GlassTitleContainer from "@/customComponents/GlassTitleContainer";
import GlassContainer from "@/customComponents/GlassContainer";
import {KURSE} from "@/app/core/kurse";

const Calendar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSlug = searchParams.get('kurs') || KURSE[0].slug;
    const selectedKurs = KURSE.find(k => k.slug === currentSlug) || KURSE[0];

    return (
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <GlassTitleContainer title={"DHGE SP"} width={220} />
        </div>
    );
}

export default Calendar;