import { useContext, useMemo } from 'react'
import { useVideoTexture } from '@react-three/drei'
import { Color } from 'three'
import { GOLDEN_RATIO } from '../../utils/constants'
import useNeonMaterial from '../../utils/useNeonMaterial'
import { ModalContext } from '../Modal'

function Frame({
  name,
  url,
  index,
}: FrameProps) {
  const { openModal } = useContext(ModalContext)
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
      onClick={() => openModal(name)}
    >
      <mesh
        material={blueNeon}
        position={[0, (GOLDEN_RATIO / 2) + 0.05, 0]}
      >
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
  name: string
  url: string
  index: number
}
