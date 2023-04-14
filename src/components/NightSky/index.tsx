import { useRef, useState } from 'react'
import { BackSide, Group } from 'three'
import { Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

function NightSky() {
  const ref = useRef<Group>(null!)

  useFrame((_, delta) => {
    ref.current.rotation.y -= delta / 50
  })

  return (
    <group ref={ref}>
      <Stars radius={73} depth={200} count={1000} factor={4} saturation={1} speed={1} />
      <mesh>
        <sphereGeometry args={[750, 512, 512]} />
        <meshStandardMaterial side={BackSide} color="#01020f" />
      </mesh>
    </group>
  )
}

export default NightSky
