'use client';
import Silk from '../components/Silk'; // Import your existing Silk
import FluidGlass from '../components/FluidGlass';

// We need a version of Silk that doesn't have its own <Canvas> 
// so it can live inside the FluidGlass Canvas.
// If your Silk component is strictly the Canvas wrapper, 
// you might need to export the 'SilkPlane' logic from silk.jsx.

export default function Home() {
    return (
        <div style={{ width: '100%', height: '100vh', backgroundColor: '#000' }}>

            {/* 1. The Background Layer (Silk) */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                <Silk
                    speed={5}
                    scale={1}
                    color="#871027"
                    noiseIntensity={1}
                    rotation={0}
                />
            </div>

            {/* 2. The Fluid Glass Container */}
            {/* This sits on top. To make the glass "distort" the silk,
          the silk content needs to be passed into the FluidGlass portal. */}
            <div style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div>
                    <FluidGlass
                        mode="bar" // or "bar", "cube"
                        barProps={{                      scale: 0.25,
                            ior: 1.15,
                            thickness: 5,
                            chromaticAberration: 0.1,
                            anisotropy: 0.01
                        }} // add specific props if using bar mode
                    />
                </div>
            </div>
        </div>
    );
}