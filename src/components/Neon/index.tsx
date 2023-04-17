import { useRef } from "react"
import { Color, Group } from "three"
import { STAIR_HEIGHT } from "../Stairs"
import { useFrame } from "@react-three/fiber"
import useNeonMaterial from "../../utils/useNeonMaterial"

const RADIAN_IN_DEGREES = 57.2958

function Neon() {
  const groupRef = useRef<Group>(null!)
  const neonMaterial = useNeonMaterial()

  useFrame(({ clock }) => {
    const nextHue = clock.elapsedTime / 1.5
    groupRef.current.traverse((obj) => {
      // @ts-ignore
      if (obj.isMesh) {
        // @ts-ignore
        obj.material.color = new Color(`hsl(${nextHue * RADIAN_IN_DEGREES}, 35%, 70%)`)
        // @ts-ignore
        obj.material.emissive = new Color(`hsl(${nextHue * RADIAN_IN_DEGREES}, 50%, 50%)`)
      }
    })
  })

  return (
    <group ref={groupRef} rotation-x={-Math.PI / 2}>
      <mesh material={neonMaterial} position={[0, -5.25, 0]} receiveShadow castShadow>
        <boxGeometry args={[31, 0.5, STAIR_HEIGHT]} />
      </mesh>
      <mesh material={neonMaterial} position={[0, 5.25, 0]} receiveShadow castShadow>
        <boxGeometry args={[31, 0.5, STAIR_HEIGHT]} />
      </mesh>
      <mesh material={neonMaterial} position={[-15.25, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.5, 10, STAIR_HEIGHT]} />
      </mesh>
      <mesh material={neonMaterial} position={[15.25, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.5, 10, STAIR_HEIGHT]} />
      </mesh>
    </group>
  )
}

export default Neon
