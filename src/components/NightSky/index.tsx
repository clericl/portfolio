import { BackSide } from 'three'
import { Stars } from '@react-three/drei'

function NightSky() {
  return (
    <group>
      <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
      <mesh>
        <sphereGeometry args={[10000, 10000]} />
        <meshStandardMaterial color="#03062b" side={BackSide} />
      </mesh>
    </group>
  )
}

export default NightSky
