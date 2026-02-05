import GlassSurface from "@/components/GlassSurface";
import GradientText from "@/components/GradientText";

const GlassContainer = ({ title = "title", desc = "description" }) => {

    return (
        <GlassSurface
            width={300}
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
            <table>
                <tbody>
                    <tr>
                        <td>
                            <GradientText
                                colors={["#d31919","#FF9FFC","#B19EEF"]}
                                animationSpeed={4}
                                showBorder={false}
                                className="glassTitle"
                            >
                                {title}
                            </GradientText>
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
export default GlassContainer