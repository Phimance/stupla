'use client';
import Silk from '../components/Silk';
import Header from "@/app/elements/header";
import Calendar from "@/app/elements/calendar";
import { motion } from "framer-motion";
import Footer from "@/app/elements/footer";
import LightPillar from "@/components/LightPillar";
import {useEffect, useState} from "react";
import Particles from '@/components/Particles';

const backgrounds = [
    (
        <Silk
            speed={5}
            scale={1}
            color="#670C20"
            noiseIntensity={1}
            rotation={0}
        />
    ),
    (
        <Particles
            particleColors={["#ffffff"]}
            particleCount={600}
            particleSpread={10}
            speed={0.2}
            particleBaseSize={70}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
            pixelRatio={1}
        />
    ),
    (
        <LightPillar
            topColor="rgb(31,0,153)"
            bottomColor="rgb(230,0,222)"
            intensity={1}
            rotationSpeed={0.2}
            glowAmount={0.001}
            pillarWidth={6.2}
            pillarHeight={1}
            noiseIntensity={2}
            pillarRotation={0}
            interactive={false}
            mixBlendMode="normal"
            quality="high"
        />
    ),
]
export default function Home() {
    const [bgIndex, setBgIndex] = useState(0);
    const [clickCounter, setClickCounter] = useState(0);

    // 2. LOAD: specific "useEffect" that only runs in the browser
    useEffect(() => {
        // This code is skipped on the server
        const savedIndex = localStorage.getItem("BgIndex");

        if (savedIndex) {
            const parsed = parseInt(savedIndex, 10);
            // Safety check: make sure it's a valid number and inside array bounds
            if (!isNaN(parsed) && parsed >= 0 && parsed < backgrounds.length) {
                setBgIndex(parsed);
            }
        }
    }, []); // Empty array [] ensures this runs only once on mount

    const handleBackgroundChange = () => {
        const nextCount = clickCounter + 1;

        if (nextCount >= 5) {
            setClickCounter(0);

            // Calculate new index
            const nextIndex = (bgIndex + 1) % backgrounds.length;

            // Save to State AND Storage
            setBgIndex(nextIndex);
            localStorage.setItem("BgIndex", String(nextIndex));
        } else {
            setClickCounter(nextCount);
        }
    };
    return (
        // 1. Use minHeight and 100dvh to handle mobile browser bars correctly
        <div style={{
            width: '100%',
            minHeight: '100dvh',
            backgroundColor: '#000',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
        }}>

            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none' // Ensures background doesn't block clicks
            }}>
                {backgrounds[bgIndex]}
            </div>
            <center>
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
                    <Header onBackgroundClick={handleBackgroundChange}/>
                    <motion.div
                        layout
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ width: '100%' }}
                    >
                        <Calendar />
                    </motion.div>
                </motion.div>
                <div style={{
                    position: "fixed",
                    bottom: "6vh",
                    left: "0",
                    width: "100%",
                    zIndex: 999,
                    display: "flex",
                    justifyContent: "center",
                    pointerEvents: "none"
                }}>
                    <div style={{pointerEvents: "auto"}}> {/* Re-enable clicks for the actual footer */}
                        <Footer/>
                    </div>
                </div>
            </center>
        </div>
    );
}