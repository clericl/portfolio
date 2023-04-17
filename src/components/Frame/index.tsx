import { useRef, useState, } from 'react'
import { useFrame } from '@react-three/fiber'
import { Image, Text } from '@react-three/drei'
import { Color, ColorRepresentation, Mesh, Texture } from 'three'
import { easing } from 'maath'
import { GOLDEN_RATIO } from '../Frames'

function Frame({
  isActive,
  url,
  texture,
  c = new Color(),
  ...props
}: FrameProps) {
  const image = useRef<Mesh>(null!)
  const frame = useRef<Mesh>(null!)
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  
  useFrame((state, dt) => {
    // @ts-ignore
    image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
    easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
    // @ts-ignore
    easing.dampC(frame.current.material.color, hovered ? 'orange' : 'white', 0.1, dt)
  })
  return (
    <group {...props}>
      <mesh
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDEN_RATIO, 0.05]}
        position={[0, GOLDEN_RATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        {url && (
          <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
        )}
        {texture && (
          <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} texture={texture} />
        )}
      </mesh>
      {/* <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDEN_RATIO, 0]} fontSize={0.025}>
        {name.split('-').join(' ')}
      </Text> */}
    </group>
  )
}

export default Frame

type FrameProps = {
  isActive: boolean
  c?: ColorRepresentation
} & ({ texture: Texture; url?: never } | { texture?: never; url: string })
