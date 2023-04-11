import { useMemo, useState } from 'react'
import { Sky as SkyImpl } from 'three-stdlib'
import { Vector3 } from 'three'

export function calcPosFromAngles(inclination: number, azimuth: number, vector: Vector3 = new Vector3()) {
  const theta = Math.PI * (inclination - 0.5)
  const phi = 2 * Math.PI * (azimuth - 0.5)

  vector.x = Math.cos(phi)
  vector.y = Math.sin(theta)
  vector.z = Math.sin(phi)

  return vector
}

function Sky({
  distance = 1000,
  mieCoefficient = 0.005,
  mieDirectionalG = 0.8,
  rayleigh = 0.5,
  inclination = 0.6,
  azimuth = 0.1,
  sunPosition = calcPosFromAngles(inclination, azimuth),
  turbidity = 10,
}: SkyProps) {
  const scale = useMemo(() => new Vector3().setScalar(distance), [distance])
  const [sky] = useState(() => new SkyImpl())

  return (
    <primitive
      object={sky}
      material-uniforms-mieCoefficient-value={mieCoefficient}
      material-uniforms-mieDirectionalG-value={mieDirectionalG}
      material-uniforms-rayleigh-value={rayleigh}
      material-uniforms-sunPosition-value={sunPosition}
      material-uniforms-turbidity-value={turbidity}
      scale={scale}
    />
  )
}

type SkyProps = {
  distance?: number
  sunPosition?: Vector3
  inclination?: number
  azimuth?: number
  mieCoefficient?: number
  mieDirectionalG?: number
  rayleigh?: number
  turbidity?: number
}

export default Sky
