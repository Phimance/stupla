'use client';
import Silk from '../components/Silk'; // Import your existing Silk

export default function Home() {
    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: '#000' }}>

            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                <Silk
                    speed={5}
                    scale={1}
                    color="#871027"
                    noiseIntensity={1}
                    rotation={0}
                />
            </div>
        </div>
    );
}