import { useRef, useState } from 'react'
import { BackSide, Group } from 'three'
import { Points, PointMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

// Credits @kchapelier https://github.com/kchapelier/wavefunctioncollapse/blob/master/example/lcg.js#L22-L30
function normalizeSeed(seed: number | string) {
  if (typeof seed === "number") {
    seed = Math.abs(seed);
  } else if (typeof seed === "string") {
    const string = seed;
    seed = 0;

    for (let i = 0; i < string.length; i++) {
      seed = (seed + (i + 1) * (string.charCodeAt(i) % 96)) % 2147483647;
    }
  }

  if (seed === 0) {
    seed = 311;
  }

  return seed;
}

function lcgRandom(seed: number | string) {
  let state = normalizeSeed(seed);

  return function () {
    const result = (state * 48271) % 2147483647;
    state = result;
    return result / 2147483647;
  };
}

export class Generator {
  seed: string | number = 0;

  constructor(seed: string | number) {
    this.init(seed);
  }

  init = (seed: number | string) => {
    this.seed = seed;
    this.value = lcgRandom(seed);
  };

  value = lcgRandom(this.seed);
}

const defaultGen = new Generator(Math.random());

function inSphere(
  buffer: Float32Array,
  outerRadius: number,
  rng: Generator = defaultGen
) {
  for (let i = 0; i < buffer.length; i += 3) {
    const u = Math.pow(rng.value(), 1 / 3);

    let x = rng.value() * 2 - 1;
    let y = rng.value() * 2 - 1;
    let z = rng.value() * 2 - 1;

    const mag = Math.sqrt(x * x + y * y + z * z);

    x = (u * x) / mag;
    y = (u * y) / mag;
    z = (u * z) / mag;

    buffer[i] = (x * outerRadius) + (x >= 0 ? 30 : -30);
    buffer[i + 1] = (y * outerRadius) + (y >= 0 ? 40 : -40);
    buffer[i + 2] = (z * outerRadius) + (z >= 0 ? 30 : -30);
  }

  return buffer;
}

function NightSky() {
  const [sphere] = useState(() => inSphere(new Float32Array(9000), 200))
  const ref = useRef<Group>(null!)

  useFrame((_, delta) => {
    ref.current.rotation.y -= delta / 50
  })

  return (
    <group ref={ref}>
      {/* <Stars radius={73} depth={200} count={2000} factor={4} saturation={1} speed={2} /> */}
      <group rotation={[0, 0, Math.PI / 4]}>
        {/* 
        // @ts-ignore */}
        <Points positions={sphere} stride={3} frustumCulled={false}>
          <PointMaterial transparent color="white" size={0.5} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
      <mesh>
        <sphereGeometry args={[750, 512, 512]} />
        <meshStandardMaterial side={BackSide} color="#03072b" />
      </mesh>
    </group>
  )
}

export default NightSky
