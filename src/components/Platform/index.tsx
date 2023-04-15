import { useMemo } from "react"
import { Vector3 } from "@react-three/fiber"
import AboutPlatform from "../AboutPlatform"
import HomePlatform from "../HomePlatform"
import Floor from "../Floor"
import SkillsPlatform from "../SkillsPlatform"

function Platform({ title, ...props }: PlatformProps) {
  const PlatformComponent = useMemo(() => {
    switch (title) {
      case '/':
        return HomePlatform
      case '/about':
        return AboutPlatform
      case '/skills':
        return SkillsPlatform
      default:
        return (props: Partial<PlatformProps>) => (
          <group {...props}>
            <Floor />
          </group>
        )
    }
  }, [title])

  return <PlatformComponent {...props} />
}

export interface PlatformProps {
  position?: Vector3
  title: string
}

export default Platform
