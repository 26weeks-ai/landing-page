import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { colors } from '@/content/copy'
import * as THREE from 'three'

const Particles = ({ count = 100 }) => {
  const points = useRef<THREE.Points>(null!)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 2
      const a = Math.random() * Math.PI * 2
      const b = Math.random() * Math.PI * 2

      positions[i * 3] = radius * Math.cos(a) * Math.sin(b)
      positions[i * 3 + 1] = radius * Math.sin(a) * Math.sin(b)
      positions[i * 3 + 2] = radius * Math.cos(b)
    }
    return positions
  }, [count])

  useFrame((state) => {
    points.current.rotation.x += 0.001
    points.current.rotation.y += 0.002
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
        size={0.1}
        color={colors.primary}
        sizeAttenuation
        transparent={false}
      />
    </points>
  )
}

export const AnimatedSphere = () => {
  return (
    <div className="h-[400px] w-[400px]">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  )
}