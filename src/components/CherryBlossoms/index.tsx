import { useEffect, useMemo, useRef } from "react"
import { Color, Group } from "three"
import { Instances, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"
import ParticleInstance from "../ParticleInstance"

import petal1 from '../../assets/petal1.glb'
import petal2 from '../../assets/petal2.glb'

const randomVector = (r: number) => [r / 2 - Math.random() * r, r / 2 - Math.random() * r, r / 2 - Math.random() * r]
const randomEuler = () => [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]

const DELAY = 1100
const RADIUS = 26

function CherryBlossoms({ count = 200, vanish }: CherryBlossomsProps) {
  const [petalGltf1, petalGltf2] = useGLTF([petal1, petal2])
  const groupRef = useRef<Group>(null!)

  const data1 = useMemo(() => Array.from(
    { length: count / 2 },
    (r:number = RADIUS) => ({
      random: Math.random(),
      position: randomVector(r),
      rotation: randomEuler(),
      scale: Math.random() * 0.05 + 0.15,
    })),
  [count])

  const data2 = useMemo(() => Array.from(
    { length: count / 2 },
    (r:number = RADIUS) => ({
      random: Math.random(),
      position: randomVector(r),
      rotation: randomEuler(),
      scale: Math.random() * 0.05 + 0.15,
    })),
  [count])

  const [material1, material2] = useMemo(() => {
    // @ts-ignore
    const mat1 = petalGltf1.materials['Material.002']
    mat1.color = new Color('pink')

    // @ts-ignore
    const mat2 = petalGltf2.materials['petal01']
    mat2.color = new Color('pink')

    return [mat1, mat2]
  }, [petalGltf1, petalGltf2])

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
      <Instances castShadow material={material1} geometry={petalGltf1.nodes['Object_86'].geometry}>
        {data1.map((props, i) => (
          <ParticleInstance key={i} {...props} />
        ))}
      </Instances>
      {/* 
      // @ts-ignore */}
      <Instances castShadow material={material2} geometry={petalGltf2.nodes['02011_petal01_0'].geometry}>
        {data2.map((props, i) => (
          <ParticleInstance key={i} {...props} />
        ))}
      </Instances>
    </animated.group>
  )
}

interface CherryBlossomsProps {
  count?: number
  vanish?: boolean
}

export default CherryBlossoms
