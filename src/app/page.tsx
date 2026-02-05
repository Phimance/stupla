'use client';
import Silk from '../components/Silk';
import GlassSurface from "@/components/GlassSurface";
import GlassContainer from "@/customComponents/GlassContainer";

export default function Home() {
    return (
        // 1. Use minHeight and 100dvh to handle mobile browser bars correctly
        <div style={{
            width: '100%',
            minHeight: '100dvh',
            backgroundColor: '#000',
            position: 'relative'
        }}>

            {/* 2. Fix the background so it doesn't scroll away */}
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1,
                pointerEvents: 'none' // Ensures background doesn't block clicks
            }}>
                <Silk
                    speed={5}
                    scale={1}
                    color="#670C20"
                    noiseIntensity={1}
                    rotation={0}
                />
            </div>

            {/* 3. The content layer should be relative to allow normal scrolling over the silk */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                paddingTop: '20vh', // Adjust spacing as needed
                paddingBottom: '50px'
            }}>
                <center>
                    <GlassContainer title={"Stundenplan"} />
                </center>
            </div>
        </div>
    );
}