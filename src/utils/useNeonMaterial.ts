import { useMemo } from 'react'
import { MeshPhysicalMaterial } from 'three'

import NeonMaterial from '../assets/NeonMaterial.json'

function useNeonMaterial() {
  const neonMaterial = useMemo(() => {
    const newMaterial = new MeshPhysicalMaterial()
    // @ts-ignore
    newMaterial.setValues(NeonMaterial)

    return newMaterial
  }, [])

  return neonMaterial
}

export default useNeonMaterial
