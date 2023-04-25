import { useRef } from "react"
import { useLocation } from "react-router-dom"
import { useFrame } from "@react-three/fiber"
import { Box, Center, Text3D } from "@react-three/drei"
import { Mesh } from "three"
import { FloorType } from "../../utils/constants"
import { PlatformProps } from "../Platform"
import Floor from "../Floor"
import Cat from "../Cat"
import useIridescentMaterial from "../../utils/useIridescentMaterial"

function HomePlatform({ position }: Partial<PlatformProps>) {
  const boxRef = useRef<Mesh>(null!)
  const iridescentMaterial = useIridescentMaterial('#a0c6db')
  const { pathname } = useLocation()
  
  useFrame((_, delta) => {
    boxRef.current.rotation.x += delta * 3
    boxRef.current.rotation.y += delta * 3
    boxRef.current.rotation.z += delta * 3
  })
  
  return (
    <group position={position} position-x={0}>
      <Center disableY disableZ>
        <Text3D
          font="/hubballi.json"
          position={[0, 7, -1]}
          scale={[1, 1, 2]}
          size={4}
          material={iridescentMaterial}
        >
          ERIC  LIANG
        </Text3D>
      </Center>
      <Box
        args={[0.5, 0.5, 0.5]}
        position={[-1.8, 8.5, -1]}
        ref={boxRef}
        material={iridescentMaterial}
      />
      <Center disableY disableZ>
        <Text3D
          // @ts-ignore
          font="/hubballi.json"
          position={[0, 4.5, -1]}
          scale={[1, 1, 2]}
          size={1.8}
          letterSpacing={-0.1}
          material={iridescentMaterial}
        >
          web developer
        </Text3D>
      </Center>
      {pathname === '/' && (
        <Cat
          position={[7.6, 0.1, 2.5]}
          scale={[2.1, 2.1, 2.1]}
          rotation-y={-Math.PI / 8 * 6.5}
          castShadow
        />
      )}
      <Floor type={FloorType.Primary} />
    </group>
  )
}

export default HomePlatform
