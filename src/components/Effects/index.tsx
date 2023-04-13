import { Bloom, EffectComposer } from '@react-three/postprocessing'

function Effects() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={1} mipmapBlur intensity={1} />
    </EffectComposer>
  )
}

export default Effects
