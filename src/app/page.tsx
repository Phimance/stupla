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
                    <div style={{
                        position: 'relative',
                        margin: '0 auto', // Centers the entire row
                        zIndex: 2,
                        paddingTop: '3vh',
                        paddingBottom: '50px',

                        // Flexbox magic starts here
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center', // Centers the items in the row
                        alignItems: 'flex-start', // Keeps them aligned at the top
                        gap: '10px', // This provides the "slight padding" between the boxes
                        flexWrap: 'wrap' // Ensures they stack on small mobile screens
                    }}>
                        <GlassContainer title={"DHGE SP"} width={220} />
                        <GlassContainer title={"PIA23"} width={120}/>
                    </div>
                </div>
            </center>
        </div>
    );
}