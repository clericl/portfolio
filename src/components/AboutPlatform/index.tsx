import { PlatformProps } from "../Platform"
import Floor from "../Floor"
import MessageBoard from "../MessageBoard"
import { useLocation } from "react-router-dom"
import { useFrame } from "@react-three/fiber"
import { useCallback, useRef, useState } from "react"
import { Group, Mesh } from "three"
import CherryBlossoms from "../CherryBlossoms"
import Cat from "../Cat"
import WinterSnowflakes from "../WinterSnowflakes"
import AutumnLeaves from "../AutumnLeaves"
import SummerLights from "../SummerLights"

const MESSAGE = "I'm Eric, a full stack\nweb developer specializing\nin 3D and augmented reality\nexperiences."

function AboutPlatform({ position }: Partial<PlatformProps>) {
  const [season, setSeason] = useState('spring')
  const boardRef = useRef<Group>(null!)
  const yPositionRef = useRef<number>(0)
  const { pathname } = useLocation()

  const springRef = useRef<Mesh>(null!)
  const summerRef = useRef<Mesh>(null!)
  const autumnRef = useRef<Mesh>(null!)
  const winterRef = useRef<Mesh>(null!)

  useFrame((_, delta) => {
    yPositionRef.current += delta * 4
    boardRef.current.position.y = Math.sin(yPositionRef.current) / 8
  })

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

  return (
    <group position={position} rotation-y={Math.PI}>
      <group ref={boardRef}>
        <MessageBoard open={pathname === '/about'} position-y={2.2}>
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
      <group>
        <mesh
          ref={springRef}
          receiveShadow
          position={[-9, 1.1, 2]}
          onClick={() => setSeason('spring')}
        >
          <sphereGeometry args={[0.75, 64]} />
          <meshPhysicalMaterial clearcoat={1} color="pink" />
        </mesh>
        <mesh
          ref={summerRef}
          receiveShadow
          position={[-6, 1.1, 2]}
          onClick={() => setSeason('summer')}
        >
          <sphereGeometry args={[0.75, 64]} />
          <meshPhysicalMaterial clearcoat={1} color="#0f610f" />
        </mesh>
        <mesh
          ref={autumnRef}
          receiveShadow
          position={[-3, 1.1, 2]}
          onClick={() => setSeason('autumn')}
        >
          <sphereGeometry args={[0.75, 64]} />
          <meshPhysicalMaterial clearcoat={1} color="#61270f" />
        </mesh>
        <mesh
          ref={winterRef}
          receiveShadow
          position={[0, 1.1, 2]}
          onClick={() => setSeason('winter')}
        >  
          <sphereGeometry args={[0.75, 64]} />
          <meshPhysicalMaterial clearcoat={1} color="aqua" />
        </mesh>
      </group>
      <Floor />
    </group>
  )
}

export default AboutPlatform
