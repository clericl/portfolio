import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { Color, DoubleSide, Mesh, MeshPhysicalMaterial } from "three"

import IridescenceMaterial from '../../assets/IridescenceMaterial.json'
import iridescenceThicknessMap from '../../assets/iridescence-thickness-map.jpg'
import iridescenceORMMap from '../../assets/iridescence-orm.png'

const COLOR_MAP: {[key: string]: Color} = {
  about1: new Color(0x38cbc6),
  about2: new Color(0x5c5fff),
  projects1: new Color(0xeeebff),
  projects2: new Color(0xc378e2),
}

function ContentCube({ content }: ContentCubeProps) {
  const ref = useRef<Mesh>(null!)
  const randomFactorRef = useRef<number>(Math.random() * Math.PI)
  const positionYRef = useRef<number>(randomFactorRef.current)
  const rotationRef = useRef<number>(0)

  const [
    iridescenceThickness,
    iridescenceORM,
  ] = useTexture([
    iridescenceThicknessMap,
    iridescenceORMMap,
  ])

  const iridescentMaterial = useMemo(() => {
    const newMaterial = new MeshPhysicalMaterial()
    // @ts-ignore
    newMaterial.setValues(IridescenceMaterial)
    newMaterial.color = COLOR_MAP[content]
    newMaterial.iridescenceThicknessMap = iridescenceThickness
    newMaterial.aoMap = iridescenceORM

    return newMaterial
  }, [content, iridescenceThickness, iridescenceORM])

  useFrame((_, delta) => {
    rotationRef.current += delta / (5 + randomFactorRef.current)
    positionYRef.current += 1 * delta

    ref.current.position.y = 2 * Math.sin(positionYRef.current)
    ref.current.rotation.set(
      rotationRef.current + (randomFactorRef.current * 1),
      rotationRef.current + (randomFactorRef.current * 3),
      rotationRef.current + (randomFactorRef.current * 2)
    )
  })

  return (
    <mesh material={iridescentMaterial} ref={ref}>
      <boxGeometry args={[12, 12, 12]} />
    </mesh>
  )
}

interface ContentCubeProps {
  content: string,
}

export default ContentCube
