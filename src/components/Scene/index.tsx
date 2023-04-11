import { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Home from '../Home'

import './index.scss'
import { Stage } from '../Stage'
import Ground from '../Ground'
import { Vector3 } from 'three'
import { lerp } from 'three/src/math/MathUtils'

import * as THREE from 'three'


interface SphereProps {
  position: number[],
  scale?: number[],
}

function Sphere({ position, scale = [1, 1, 1] }: SphereProps) {
  return (
    <mesh
      receiveShadow
      castShadow
      renderOrder={-2000000}
      geometry={new THREE.SphereGeometry(1, 32, 32)}
      material={new THREE.MeshStandardMaterial({ color: new THREE.Color('#D6CDC4'), transparent: true })}
      position={new Vector3(...position)}
      scale={new Vector3(...scale)}
    />
  )
}

function Scene() {
  return (
    <div className="three-scene">
      <Canvas dpr={[1, 2]} shadows camera={{ fov: 50, position: [0, 5, 50] }}>
        <pointLight position={[0, 0, 10]} />
        <color attach="background" args={['black']} />
        <fog attach="fog" near={20} far={5000} />
        <Environment preset="night" />
        <Suspense fallback={null}>
          <group position={[0, -10, 0]}>
            <Stage />
            <mesh rotation-x={Math.PI / 2} position={[0, 1, 0]}>
              <torusKnotGeometry />
              <meshStandardMaterial color="blue" />
            </mesh>
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene
