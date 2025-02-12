import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { colors } from '@/content/copy'

function Particles({ count = 100 }) {
  const points = useRef<any>()
  const sphere = random.inSphere(new Float32Array(count * 3), { radius: 1.2 })

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x -= delta / 10
      points.current.rotation.y -= delta / 15
    }
  })

  return (
    <Points ref={points} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={colors.primary}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

export function AnimatedSphere() {
  return (
    <div className="h-[400px] w-[400px]">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <Particles />
      </Canvas>
    </div>
  )
}