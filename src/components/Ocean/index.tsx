import * as THREE from 'three'
import { useMemo, useRef } from 'react'
import { extend, Object3DNode, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Water } from 'three-stdlib'

import waterNormalsTex from '../../assets/water-normals.jpg'

extend({ Water })

function Ocean() {
  const ref = useRef<Water>(null!)
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, waterNormalsTex)
  const waterNormal = Array.isArray(waterNormals) ? waterNormals[0] : waterNormals

  // @ts-ignore
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping

  const geometry = useMemo(() => new THREE.PlaneGeometry(20000, 20000), [])
  const config = useMemo(() => ({
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: waterNormal,
    sunDirection: new THREE.Vector3(),
    sunColor: 0x000000,
    waterColor: 0x7b8bb0,
    distortionScale: 3.7,
    fog: false,
    format: gl.outputEncoding,
  }), [gl.outputEncoding, waterNormal])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value -= (delta)
    }
  })

  return (
    <water
      ref={ref}
      args={[geometry, config]}
      rotation-x={-Math.PI / 1.72}
      position-y={-25}
    />
  )
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    water: Object3DNode<Water, typeof Water>
  }
}

export default Ocean
