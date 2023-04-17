import { useMemo, } from 'react'
import { useVideoTexture } from '@react-three/drei'
import { Color, ColorRepresentation } from 'three'
import { GOLDEN_RATIO } from '../Frames'
import useNeonMaterial from '../../utils/useNeonMaterial'

function Frame({
  url,
  index,
}: FrameProps) {
  const texture = useVideoTexture(url)
  const neonMaterial = useNeonMaterial()

  const blueNeon = useMemo(() => {
    const mat = neonMaterial.clone()
    mat.color = new Color('#534ecf')
    mat.emissive = new Color(0.21, 0.21, 2)
    return mat
  }, [neonMaterial])

  return (
    <group
      scale={5}
      position-x={(index * 4) - 9}
      rotation-y={Math.PI / (index + 3)}
    >
      <mesh material={blueNeon} position={[0, (GOLDEN_RATIO / 2) + 0.05, 0]}>
        <boxGeometry args={[1.05, GOLDEN_RATIO + 0.05, 0.025]} />
        <mesh position-z={0.026}>
          <planeGeometry args={[1, GOLDEN_RATIO]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </mesh>
    </group>
  )
}

export default Frame

type FrameProps = {
  url: string
  index: number
}
