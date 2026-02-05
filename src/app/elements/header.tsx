'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // 1. Import these
import GlassTitleContainer from "@/customComponents/GlassTitleContainer";
import GlassContainer from "@/customComponents/GlassContainer";

const Header = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedKurs, setSelectedKurs] = useState("PIA23");
    const kurse = ["PIA23", "PIB23", "PIC23", "WI23"];

    return (
        <div style={{
            position: 'relative',
            margin: '0 auto',
            zIndex: 2,
            paddingTop: '3vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
        }}>
            {/* Top Row */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <GlassTitleContainer title={"DHGE SP"} width={220} />
                <div onClick={() => setShowPicker(!showPicker)} style={{ cursor: 'pointer' }}>
                    <GlassTitleContainer title={selectedKurs} width={120} />
                </div>
            </div>

            {/* 2. Wrap the conditional in AnimatePresence for the Exit animation */}
            <AnimatePresence>
                {showPicker && (
                    <motion.div
                        // 3. Define the animations
                        initial={{ x: -500, opacity: 1 }}   // Comes from left
                        animate={{ x: 0, opacity: 1 }}     // Centers
                        exit={{ x: -500, opacity: 1 }}      // Slides to right
                        transition={{ type: "spring", stiffness: 300, damping: 40 }}
                        style={{ marginTop: '5px' }}
                    >
                        <GlassContainer width={350}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                padding: '10px',
                                color: '#E2E2E2'
                            }}>
                                {kurse.map((kurs) => (
                                    <span
                                        key={kurs}
                                        onClick={() => {
                                            setSelectedKurs(kurs);
                                            setShowPicker(false);
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            fontWeight: selectedKurs === kurs ? 'bold' : 'normal',
                                            padding: '5px 10px'
                                        }}
                                    >
                                        {kurs}
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