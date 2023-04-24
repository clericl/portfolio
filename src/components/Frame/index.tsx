import { useContext, useEffect, useMemo, useState } from 'react'
import { useCursor, useTexture } from '@react-three/drei'
import { Color } from 'three'
import { ModalContext } from '../Modal'
import { GOLDEN_RATIO } from '../../utils/constants'
import useNeonMaterial from '../../utils/useNeonMaterial'

function Frame({
  name,
  url,
  index,
}: FrameProps) {
  const [hovered, set] = useState(false)
  const { openModal } = useContext(ModalContext)
  const texture = useTexture(url)
  const neonMaterial = useNeonMaterial()

  const videoTextureSrc = texture.source.data

  useCursor(hovered)

  useEffect(() => {
    if (hovered) {
      videoTextureSrc.play()
    } else {
      videoTextureSrc.pause()
    }
  }, [hovered, videoTextureSrc])

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
      onPointerOver={() => set(true)}
      onPointerOut={() => set(false)}
    >
      <mesh
        // material={blueNeon}
        position={[0, (GOLDEN_RATIO / 2) + 0.05, 0]}
      >
        <boxGeometry args={[1.05, GOLDEN_RATIO + 0.05, 0.025]} />
        <meshPhysicalMaterial color="#534ecf" />
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
