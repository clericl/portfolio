import { useEffect } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import { RGBELoader } from 'three-stdlib'

import puresky from '../../assets/puresky.hdr'

function NightSky() {
  const tex = useLoader(RGBELoader, puresky)
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    // @ts-ignore
    scene.background = tex
    scene.backgroundIntensity = 0.08
  }, [scene, tex])

  return null
}

export default NightSky
