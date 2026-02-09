import GlassSurface from "@/components/GlassSurface";

const GlassTitleContainer = ({width = 300, fontSize = "1.1rem", title = "title", desc = "", borderRadius = 20 }) => {

    return (
        <GlassSurface
            width={width}
            height={60}
            displace={0.5}
            distortionScale={-180}
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            brightness={50}
            opacity={0.93}
            mixBlendMode="screen"
            borderRadius={borderRadius}
        >
            <table style={{width: "100%"}}>
                <tbody>
                    <tr>
                        <td style={{width: "100%", textAlign: "center"}}>
                            <h1 className={"glassTitle"} style={{fontSize: fontSize}}>{title}</h1>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>{desc}</p>
                        </td>
                    </tr>
                </tbody>
            </table>

        </GlassSurface>
    );
}
export default GlassTitleContainer
