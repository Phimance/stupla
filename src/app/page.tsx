import Image from "next/image";
import Silk from '../components/Silk';

export default function Home() {
  return (
    <div>
      <main>
        <div style={{ width: '100%', height: '100vh', position: 'relative', zIndex: '-1' }}>
          <Silk
              speed={5}
              scale={1}
              color="#5227FF"
              noiseIntensity={1}
              rotation={0}
          />
        </div>
      </main>
    </div>
  );
}
