import { STAIR_HEIGHT } from "../Stairs"

function Floor({ isHome = false }: FloorProps) {
  return (
    <group>
      <mesh rotation-x={Math.PI / 2} receiveShadow castShadow>
        <boxGeometry args={[15 * (isHome ? 3 : 1), 15 * (isHome ? 3 : 1), STAIR_HEIGHT]} />
        <meshPhysicalMaterial color="white" />
      </mesh>
    </group>
  )
}

interface FloorProps {
  isHome?: boolean
}

export default Floor
