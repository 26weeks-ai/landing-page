import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { colors } from '@/content/copy'

function Particles({ count = 100 }) {
  const points = useRef<any>()
  const sphere = random.inSphere(new Float32Array(count * 3), { radius: 1.5 })
  const velocities = useRef(new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 0.02))

  useFrame((state, delta) => {
    if (points.current) {
      // Rotate the entire sphere
      points.current.rotation.x -= delta / 10
      points.current.rotation.y -= delta / 15

      // Update particle positions with bouncing
      const positions = points.current.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        // Update positions based on velocities
        positions[i] += velocities.current[i]
        positions[i + 1] += velocities.current[i + 1]
        positions[i + 2] += velocities.current[i + 2]

        // Check sphere boundary (r = 1.5) and bounce
        const x = positions[i]
        const y = positions[i + 1]
        const z = positions[i + 2]
        const distance = Math.sqrt(x * x + y * y + z * z)

        if (distance > 1.5) {
          // Normalize position to sphere surface
          const scale = 1.5 / distance
          positions[i] *= scale
          positions[i + 1] *= scale
          positions[i + 2] *= scale

          // Reflect velocity (bounce)
          velocities.current[i] *= -0.8
          velocities.current[i + 1] *= -0.8
          velocities.current[i + 2] *= -0.8
        }
      }
      points.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={points} positions={sphere} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={colors.primary}
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

export function AnimatedSphere() {
  return (
    <div className="h-[600px] w-[600px] ml-16">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <Particles />
      </Canvas>
    </div>
  )
}