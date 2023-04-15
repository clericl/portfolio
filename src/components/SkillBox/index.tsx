import { MeshProps, Vector3 } from "@react-three/fiber"

function SkillBox({ name, image, ...props }: SkillBoxProps) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial color="blue" />
    </mesh>
  )
}

interface SkillBoxProps extends MeshProps {
  name: string
  image: string
}

export default SkillBox
