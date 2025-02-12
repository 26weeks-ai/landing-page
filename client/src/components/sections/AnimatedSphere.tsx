import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { colors } from '@/content/copy'

function RunnerParticles({ count = 150 }) {
  const points = useRef<any>()

  // Create initial particle positions along a runner silhouette path
  const initialPositions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const t = i / count
    // Parametric equations to form a running figure shape
    const x = Math.sin(t * Math.PI * 2) * 0.5
    const y = Math.cos(t * Math.PI * 4) * 0.3 + Math.sin(t * Math.PI * 2) * 0.2
    const z = 0

    initialPositions[i * 3] = x
    initialPositions[i * 3 + 1] = y
    initialPositions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.1
  }

  useFrame((state, delta) => {
    if (points.current) {
      const time = state.clock.getElapsedTime()
      const positions = points.current.geometry.attributes.position.array

      // Animate particles along the path with a wave effect
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const initialX = initialPositions[i3]
        const initialY = initialPositions[i3 + 1]

        // Add wave motion
        positions[i3] = initialX + Math.sin(time * 2 + i * 0.1) * 0.02
        positions[i3 + 1] = initialY + Math.cos(time * 3 + i * 0.1) * 0.02
        positions[i3 + 2] = initialPositions[i3 + 2] + Math.sin(time + i) * 0.01
      }

      points.current.geometry.attributes.position.needsUpdate = true
      points.current.rotation.z = Math.sin(time * 0.2) * 0.1
    }
  })

  return (
    <Points ref={points} positions={initialPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={colors.primary}
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  )
}

export function AnimatedSphere() {
  return (
    <div className="h-[600px] w-[600px] ml-16">
      <Canvas 
        camera={{ position: [0, 0, 2], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <RunnerParticles />
      </Canvas>
    </div>
  )
}