import { useContext, useMemo, useRef, useState } from 'react'
import { useCursor, useTexture } from '@react-three/drei'
import { Color, Mesh } from 'three'
import { ModalContext } from '../Modal'
import { GOLDEN_RATIO } from '../../utils/constants'
import useNeonMaterial from '../../utils/useNeonMaterial'
import { useFrame } from '@react-three/fiber'

const BASE_EMISSIVE = new Color(0.3, 0.3, 1)
const TARGET_EMISSIVE = new Color(0.4, 0.4, 2)

function Frame({
  name,
  url,
  index,
}: FrameProps) {
  const [hovered, set] = useState(false)
  const { openModal } = useContext(ModalContext)
  const texture = useTexture(url)
  const neonMaterial = useNeonMaterial('#0d00ff', 'black')
  const ref = useRef<Mesh>(null!)

  useCursor(hovered)

  useFrame(() => {
    if (hovered) {
      // @ts-ignore
      ref.current.material.emissive.lerp(TARGET_EMISSIVE, 0.06)
    } else {
      // @ts-ignore
      ref.current.material.emissive.copy(BASE_EMISSIVE)
    }
  })

  return (
    <group
      scale={5}
      position-x={(index * 4.7) - 9}
      rotation-y={Math.PI / (index + 2.7)}
      onClick={() => openModal(name)}
      onPointerOver={() => set(true)}
      onPointerOut={() => set(false)}
    >
      <mesh
        material={neonMaterial}
        position={[0, (GOLDEN_RATIO / 2) + 0.05, 0]}
        ref={ref}
      >
        <boxGeometry args={[1.05, GOLDEN_RATIO + 0.05, 0.025]} />
        {/* <meshPhysicalMaterial color="#534ecf" /> */}
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
