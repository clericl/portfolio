import { useRef } from "react"
import ContentCube from "../ContentCube"
import { Group } from "three"
import { useFrame } from "@react-three/fiber"

function ContentCubeGroup() {
  const groupRef = useRef<Group>(null!)
  const rotationRef = useRef<number>(0)

  useFrame((_, delta) => {
    rotationRef.current += delta / 3

    groupRef.current.rotation.set(
      rotationRef.current,
      rotationRef.current,
      rotationRef.current,
    )
  })

  return (
    <group ref={groupRef} position={[0, 5, 0]}>
      <group position={[-10, -10, -10]}>
        <ContentCube content="about1" />
      </group>
      <group position={[10, 10, -10]}>
        <ContentCube content="about2" />
      </group>
      <group position={[-10, 15, -25]}>
        <ContentCube content="projects1" />
      </group>
      <group position={[-10, 5, 5]}>
        <ContentCube content="projects2" />
      </group>
    </group>
  )
}

export default ContentCubeGroup
