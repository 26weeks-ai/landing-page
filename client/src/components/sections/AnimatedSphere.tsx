import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { colors } from '@/content/copy'

function Particles({ count = 100 }) {
  const points = useRef<any>()
  const sphere = random.inSphere(new Float32Array(count * 3), { radius: 0.1 }) 
  const time = useRef(0)
  const velocities = useRef(new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 0.005)) 

  useFrame((state, delta) => {
    if (points.current) {
      time.current += delta * 0.2 

      const expansionFactor = (Math.sin(time.current) + 1) / 2

      points.current.rotation.x -= delta * 0.05
      points.current.rotation.y -= delta * 0.075

      const positions = points.current.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const z = positions[i + 2]
        const distance = Math.sqrt(x * x + y * y + z * z)

        const dx = x / (distance || 1)
        const dy = y / (distance || 1)
        const dz = z / (distance || 1)

        const forceFactor = (expansionFactor - 0.5) * 0.02

        positions[i] += dx * forceFactor
        positions[i + 1] += dy * forceFactor
        positions[i + 2] += dz * forceFactor

        const newDistance = Math.sqrt(
          positions[i] * positions[i] +
          positions[i + 1] * positions[i + 1] +
          positions[i + 2] * positions[i + 2]
        )

        if (newDistance > 1.5) {
          const scale = 1.5 / newDistance
          positions[i] *= scale
          positions[i + 1] *= scale
          positions[i + 2] *= scale
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