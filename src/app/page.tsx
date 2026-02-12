'use client';
import React, { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Components
import Silk from '../components/Silk';
import Header from "@/app/elements/header";
import Calendar from "@/app/elements/calendar";
import Klausuren from "@/app/elements/klausuren";
import Footer from "@/app/elements/footer";
import LightPillar from "@/components/LightPillar";
import Particles from '@/components/Particles';

// Safe check for mobile that won't break SSR
const getIsMobile = () => typeof window !== "undefined" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// 1. Move the logic that uses hooks into a dedicated child component
function DynamicContent({ onBackgroundChange, bgIndex }: { onBackgroundChange: () => void, bgIndex: number }) {
    const searchParams = useSearchParams();
    const params = useParams();

    const isKlausurenMode = searchParams.get('klausuren') === 'true';
    const currentSlug = (searchParams.get('kurs') || params.slug || "pia23") as string;

    return (
        <motion.div style={{
            position: 'relative',
            paddingTop: '3vh',
            width: 380,
            zIndex: 2,
            paddingBottom: '50px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px'
        }}>
            <Header onBackgroundClick={onBackgroundChange}/>

            <AnimatePresence mode="wait">
                <motion.div
                    key={`${isKlausurenMode}-${currentSlug}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ width: '100%' }}
                >
                    {isKlausurenMode ? <Klausuren /> : <Calendar />}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default function Home() {
    const [bgIndex, setBgIndex] = useState(0);
    const [clickCounter, setClickCounter] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Handle hydration/client-only state safely
    useEffect(() => {
        setIsMobile(getIsMobile());
        const savedIndex = localStorage.getItem("BgIndex");
        if (savedIndex) {
            const parsed = parseInt(savedIndex, 10);
            if (!isNaN(parsed) && parsed >= 0) setBgIndex(parsed);
        }
    }, []);

    const backgrounds = [
        <Silk key="silk" speed={5} scale={1} color="#670C20" noiseIntensity={1} rotation={0} />,
        <Particles key="particles" particleColors={["#ffffff"]} particleCount={isMobile ? 600 : 800} particleSpread={10} speed={0.2} particleBaseSize={70} moveParticlesOnHover={false} alphaParticles={true} disableRotation={false} pixelRatio={1} />,
        <LightPillar key="pillar" topColor="rgb(31,0,153)" bottomColor="rgb(230,0,222)" intensity={1} rotationSpeed={0.2} glowAmount={0.001} pillarWidth={6.2} pillarHeight={1} noiseIntensity={2} pillarRotation={0} interactive={false} mixBlendMode="normal" quality={isMobile ? "medium" : "high"} />,
    ];

    const handleBackgroundChange = () => {
        const nextCount = clickCounter + 1;
        if (nextCount >= 5) {
            setClickCounter(0);
            const nextIndex = (bgIndex + 1) % backgrounds.length;
            setBgIndex(nextIndex);
            localStorage.setItem("BgIndex", String(nextIndex));
        } else {
            setClickCounter(nextCount);
        }
    };

    return (
        <div style={{ width: '100%', minHeight: '100dvh', backgroundColor: '#000', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
            <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
                {backgrounds[bgIndex]}
            </div>

            <center>
                {/* 2. Wrap the dynamic component in Suspense */}
                <Suspense fallback={<div style={{color: 'white', paddingTop: '10vh'}}>Lade Planer...</div>}>
                    <DynamicContent onBackgroundChange={handleBackgroundChange} bgIndex={bgIndex} />
                </Suspense>

                <div style={{ position: "fixed", bottom: "6vh", left: "0", width: "100%", zIndex: 999, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
                    <div style={{pointerEvents: "auto"}}>
                        <Footer/>
                    </div>
                </div>
            </center>
        </div>
    );
}