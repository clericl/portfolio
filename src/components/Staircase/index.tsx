import { useEffect, useMemo } from "react"
import { useSpring, animated, config } from "@react-spring/three"
import Platform from "../Platform"
import Stairs, { SPACE_BETWEEN_STAIRS } from "../Stairs"
import { useLocation } from "react-router-dom"

export const NUMBER_OF_ROTATIONS = 2
export const STAIRS_PER_ROTATION = 40

const platformHeightBase = STAIRS_PER_ROTATION / NUMBER_OF_ROTATIONS
const staircaseHeight = SPACE_BETWEEN_STAIRS * NUMBER_OF_ROTATIONS * STAIRS_PER_ROTATION

export const PLATFORM_TITLES = [
  '/',
  '/about',
  '/skills',
  '/personal-projects',
  '/professional-projects',
]

function Staircase() {
  const [springs, api] = useSpring(() => ({
    rotationY: 0,
    positionY: 0,
    config: config.slow
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
    const platformIndex = PLATFORM_TITLES.findIndex((title) => title === location.pathname)
    
    if (typeof platformIndex === 'number') {
      api.start({
        positionY: platformHeightBase * platformIndex,
        rotationY: Math.PI * platformIndex,
      })
    }
  }, [api, location.pathname])

  return (
    <animated.group position-y={springs.positionY} rotation-y={springs.rotationY}>
      <group position={[0, -staircaseHeight - 5, 0]}>
        <Stairs height={staircaseHeight} position={[0, 0, 0]} />
        {platformsRendered}
      </group>
    </animated.group>
  )
}

export default Staircase
