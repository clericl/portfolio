import { useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import { Color, ColorRepresentation, MeshPhysicalMaterial } from 'three'

import IridescenceMaterial from '../assets/IridescenceMaterial.json'
import iridescenceThicknessMap from '../assets/iridescence_thickness_map.jpg'
import iridescenceORMMap from '../assets/iridescence_orm.png'

function useIridescentMaterial(color: ColorRepresentation) {
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
    newMaterial.color = new Color(color)

    return newMaterial
  }, [color, iridescenceThickness, iridescenceORM])

  return iridescentMaterial
}

export default useIridescentMaterial
