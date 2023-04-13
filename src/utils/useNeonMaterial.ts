import { useMemo } from 'react'
import { Color, ColorRepresentation, MeshPhysicalMaterial } from 'three'

import NeonMaterial from '../assets/NeonMaterial.json'

function useNeonMaterial(color?: ColorRepresentation) {
  const neonMaterial = useMemo(() => {
    const newMaterial = new MeshPhysicalMaterial()
    // @ts-ignore
    newMaterial.setValues(NeonMaterial)

    if (color) {
      newMaterial.emissive = new Color(color)
    }

    return newMaterial
  }, [color])

  return neonMaterial
}

export default useNeonMaterial
