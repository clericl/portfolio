import { useCallback, useEffect, useRef, useState } from "react";
import { Event, Group, Quaternion, Vector3, Object3D } from "three";
import Frame from "../Frame";

import moethennessy from '../../assets/projects/moethennessy.mp4'
import rosewrapped from '../../assets/projects/rosewrapped.mp4'
import kennethcole from '../../assets/projects/kennethcole.mp4'
import arbor from '../../assets/projects/arbor.mp4'

const IMAGES = [
  moethennessy,
  kennethcole,
  rosewrapped,
  arbor,
]

export const GOLDEN_RATIO = 1.61803398875

function Frames() {
  const ref = useRef<Group>(null!)
  const clicked = useRef<Object3D<Event> | undefined>()
  const [activeImageName, setActiveImageName] = useState<string>('')
  const p = useRef<Vector3>(new Vector3())
  const q = useRef<Quaternion>(new Quaternion())

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
      p.current.set(0, 1, 30)
      q.current.identity()
    }
  }, [activeImageName])

  return (
    <group
      ref={ref}
      onClick={handleClick}
      onPointerMissed={() => setActiveImageName('')}
    >
      {IMAGES.map((image, index) => (
        <Frame key={image} url={image} index={index} />
      ))}
    </group>
  )
}

export default Frames
