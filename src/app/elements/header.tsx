import GlassContainer from "@/customComponents/GlassContainer";

const Header = ({}) => {

    return (
        <div style={{
            position: 'relative',
            margin: '0 auto', // Centers the entire row
            zIndex: 2,
            paddingTop: '3vh',

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
    );
}
export default Header