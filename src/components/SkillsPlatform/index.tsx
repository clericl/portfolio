import { PlatformProps } from "../Platform"
import { useLocation } from "react-router-dom"
import { useFrame } from "@react-three/fiber"
import { useCallback, useMemo, useRef, useState } from "react"
import { Group } from "three"
import Cat from "../Cat"
import Floor from "../Floor"

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
import MessageBoard from "../MessageBoard"

const SKILLS = {
  d3: {
    imagePath: d3,
    title: 'D3.js'
  },
  threejs: {
    imagePath: threejs,
    title: 'Three.js'
  },
  aframe: {
    imagePath: aframe,
    title: 'A-FRAME'
  },
  eighth: {
    imagePath: eighth,
    title: '8th Wall'
  },
  ts: {
    imagePath: ts,
    title: 'TypeScript'
  },
  sql: {
    imagePath: sql,
    title: 'SQL'
  },
  aws: {
    imagePath: aws,
    title: 'Amazon Web Services'
  },
  gcp: {
    imagePath: gcp,
    title: 'Google Cloud Platform'
  },
  html: {
    imagePath: html,
    title: 'HTML'
  },
  css: {
    imagePath: css,
    title: 'CSS'
  },
  js: {
    imagePath: js,
    title: 'JavaScript'
  },
  react: {
    imagePath: react,
    title: 'React.js'
  },
}

function SkillsPlatform({ position }: Partial<PlatformProps>) {
  const [messageText, setMessageText] = useState('Pick a box!')
  const { pathname } = useLocation()
  const catRef = useRef<Group>(null!)

  const setBoxText = useCallback((newText: string) => {
    setMessageText(newText)
  }, [])

  const boxRenders = useMemo(() => Object.entries(SKILLS).map(([name, { imagePath, title }], index) => (
    <SkillBox
      key={name}
      name={name}
      imagePath={imagePath}
      index={index}
      onClick={() => setBoxText(title)}
    />
  )), [setBoxText])

  useFrame((_, delta) => {
    catRef.current.rotation.y -= delta / 2
  })

  return (
    <group position={position}>
      <group position-x={-5}>
        {boxRenders}
      </group>
      <MessageBoard
        position-y={2.5}
        position-x={6}
        width={8}
        height={5}
      >
        {messageText}
      </MessageBoard>
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
