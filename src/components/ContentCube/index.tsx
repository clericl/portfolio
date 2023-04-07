import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Material, Mesh } from "three"

import lampModel from '../../assets/Iridescence.glb'
import { GLTF } from "three-stdlib"

function useGLTFExtended(path: string): GLTFWithMaterials {
  const effects = useGLTF(path)
  const effectsWithMaterials = Object.assign({}, { materials: {} }, effects)
  return effectsWithMaterials
}

function ContentCube() {
  const ref = useRef<Mesh>(null!)
  const positionYRef = useRef<number>(0)
  const rotationRef = useRef<number>(0)
  const { materials } = useGLTFExtended(lampModel)

  useFrame((_, delta) => {
    rotationRef.current += delta / 5
    positionYRef.current += 1.5 * delta

    ref.current.rotation.set(rotationRef.current, rotationRef.current, rotationRef.current)
    ref.current.position.y = 2 * Math.sin(positionYRef.current)
  })

  return (
    <mesh material={materials.IridescenceLampIridescence} ref={ref}>
      <boxGeometry args={[20, 20, 20]} />
    </mesh>
  )
}

interface Materials {
  [key: string]: Material
}

interface GLTFWithMaterials extends GLTF {
  materials: Materials,
}

export default ContentCube
