import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls } from '@react-three/drei'
import TempleExterior from './TempleExterior'
import Bell from './Bell'

function SceneContent() {
  return (
    <>
      {/* Night sky stars */}
      <Stars
        radius={120}
        depth={60}
        count={6000}
        factor={4}
        saturation={0.1}
        fade
        speed={0.5}
      />

      {/* Global lighting */}
      <ambientLight intensity={0.08} color="#1a0a3a" />

      {/* Temple geometry */}
      <TempleExterior />

      {/* Interactive bell */}
      <Bell />

      {/* Camera controls — limit to prevent going underground or too far */}
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={22}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minPolarAngle={0.1}
        target={[0, 2, 0]}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  )
}

export default function TempleScene() {
  return (
    <Canvas
      camera={{ position: [0, 4, 14], fov: 58 }}
      shadows
      style={{ width: '100%', height: '100%', background: '#0a0515' }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}
