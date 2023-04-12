import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Environment, OrbitControls, ContactShadows, SoftShadows, BakeShadows } from '@react-three/drei'
import Sky from '../Sky'
import Staircase from '../Staircase'

// import clearskyhdr from '../../assets/puresky.hdr'
import './index.scss'
import Effects from '../Effects'

function Scene() {
  return (
    <div className="three-scene">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 55, position: [0, 1, 25] }}>
        <OrbitControls />
        <color attach="background" args={['black']} />
        <fog attach="fog" near={20} far={200} />
        <ambientLight intensity={0.8} />
        <pointLight position={[-50, 50, -50]} intensity={1} castShadow shadow-mapSize={2048} />
        {/* <Environment files={clearskyhdr} /> */}
        <Environment preset="dawn" />
        <Effects />
        <Suspense fallback={null}>
          <Sky azimuth={1.16} turbidity={0.5} rayleigh={0.5} mieDirectionalG={0.6} inclination={0.52} />
          <Staircase />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
