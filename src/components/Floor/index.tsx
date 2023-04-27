import { useRef } from 'react'
import { useFrame } from "@react-three/fiber"
import { useMediaQuery } from "../../utils/useMediaQuery"
import { FloorType, STAIR_HEIGHT } from "../../utils/constants"
import { Mesh } from 'three'
import { MeshTransmissionMaterial, MeshReflectorMaterial } from "@react-three/drei"
import useIridescentMaterial from "../../utils/useIridescentMaterial"
import NeonFrame from "../NeonFrame"

function Floor({ type = FloorType.Secondary }: FloorProps) {
  const isDesktop = useMediaQuery('(min-width:768px)')
  const iridescentMaterial = useIridescentMaterial('#a0c6db')
  const barRef = useRef<Mesh>(null!)

  useFrame(({ clock }) => {
    barRef.current.rotation.x = -Math.sin(clock.getElapsedTime())
  })

  return (
    <group>
      {isDesktop ? (
        <mesh
          rotation-x={-Math.PI / 2}
          receiveShadow
          castShadow
        >
          <boxGeometry args={[15 * (type === FloorType.Primary ? 2 : 1.5), 5 * (type === FloorType.Primary ? 2 : 1.5), STAIR_HEIGHT]} />
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
      ) : (
        <mesh
          receiveShadow
          castShadow
          material={iridescentMaterial}
          ref={barRef}
          position-y={1.5}
        >
          <boxGeometry args={[22.5, 0.25, 0.25]} />
        </mesh>
      )}
      {isDesktop && (
        <>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]} receiveShadow>
            <planeGeometry args={[15 * (type === FloorType.Primary ? 2 : 1.5), 5 * (type === FloorType.Primary ? 2 : 1.5)]} />
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
          {type === FloorType.Primary && (
            <NeonFrame />
          )}
        </>
      )}
    </group>
  )
}

interface FloorProps {
  type?: FloorType
}

export default Floor
