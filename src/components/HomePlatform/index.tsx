import { Center, Text3D } from "@react-three/drei"
import { PlatformProps } from "../Platform"
import Floor from "../Floor"
import Cat from "../Cat"
import useIridescentMaterial from "../../utils/useIridescentMaterial"

function HomePlatform({ position }: Partial<PlatformProps>) {
  const iridescentMaterial = useIridescentMaterial('#729ab0')

  return (
    <group position={position} position-x={0}>
      <Center disableY>
        <Text3D
          font="/hubballi.json"
          position={[0, 8, 0]}
          scale={[1, 1, 2]}
          size={3}
          material={iridescentMaterial}
        >
          ERIC LIANG
        </Text3D>
      </Center>
      <Center disableY>
        <Text3D
          font="/hubballi.json"
          position={[0, 6, 0]}
          scale={[1, 1, 2]}
          size={1.2}
          letterSpacing={-0.1}
          material={iridescentMaterial}
        >
          web developer
        </Text3D>
      </Center>
      <Cat
        position={[10, 0.1, 0]}
        scale={[0.18, 0.18, 0.18]}
        rotation-y={-Math.PI / 8 * 7}
        castShadow
      />
      <Floor isHome />
    </group>
  )
}

export default HomePlatform
