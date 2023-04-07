import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import MenuCubes from '../MenuCubes'
import NightSky from '../NightSky'
import Ocean from '../Ocean'

import './index.scss'

function Scene() {
  return (
    <div className="three-scene">
      <Canvas camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}>
        <pointLight position={[100, 100, 100]} />
        <pointLight position={[-100, -100, -100]} />
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <NightSky />
          <MenuCubes />
          <Ocean />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
