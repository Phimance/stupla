'use client';
import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import GlassTitleContainer from "@/customComponents/GlassTitleContainer";
import GlassContainer from "@/customComponents/GlassContainer";
import {KURSE} from "@/app/coreElements/kurse";

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [showPicker, setShowPicker] = useState(false);

    // 1. Get the current slug from URL (?kurs=pia23)
    const currentSlug = searchParams.get('kurs') || KURSE[0].slug;

    // 2. Find the full course object based on that slug
    const selectedKurs = KURSE.find(k => k.slug === currentSlug) || KURSE[0];

    const handleSelect = (slug: string) => {
        // 3. Update the URL without a full page reload
        const params = new URLSearchParams(searchParams);
        params.set('kurs', slug);
        router.push(`${pathname}?${params.toString()}`);

        setShowPicker(false);
    };

    return (
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <GlassTitleContainer title={"DHGE SP"} width={220} />
                <div onClick={() => setShowPicker(!showPicker)} style={{ cursor: 'pointer' }}>
                    <GlassTitleContainer title={selectedKurs.title} width={120} />
                </div>
            </div>

            <AnimatePresence>
                {showPicker && (
                    <motion.div
                        initial={{ x: -400 }}
                        animate={{ x: 0 }}
                        exit={{ x: -450 }}
                        transition={{ type: "spring", stiffness: 600, damping: 85 }}
                    >
                        <GlassContainer width={350}>
                            <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', color: '#E2E2E2' }}>
                                {KURSE.map((kurs) => (
                                    <span
                                        key={kurs.slug}
                                        onClick={() => handleSelect(kurs.slug)}
                                        style={{
                                            cursor: 'pointer',
                                            fontWeight: selectedKurs.slug === kurs.slug ? 'bold' : 'normal',
                                            padding: '0px 7px'
                                        }}
                                    >
                                        {kurs.title}
                                    </span>
                                ))}
                            </div>
                        </GlassContainer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Header;