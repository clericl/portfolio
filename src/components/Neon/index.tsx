import { useRef } from "react"
import { Color, Group } from "three"
import { STAIR_HEIGHT } from "../Stairs"
import { useFrame } from "@react-three/fiber"
import useNeonMaterial from "../../utils/useNeonMaterial"

const RADIAN_IN_DEGREES = 57.2958

function Neon() {
  const deltaRef = useRef<number>(0)
  const groupRef = useRef<Group>(null!)
  const neonMaterial = useNeonMaterial()

  useFrame((_, delta) => {
    deltaRef.current += (delta * RADIAN_IN_DEGREES * 4)

    const nextColor = new Color(`hsl(${deltaRef.current}, 100%, 50%)`)

    groupRef.current.traverse((obj) => {
      // @ts-ignore
      if (obj.isMesh) {
        // @ts-ignore
        obj.material.emissive = nextColor
        // @ts-ignore
        console.log(obj.material.emissive)
      }
    })
  })

  return (
    <group ref={groupRef} rotation-x={-Math.PI / 2}>
      <mesh material={neonMaterial} position={[0, -21, 0]} receiveShadow castShadow>
        <boxGeometry args={[64.5, 2, STAIR_HEIGHT]} />
      </mesh>
      <mesh material={neonMaterial} position={[0, 21, 0]} receiveShadow castShadow>
        <boxGeometry args={[64.5, 2, STAIR_HEIGHT]} />
      </mesh>
      <mesh material={neonMaterial} position={[-31, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[2, 42.5, STAIR_HEIGHT]} />
      </mesh>
      <mesh material={neonMaterial} position={[31, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[2, 42.5, STAIR_HEIGHT]} />
      </mesh>
    </group>
  )
}

export default Neon
