import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Environment, OrbitControls } from '@react-three/drei'
import Sky from '../Sky'
import Staircase from '../Staircase'

import './index.scss'

function Scene() {
  return (
    <div className="three-scene">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 40, position: [0, 0, 40] }}>
        <OrbitControls />
        <color attach="background" args={['black']} />
        <fog attach="fog" near={20} far={5000} />
        <pointLight intensity={0.6} position={[-30, 25, -30]} castShadow />
        <Environment preset="dawn" />
        <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
          <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
        </AccumulativeShadows>
        <Suspense fallback={null}>
          <Sky azimuth={1.17} turbidity={1} rayleigh={0.5} mieDirectionalG={0.6} inclination={0.56} />
          <Staircase />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
