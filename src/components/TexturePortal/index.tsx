import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { Mesh, Texture } from 'three'
import { useLocation } from 'react-router-dom'
import SwirlyPortal from '../SwirlyPortal'

import linkedinPortal from '../../assets/contact/linkedin.png'
import emailPortal from '../../assets/contact/email.png'
import githubPortal from '../../assets/contact/github.png'
import resumePortal from '../../assets/contact/resume.png'

function TexturePortal({ home = false, getType, videoTex, ...props }: TexturePortalProps) {
  const [type, setType] = useState('')
  const iconRef = useRef<Mesh>(null!)
  const { pathname } = useLocation()
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

  useFrame(({ clock }) => {
    if (iconRef.current) iconRef.current.position.y = Math.sin(clock.elapsedTime * 2) / 5
    
    if (pathname === '/contact') {
      const nextType = getType()
      if (nextType !== type) {
        setType(nextType)
      }
    }
  })
  
  return (
    <group {...props}>
      {!home && type && (
        <mesh
          position-z={0.02}
          ref={iconRef}
        >
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
          map={videoTex}
          color="white"
          transparent
          opacity={0.7}
        />
      </mesh>
      <SwirlyPortal />
    </group>
  )
}

export interface TexturePortalProps {
  home?: boolean
  getType: Function
  videoTex?: Texture
}

export default TexturePortal
