import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Color } from "three";
import { Text3D } from "@react-three/drei";
import { PlatformProps } from "../Platform";
import Cat from "../Cat";
import Ocean from "../Ocean";
import Frames from "../Frames";
import useNeonMaterial from "../../utils/useNeonMaterial";

function WorkPlatform({ position }: Partial<PlatformProps>) {
  const { pathname } = useLocation()
  const neonMaterial = useNeonMaterial()

  const blueNeon = useMemo(() => {
    const mat = neonMaterial.clone()
    mat.color = new Color('#534ecf')
    mat.emissive = new Color(0.21, 0.21, 2)
    return mat
  }, [neonMaterial])

  return (
    <group position={position} rotation-y={Math.PI}>
      <group>
        <Frames />
      </group>
      <Text3D
        font="/hubballi.json"
        position={[-8, 9, 1]}
        material={blueNeon}
      >
        SELECTED WORK
      </Text3D>
      {pathname === '/work' && (
        <Cat
          position-x={9}
          scale={[2.1, 2.1, 2.1]}
          rotation-y={-Math.PI / 8 * 2.75}
          castShadow
        />
      )}
      <group>
        <Ocean position-y={-0.2} />
      </group>
    </group>
  )
}

export default WorkPlatform
