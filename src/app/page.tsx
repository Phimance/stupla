'use client';
import Silk from '../components/Silk';
import GlassSurface from "@/components/GlassSurface";
import GlassContainer from "@/customComponents/GlassContainer";
import Header from "@/app/elements/header";

export default function Home() {
    return (
        // 1. Use minHeight and 100dvh to handle mobile browser bars correctly
        <div style={{
            width: '100%',
            minHeight: '100dvh',
            backgroundColor: '#000',
            position: 'relative'
        }}>

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
            <center>
                <div style={{
                    position: 'relative',
                    width: 380,
                    zIndex: 2,
                    paddingBottom: '50px'
                }}>
                    <Header/>
                </div>
            </center>
        </div>
    );
}