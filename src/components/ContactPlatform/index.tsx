import { PlatformProps } from "../Platform"
import { useLocation } from "react-router-dom"
import Cat from "../Cat"
import Floor from "../Floor"
import SwirlyPortal from "../SwirlyPortal"

function ContactPlatform({ position }: Partial<PlatformProps>) {
  const { pathname } = useLocation()

  return (
    <group position={position}>
      {pathname === '/contact' && (
        <group position-x={-2} rotation-y={Math.PI / 2}>
          <SwirlyPortal
            color="blue"
            position-z={-10}
          />
          <SwirlyPortal
            position-z={14}
          />
          <Cat
            scale={[2.1, 2.1, 2.1]}
            rotation-x={Math.PI / 3.5}
            position-y={1.5}
            castShadow
          />
        </group>
      )}
      <Floor />
    </group>
  )
}

export default ContactPlatform
