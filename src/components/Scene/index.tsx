import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Vector3 } from 'three'
import { Environment, OrbitControls } from '@react-three/drei'
import Sky from '../Sky'
import Stairs from '../Stairs'

import './index.scss'


function Scene() {
  return (
    <div className="three-scene">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 50, position: [0, 5, 300] }}>
        <OrbitControls />
        <color attach="background" args={['black']} />
        <fog attach="fog" near={20} far={5000} />
        <Environment preset="dawn" />
        <Suspense fallback={null}>
        <Sky sunPosition={new Vector3(-550, 250, -1000)} azimuth={180} turbidity={1} rayleigh={0.5} mieDirectionalG={0.6} />
          <group position={[0, -10, 0]}>
            <Stairs position={[0, -100, 0]} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
