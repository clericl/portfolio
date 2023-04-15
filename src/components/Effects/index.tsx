import { Bloom, EffectComposer } from '@react-three/postprocessing'

function Effects() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={1} mipmapBlur intensity={0.6} />
    </EffectComposer>
  )
}

export default Effects
