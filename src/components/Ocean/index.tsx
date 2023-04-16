import { Plane, TextureLoader, BoxGeometry, RepeatWrapping, Vector3 } from 'three'
import { useEffect, useMemo, useRef } from 'react'
import { extend, MeshProps, Object3DNode, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Water } from 'three-stdlib'

import waterNormalsTex from '../../assets/water-normals.jpg'

extend({ Water })

function Ocean({ clippingPlanes }: OceanProps) {
  const ref = useRef<Water>(null!)
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(TextureLoader, waterNormalsTex)
  const waterNormal = Array.isArray(waterNormals) ? waterNormals[0] : waterNormals

  // @ts-ignore
  waterNormals.wrapS = waterNormals.wrapT = RepeatWrapping

  const geometry = useMemo(() => new BoxGeometry(22.5, 7.5, 1), [])
  const config = useMemo(() => ({
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: waterNormal,
    sunDirection: new Vector3(),
    sunColor: 0x000000,
    waterColor: 0x7b8bb0,
    distortionScale: 3.7,
    fog: false,
    format: gl.outputEncoding,
  }), [gl.outputEncoding, waterNormal])

  useEffect(() => {
    // @ts-ignore
    ref.current.clipping = true
    // @ts-ignore
    ref.current.clippingPlanes = clippingPlanes
    console.log(ref.current.material)
  }, [clippingPlanes])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value -= (delta)
    }
  })

  return (
    <water
      ref={ref}
      args={[geometry, config]}
      rotation-x={-Math.PI / 2}      
    />
  )
}

interface OceanProps extends MeshProps {
  clippingPlanes: Plane[]
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    water: Object3DNode<Water, typeof Water>
  }
}

export default Ocean
