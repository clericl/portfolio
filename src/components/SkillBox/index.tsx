import { useTexture } from "@react-three/drei"
import { MeshProps } from "@react-three/fiber"
import { AdditiveBlending, CustomBlending, DoubleSide, MultiplyBlending } from "three"

const WIDTH = 3
const GAP = 0.5

function SkillBox({ name, imagePath, index, ...props }: SkillBoxProps) {
  const image = useTexture(imagePath)

  return (
    <mesh
      castShadow
      receiveShadow
      position-x={((index % 4) - 1.5) * (WIDTH + GAP)}
      position-y={((Math.floor(index / 4)) * (WIDTH + GAP) + ((WIDTH + GAP) / 2))}
      {...props}
    >
      <boxGeometry args={[WIDTH, WIDTH, WIDTH]} />
      <meshPhysicalMaterial color="#9c9c9c" map={image} side={DoubleSide} blending={AdditiveBlending} />
    </mesh>
  )
}

interface SkillBoxProps extends MeshProps {
  name: string
  imagePath: string
  index: number
}

export default SkillBox
