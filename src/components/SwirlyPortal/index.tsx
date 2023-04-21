import { useRef } from "react"
import {
  AdditiveBlending,
  Color,
  ColorRepresentation,
  DoubleSide,
  Plane,
  ShaderMaterial,
  Vector3,
} from "three"
import { GroupProps, extend, useFrame } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import glsl from 'babel-plugin-glsl/macro'
import { PORTAL_RADIUS } from "../../utils/constants"

const PortalMaterial = shaderMaterial(
  { uTime: 0, uColorStart: new Color('hotpink'), uColorEnd: new Color('white') },
  glsl`
  varying vec2 vUv;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    vUv = uv;
  }`,
  glsl`
  #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
  uniform float uTime;
  uniform vec3 uColorStart;
  uniform vec3 uColorEnd;
  varying vec2 vUv;
  void main() {
    vec2 displacedUv = vUv + cnoise3(vec3(vUv * 7.0, uTime * 0.1));
    float strength = cnoise3(vec3(displacedUv * 5.0, uTime * 0.2));
    float outerGlow = distance(vUv, vec2(0.5)) * 4.0 - 1.4;
    strength += outerGlow;
    strength += step(-0.2, strength) * 0.8;
    strength = clamp(strength, 0.0, 1.0);
    vec3 color = mix(uColorStart, uColorEnd, strength);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }`,
)

type PortalMaterialType = ShaderMaterial & {
  uTime: number
}

extend({ PortalMaterial })

function SwirlyPortal({ color = 'hotpink', ...props }: SwirlyPortalProps) {
  const portalMaterial = useRef<PortalMaterialType>(null!)

  useFrame((_, delta) => (portalMaterial.current.uTime += (delta * 8)))

  return (
    <group {...props}>
      <mesh position-y={PORTAL_RADIUS}>
        <circleGeometry args={[PORTAL_RADIUS, 32]} />
        {/* 
        // @ts-ignore */}
        <portalMaterial
          ref={portalMaterial}
          blending={AdditiveBlending}
          uColorStart={color}
          uColorEnd="black"
          transparent
          alphaTest={0.1}
          side={DoubleSide}
          clippingPlanes={[
            new Plane(new Vector3(0, 1, 0), 0)
          ]}
        />
      </mesh>
    </group>
  )
}

type SwirlyPortalProps = GroupProps & {
  color?: ColorRepresentation
}

export default SwirlyPortal