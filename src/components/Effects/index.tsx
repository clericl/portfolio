// @ts-nocheck

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

function Effects() {
  const bloomRef = useRef()
  
  useFrame(({ clock }) => {
    bloomRef.current.intensity = (Math.sin(clock.elapsedTime / 2) + 2) / 4
  })

  return (
    <EffectComposer>
      <Bloom ref={bloomRef} luminanceThreshold={1} mipmapBlur intensity={0.3} />
    </EffectComposer>
  )
}

export default Effects
