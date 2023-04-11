import { Vector3 } from "@react-three/fiber"
import { useMemo } from "react"

const DEGREE_IN_RADIANS = 0.0174533

function Stair({ rotationY, positionY }: StairProps) {
  return (
    <group position-y={positionY} rotation-y={rotationY}>
      <mesh position-x={-10} rotation-x={Math.PI / 2}>
        <boxGeometry args={[10, 2, 0.5,]} />
        <meshPhysicalMaterial color="blue" transparent opacity={0.8} />
      </mesh>
      <mesh>
        <sphereGeometry />
        <meshPhysicalMaterial color="blue" transparent opacity={0.8} />
      </mesh>
    </group>
  )
}

function Stairs({ count = 60, position = [0, 0, 0] }: StairsProps) {
  const rendered = useMemo(() => {
    const stairs = []

    for (let i = 0; i < count; i++) {
      const positionY = i * 3
      const rotationY = i * DEGREE_IN_RADIANS * -10

      stairs.push(
        <Stair positionY={positionY} rotationY={rotationY} />
      )
    }

    return stairs
  }, [count])

  return (
    <group position={position}>
      {rendered}
    </group>
  )
}

interface StairProps {
  positionY: number
  rotationY: number
}

interface StairsProps {
  count?: number
  position: Vector3
}

export default Stairs
