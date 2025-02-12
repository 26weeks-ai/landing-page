import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'
import { colors } from '@/content/copy'

function RunnerParticles({ count = 150 }) {
  const points = useRef<any>()
  const mouse = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  // Create initial particle positions along a runner silhouette path
  const initialPositions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = i / count
      // Parametric equations to form a running figure shape
      const x = Math.sin(t * Math.PI * 2) * 0.5
      const y = Math.cos(t * Math.PI * 4) * 0.3 + Math.sin(t * Math.PI * 2) * 0.2
      const z = 0

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.1
    }
    return positions
  }, [count])

  // Previous positions for trails
  const prevPositions = useRef(initialPositions.slice())

  useFrame((state) => {
    if (points.current) {
      const time = state.clock.getElapsedTime()
      const positions = points.current.geometry.attributes.position.array

      // Update mouse position based on camera position
      const mouseX = (state.mouse.x * viewport.width) / 2
      const mouseY = (state.mouse.y * viewport.height) / 2
      mouse.current = { x: mouseX, y: mouseY }

      // Store previous positions for trails
      for (let i = 0; i < positions.length; i++) {
        prevPositions.current[i] = positions[i]
      }

      // Animate particles with mouse influence and running motion
      for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const initialX = initialPositions[i3]
        const initialY = initialPositions[i3 + 1]

        // Calculate distance to mouse
        const dx = mouse.current.x - positions[i3]
        const dy = mouse.current.y - positions[i3 + 1]
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.min(1, 1 / (dist * 2))

        // Combine running motion with mouse influence
        positions[i3] = initialX + Math.sin(time * 2 + i * 0.1) * 0.02 + dx * influence * 0.1
        positions[i3 + 1] = initialY + Math.cos(time * 3 + i * 0.1) * 0.02 + dy * influence * 0.1
        positions[i3 + 2] = initialPositions[i3 + 2] + Math.sin(time + i) * 0.01

        // Add trail effect by lerping with previous positions
        const trail = 0.9
        positions[i3] = positions[i3] * (1 - trail) + prevPositions.current[i3] * trail
        positions[i3 + 1] = positions[i3 + 1] * (1 - trail) + prevPositions.current[i3 + 1] * trail
        positions[i3 + 2] = positions[i3 + 2] * (1 - trail) + prevPositions.current[i3 + 2] * trail
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
        vertexColors
        blending={2}
      />
    </Points>
  )
}

export function AnimatedSphere() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas 
        camera={{ position: [0, 0, 2], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <RunnerParticles />
      </Canvas>
    </div>
  )
}