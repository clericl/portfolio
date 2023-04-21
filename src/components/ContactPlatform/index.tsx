import { PlatformProps } from "../Platform"
import { useLocation } from "react-router-dom"
import { useCallback, useRef } from "react"
import Cat from "../Cat"
import Floor from "../Floor"
import SwirlyPortal from "../SwirlyPortal"
import SummonCircle from "../SummonCircle"
import ContactIcons from "../ContactIcons"
import { useSpring, animated, easings } from "@react-spring/three"
import { useFrame } from "@react-three/fiber"

function ContactPlatform({ position }: Partial<PlatformProps>) {
  const stateCheck = useRef<string | null>(null)
  const activeSummon = useRef('')
  const { pathname } = useLocation()
  const [swirlySpring, swirlyApi] = useSpring(() => ({
    scale: 0,
  }))
  const [catSpring, catApi] = useSpring(() => ({
    positionZ: -20,
  }))

  const getActiveSummon = useCallback(() => activeSummon.current, [])

  const setActiveSummon = useCallback((newSummon: string) => {
    stateCheck.current = newSummon
    activeSummon.current = newSummon
  }, [])

  useFrame(() => {
    if (stateCheck.current !== null) {
      if (activeSummon.current) {
        swirlyApi.start({
          scale: 1,
          delay: 4000,
        })

        catApi.start({
          from: { positionZ: -20 },
          positionZ: 26,
          delay: 4500,
          config: {
            duration: 5000,
            easing: easings.linear,
          },
          onRest() {
            setActiveSummon('')
          }
        })
      } else {
        swirlyApi.stop()
        swirlyApi.start({
          scale: 0,
        })
        catApi.stop()
        catApi.set({
          positionZ: -20
        })
      }
      stateCheck.current = null
    }
  })
  
  return (
    <group position={position}>
      {pathname === '/contact' && (
        <group position-x={-2} position-y={7} rotation-y={Math.PI / 2}>
          {activeSummon && (
            <>
              <mesh position-y={4} position-z={-16.02}>
                <boxGeometry args={[6, 6, 12]} />
                <meshStandardMaterial
                  colorWrite={false}
                />
              </mesh>
              <animated.group position-z={-10} scale={swirlySpring.scale}>
                <SwirlyPortal
                  color="blue"
                />
              </animated.group>
              <animated.group position-z={20} scale={swirlySpring.scale}>
                <SwirlyPortal />
              </animated.group>
              <mesh position-y={4} position-z={26.02}>
                <boxGeometry args={[6, 6, 12]} />
                <meshStandardMaterial
                  colorWrite={false}
                />
              </mesh>
              <animated.group position-z={catSpring.positionZ}>
                <Cat
                  scale={[2.1, 2.1, 2.1]}
                  rotation-x={Math.PI / 3.5}
                  position-y={1.5}
                  castShadow
                />
              </animated.group>
            </>
          )}
        </group>
      )}
      <ContactIcons position-y={4} setActiveSummon={setActiveSummon} />
      <SummonCircle getActiveSummon={getActiveSummon} />
      <Floor />
    </group>
  )
}

export default ContactPlatform
