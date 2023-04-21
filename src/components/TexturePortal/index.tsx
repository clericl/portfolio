import { Texture } from 'three'
import MagicMirror from '../MagicMirror'

function TexturePortal({ texture, ...props }: TexturePortalProps) {
  return (
    <group {...props}>
      <MagicMirror>
        <mesh position-z={-10}>
          <planeGeometry args={[25, 25]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </MagicMirror>
    </group>
  )
}

interface TexturePortalProps {
  texture: Texture
}

export default TexturePortal
