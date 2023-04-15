import { Bloom, EffectComposer } from '@react-three/postprocessing'

function Effects() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={1} mipmapBlur intensity={0.3} />
    </EffectComposer>
  )
}

export default Effects
