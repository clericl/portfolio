import { Vector3 } from "@react-three/fiber"
import { useMemo } from "react"
import { useTexture } from "@react-three/drei"
import { Color, MeshPhysicalMaterial } from "three"
import { NUMBER_OF_ROTATIONS, STAIRS_PER_ROTATION } from "../Staircase"

import IridescenceMaterial from '../../assets/IridescenceMaterial.json'
import iridescenceThicknessMap from '../../assets/iridescence_thickness_map.jpg'
import iridescenceORMMap from '../../assets/iridescence_orm.png'

export const DEGREE_IN_RADIANS = 0.0174533
export const SPACE_BETWEEN_STAIRS = 1
export const STAIR_HEIGHT = 0.1

function Stair({ rotationY, positionY }: StairProps) {
  const [
    iridescenceThickness,
    iridescenceORM,
  ] = useTexture([
    iridescenceThicknessMap,
    iridescenceORMMap,
  ])

  const iridescentMaterial = useMemo(() => {
    const newMaterial = new MeshPhysicalMaterial()
    // @ts-ignore
    newMaterial.setValues(IridescenceMaterial)
    newMaterial.iridescenceThicknessMap = iridescenceThickness
    newMaterial.aoMap = iridescenceORM
    newMaterial.color = new Color('#a7ccd4')

    return newMaterial
  }, [iridescenceThickness, iridescenceORM])

  return (
    <group position-y={positionY} rotation-y={rotationY}>
      <mesh position-x={3} rotation-x={Math.PI / 2} material={iridescentMaterial} receiveShadow castShadow>
        <boxGeometry args={[5, 1, STAIR_HEIGHT]} />
      </mesh>
      <mesh material={iridescentMaterial}>
        <sphereGeometry args={[0.2, 16, 16]} />
      </mesh>
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
        <Stair key={i} positionY={positionY} rotationY={rotationY} />
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
  positionY: number
  rotationY: number
}

interface StairsProps {
  height?: number
  position?: Vector3
}

export default Stairs
