import { BackSide } from 'three'
import { Stars } from '@react-three/drei'

function NightSky() {
  return (
    <group>
      <Stars radius={200} depth={50} count={700} factor={4} saturation={0} speed={2} />
      <mesh>
        <sphereGeometry args={[10000, 10000]} />
        <meshStandardMaterial color="#03062b" side={BackSide} />
      </mesh>
    </group>
  )
}

export default NightSky
