import { useMemo, useRef } from "react"
import { useTexture } from "@react-three/drei"
import { Color, Points, Vector3 } from "three"

import flower1 from '../../assets/flower1.png'
import flower2 from '../../assets/flower2.png'
import { useFrame } from "@react-three/fiber"

function CherryBlossoms({ count = 1000, factor = 4 }: CherryBlossomsProps) {
  const [sprite1, sprite2] = useTexture([flower1, flower2])
  const pointsRef = useRef<Points>(null!)

  const [position, color, size] = useMemo(() => {
    const positions: any[] = []
    const colors: any[] = []
    const sizes = Array.from({ length: count }, () => (20 + 20 * Math.random()) * factor)
    const color = new Color()

    for (let i = 0; i < count; i++) {
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      const z = Math.random() * 200 - 100;

      positions.push(x, y, z)

      color.setHSL(0, 1, 0.9)
      colors.push(color.r, color.g, color.b)
    }
    return [new Float32Array(positions), new Float32Array(colors), new Float32Array(sizes)]
  }, [count, factor])

  useFrame((_, delta) => {
    pointsRef.current.rotation.y -= delta
  })

  return (
    <points ref={pointsRef} rotation={[Math.random() * 6, Math.random() * 6, Math.random() * 6]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[position, 3]} />
        <bufferAttribute attach="attributes-color" args={[color, 3]} />
        <bufferAttribute attach="attributes-size" args={[size, 1]} />
      </bufferGeometry>
      <pointsMaterial map={sprite1} depthTest={false} transparent />
    </points>
  )
}

interface CherryBlossomsProps {
  count?: number
  factor?: number
  radius?: number
  depth?: number
}

export default CherryBlossoms
