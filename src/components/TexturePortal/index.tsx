import { useMemo, useRef, useState } from 'react'
import { AdditiveBlending, Mesh } from 'three'
import SwirlyPortal from '../SwirlyPortal'
import { useTexture, useVideoTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { PORTAL_RADIUS } from '../../utils/constants'

import linkedinPortal from '../../assets/contact/linkedin.png'
import emailPortal from '../../assets/contact/email.png'
import githubPortal from '../../assets/contact/github.png'
import resumePortal from '../../assets/contact/resume.png'
import catPortal from '../../assets/contact/cat-portal.mp4'
import matrix from '../../assets/contact/matrixblue.mp4'

function TexturePortal({ home = false, getType, ...props }: TexturePortalProps) {
  const [type, setType] = useState('')
  const iconRef = useRef<Mesh>(null!)
  const matrixTex = useVideoTexture(matrix)
  const catTex = useVideoTexture(catPortal)
  const [
    linkedinTex,
    emailTex,
    githubTex,
    resumeTex,
  ] = useTexture([
    linkedinPortal,
    emailPortal,
    githubPortal,
    resumePortal,
  ])

  const texture = useMemo(() => {
    switch (type) {
      case 'linkedin':
        return linkedinTex
      case 'email':
        return emailTex
      case 'github':
        return githubTex
      case 'resume':
        return resumeTex
      default:
        return null
    }
  }, [type, linkedinTex, emailTex, githubTex, resumeTex])

  useFrame(({ clock}) => {
    if (iconRef.current) iconRef.current.position.y = Math.sin(clock.elapsedTime * 2) / 5
    const nextType = getType()
    if (nextType !== type) {
      setType(nextType)
    }
  })
  
  return (
    <group {...props}>
      {!home && (
        <mesh position-z={0.02} ref={iconRef}>
          <planeGeometry args={[2, 2]} />
          <meshBasicMaterial
            map={texture}
            transparent
            opacity={0.7}
            alphaTest={0.1}
          />
        </mesh>
      )}
      <mesh position-z={-0.03}>
        <circleGeometry args={[4, 32]} />
        <meshBasicMaterial
          map={home ? catTex : matrixTex}
          color="white"
          transparent
          opacity={0.7}
        />
      </mesh>
      <SwirlyPortal />
    </group>
  )
}

interface TexturePortalProps {
  home?: boolean
  getType: Function
}

export default TexturePortal
