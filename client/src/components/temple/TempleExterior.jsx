import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Floating diya particle
function DivaParticle({ position, speed, phase }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + phase
    ref.current.position.y = position[1] + Math.sin(t) * 0.15
    ref.current.position.x = position[0] + Math.sin(t * 0.7) * 0.05
    ref.current.material.emissiveIntensity = 0.8 + Math.sin(t * 3) * 0.4
    ref.current.material.opacity = 0.7 + Math.sin(t * 2) * 0.2
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshStandardMaterial
        color="#ff8c00"
        emissive="#ff6b35"
        emissiveIntensity={1}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// Temple spire — stacked boxes narrowing toward top
function Shikhara({ position }) {
  const levels = [
    { y: 0, w: 1.4, d: 1.4, h: 0.6 },
    { y: 0.6, w: 1.2, d: 1.2, h: 0.6 },
    { y: 1.2, w: 1.0, d: 1.0, h: 0.6 },
    { y: 1.8, w: 0.8, d: 0.8, h: 0.6 },
    { y: 2.4, w: 0.6, d: 0.6, h: 0.5 },
    { y: 2.9, w: 0.35, d: 0.35, h: 0.4 },
    { y: 3.3, w: 0.15, d: 0.15, h: 0.5 },
  ]
  return (
    <group position={position}>
      {levels.map((l, i) => (
        <mesh key={i} position={[0, l.y + l.h / 2, 0]} castShadow>
          <boxGeometry args={[l.w, l.h, l.d]} />
          <meshStandardMaterial
            color="#d4a96a"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      ))}
      {/* Gold kalash on top */}
      <mesh position={[0, 3.8, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#ffc107" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

// Temple pillar
function Pillar({ position }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.18, 0.22, 4, 16]} />
        <meshStandardMaterial color="#d4b483" roughness={0.7} metalness={0.05} />
      </mesh>
      {/* Capital */}
      <mesh position={[0, 2.1, 0]}>
        <boxGeometry args={[0.5, 0.25, 0.5]} />
        <meshStandardMaterial color="#e8d5a3" roughness={0.6} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -2.1, 0]}>
        <boxGeometry args={[0.5, 0.25, 0.5]} />
        <meshStandardMaterial color="#e8d5a3" roughness={0.6} />
      </mesh>
    </group>
  )
}

export default function TempleExterior() {
  // Particle positions
  const particles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        Math.random() * 6 + 0.5,
        (Math.random() - 0.5) * 8,
      ],
      speed: 0.4 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }))
  }, [])

  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#1a1228" roughness={1} />
      </mesh>

      {/* Stone courtyard platform */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[14, 0.16, 10]} />
        <meshStandardMaterial color="#c8a96a" roughness={0.9} metalness={0.0} />
      </mesh>

      {/* Steps — 3 tiers leading up */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0.16 + i * 0.22, 4.5 - i * 0.5]} receiveShadow>
          <boxGeometry args={[5 - i * 0.4, 0.22, 0.8]} />
          <meshStandardMaterial color="#c4a06a" roughness={0.85} />
        </mesh>
      ))}

      {/* Main temple body */}
      <mesh position={[0, 2.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 4, 4.5]} />
        <meshStandardMaterial color="#d4b483" roughness={0.75} metalness={0.05} />
      </mesh>

      {/* Front face decorative arch */}
      <mesh position={[0, 1.8, 2.26]} castShadow>
        <boxGeometry args={[1.8, 3, 0.1]} />
        <meshStandardMaterial color="#b8905a" roughness={0.8} />
      </mesh>

      {/* Temple doorway (dark cutout illusion) */}
      <mesh position={[0, 1.4, 2.32]}>
        <boxGeometry args={[1.4, 2.6, 0.05]} />
        <meshStandardMaterial color="#0a0515" />
      </mesh>

      {/* Inner warm glow from doorway */}
      <pointLight position={[0, 1.5, 1.5]} intensity={4} color="#ff8c00" distance={6} decay={2} />

      {/* Shikhara / spire on top */}
      <Shikhara position={[0, 4.16, 0]} />

      {/* 4 pillars in front */}
      <Pillar position={[-2.2, 2.22, 2.8]} />
      <Pillar position={[2.2, 2.22, 2.8]} />
      <Pillar position={[-2.2, 2.22, -0.2]} />
      <Pillar position={[2.2, 2.22, -0.2]} />

      {/* Bell arch pillars */}
      <mesh position={[-0.7, 2.02, 4.2]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 4, 10]} />
        <meshStandardMaterial color="#c8a060" roughness={0.6} metalness={0.2} />
      </mesh>
      <mesh position={[0.7, 2.02, 4.2]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 4, 10]} />
        <meshStandardMaterial color="#c8a060" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Arch beam */}
      <mesh position={[0, 4.05, 4.2]} castShadow>
        <boxGeometry args={[1.6, 0.14, 0.14]} />
        <meshStandardMaterial color="#c8a060" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Diya flame particles */}
      {particles.map((p, i) => (
        <DivaParticle key={i} {...p} />
      ))}

      {/* Moonlight directional */}
      <directionalLight
        position={[10, 20, 5]}
        intensity={0.35}
        color="#c8d8ff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Soft fill from front */}
      <directionalLight position={[0, 5, 15]} intensity={0.15} color="#fff4e6" />
    </group>
  )
}
