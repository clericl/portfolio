import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Effects from '../Effects'
import Sky from '../Sky'
import Staircase from '../Staircase'

import clearskyhdr from '../../assets/puresky.hdr'
import './index.scss'

function Scene() {
  return (
    <div className="three-scene">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 65, position: [0, 1, 30] }}>
        <color attach="background" args={['black']} />
        <fog attach="fog" near={20} far={200} />
        <ambientLight intensity={1} />
        <pointLight position={[-50, 50, -50]} intensity={1} castShadow shadow-mapSize={2048} />        
        <Environment files={clearskyhdr} />
        {/* <Environment preset="studio" /> */}
        <Effects />
        <Suspense fallback={null}>
          <Sky azimuth={1.16} turbidity={1} rayleigh={0.5} mieDirectionalG={0.7} inclination={0.52} />
          <Staircase />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
