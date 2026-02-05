import GlassSurface from "@/components/GlassSurface";
import GradientText from "@/components/GradientText";

const GlassTitleContainer = ({width = 300, fontSize = "200%", title = "title", desc = "" }) => {

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
