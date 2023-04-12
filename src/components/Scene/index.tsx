import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Environment, OrbitControls, ContactShadows, SoftShadows, BakeShadows } from '@react-three/drei'
import Sky from '../Sky'
import Staircase from '../Staircase'

import clearskyhdr from '../../assets/puresky.hdr'
import './index.scss'

function Scene() {
  return (
    <div className="three-scene">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 55, position: [0, 1, 25] }}>
        <OrbitControls />
        <color attach="background" args={['black']} />
        <fog attach="fog" near={20} far={200} />
        <ambientLight intensity={1} />
        {/* <spotLight position={[-100, 50, -220]} angle={0.25} penumbra={0.9} intensity={1} castShadow shadow-mapSize={1024} /> */}
        <pointLight position={[-50, 50, -50]} intensity={1} castShadow shadow-mapSize={2048} />
        <Environment files={clearskyhdr} />
        {/* <BakeShadows /> */}
        {/* <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
          <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
        </AccumulativeShadows> */}
        <Suspense fallback={null}>
          <Sky azimuth={1.16} turbidity={1} rayleigh={0.5} mieDirectionalG={0.6} inclination={0.56} />
          <Staircase />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
