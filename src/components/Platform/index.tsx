import { Vector3 } from "@react-three/fiber"
import Floor from "../Floor"
import HomePlatform from "../HomePlatform"

function Platform({ title, ...props }: PlatformProps) {
  return title === 'home' ? (
    <HomePlatform {...props} />
  ) : (
    <group {...props}>
      <Floor isHome={title === 'home'} />
    </group>
  )
}

export interface PlatformProps {
  position?: Vector3
  title: string
}

export default Platform
