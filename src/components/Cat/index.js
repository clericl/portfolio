/*
auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useRef, useEffect, useMemo, useCallback } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useLocation } from 'react-router-dom'
import { LoopOnce } from 'three'

import CatPath from '../../assets/models/cat.glb'

const TIME_SCALE = 3

export default function Cat(props) {
  const { nodes, materials, animations } = useGLTF(CatPath)
  const { ref, actions, mixer, names } = useAnimations(animations)
  const { pathname } = useLocation()
  const idleCount = useRef(0)

  const material = useMemo(() => {
    const mat = materials.material
    mat.setValues(props.stencil || {})
    mat.depthWrite = true
    
    return mat
  }, [materials, props.stencil])

  const handleNextClip = useCallback((e) => {
    let nextAction
    let timeScale = TIME_SCALE
    const dieRoll = Math.floor(Math.random() * idleCount.current)

    if (pathname === '/') {
      switch (dieRoll) {
        case 1:
        default: {
          nextAction = actions['Arm_Cat|Idle_1']
          idleCount.current += 1
          break;
        }
        case 2: {
          nextAction = actions['Arm_Cat|SharpenClaws_Vert']
          idleCount.current = 0
          break;
        }
        case 3: {
          nextAction = actions['Arm_Cat|Idle_3']
          idleCount.current += 1
          break;
        }
        case 4: {
          nextAction = actions['Arm_Cat|Idle_4']
          idleCount.current += 1
          break;
        }
        case 5: {
          nextAction = actions['Arm_Cat|Idle_5']
          idleCount.current += 1
          break;
        }
        case 6: {
          nextAction = actions['Arm_Cat|Idle_6']
          idleCount.current = 0
          break;
        }
      }
      nextAction.clampWhenFinished = false
    } else if (pathname === '/about') {
      if (!e) {
        nextAction = actions['Arm_Cat|Lie_belly_start']
        timeScale = TIME_SCALE / 1.5        
      } else {
        const dieRoll = Math.floor(Math.random() * 6)

        switch (dieRoll) {
          case 1:
          case 2:
          default: {
            nextAction = actions['Arm_Cat|Lie_belly_loop_2']
            break;
          }
          case 3:
          case 4: {
            nextAction = actions['Arm_Cat|Lie_belly_loop_1']
            break;
          }
          case 5:
          case 6: {
            nextAction = actions['Arm_Cat|Lie_belly_loop_3']
            break;
          }
        }
      }
      nextAction.clampWhenFinished = true
    } else if (pathname === '/skills') {
      nextAction = actions['Arm_Cat|Swim_Idle']
      timeScale = TIME_SCALE / 1.5
    } else if (pathname === '/work') {
      if (!e) {
        nextAction = actions['Arm_Cat|Lie_side_start']
        timeScale = TIME_SCALE / 1.5        
      } else {
        nextAction = actions['Arm_Cat|Lie_side_loop_1']
      }
      nextAction.clampWhenFinished = true
    } else if (pathname === '/contact') {
      nextAction = actions['Arm_Cat|JumpAir_up']
    } else {
      nextAction = actions['Arm_Cat|Idle_1']
    }

    nextAction.reset()
      .setEffectiveTimeScale(timeScale)
      .setLoop(LoopOnce, 1)
      .play()
  }, [actions, pathname])

  useEffect(() => {
    mixer.addEventListener('finished', handleNextClip)
    handleNextClip()
    
    return () => mixer.removeEventListener('finished', handleNextClip)
  }, [actions, handleNextClip, mixer, names])

  return (
    <group ref={ref} {...props}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={[4.28, 4.28, 4.28]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
              material={material}
              geometry={nodes.Object_58.geometry}
              skeleton={nodes.Object_58.skeleton}
              castShadow
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(CatPath)
