import ParticleInstances from "../ParticleInstances"

import petal1 from '../../assets/models/petal1.glb'
import petal2 from '../../assets/models/petal2.glb'

function CherryBlossoms({ vanish }: CherryBlossomsProps) {
  return (
    <ParticleInstances
      vanish={vanish}
      modelData={[
        {
          modelPath: petal1,
          scale: 0.15,
          color: 'pink',
          materialName: 'Material.002',
          nodeName: 'Object_86',
        },
        {
          modelPath: petal2,
          scale: 0.15,
          color: 'pink',
          materialName: 'petal01',
          nodeName: '02011_petal01_0',
        },
      ]}
    />
  )
}

interface CherryBlossomsProps {
  vanish: boolean
}

export default CherryBlossoms
