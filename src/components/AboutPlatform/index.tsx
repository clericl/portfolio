import { PlatformProps } from "../Platform"
import Floor from "../Floor"
import MessageBoard from "../MessageBoard"
import { useLocation } from "react-router-dom"
import { useFrame } from "@react-three/fiber"
import { useCallback, useRef, useState } from "react"
import { Group } from "three"
import CherryBlossoms from "../CherryBlossoms"
import Cat from "../Cat"
import Snowflakes from "../Snowflakes"

const MESSAGE = "I'm Eric, a full stack\nweb developer specializing\nin 3D and augmented reality\nexperiences."

function AboutPlatform({ position }: Partial<PlatformProps>) {
  const [season, setSeason] = useState('winter')
  const boardRef = useRef<Group>(null!)
  const yPositionRef = useRef<number>(0)
  const { pathname } = useLocation()

  useFrame((_, delta) => {
    yPositionRef.current += delta * 4
    boardRef.current.position.y = Math.sin(yPositionRef.current) / 8
  })

  const renderParticles = useCallback(() => {
    let Component

    switch (season) {
      case 'winter':
        Component = Snowflakes
        break;
      case 'spring':
      case 'summer':
      case 'autumn':
      default:
        Component = CherryBlossoms
        break;
    }

    return <Component vanish={pathname !== '/about'} />
  }, [pathname, season])

  return (
    <group position={position} rotation-y={Math.PI}>
      <group ref={boardRef}>
        <MessageBoard open={pathname === '/about'} position-y={2}>
          {MESSAGE}
        </MessageBoard>
      </group>
      {renderParticles()}
      {pathname === '/about' && (
        <Cat
          position={[7.2, 0, 1.5]}
          scale={[2.1, 2.1, 2.1]}
          rotation-y={-Math.PI / 8 * 2.75}
          castShadow
        />
      )}
      <Floor />
    </group>
  )
}

export default AboutPlatform
