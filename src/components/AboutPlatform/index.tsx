import { PlatformProps } from "../Platform"
import Floor from "../Floor"
import MessageBoard from "../MessageBoard"
import { useLocation } from "react-router-dom"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group } from "three"
import { Sparkles } from "@react-three/drei"

const MESSAGE = "I'm Eric, a full stack\nweb developer specializing\nin 3D and augmented reality\nexperiences."

function AboutPlatform({ position }: Partial<PlatformProps>) {
  const boardRef = useRef<Group>(null!)
  const yPositionRef = useRef<number>(0)
  const { pathname } = useLocation()

  useFrame((_, delta) => {
    yPositionRef.current += delta * 4
    boardRef.current.position.y = Math.sin(yPositionRef.current) / 8
  })

  return (
    <group position={position} rotation-y={Math.PI}>
      <group ref={boardRef}>
        <MessageBoard open={pathname === '/about'} position-y={2}>
          {MESSAGE}
        </MessageBoard>
      </group>
      <Floor />
    </group>
  )
}

export default AboutPlatform
