import { PlatformProps } from "../Platform";
import Cat from "../Cat";
import Floor from "../Floor";
import { useLocation } from "react-router-dom";
import Ocean from "../Ocean";
import { useMemo } from "react";
import { Plane, Vector3 } from "three"

function WorkPlatform({ position }: Partial<PlatformProps>) {
  const { pathname } = useLocation()

  const clippingPlanes = useMemo(() => {
    return [
      new Plane( new Vector3( 1, 0, 0 ), 0 ),
      new Plane( new Vector3( 0, - 1, 0 ), 0 ),
      new Plane( new Vector3( 0, 0, - 1 ), 0 )
    ];
  }, [])
  return (
    <group position={position} rotation-y={Math.PI}>
      {pathname === '/work' && (
        <Cat
          position={[7.2, 0, 1.5]}
          scale={[2.1, 2.1, 2.1]}
          rotation-y={-Math.PI / 8 * 2.75}
          castShadow
        />
      )}
      {/* <Floor /> */}
      <group>
        <mesh>
          <Ocean clippingPlanes={clippingPlanes} />
        </mesh>
      </group>
    </group>
  )
}

export default WorkPlatform
