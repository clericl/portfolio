import { useCallback, useMemo } from "react"
import { Vector3 } from "@react-three/fiber"
import AboutPlatform from "../AboutPlatform"
import HomePlatform from "../HomePlatform"
import Floor from "../Floor"
import SkillsPlatform from "../SkillsPlatform"
import WorkPlatform from "../WorkPlatform"
import ContactPlatform from "../ContactPlatform"
import { useMediaQuery } from "../../utils/useMediaQuery"
import MobileBubble from "../MobileBubble"

function Platform({ title, ...props }: PlatformProps) {
  const isDesktop = useMediaQuery('(min-width:768px)')

  const DesktopPlatformComponent = useMemo(() => {
    switch (title) {
      case '/':
        return HomePlatform
      case '/about':
        return AboutPlatform
      case '/skills':
        return SkillsPlatform
      case '/work':
        return WorkPlatform
      case '/contact':
        return ContactPlatform
      default:
        return (props: Partial<PlatformProps>) => (
          <group {...props}>
            <Floor />
          </group>
        )
    }
  }, [title])

  const MobilePlatformComponent = useMemo(() => {
    switch (title) {
      case '/':
        return HomePlatform
      case '/about':
        return (props: Partial<PlatformProps>) => <MobileBubble bubbleId="about" {...props} />
      case '/skills':
        return (props: Partial<PlatformProps>) => <MobileBubble bubbleId="skills" {...props} />
      case '/work':
        return (props: Partial<PlatformProps>) => <MobileBubble bubbleId="work" {...props} />
      case '/contact':
        return (props: Partial<PlatformProps>) => <MobileBubble bubbleId="contact" {...props} />
      default:
        return MobileBubble
    }
  }, [title])

  const openPage = useCallback(() => {
    console.log('clicked')
  }, [])

  return (
    isDesktop ? (
      <DesktopPlatformComponent {...props} />
    ) : (
      <MobilePlatformComponent {...props} />
    )
  ) 
}

export interface PlatformProps {
  position?: Vector3
  title: string
}

export default Platform
