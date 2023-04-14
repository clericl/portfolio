import { Center, Text3D } from "@react-three/drei"
import { PlatformProps } from "../Platform"
import Floor from "../Floor"
import Cat from "../Cat"
import useIridescentMaterial from "../../utils/useIridescentMaterial"

function HomePlatform({ position }: Partial<PlatformProps>) {
  const iridescentMaterial = useIridescentMaterial('#8fb5c9')

  return (
    <group position={position} position-x={0}>
      <Center disableY disableZ>
        <Text3D
          font="/hubballi.json"
          position={[0, 8, -1]}
          scale={[1, 1, 2]}
          size={4}
          material={iridescentMaterial}
        >
          ERIC LIANG
        </Text3D>
      </Center>
      <Center disableY disableZ>
        <Text3D
          font="/hubballi.json"
          position={[0, 5, -1]}
          scale={[1, 1, 2]}
          size={1.8}
          letterSpacing={-0.1}
          material={iridescentMaterial}
        >
          web developer
        </Text3D>
      </Center>
      <Cat
        position={[7.6, 0.1, 2.5]}
        scale={[2.1, 2.1, 2.1]}
        rotation-y={-Math.PI / 8 * 6.5}
        castShadow
      />
      <Floor isHome />
    </group>
  )
}

export default HomePlatform
