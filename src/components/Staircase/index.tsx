import { useMemo } from "react"
import Platform from "../Platform"
import Stairs, { SPACE_BETWEEN_STAIRS } from "../Stairs"

export const NUMBER_OF_ROTATIONS = 2
export const STAIRS_PER_ROTATION = 30

const PLATFORM_TITLES = [
  'home',
  'about1',
  'about2',
  'projects1',
  'projects2',
]

function Staircase() {
  const platformHeightBase = STAIRS_PER_ROTATION / NUMBER_OF_ROTATIONS
  const staircaseHeight = SPACE_BETWEEN_STAIRS * NUMBER_OF_ROTATIONS * STAIRS_PER_ROTATION

  const platformsRendered = useMemo(() => (
    PLATFORM_TITLES.map((platformTitle, index) => (
      <Platform
        key={platformTitle}
        title={platformTitle}
        position={[8 * (index % 2 === 0 ? -1 : 1), staircaseHeight - (platformHeightBase * index), 0]}
      />
    ))
  ), [platformHeightBase, staircaseHeight])

  return (
    <group position={[0, -staircaseHeight - 5, 0]}>
      <Stairs height={staircaseHeight} position={[0, 0, 0]} />
      {platformsRendered}
    </group>
  )
}

export default Staircase
