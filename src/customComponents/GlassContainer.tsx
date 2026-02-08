import { ReactNode } from "react"; // 1. Import ReactNode
import GlassSurface from "@/components/GlassSurface";

// 2. Define the interface for your props
interface GlassContainerProps {
    width?: number;
    height?: number;
    borderRadius?: number;
    children?: ReactNode; // ReactNode covers strings, elements, arrays, etc.
}

const GlassContainer = ({ width = 300, height, children, borderRadius = 25 }: GlassContainerProps) => {
    return (
        <GlassSurface
            width={width}
            height={ height ? height : "auto"}
            displace={0.5}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={20}
            opacity={0.93}
            mixBlendMode="screen"
            borderRadius={borderRadius}
        >
            {children}
        </GlassSurface>
    );
}

export default GlassContainer;