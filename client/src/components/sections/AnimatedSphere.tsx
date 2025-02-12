import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { colors } from '@/content/copy'

function Particles({ count = 100 }) {
  const points = useRef<any>()
  const sphere = random.inSphere(new Float32Array(count * 3), { radius: 2.0 })
  const velocities = useRef(new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 0.01))

  useFrame((state, delta) => {
    if (points.current) {
      // Gentle rotation of the entire sphere
      points.current.rotation.x -= delta / 20
      points.current.rotation.y -= delta / 25

      // Update particle positions with orbital motion
      const positions = points.current.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const z = positions[i + 2]
        const distance = Math.sqrt(x * x + y * y + z * z)

        // Add orbital motion (particles circle around their current radius)
        const orbitalSpeed = 0.01
        velocities.current[i] += (-z * orbitalSpeed)
        velocities.current[i + 2] += (x * orbitalSpeed)

        // Add slight vertical drift
        velocities.current[i + 1] += (Math.random() - 0.5) * 0.0005

        // Update positions
        positions[i] += velocities.current[i]
        positions[i + 1] += velocities.current[i + 1]
        positions[i + 2] += velocities.current[i + 2]

        // Keep particles within spherical bounds
        if (distance > 2.0) {
          const scale = 2.0 / distance
          positions[i] *= scale
          positions[i + 1] *= scale
          positions[i + 2] *= scale

          // Smooth velocity adjustment at boundary
          velocities.current[i] *= 0.9
          velocities.current[i + 1] *= 0.9
          velocities.current[i + 2] *= 0.9
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
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

export function AnimatedSphere() {
  return (
    <div className="h-[700px] w-[700px] ml-16">
      <Canvas camera={{ position: [0, 0, 3.5] }}>
        <Particles />
      </Canvas>
    </div>
  )
}