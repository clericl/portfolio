import { Caustics, Center, MeshTransmissionMaterial, Text3D } from "@react-three/drei"
import { PlatformProps } from "../Platform"
import Floor from "../Floor"
import Cat from "../Cat"

function HomePlatform({ position }: Partial<PlatformProps>) {
  return (
    <group position={position} position-x={0}>
      <Center disableY>
        <Text3D
          font="/hubballi.json"
          position={[0, 8, 0]}
          scale={[1, 1, 2]}
          size={3}
          castShadow={true}
        >
          ERIC LIANG
          <MeshTransmissionMaterial
            anisotropy={1}
            color="#62749e"
            distortionScale={0.5}
            chromaticAberration={0.1}
            resolution={768}
            temporalDistortion={0}
            thickness={0.3}
          />
        </Text3D>
      </Center>
      <Center disableY>
        <Text3D
          font="/hubballi.json"
          position={[0, 6, 0]}
          scale={[1, 1, 2]}
          size={1.2}
          castShadow={true}
          letterSpacing={-0.1}
        >
          web developer
          <MeshTransmissionMaterial
            anisotropy={1}
            color="#62749e"
            distortionScale={0.5}
            chromaticAberration={0.1}
            resolution={768}
            temporalDistortion={0}
            thickness={0.3}
          />
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
