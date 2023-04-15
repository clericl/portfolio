// @ts-nocheck

import { useSpring, animated } from "@react-spring/three"
import { MeshTransmissionMaterial, Text } from "@react-three/drei"
import { ReactNode, useEffect, useMemo, useRef } from "react"
import { Color, Group } from "three"
import useNeonMaterial from "../../utils/useNeonMaterial"

import fontFile from '../../assets/SourceCodePro-Regular.ttf'

const SPHERE_RADIUS = 0.2
const WIDTH = 19
const HEIGHT = 8
export const DELAY = 500

function MessageBoard({ children, open = true, switchSeasons, ...props }: MessageBoardProps) {
  const groupRef = useRef<Group>(null!)
  const neonMaterial = useNeonMaterial('#021040')

  const [springMat, summerMat, autumnMat, winterMat, textMaterial] = useMemo(() => {
    const spring = neonMaterial.clone()
    const summer = neonMaterial.clone()
    const autumn = neonMaterial.clone()
    const winter = neonMaterial.clone()
    spring.emissive = new Color(2, 1, 1)
    summer.emissive = new Color(0, 2, 0)
    autumn.emissive = new Color(2, 1, 0)
    winter.emissive = new Color(0, 0, 2)

    const text = neonMaterial.clone()
    text.color = new Color(1, 1.25, 1.25)

    return [spring, summer, autumn, winter, text]
  }, [neonMaterial])
  
  const [topLeftSpring, topLeftApi] = useSpring(() => ({ x: 0, y: 0, z: 0, scale: 1 }))
  const [topRightSpring, topRightApi] = useSpring(() => ({ x: 0, y: 0, z: 0, scale: 1 }))
  const [bottomLeftSpring, bottomLeftApi] = useSpring(() => ({ x: 0, y: 0, z: 0, scale: 1 }))
  const [bottomRightSpring, bottomRightApi] = useSpring(() => ({ x: 0, y: 0, z: 0, scale: 1 }))
  const [paneSpring, paneApi] = useSpring(() => ({ x: 0, y: 0, z: 0 }))

  useEffect(() => {
    if (open) {
      topLeftApi.start({
        to: async (next) => {
          await next({ x: -WIDTH / 2, delay: DELAY })
          await next({ y: HEIGHT / 2 })
        },
      })
      topRightApi.start({
        to: async (next) => {
          await next({ x: WIDTH / 2, delay: DELAY })
          await next({ y: HEIGHT / 2 })
        },
      })
      bottomLeftApi.start({
        to: async (next) => {
          await next({ x: -WIDTH / 2, delay: DELAY })
          await next({ y: -HEIGHT / 2 })
        },
      })
      bottomRightApi.start({
        to: async (next) => {
          await next({ x: WIDTH / 2, delay: DELAY })
          await next({ y: -HEIGHT / 2 })
        },
      })
      paneApi.start({
        to: async (next) => {
          await next({ x: 1, delay: DELAY })
          await next({ y: 1, z: 1 })
        },
      })
    } else {
      topLeftApi.start({
        to: async (next) => {
          await next({ y: 0 })
          await next({ x: 0 })
        }
      })
      topRightApi.start({
        to: async (next) => {
          await next({ y: 0 })
          await next({ x: 0 })
        }
      })
      bottomLeftApi.start({
        to: async (next) => {
          await next({ y: 0 })
          await next({ x: 0 })
        }
      })
      bottomRightApi.start({
        to: async (next) => {
          await next({ y: 0 })
          await next({ x: 0 })
        }
      })
      paneApi.start({
        to: async (next) => {
          await next({ y: 0, z: 0 })
          await next({ x: 0 })
        }
      })
    }
  }, [
    topLeftApi,
    topRightApi,
    bottomLeftApi,
    bottomRightApi,
    paneApi,
    open,
  ])

  return (
    <group {...props}>
      <group ref={groupRef} position={[0, HEIGHT / 2, 0]}>
        <animated.mesh
          castShadow
          position-x={topLeftSpring.x}
          position-y={topLeftSpring.y}
          position-z={topLeftSpring.z}
          scale-x={topLeftSpring.scale}
          scale-y={topLeftSpring.scale}
          scale-z={topLeftSpring.scale}
          material={springMat}
          onPointerEnter={() => topLeftApi.start({ scale: 2.5 })}
          onPointerLeave={() => topLeftApi.start({ scale: 1 })}
          onClick={() => switchSeasons('spring')}
        >
          <sphereGeometry args={[SPHERE_RADIUS, 16, 16]} />
        </animated.mesh>
        <animated.mesh
          castShadow
          position-x={topRightSpring.x}
          position-y={topRightSpring.y}
          position-z={topRightSpring.z}
          scale-x={topRightSpring.scale}
          scale-y={topRightSpring.scale}
          scale-z={topRightSpring.scale}
          material={summerMat}
          onPointerEnter={() => topRightApi.start({ scale: 2.5 })}
          onPointerLeave={() => topRightApi.start({ scale: 1 })}
          onClick={() => switchSeasons('summer')}
        >
          <sphereGeometry args={[SPHERE_RADIUS, 16, 16]} />
        </animated.mesh>
        <animated.mesh
          castShadow
          position-x={bottomLeftSpring.x}
          position-y={bottomLeftSpring.y}
          position-z={bottomLeftSpring.z}
          scale-x={bottomLeftSpring.scale}
          scale-y={bottomLeftSpring.scale}
          scale-z={bottomLeftSpring.scale}
          material={autumnMat}
          onPointerEnter={() => bottomLeftApi.start({ scale: 2.5 })}
          onPointerLeave={() => bottomLeftApi.start({ scale: 1 })}
          onClick={() => switchSeasons('autumn')}
        >
          <sphereGeometry args={[SPHERE_RADIUS, 16, 16]} />
        </animated.mesh>
        <animated.mesh
          castShadow
          position-x={bottomRightSpring.x}
          position-y={bottomRightSpring.y}
          position-z={bottomRightSpring.z}
          scale-x={bottomRightSpring.scale}
          scale-y={bottomRightSpring.scale}
          scale-z={bottomRightSpring.scale}
          material={winterMat}
          onPointerEnter={() => bottomRightApi.start({ scale: 2.5 })}
          onPointerLeave={() => bottomRightApi.start({ scale: 1 })}
          onClick={() => switchSeasons('winter')}
        >
          <sphereGeometry args={[SPHERE_RADIUS, 16, 16]} />
        </animated.mesh>
        <animated.mesh
          castShadow
          scale-x={paneSpring.x} scale-y={paneSpring.y} scale-z={paneSpring.z}>
          <boxGeometry args={[(WIDTH - (SPHERE_RADIUS / 2)), (HEIGHT - (SPHERE_RADIUS / 2)), SPHERE_RADIUS]} />
          <MeshTransmissionMaterial
            samples={16}
            resolution={1028}
            anisotropy={1}
            thickness={3}
            roughness={0.6}
            toneMapped={true}
            color="#bfdedd"
          />
        </animated.mesh>
        <animated.group position-z={0.5} scale-x={paneSpring.x} scale-y={paneSpring.y} scale-z={paneSpring.z}>
          <Text
            anchorX="center"
            anchorY="middle"
            font={fontFile}
            maxWidth={WIDTH - 2}
            textAlign="center"
            material={textMaterial}
          >
            {children}
          </Text>
        </animated.group>
      </group>
    </group>
  )
}

interface MessageBoardProps {
  children?: ReactNode
  open?: boolean
  switchSeasons: Function
}

export default MessageBoard
