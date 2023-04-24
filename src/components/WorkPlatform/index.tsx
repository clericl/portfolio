import { useLocation } from "react-router-dom";
import { PlatformProps } from "../Platform";
import Cat from "../Cat";
import Frames from "../Frames";
import Floor from "../Floor";

function WorkPlatform({ position }: Partial<PlatformProps>) {
  const { pathname } = useLocation()

  return (
    <group position={position} rotation-y={Math.PI}>
      <group>
        <Frames />
      </group>
      {pathname === '/work' && (
        <Cat
          position-x={8.5}
          scale={[2.1, 2.1, 2.1]}
          rotation-y={Math.PI / 8 * 4}
          castShadow
        />
      )}
      <Floor />
    </group>
  )
}

export default WorkPlatform
