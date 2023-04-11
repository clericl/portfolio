import { Vector3 } from "@react-three/fiber"
import { useMemo } from "react"
import { useTexture } from "@react-three/drei"
import { Color, MeshPhysicalMaterial } from "three"

import IridescenceMaterial from '../../assets/IridescenceMaterial.json'
import iridescenceThicknessMap from '../../assets/iridescence-thickness-map.jpg'
import iridescenceORMMap from '../../assets/iridescence-orm.png'

const DEGREE_IN_RADIANS = 0.0174533

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
      <mesh position-x={-10} rotation-x={Math.PI / 2} material={iridescentMaterial}>
        <boxGeometry args={[10, 2, 0.5,]} />
      </mesh>
      <mesh material={iridescentMaterial}>
        <sphereGeometry />
      </mesh>
    </group>
  )
}

function Stairs({
  count = 80,
  position = [0, 0, 0],
  spaceBetween = 2.5
}: StairsProps) {
  const rendered = useMemo(() => {
    const stairs = []

    for (let i = 0; i < count; i++) {
      const positionY = i * spaceBetween
      const rotationY = i * DEGREE_IN_RADIANS * -10

      stairs.push(
        <Stair positionY={positionY} rotationY={rotationY} />
      )
    }

    return stairs
  }, [count, spaceBetween])

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
  position?: Vector3
  spaceBetween?: number
}

export default Stairs
