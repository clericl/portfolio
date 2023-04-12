import { MeshTransmissionMaterial, Reflector, Sphere, MeshReflectorMaterial } from "@react-three/drei"
import { STAIR_HEIGHT } from "../Stairs"

function Floor({ isHome = false }: FloorProps) {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow castShadow>
        <boxGeometry args={[15 * (isHome ? 8 : 1), 15 * (isHome ? 8 : 1), STAIR_HEIGHT]} />
        <MeshTransmissionMaterial
          anisotropy={1}
          color="#62749e"
          chromaticAberration={0.8}
          resolution={1024}
          distortionScale={1}
          temporalDistortion={1}
          thickness={0.8}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]} receiveShadow>
        <planeGeometry args={[15 * (isHome ? 8 : 1), 15 * (isHome ? 8 : 1)]} />
          <MeshReflectorMaterial
            blur={[800, 30]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={0.9}
            depthScale={0.2}
            minDepthThreshold={0.8}
            maxDepthThreshold={1.4}
            color="#202020"
            metalness={0.8}
            mirror={1}
            transparent={true}
            opacity={0.5}
          />
      </mesh>
    </group>
  )
}

interface FloorProps {
  isHome?: boolean
}

export default Floor
