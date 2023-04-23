import { useVideoTexture } from "@react-three/drei"
import TexturePortal, { TexturePortalProps } from "../TexturePortal"

import catPortal from '../../assets/contact/cat-portal.mp4'

function AwayPortal(props: TexturePortalProps) {
  const catPortalTex = useVideoTexture(catPortal)

  return (
    <TexturePortal {...props} videoTex={catPortalTex} />
  )
}

export default AwayPortal
