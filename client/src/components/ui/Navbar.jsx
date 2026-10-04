import { motion } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

export default function Navbar() {
  const { view, goToInterior, goBack } = useTempleStore()

  const showBack = view === 'area' || view === 'interior'

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1.5rem',
        background: 'linear-gradient(to bottom, rgba(10,5,21,0.9) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}
    >
      {/* Logo / title */}
      <div
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
          color: '#fff8e7',
          letterSpacing: '0.18em',
          textShadow: '0 0 20px rgba(255,193,7,0.5)',
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
        onClick={() => goToInterior()}
      >
        🕉️ HANUMAT TEKARI
      </div>

      {/* Back button */}
      {showBack && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={goBack}
          style={{
            pointerEvents: 'auto',
            background: 'rgba(18,8,42,0.8)',
            border: '1px solid rgba(255,193,7,0.35)',
            borderRadius: '20px',
            padding: '0.35rem 1rem',
            color: '#c9a96e',
            fontFamily: 'Cinzel, serif',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,193,7,0.8)'
            e.currentTarget.style.color = '#ffc107'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,193,7,0.35)'
            e.currentTarget.style.color = '#c9a96e'
          }}
        >
          ← Back
        </motion.button>
      )}
    </motion.nav>
  )
}
