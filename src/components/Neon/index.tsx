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
    const nextColor = new Color(`hsl(${(clock.elapsedTime / 2) * RADIAN_IN_DEGREES}, 100%, 50%)`)

    groupRef.current.traverse((obj) => {
      // @ts-ignore
      if (obj.isMesh) {
        // @ts-ignore
        obj.material.emissive = nextColor
      }
    })
  })

  return (
    <group ref={groupRef} rotation-x={-Math.PI / 2}>
      <mesh material={neonMaterial} position={[0, -5.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[31, 1, STAIR_HEIGHT]} />
      </mesh>
      <mesh material={neonMaterial} position={[0, 5.5, 0]} receiveShadow castShadow>
        <boxGeometry args={[31, 1, STAIR_HEIGHT]} />
      </mesh>
      <mesh material={neonMaterial} position={[-15.5, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[1, 12, STAIR_HEIGHT]} />
      </mesh>
      <mesh material={neonMaterial} position={[15.5, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[1, 12, STAIR_HEIGHT]} />
      </mesh>
    </group>
  )
}

export default Neon
