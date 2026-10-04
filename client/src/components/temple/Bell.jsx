import { useRef, useState, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import useTempleStore from '../../store/templeStore'

export default function Bell() {
  const ringBell = useTempleStore((s) => s.ringBell)
  const [hovered, setHovered] = useState(false)
  const [ringing, setRinging] = useState(false)
  const [done, setDone] = useState(false)

  const bellRef = useRef()
  const groupRef = useRef()
  const swingAngle = useRef(0)
  const swingVelocity = useRef(0)
  const ringingTime = useRef(0)

  // Animate bell swing
  useFrame((_, delta) => {
    if (!groupRef.current) return

    if (ringing) {
      ringingTime.current += delta
      // Damped oscillation
      const damping = 0.97
      const restoring = -8 * swingAngle.current
      swingVelocity.current = (swingVelocity.current + restoring * delta) * damping
      swingAngle.current += swingVelocity.current * delta
      groupRef.current.rotation.z = swingAngle.current

      // Transition to interior once swing settles
      if (ringingTime.current > 2.5 && !done) {
        setDone(true)
        ringBell()
      }
    } else {
      // Gentle idle sway
      const t = Date.now() * 0.001
      groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.04
    }

    // Emissive glow pulse
    if (bellRef.current) {
      const pulse = hovered ? 0.6 + Math.sin(Date.now() * 0.004) * 0.3 : 0.1
      bellRef.current.material.emissiveIntensity = pulse
    }
  })

  const handleClick = useCallback(() => {
    if (ringing || done) return
    setRinging(true)
    swingVelocity.current = 2.2 // initial kick
  }, [ringing, done])

  return (
    // Positioned at the bell arch
    <group position={[0, 3.65, 4.2]}>
      {/* Rope */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.7, 8]} />
        <meshStandardMaterial color="#8b6914" roughness={0.9} />
      </mesh>

      {/* Bell group — pivots from top */}
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Bell body */}
        <mesh
          ref={bellRef}
          position={[0, -0.2, 0]}
          onClick={handleClick}
          onPointerEnter={() => {
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerLeave={() => {
            setHovered(false)
            document.body.style.cursor = 'default'
          }}
          castShadow
        >
          <cylinderGeometry args={[0.13, 0.24, 0.38, 24]} />
          <meshStandardMaterial
            color="#b8860b"
            emissive="#ffc107"
            emissiveIntensity={0.1}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Bell clapper */}
        <mesh position={[0, -0.35, 0]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#8b6914" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Point light inside bell for glow */}
        {hovered && (
          <pointLight position={[0, -0.2, 0]} intensity={3} color="#ffc107" distance={2} decay={2} />
        )}
      </group>

      {/* Click hint label */}
      {!ringing && !done && (
        <Html position={[0, -0.7, 0]} center style={{ pointerEvents: 'none' }}>
          <div
            style={{
              fontFamily: 'Cinzel, serif',
              color: hovered ? '#ffc107' : '#c9a96e',
              fontSize: '11px',
              letterSpacing: '0.12em',
              whiteSpace: 'nowrap',
              textShadow: '0 0 10px rgba(255,193,7,0.8)',
              opacity: hovered ? 1 : 0.7,
              transition: 'all 0.3s ease',
              userSelect: 'none',
            }}
          >
            🔔 Click to ring
          </div>
        </Html>
      )}
    </group>
  )
}
