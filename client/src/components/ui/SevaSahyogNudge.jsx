import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

const MAX_SHOWS = 3
const FIRST_DELAY_MS = 2 * 60 * 1000   // 2 minutes
const REPEAT_DELAY_MS = 3 * 60 * 1000  // 3 minutes after each dismiss
const AUTO_DISMISS_MS = 8000

export default function SevaSahyogNudge() {
  const { setArea } = useTempleStore()
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)
  const autoDismissRef = useRef(null)

  function getShownCount() {
    return parseInt(sessionStorage.getItem('seva-nudge-count') || '0', 10)
  }

  function schedule(delay) {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const count = getShownCount()
      if (count >= MAX_SHOWS) return
      setVisible(true)
      sessionStorage.setItem('seva-nudge-count', String(count + 1))
      autoDismissRef.current = setTimeout(() => {
        setVisible(false)
        schedule(REPEAT_DELAY_MS)
      }, AUTO_DISMISS_MS)
    }, delay)
  }

  useEffect(() => {
    if (getShownCount() >= MAX_SHOWS) return
    schedule(FIRST_DELAY_MS)
    return () => {
      clearTimeout(timerRef.current)
      clearTimeout(autoDismissRef.current)
    }
  }, [])

  function dismiss(e) {
    e.stopPropagation()
    clearTimeout(autoDismissRef.current)
    setVisible(false)
    schedule(REPEAT_DELAY_MS)
  }

  function open() {
    clearTimeout(autoDismissRef.current)
    clearTimeout(timerRef.current)
    setVisible(false)
    setArea('seva-sahyog')
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          onClick={open}
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 500,
            maxWidth: '230px',
            background: 'rgba(10,5,21,0.97)',
            border: '1px solid rgba(255,193,7,0.4)',
            borderTop: '2px solid rgba(255,193,7,0.7)',
            borderRadius: '14px',
            padding: '0.9rem 1rem',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.7), 0 0 20px rgba(255,193,7,0.08)',
          }}
        >
          {/* Dismiss */}
          <button
            onClick={dismiss}
            style={{
              position: 'absolute', top: '0.5rem', right: '0.6rem',
              background: 'none', border: 'none',
              color: 'rgba(201,169,110,0.4)', cursor: 'pointer',
              fontSize: '0.65rem', lineHeight: 1, padding: '2px',
            }}
            aria-label="Dismiss"
          >
            ✕
          </button>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
            <span style={{ fontSize: '1.5rem', lineHeight: 1, marginTop: '0.1rem' }}>🙏</span>
            <div>
              <div style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.72rem',
                color: '#ffc107',
                letterSpacing: '0.1em',
                marginBottom: '0.25rem',
              }}>
                SEVA SAHYOG
              </div>
              <div style={{
                fontFamily: 'Noto Sans Devanagari, serif',
                fontSize: '0.8rem',
                color: 'rgba(255,248,231,0.85)',
                lineHeight: 1.5,
                marginBottom: '0.5rem',
              }}>
                मंदिर की सेवा में सहयोग करें — दीपक जलाएं या प्रार्थना कराएं।
              </div>
              <div style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.6rem',
                color: 'rgba(255,193,7,0.6)',
                letterSpacing: '0.08em',
              }}>
                TAP TO OFFER SEVA ↗
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
