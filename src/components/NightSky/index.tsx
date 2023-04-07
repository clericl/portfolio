import { BackSide } from 'three'
import { Stars, useTexture } from '@react-three/drei'

import skyTex from '../../assets/sky-tex.jpg'

function useTextureExtended(path: string) {
  return useTexture(path)
}

function NightSky() {
  const tex = useTextureExtended(skyTex)
  // tex.flipY = false

  return (
    <group>
      <Stars radius={73} depth={50} count={2000} factor={4} saturation={1} speed={2} />
      <mesh>
        <sphereGeometry args={[200, 200]} />
        <meshStandardMaterial map={tex} side={BackSide} />
      </mesh>
    </group>
  )
}

export default NightSky
