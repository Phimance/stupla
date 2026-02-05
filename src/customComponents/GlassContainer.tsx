import { ReactNode } from "react"; // 1. Import ReactNode
import GlassSurface from "@/components/GlassSurface";

// 2. Define the interface for your props
interface GlassContainerProps {
    width?: number;
    children?: ReactNode; // ReactNode covers strings, elements, arrays, etc.
}

const GlassContainer = ({ width = 300, children }: GlassContainerProps) => {
    return (
        <GlassSurface
            width={width}
            height={"auto"}
            displace={0.5}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.93}
            mixBlendMode="screen"
        >
            {children}
        </GlassSurface>
    );
}

export default GlassContainer;