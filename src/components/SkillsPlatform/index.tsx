import { PlatformProps } from "../Platform"
import { useLocation } from "react-router-dom"
import Cat from "../Cat"
import Floor from "../Floor"
import { useFrame } from "@react-three/fiber"
import { ReactNode, useMemo, useRef } from "react"
import { Group } from "three"

import html from '../../assets/html.png'
import css from '../../assets/css.png'
import js from '../../assets/js.png'
import react from '../../assets/react.png'
import sql from '../../assets/sql.png'
import ts from '../../assets/ts.png'
import threejs from '../../assets/threejs.png'
import aframe from '../../assets/aframe.png'
import eighth from '../../assets/8thwall.png'
import d3 from '../../assets/d3.png'
import aws from '../../assets/aws.png'
import gcp from '../../assets/gcp.png'
import SkillBox from "../SkillBox"

const SKILLS = {
  html,
  css,
  js,
  react,
  ts,
  sql,
  aws,
  gcp,
  d3,
  threejs,
  aframe,
  eighth,
}

function SkillsPlatform({ position }: Partial<PlatformProps>) {
  const { pathname } = useLocation()
  const catRef = useRef<Group>(null!)

  const boxRenders = useMemo(() => Object.entries(SKILLS).map(([name, imagePath], index) => (
    <SkillBox key={name} name={name} imagePath={imagePath} index={index} />
  )), [])

  useFrame((_, delta) => {
    catRef.current.rotation.y -= delta / 2
  })

  return (
    <group position={position}>
      <group>
        {boxRenders}
      </group>
      <group ref={catRef} position-y={1} rotation-x={-Math.PI / 8}>
      {pathname === '/skills' && (
        <Cat
          position={[20, 0, 0]}
          scale={[2.1, 2.1, 2.1]}
          rotation-x={Math.PI / 8}
          rotation-y={Math.PI / 16}
          rotation-z={0}
          castShadow
        />
      )}
      </group>
      <Floor />
    </group>
  )
}

export default SkillsPlatform
