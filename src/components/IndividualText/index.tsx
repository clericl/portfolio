import { ReactNode, useMemo, useRef } from "react"
import { Text3D } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { Mesh } from "three"
import useIridescentMaterial from "../../utils/useIridescentMaterial"

function IndividualText({ children, size }: IndividualTextProps) {
  const iridescentMaterial = useIridescentMaterial('#66abff')
  const textRef = useRef<Mesh>(null!)

  const messageRender = useMemo(() => {
    if (typeof children === 'string') {
      return Array.from(children).map((letter, index) => (
        <Text3D
          key={`${letter}${index}`}
          font="/source_code_pro.json"
          position-x={index * (size / 1.3)}
          size={size}
          material={iridescentMaterial}
          ref={textRef}
          castShadow
        >
          {letter}
        </Text3D>
      ))
    }
  }, [children, iridescentMaterial, size])

  useFrame(() => {

  })

  return (
    <group>
      {messageRender}
    </group>
  )
}

interface IndividualTextProps {
  children: ReactNode
  size: number
}

export default IndividualText
