import { useRef, useState, ReactNode } from 'react'
import { Scene } from 'three'
import { useFBO, PerspectiveCamera } from '@react-three/drei'
import { Camera, createPortal, useFrame } from '@react-three/fiber'
import { PORTAL_RADIUS } from '../../utils/constants'

function MagicMirror({ children, ...props }: MagicMirrorProps) {
  const cam = useRef<Camera>(null!)
  // useFBO creates a WebGL2 buffer for us, it's a helper from the "drei" library
  const fbo = useFBO()
  // The is a separate scene that we create, React will portal into that
  const [scene] = useState(() => new Scene())
  // Tie this component into the render-loop
  useFrame((state) => {
    // Our portal has its own camera, but we copy the originals world matrix
    cam.current.matrixWorldInverse.copy(state.camera.matrixWorldInverse)
    // Then we set the render-target to the buffer that we have created
    state.gl.setRenderTarget(fbo)
    // We render the scene into it, using the local camera that is clamped to the planes aspect ratio
    state.gl.render(scene, cam.current)
    // And flip the render-target to the default again
    state.gl.setRenderTarget(null)
  })
  return (
    <>
      <mesh position-y={PORTAL_RADIUS} {...props}>
        <circleGeometry args={[PORTAL_RADIUS, 62]} />
        {/* The "mirror" is just a boring plane, but it receives the buffer texture */}
        <meshBasicMaterial map={fbo.texture} />
      </mesh>
      <PerspectiveCamera manual ref={cam} fov={50} aspect={2.5 / 5} onUpdate={(c) => c.updateProjectionMatrix()} />
      {/* This is React being awesome, we portal this components children into the separate scene above */}
      {createPortal(children, scene)}
    </>
  )
}

interface MagicMirrorProps {
  children: ReactNode
}

export default MagicMirror
