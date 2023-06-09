import { useEffect, useMemo, useRef } from "react"
import { Color, ColorRepresentation, Group } from "three"
import { Instances, useGLTF } from "@react-three/drei"
import { PARTICLE_CLOUD_COUNT, PARTICLE_CLOUD_RADIUS } from "../../utils/constants"
import { useFrame } from "@react-three/fiber"
import { useSpring, animated } from "@react-spring/three"
import ParticleInstance from "../ParticleInstance"

const randomVector = (r: number) => [r / 2 - Math.random() * r, r / 2 - Math.random() * r, r / 2 - Math.random() * r]
const randomEuler = () => [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]

function ParticleInstances({
  count = PARTICLE_CLOUD_COUNT,
  modelData,
  vanish,
}: ParticleInstancesProps) {
  const gltfs = useGLTF(modelData.map(({ modelPath }) => modelPath))
  const groupRef = useRef<Group>(null!)

  const instanceData = useMemo(() => modelData.map(({ scale }) => Array.from(
    { length: count / 2 },
    (r:number = PARTICLE_CLOUD_RADIUS) => ({
      random: Math.random(),
      position: randomVector(r),
      rotation: randomEuler(),
      scale: (Math.random() * (scale / 2)) + scale,
    }))), [count, modelData])

  const materials = useMemo(() => modelData.map(({ materialName, color }, index) => {
    // @ts-ignore
    const material = gltfs[index].materials[materialName]
    material.color = new Color(color)

    return material
  }), [gltfs, modelData])

  const renderedInstances = useMemo(() => modelData.map(({ nodeName }, index) => (
      // @ts-ignore
      <Instances key={nodeName} castShadow material={materials[index]} geometry={gltfs[index].nodes[nodeName].geometry}>
        {instanceData[index].map((props, i) => (
          <ParticleInstance key={i} {...props} />
        ))}
      </Instances>
  )), [gltfs, instanceData, materials, modelData])

  const [springs, api] = useSpring(() => ({ x: 0, y: 0, z: 0 }))

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() / 6
  })

  useEffect(() => {
    if (vanish) {
      api.start({
        x: 0,
        y: 0,
        z: 0,
        onRest() {
          groupRef.current.visible = false
        },
      })
    } else {
      groupRef.current.visible = true
      api.start({ x: 1, y: 1, z: 1 })
    }
  }, [api, vanish])

  return (
    <animated.group
      ref={groupRef}
      position-y={PARTICLE_CLOUD_RADIUS / 4}
      scale-x={springs.x}
      scale-y={springs.y}
      scale-z={springs.z}
      visible={false}
    >
      {renderedInstances}
    </animated.group>
  )
}

interface ParticleInstancesProps {
  count?: number
  vanish?: boolean
  modelData: {
    modelPath: string,
    scale: number,
    color: ColorRepresentation,
    materialName: string,
    nodeName: string,
  }[]
}

export default ParticleInstances
