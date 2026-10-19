import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

export default function ChadhavaPrompt() {
  const { hasRungBell, setArea } = useTempleStore()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!hasRungBell) return
    if (sessionStorage.getItem('chadhava-dismissed')) return

    const t = setTimeout(() => setVisible(true), 5000)
    return () => clearTimeout(t)
  }, [hasRungBell])

  function dismiss(e) {
    e.stopPropagation()
    sessionStorage.setItem('chadhava-dismissed', '1')
    setVisible(false)
  }

  function open() {
    sessionStorage.setItem('chadhava-dismissed', '1')
    setVisible(false)
    setArea('seva-sahyog')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          onClick={open}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '1.5rem',
            zIndex: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(10,5,21,0.95)',
            border: '1px solid rgba(255,193,7,0.4)',
            borderRadius: '40px',
            padding: '0.55rem 1rem 0.55rem 0.75rem',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.6), 0 0 16px rgba(255,193,7,0.08)',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>🌸</span>
          <span style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: '0.9rem',
            color: '#ffc107',
            letterSpacing: '0.02em',
            userSelect: 'none',
          }}>
            चढ़ावा
          </span>
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.6rem',
            color: 'rgba(255,193,7,0.5)',
            letterSpacing: '0.1em',
          }}>
            ↗
          </span>

          {/* Dismiss */}
          <button
            onClick={dismiss}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(201,169,110,0.4)',
              cursor: 'pointer',
              fontSize: '0.7rem',
              padding: '0 0 0 0.2rem',
              lineHeight: 1,
            }}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
