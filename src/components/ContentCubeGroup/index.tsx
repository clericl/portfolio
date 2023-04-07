import ContentCube from "../ContentCube"
import Lamp from "../Lamp"

function ContentCubeGroup() {
  return (
    <group position={[0, 3, 0]}>
      <ContentCube />
      <Lamp scale={[50, 50, 50]} />
    </group>
  )
}

export default ContentCubeGroup
