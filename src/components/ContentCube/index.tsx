import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { GLTF } from "three-stdlib"
import { DoubleSide, Mesh, MeshPhysicalMaterial } from "three"

import lampModel from '../../assets/Iridescence.glb'

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

  const iridescentMaterial = materials.IridescenceLampIridescence
  console.log(iridescentMaterial)
  iridescentMaterial.side = DoubleSide
  iridescentMaterial.transparent = true
  iridescentMaterial.opacity = 0.85

  useFrame((_, delta) => {
    rotationRef.current += delta / 7.5
    positionYRef.current += 1 * delta

    ref.current.rotation.set(rotationRef.current, rotationRef.current, rotationRef.current)
    ref.current.position.y = 2 * Math.sin(positionYRef.current)
  })

  return (
    <mesh material={iridescentMaterial} ref={ref}>
      <boxGeometry args={[30, 30, 30]} />
    </mesh>
  )
}

interface Materials {
  [key: string]: MeshPhysicalMaterial
}

interface GLTFWithMaterials extends GLTF {
  materials: Materials,
}

export default ContentCube
