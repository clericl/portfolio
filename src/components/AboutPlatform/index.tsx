import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import { useFrame } from "@react-three/fiber"
import {
  useSpring,
  // animated
} from "@react-spring/three"
import { PlatformProps } from "../Platform"
import { Group } from "three"
import { Season } from "../../utils/constants"
// import AutumnLeaves from "../AutumnLeaves"
import Cat from "../Cat"
// import CherryBlossoms from "../CherryBlossoms"
import Floor from "../Floor"
import SeasonsBoard from "../SeasonsBoard"
// import SummerLights from "../SummerLights"
// import WinterSnowflakes from "../WinterSnowflakes"

function AboutPlatform({ position }: Partial<PlatformProps>) {
  const [season, setSeason] = useState(Season.Spring)
  const boardRef = useRef<Group>(null!)
  const yPositionRef = useRef<number>(0)
  const { pathname } = useLocation()

  const [, api] = useSpring(() => ({ x: 1, y: 1, z: 1 }))

  const switchSeasons = useCallback((newSeason: Season | undefined) => {
    let nextSeason = -1
    if (typeof newSeason !== 'undefined') {
      if (newSeason !== season) {
        nextSeason = newSeason
      }
    } else {
      nextSeason = (season + 1) % 4
    }

    if (nextSeason >= 0) {
      setSeason(nextSeason)
    }
  }, [season])

  useEffect(() => {
    if (pathname !== '/about') {
      api.start({
        x: 0,
        y: 0,
        z: 0,
      })
    } else {
      api.start({
        x: 1,
        y: 1,
        z: 1,
        delay: 1100,
      })
    }
  }, [api, pathname])

  useFrame((_, delta) => {
    yPositionRef.current += delta * 4
    boardRef.current.position.y = Math.sin(yPositionRef.current) / 8
  })

  return (
    <group position={position} rotation-y={Math.PI}>
      <group ref={boardRef}>
        <SeasonsBoard open={pathname === '/about'} position-y={2.2} switchSeasons={switchSeasons} />
      </group>
      {/* <animated.group scale-x={springs.x} scale-y={springs.y} scale-z={springs.z}>
        <CherryBlossoms vanish={season !== Season.Spring} />
        <SummerLights vanish={season !== Season.Summer} />
        <AutumnLeaves vanish={season !== Season.Autumn} />
        <WinterSnowflakes vanish={season !== Season.Winter} />
      </animated.group> */}
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
