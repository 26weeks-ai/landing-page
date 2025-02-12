import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { colors } from '@/content/copy'

function Particles({ count = 100 }) {
  const points = useRef<any>()
  const sphere = random.inSphere(new Float32Array(count * 3), { radius: 1.5 })
  const velocities = useRef(new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 0.02))
  const cycleRef = useRef(0)
  const phaseRef = useRef(0) // 0: expansion, 1: stable, 2: collapse

  useFrame((state, delta) => {
    if (points.current) {
      // Update cycle timer
      cycleRef.current += delta * 0.3 // Controls the speed of the cycle
      const cyclePosition = Math.sin(cycleRef.current) // -1 to 1

      // Determine phase based on cycle position
      if (cyclePosition < -0.7) {
        phaseRef.current = 0 // Big bang expansion
      } else if (cyclePosition > 0.7) {
        phaseRef.current = 2 // Collapse
      } else {
        phaseRef.current = 1 // Stable orbit
      }

      // Rotate the entire sphere
      points.current.rotation.x -= delta / 10
      points.current.rotation.y -= delta / 15

      // Update particle positions with phased behavior
      const positions = points.current.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const z = positions[i + 2]
        const distance = Math.sqrt(x * x + y * y + z * z)

        switch (phaseRef.current) {
          case 0: // Expansion
            velocities.current[i] = (x / distance) * 0.05
            velocities.current[i + 1] = (y / distance) * 0.05
            velocities.current[i + 2] = (z / distance) * 0.05
            break
          case 2: // Collapse
            velocities.current[i] = -x * 0.02
            velocities.current[i + 1] = -y * 0.02
            velocities.current[i + 2] = -z * 0.02
            break
          default: // Stable orbit
            // Add slight orbital motion
            const orbital = 0.02
            velocities.current[i] += (-z * orbital)
            velocities.current[i + 2] += (x * orbital)
        }

        // Add some randomness to the motion
        velocities.current[i] += (Math.random() - 0.5) * 0.001
        velocities.current[i + 1] += (Math.random() - 0.5) * 0.001
        velocities.current[i + 2] += (Math.random() - 0.5) * 0.001

        // Update positions
        positions[i] += velocities.current[i]
        positions[i + 1] += velocities.current[i + 1]
        positions[i + 2] += velocities.current[i + 2]

        // Keep particles within bounds during stable phase
        if (phaseRef.current === 1 && distance > 1.5) {
          const scale = 1.5 / distance
          positions[i] *= scale
          positions[i + 1] *= scale
          positions[i + 2] *= scale

          // Dampen velocities at boundary
          velocities.current[i] *= 0.8
          velocities.current[i + 1] *= 0.8
          velocities.current[i + 2] *= 0.8
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