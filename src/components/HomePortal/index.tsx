import { useVideoTexture } from "@react-three/drei"
import TexturePortal, { TexturePortalProps } from "../TexturePortal"

import matrix from '../../assets/contact/matrixblue.mp4'

function HomePortal(props: TexturePortalProps) {
  const matrixTex = useVideoTexture(matrix)

  return (
    <TexturePortal {...props} home videoTex={matrixTex} />
  )
}

export default HomePortal
