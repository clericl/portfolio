import { useEffect, useMemo } from "react"
import { useSpring, animated, config } from "@react-spring/three"
import { useLocation } from "react-router-dom"
import {
  NUMBER_OF_ROTATIONS,
  STAIRS_PER_ROTATION,
  SPACE_BETWEEN_STAIRS,
} from "../../utils/constants"
import Platform from "../Platform"
import Stairs from "../Stairs"

const platformHeightBase = (SPACE_BETWEEN_STAIRS * STAIRS_PER_ROTATION) / NUMBER_OF_ROTATIONS
const staircaseHeight = SPACE_BETWEEN_STAIRS * NUMBER_OF_ROTATIONS * STAIRS_PER_ROTATION

export const PLATFORM_TITLES = [
  '/',
  // '/about',
  // '/skills',
  // '/work',
  // '/contact',
]

function Staircase() {
  const [springs, api] = useSpring(() => ({
    scale: 0.1,
    rotationY: -Math.PI / 2,
    positionY: staircaseHeight * 0.1,
  }))

  const location = useLocation()
  const platformsRendered = useMemo(() => (
    PLATFORM_TITLES.map((platformTitle, index) => (
      <Platform
        key={platformTitle}
        title={platformTitle}
        position={[4 * (index % 2 === 0 ? -1 : 1), staircaseHeight - (platformHeightBase * index), 0]}
      />
    ))
  ), [])

  useEffect(() => {
    api.start({
      scale: 1,
      rotationY: 0,
      positionY: 0,
    })
  }, [api])

  useEffect(() => {
    const platformIndex = PLATFORM_TITLES.findIndex((title) => title === location.pathname)
    
    if (typeof platformIndex === 'number') {
      api.start({
        positionY: platformHeightBase * platformIndex,
        rotationY: Math.PI * platformIndex,
        config: config.molasses,
      })
    }
  }, [api, location.pathname])

  return (
    <animated.group
      position-y={springs.positionY}
      rotation-y={springs.rotationY}
      scale-x={springs.scale}
      scale-y={springs.scale}
      scale-z={springs.scale}
    >
      <group position={[0, -staircaseHeight - 5, 0]}>
        <Stairs height={staircaseHeight} position={[0, 0, 0]} />
        {platformsRendered}
      </group>
    </animated.group>
  )
}

export default Staircase
