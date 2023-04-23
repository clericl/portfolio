import { useCallback, useRef, useState } from 'react'
import { Center, MeshTransmissionMaterial, useCursor, useTexture } from '@react-three/drei'
import { Color, Group, Mesh } from 'three'
import { GOLD_COLOR, GOLD_EMISSIVE, ICON_CIRCLE_RADIUS } from '../../utils/constants'
import { GroupProps, useFrame } from '@react-three/fiber'

import email from '../../assets/contact/email.png'
import github from '../../assets/contact/github.png'
import linkedin from '../../assets/contact/linkedin.png'
import resume from '../../assets/contact/resume.png'

const ICONS: IconProps[] = [
  {
    name: 'email',
    image: email,
    invoke() {
      const a = document.createElement('a')
      a.setAttribute('href', 'mailto:eliang58@gmail.com')
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noopenner noreferrer')
      document.body.appendChild(a)
      a.click()
      if (a.parentElement) {
        a.parentElement.removeChild(a)
      }
    }
  },
  {
    name: 'github',
    image: github,
    invoke() {
      const a = document.createElement('a')
      a.setAttribute('href', 'https://www.github.com/clericl')
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noopenner noreferrer')
      document.body.appendChild(a)
      a.click()
      if (a.parentElement) {
        a.parentElement.removeChild(a)
      }
    }
  },
  {
    name: 'linkedin',
    image: linkedin,
    invoke() {
      const a = document.createElement('a')
      a.setAttribute('href', 'https://www.linkedin.com/in/eliang58/')
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noopenner noreferrer')
      document.body.appendChild(a)
      a.click()
      if (a.parentElement) {
        a.parentElement.removeChild(a)
      }
    }
  },
  {
    name: 'resume',
    image: resume,
    invoke() {
      const a = document.createElement('a')
      a.setAttribute('href', '/EricLiangResume.pdf')
      a.setAttribute('download', 'EricLiangResume.pdf')
      document.body.appendChild(a)
      a.click()
      if (a.parentElement) {
        a.parentElement.removeChild(a)
      }
    }
  },
]

const BLACK = new Color('black')
const BASE_COLOR = new Color('#8272b3')

function IconBubble({ icon, index, setActiveSummon }: IconBubbleProps) {
  const [hovered, setHover] = useState(false)
  const groupRef = useRef<Group>(null!)
  const innerRef = useRef<Mesh>(null!)
  const powerRef = useRef<number>(0)
  const tex = useTexture(icon.image)
  const rand = useRef<number>(Math.random() * 0.2 + 0.2)

  useCursor(hovered)

  const handleClick = useCallback(() => {
    icon.invoke()
  }, [icon])

  const handleHover = useCallback(() => {
    setActiveSummon(icon.name)
    setHover(true)
  }, [icon.name, setActiveSummon])

  const handleUnhover = useCallback(() => {
    setActiveSummon('')
    setHover(false)
  }, [setActiveSummon])

  useFrame(({ clock }, delta) => {
    groupRef.current.position.y = Math.sin(clock.elapsedTime * rand.current) * rand.current

    if (hovered) {
      if (powerRef.current < 1) {
        powerRef.current += delta
        // @ts-ignore
        innerRef.current.material.emissive.lerp(
          GOLD_EMISSIVE,
          0.06,
        )
        // @ts-ignore
        innerRef.current.material.color.lerp(
          GOLD_COLOR,
          0.06,
        )
      }
    } else {
      powerRef.current = 0
      // @ts-ignore
      innerRef.current.material.emissive.copy(BLACK)
      // @ts-ignore
      innerRef.current.material.color.copy(BASE_COLOR)
    }
  })

  return (
    <group
      position-x={ICON_CIRCLE_RADIUS * index * 2.5}
      onClick={handleClick}
      onPointerOver={handleHover}
      onPointerOut={handleUnhover}
      ref={groupRef}
    >
      <mesh ref={innerRef}>
        <sphereGeometry args={[ICON_CIRCLE_RADIUS, 64]} />
        <MeshTransmissionMaterial
          distortionScale={0}
          temporalDistortion={0}
          resolution={1024}
          thickness={0.1}
          anisotropy={6}
          chromaticAberration={0.9}
          transparent
          opacity={0.2}
          roughness={0.5}
          color={BASE_COLOR.clone()}
          emissive={BLACK.clone()}
          toneMapped={false}
        />
        <mesh>
          <planeGeometry args={[ICON_CIRCLE_RADIUS, ICON_CIRCLE_RADIUS, 32]} />
          <meshPhysicalMaterial
            color="lightgray"
            map={tex}
            transparent
            alphaTest={0.1}
          />
        </mesh>
      </mesh>
    </group>
  )
}

function ContactIcons({ setActiveSummon, ...props }: ContactIconProps) {
  return (
    <group {...props}>
      <Center disableY disableZ>
        {ICONS.map((icon, index) => (
          <IconBubble
            key={icon.name}
            icon={icon}
            index={index}
            setActiveSummon={setActiveSummon}
          />
        ))}
      </Center>
    </group>
  )
}

interface IconProps {
  name: string
  image: string
  invoke: Function
}

interface IconBubbleProps {
  icon: IconProps
  index: number
  setActiveSummon: Function
}

interface ContactIconProps extends GroupProps {
  setActiveSummon: Function
}

export default ContactIcons
