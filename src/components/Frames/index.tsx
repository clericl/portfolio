import { useRef, useState } from "react";
import { Group } from "three";
import Frame from "../Frame";

import moethennessy from '../../assets/projects/moethennessy.mp4'
import rosewrapped from '../../assets/projects/rosewrapped.mp4'
import kennethcole from '../../assets/projects/kennethcole.mp4'
import arbor from '../../assets/projects/arbor.mp4'
import { useCursor } from "@react-three/drei";

const IMAGES = [
  {
    image: moethennessy,
    name: 'moethennessy',
  },
  {
    image: kennethcole,
    name: 'kennethcole',
  },
  {
    image: rosewrapped,
    name: 'rosewrapped',
  },
  {
    image: arbor,
    name: 'arbor',
  },
]

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
      {IMAGES.map(({ name, image }, index) => (
        <Frame key={name} name={name} url={image} index={index} />
      ))}
    </group>
  )
}

export default Frames
