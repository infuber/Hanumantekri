import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

export default function LoadingScreen() {
  const { isLoading, setLoading, setView, hasRungBell } = useTempleStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setView(hasRungBell ? 'interior' : 'entrance')
    }, 2800)
    return () => clearTimeout(timer)
  }, [setLoading, setView, hasRungBell])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'radial-gradient(ellipse at center, #1a0530 0%, #0a0515 70%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            gap: '2rem',
          }}
        >
          {/* Om symbol */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              fontSize: '5rem',
              fontFamily: 'Tiro Devanagari Hindi, serif',
              color: '#ffc107',
              textShadow: '0 0 40px rgba(255,193,7,0.8), 0 0 80px rgba(255,107,53,0.4)',
              lineHeight: 1,
            }}
          >
            ॐ
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
              color: '#fff8e7',
              letterSpacing: '0.2em',
              textAlign: 'center',
            }}
          >
            HANUMAT TEKARI
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            style={{
              fontFamily: 'Tiro Devanagari Hindi, serif',
              fontSize: '1.1rem',
              color: '#c9a96e',
              textAlign: 'center',
            }}
          >
            हनुमत टेकरी
          </motion.p>

          {/* Loading bar */}
          <motion.div
            style={{
              width: '200px',
              height: '2px',
              background: 'rgba(255,193,7,0.2)',
              borderRadius: '1px',
              overflow: 'hidden',
              marginTop: '1rem',
            }}
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #ff6b35, #ffc107)',
                borderRadius: '1px',
              }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.75rem',
              color: '#c9a96e',
              letterSpacing: '0.15em',
            }}
          >
            ENTERING THE DIVINE
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
