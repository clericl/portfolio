import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Effects from '../Effects'
import Staircase from '../Staircase'
import Ocean from '../Ocean'
import NightSky from '../NightSky'

import clearskyhdr from '../../assets/puresky.hdr'
import './index.scss'

function Scene() {
  return (
    <div className="three-scene">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 65, position: [0, 1, 30] }}>
        <color attach="background" args={['black']} />
        <fog attach="fog" args={['#343542', 50, 3000]} />
        <ambientLight intensity={1} />
        <pointLight position={[-50, 50, -50]} intensity={1} castShadow shadow-mapSize={2048} />        
        <Environment files={clearskyhdr} />
        <OrbitControls />
        <Effects />
        <Suspense fallback={null}>
          <NightSky />
          <Staircase />
          <Ocean />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
