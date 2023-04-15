import { useLocation } from "react-router-dom"
import { useFrame } from "@react-three/fiber"
import { useCallback, useRef, useState } from "react"
import { useSpring, animated } from "@react-spring/three"
import { PlatformProps } from "../Platform"
import { Group, Mesh } from "three"
import AutumnLeaves from "../AutumnLeaves"
import Cat from "../Cat"
import CherryBlossoms from "../CherryBlossoms"
import Floor from "../Floor"
import MessageBoard from "../MessageBoard"
import SummerLights from "../SummerLights"
import WinterSnowflakes from "../WinterSnowflakes"

const MESSAGE = "I'm Eric, a full stack\nweb developer specializing\nin 3D and augmented reality\nexperiences."

function AboutPlatform({ position }: Partial<PlatformProps>) {
  const [season, setSeason] = useState('spring')
  const boardRef = useRef<Group>(null!)
  const yPositionRef = useRef<number>(0)
  const { pathname } = useLocation()

  const [springs, api] = useSpring(() => ({ x: 1, y: 1, z: 1 }))

  const springRef = useRef<Mesh>(null!)
  const summerRef = useRef<Mesh>(null!)
  const autumnRef = useRef<Mesh>(null!)
  const winterRef = useRef<Mesh>(null!)

  const renderParticles = useCallback(() => {
    let Component

    switch (season) {
      case 'winter':
        Component = WinterSnowflakes
        break;
      case 'autumn':
        Component = AutumnLeaves
        break;
      case 'summer':
        Component = SummerLights
        break;
      case 'spring':
      default:
        Component = CherryBlossoms
        break;
    }

    return <Component vanish={pathname !== '/about'} />
  }, [pathname, season])

  const switchSeasons = useCallback((newSeason: string) => {
    if (newSeason !== season) {
      api.start({
        x: 0,
        y: 0,
        z: 0,
        onRest() {
          api.start({ x: 1, y: 1, z: 1, delay: 300 })
          setSeason(newSeason)
        }
      })
    }
  }, [api, season])

  useFrame((_, delta) => {
    yPositionRef.current += delta * 4
    boardRef.current.position.y = Math.sin(yPositionRef.current) / 8
  })

  return (
    <group position={position} rotation-y={Math.PI}>
      <group ref={boardRef}>
        <MessageBoard open={pathname === '/about'} position-y={2.2} switchSeasons={switchSeasons}>
          {MESSAGE}
        </MessageBoard>
      </group>
      <animated.group scale-x={springs.x} scale-y={springs.y} scale-z={springs.z}>
        {renderParticles()}
      </animated.group>
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
