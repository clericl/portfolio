import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Effects from '../Effects'
import Staircase from '../Staircase'
import NightSky from '../NightSky'

import puresky from '../../assets/env/puresky.hdr'
import './index.scss'

function Scene() {
  return (
    <div className="three-scene">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 60, position: [0, 1, 30] }}>
        <fog attach="fog" args={['#343542', 50, 3000]} />
        <ambientLight intensity={1} />
        <pointLight position={[-50, 50, -50]} intensity={1} castShadow shadow-mapSize={2048} />        
        <Environment files={puresky} />
        <Effects />
        {/* <OrbitControls /> */}
        <Suspense fallback={null}>
          <NightSky />
          <Staircase />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
