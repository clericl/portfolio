import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Event, Group, Quaternion, Vector3, Object3D, Texture } from "three";
import { useFrame, Vector3 as Vector3Type } from "@react-three/fiber";
import { easing } from 'maath'
import Frame from "../Frame";

import rosewrapped from '../../assets/projects/rosewrapped.mp4'
import { useVideoTexture } from "@react-three/drei";

export const GOLDEN_RATIO = 1.61803398875

function Frames() {
  const ref = useRef<Group>(null!)
  const clicked = useRef<Object3D<Event> | undefined>()
  const [activeImageName, setActiveImageName] = useState<string>('')
  const rosewrappedTex = useVideoTexture(rosewrapped)
  const p = useRef<Vector3>(new Vector3())
  const q = useRef<Quaternion>(new Quaternion())

  const IMAGES: ImageProps[] = useMemo(() => ([
    {
      name:'rosewrapped',
      position: [0, 0, 1.5] as unknown as Vector3Type,
      rotation: [0, 0, 0] as unknown as Vector3Type,
      texture: rosewrappedTex,
    },
  ]), [rosewrappedTex])

  const handleClick = useCallback((e: Event) => {
    e.stopPropagation()
    setActiveImageName(clicked.current === e.object ? '' : e.object.name)
  }, [])

  useEffect(() => {
    clicked.current = ref.current.getObjectByName(activeImageName)
    if (clicked.current && clicked.current.parent) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.current.set(0, GOLDEN_RATIO / 2, 1.25))
      clicked.current.parent.getWorldQuaternion(q.current)
    } else {
      p.current.set(0, 0, 5.5)
      q.current.identity()
    }
  }, [activeImageName])

  useFrame((state, delta) => {
    easing.damp3(state.camera.position, p.current, 0.4, delta)
    easing.dampQ(state.camera.quaternion, q.current, 0.4, delta)
  })

  return (
    <group
      ref={ref}
      onClick={handleClick}
      onPointerMissed={() => setActiveImageName('')}
    >
      {IMAGES.map(({ name, ...props }) => (
        <Frame key={name} isActive={name === activeImageName} {...props} />
      ))}
    </group>
  )
}

type ImageProps = {
  position: Vector3Type
  rotation: Vector3Type
  url?: string
  texture?: Texture
  name: string
} & ({ texture: Texture; url?: never } | { texture?: never; url: string })

export default Frames
