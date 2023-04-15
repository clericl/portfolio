import { useTexture } from "@react-three/drei"
import { MeshProps, ThreeEvent, useFrame } from "@react-three/fiber"
import { useCallback, useMemo, useRef } from "react"
import { AdditiveBlending, Color, DoubleSide, Mesh } from "three"
import { useSpring } from "@react-spring/three"

const WIDTH = 2.25
const GAP = 0.65
const BASE_COLOR = '#9c9c9c'

function SkillBox({ name, imagePath, index, onPointerEnter = () => {}, ...props }: SkillBoxProps) {
  const image = useTexture(imagePath)
  const ref = useRef<Mesh>(null!)
  const [springs, api] = useSpring(() => ({ color: BASE_COLOR }))
  
  const multiplier = useMemo(() => Math.random(), [])
  const basePositionY = useMemo(() => ((Math.floor(index / 4)) * (WIDTH + GAP) + ((WIDTH + GAP) / 2 + GAP)), [index])

  useFrame(({ clock }) => {
    ref.current.position.y = basePositionY + (Math.sin(clock.getElapsedTime() * multiplier) / 6)
  })

  const updateColor = useCallback((newColor: string) => {
    api.start({
      color: newColor,
      onChange: () => {
        // @ts-ignore
        ref.current.material.color = new Color().setStyle(springs.color.get())
        // @ts-ignore
        ref.current.material.needsUpdate = true
      },
    })
  }, [api, springs.color])

  const handlePointerEnter = useCallback((e: ThreeEvent<PointerEvent>) => {
    onPointerEnter(e)
    updateColor('white')
  }, [onPointerEnter, updateColor])

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => updateColor(BASE_COLOR)}
      position-x={((index % 4) - 1.5) * (WIDTH + GAP)}
      position-y={((Math.floor(index / 4)) * (WIDTH + GAP) + ((WIDTH + GAP) / 2 + (GAP / 2)))}
      {...props}
    >
      <boxGeometry args={[WIDTH, WIDTH, WIDTH]} />
      <meshPhysicalMaterial
        color={BASE_COLOR}
        map={image}
        side={DoubleSide}
        blending={AdditiveBlending}
      />
    </mesh>
  )
}

interface SkillBoxProps extends MeshProps {
  name: string
  imagePath: string
  index: number
  activate?: boolean
}

export default SkillBox
