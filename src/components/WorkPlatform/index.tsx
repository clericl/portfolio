import { PlatformProps } from "../Platform";
import { useLocation } from "react-router-dom";
import Cat from "../Cat";
import Ocean from "../Ocean";
import Frames from "../Frames";

function WorkPlatform({ position }: Partial<PlatformProps>) {
  const { pathname } = useLocation()

  return (
    <group position={position} rotation-y={Math.PI}>
      <group>
        {/* <Frames /> */}
      </group>
      {pathname === '/work' && (
        <Cat
          position={[7.2, 0, 1.5]}
          scale={[2.1, 2.1, 2.1]}
          rotation-y={-Math.PI / 8 * 2.75}
          castShadow
        />
      )}
      <group>
        <mesh>
          <Ocean />
        </mesh>
      </group>
    </group>
  )
}

export default WorkPlatform
