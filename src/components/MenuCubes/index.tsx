import { useRef } from "react"
import { Group } from "three"
import MenuCube from "../MenuCube"

function MenuCubes() {
  const ref = useRef<Group>(null!)

  // useFrame((_, delta) => )

  return (
    <group ref={ref}>
      <MenuCube position={[-10, 0, -10]} />
      <MenuCube position={[10, 0, -10]} />
      <MenuCube position={[-10, 0, 10]} />
      <MenuCube position={[10, 0, 10]} />
    </group>
  )
}

export default MenuCubes
