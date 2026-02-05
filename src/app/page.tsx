'use client';
import Silk from '../components/Silk';
import Header from "@/app/elements/header";
import Calendar from "@/app/elements/calendar";
import { motion } from "framer-motion";


export default function Home() {
    //kurs erhalten
    //const currentSlug = useSearchParams().get('kurs') || KURSE[0].slug;
    //const selectedKurs = KURSE.find(k => k.slug === currentSlug) || KURSE[0];

    return (
        // 1. Use minHeight and 100dvh to handle mobile browser bars correctly
        <div style={{
            width: '100%',
            minHeight: '100dvh',
            backgroundColor: '#000',
            position: 'relative',
            overflow: 'hidden'

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
                    <Header/>
                    <motion.div
                        layout
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ width: '100%' }}
                    >
                        <Calendar />
                    </motion.div>
                </motion.div>
            </center>
        </div>
    );
}