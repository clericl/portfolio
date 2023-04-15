import { useEffect, useMemo, useRef } from "react"
import { Color, Group } from "three"
import { Instances, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"
import ParticleInstance from "../ParticleInstance"

import leaf1 from '../../assets/leaf1.glb'
import leaf2 from '../../assets/leaf2.glb'

const randomVector = (r: number) => [r / 2 - Math.random() * r, r / 2 - Math.random() * r, r / 2 - Math.random() * r]
const randomEuler = () => [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]

const DELAY = 1100
const RADIUS = 26

function AutumnLeaves({ count = 200, vanish }: AutumnLeavesProps) {
  const [leafGltf1, leafGltf2] = useGLTF([leaf1, leaf2])
  const groupRef = useRef<Group>(null!)

  const data1 = useMemo(() => Array.from(
    { length: count / 2 },
    (r:number = RADIUS) => ({
      random: Math.random(),
      position: randomVector(r),
      rotation: randomEuler(),
      scale: Math.random() * 0.02 + 0.1,
    })),
  [count])

  const data2 = useMemo(() => Array.from(
    { length: count / 2 },
    (r:number = RADIUS) => ({
      random: Math.random(),
      position: randomVector(r),
      rotation: randomEuler(),
      scale: Math.random() * 0.05 + 0.1,
    })),
  [count])

  const [material1, material2] = useMemo(() => {
    // @ts-ignore
    const mat1 = leafGltf1.materials['Maple_leaf']
    mat1.color = new Color('white')

    // @ts-ignore
    const mat2 = leafGltf2.materials['QS1330-W27-files1-1']
    mat2.color = new Color('white')

    return [mat1, mat2]
  }, [leafGltf1, leafGltf2])

  const [springs, api] = useSpring(() => ({ x: 0, y: 0, z: 0 }))

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() / 6
  })

  useEffect(() => {
    if (vanish) {
      api.start({ x: 0, y: 0, z: 0, delay: DELAY })
    } else {
      api.start({ x: 1, y: 1, z: 1, delay: DELAY })
    }
  })

  return (
    <animated.group
      ref={groupRef}
      position-y={RADIUS / 4}
      scale-x={springs.x}
      scale-y={springs.y}
      scale-z={springs.z}
    >
      {/* 
      // @ts-ignore */}
      <Instances castShadow material={material1} geometry={leafGltf1.nodes['Maple_leaf_Maple_leaf_0'].geometry}>
        {data1.map((props, i) => (
          <ParticleInstance key={i} {...props} />
        ))}
      </Instances>
      {/* 
      // @ts-ignore */}
      <Instances castShadow material={material2} geometry={leafGltf2.nodes['QS1330-W27-files1-1'].geometry}>
        {data2.map((props, i) => (
          <ParticleInstance key={i} {...props} />
        ))}
      </Instances>
    </animated.group>
  )
}

interface AutumnLeavesProps {
  count?: number
  vanish?: boolean
}

export default AutumnLeaves
