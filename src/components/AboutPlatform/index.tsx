import { Center } from "@react-three/drei"
import { PlatformProps } from "../Platform"
import Floor from "../Floor"

function AboutPlatform({ position }: Partial<PlatformProps>) {
  return (
    <group position={position}>
      <Center disableY>
        
      </Center>
      <Floor />
    </group>
  )
}

export default AboutPlatform
