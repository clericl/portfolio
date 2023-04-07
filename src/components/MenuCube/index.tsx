import { Vector3 } from "three"

function MenuCube({ position = [0, 0, 0], scale = 10 }) {
  return (
    <mesh position={new Vector3(...position)} scale={scale}>
      <boxGeometry args={[1, 1]} />
      <meshStandardMaterial />
    </mesh>
  )
}

export default MenuCube
