import { Center, Text3D } from "@react-three/drei"
import Floor from "../Floor"
import { PlatformProps } from "../Platform"

function HomePlatform({ position }: Partial<PlatformProps>) {
  return (
    <group position={position} position-x={0}>
      <Center disableY>
        <Text3D font="/modern_antiqua.json" position={[0, 5, 0]} scale={[1, 1, 2]} size={2.5} castShadow>
          ERIC LIANG
          <meshPhysicalMaterial color="black" />
        </Text3D>
      </Center>
      <Floor isHome />
    </group>
  )
}

export default HomePlatform
