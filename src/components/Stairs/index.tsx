import { Vector3 } from "@react-three/fiber"
import { useMemo } from "react"
import { NUMBER_OF_ROTATIONS, STAIRS_PER_ROTATION } from "../Staircase"
import useIridescentMaterial from "../../utils/useIridescentMaterial"

export const DEGREE_IN_RADIANS = 0.0174533
export const SPACE_BETWEEN_STAIRS = 1
export const STAIR_HEIGHT = 0.1

function Stair({ hasSphere, rotationY, positionY }: StairProps) {
  const iridescentMaterial = useIridescentMaterial('#a0c6db')

  return (
    <group position-y={positionY} rotation-y={rotationY}>
      <mesh position-x={12} rotation-x={Math.PI / 2} material={iridescentMaterial} receiveShadow castShadow>
        <boxGeometry args={[6, 1.5, STAIR_HEIGHT]} />
      </mesh>
      {hasSphere && (
        <mesh material={iridescentMaterial}>
          <sphereGeometry args={[0.2, 16, 16]} />
        </mesh>
      )}
    </group>
  )
}

function Stairs({
  position = [0, 0, 0],
}: StairsProps) {
  const rendered = useMemo(() => {
    const stairs = []
    const count = STAIRS_PER_ROTATION * NUMBER_OF_ROTATIONS

    for (let i = 0; i < count; i++) {
      const positionY = i * SPACE_BETWEEN_STAIRS
      const rotationY = i * (2 * Math.PI / STAIRS_PER_ROTATION)

      stairs.push(
        <Stair
          key={i}
          hasSphere={(i % (STAIRS_PER_ROTATION / 2)) > (STAIRS_PER_ROTATION / 4)}
          positionY={positionY}
          rotationY={rotationY}
        />
      )
    }

    return stairs
  }, [])

  return (
    <group position={position}>
      {rendered}
    </group>
  )
}

interface StairProps {
  hasSphere: boolean
  positionY: number
  rotationY: number
}

interface StairsProps {
  height?: number
  position?: Vector3
}

export default Stairs
