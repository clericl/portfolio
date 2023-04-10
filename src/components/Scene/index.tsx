import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import ContentCubeGroup from '../ContentCubeGroup'
import NightSky from '../NightSky'
import Ocean from '../Ocean'

import starfieldEnv from '../../assets/smudge.hdr'
import './index.scss'

function Scene() {
  return (
    <div className="three-scene">
      <Canvas camera={{ position: [0, 15, 100], fov: 55, near: 1, far: 20000 }}>
      <fog attach="fog" args={['#343542', 50, 2000]} />
        <Environment blur={0} files={starfieldEnv} />
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <NightSky />
          <ContentCubeGroup />
          <Ocean />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
