'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import GlassTitleContainer from "@/customComponents/GlassTitleContainer";
import {KURSE} from "@/app/coreElements/kurse";

const Calendar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentSlug = searchParams.get('kurs') || KURSE[0].slug;
    const selectedKurs = KURSE.find(k => k.slug === currentSlug) || KURSE[0];

    return (
        <div style={{
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            paddingTop: '1vh'
        }}>
            <GlassTitleContainer title={"Calendar"} width={350} />
        </div>
    );
}

export default Calendar;