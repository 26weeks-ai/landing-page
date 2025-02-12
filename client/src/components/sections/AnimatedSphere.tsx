import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { colors } from '@/content/copy'
import * as THREE from 'three'

const Particles = ({ count = 100 }) => {
  const points = useRef<THREE.Points>(null!)
  const particlesFactor = useRef(0)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 2
      const theta = Math.random() * Math.PI * 2 // Horizontal angle
      const phi = Math.acos((Math.random() * 2) - 1) // Vertical angle for better distribution

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }
    return positions
  }, [count])

  useFrame((state) => {
    particlesFactor.current += 0.01
    points.current.rotation.y += 0.002
    points.current.rotation.x += 0.001

    // Add pulsing effect
    const positions = points.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      const idx = i * 3
      const x = positions[idx]
      const y = positions[idx + 1]
      const z = positions[idx + 2]

      const factor = 1 + Math.sin(particlesFactor.current + x) * 0.1
      positions[idx] = x * factor
      positions[idx + 1] = y * factor
      positions[idx + 2] = z * factor
    }
    points.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={colors.primary}
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  )
}

export const AnimatedSphere = () => {
  return (
    <div className="h-[500px] w-[500px] mx-auto">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Particles count={100} />
      </Canvas>
    </div>
  )
}