import { useCallback, useEffect, useRef, useState } from "react";
import { Event, Group, Quaternion, Vector3, Object3D } from "three";
import Frame from "../Frame";

import moethennessy from '../../assets/projects/moethennessy.mp4'
import rosewrapped from '../../assets/projects/rosewrapped.mp4'
import kennethcole from '../../assets/projects/kennethcole.mp4'
import arbor from '../../assets/projects/arbor.mp4'
import { useCursor } from "@react-three/drei";

const IMAGES = [
  moethennessy,
  kennethcole,
  rosewrapped,
  arbor,
]

export const GOLDEN_RATIO = 1.61803398875

function Frames() {
  const [hovered, set] = useState(false)
  const ref = useRef<Group>(null!)

  useCursor(hovered)

  return (
    <group
      ref={ref}
      onPointerOver={() => set(true)}
      onPointerOut={() => set(false)}
    >
      {IMAGES.map((image, index) => (
        <Frame key={image} url={image} index={index} />
      ))}
    </group>
  )
}

export default Frames
