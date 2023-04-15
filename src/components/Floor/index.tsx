import { MeshTransmissionMaterial, MeshReflectorMaterial } from "@react-three/drei"
import { STAIR_HEIGHT } from "../Stairs"
import Neon from "../Neon"
import { useLocation } from "react-router-dom"
import { useMemo } from "react"

function Floor() {
  const { pathname } = useLocation()
  const isHome = useMemo(() => pathname === '/', [pathname])

  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow castShadow>
        <boxGeometry args={[15 * (isHome ? 2 : 1.5), 5 * (isHome ? 2 : 1.5), STAIR_HEIGHT]} />
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
        <planeGeometry args={[15 * (isHome ? 2 : 1.5), 5 * (isHome ? 2 : 1.5)]} />
          <MeshReflectorMaterial
            blur={[800, 30]}
            resolution={2048}
            mixBlur={1}
            mixStrength={80}
            roughness={0.9}
            depthScale={0.2}
            minDepthThreshold={0.8}
            maxDepthThreshold={1.4}
            color="#1a1a1a"
            metalness={0.8}
            mirror={1}
            transparent={true}
            opacity={0.8}
          />
      </mesh>
      {isHome && (
        <Neon />
      )}
    </group>
  )
}

export default Floor
