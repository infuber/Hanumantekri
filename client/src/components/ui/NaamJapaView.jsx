import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

const TOTAL = 108

export default function NaamJapaView() {
  const { language, setArea } = useTempleStore()
  const [count, setCount] = useState(0)
  const [pulse, setPulse] = useState(false)
  const [done, setDone] = useState(false)

  const tap = useCallback(() => {
    if (done) return
    setPulse(true)
    setTimeout(() => setPulse(false), 180)
    setCount(prev => {
      const next = prev + 1
      if (next >= TOTAL) setTimeout(() => setDone(true), 300)
      return Math.min(next, TOTAL)
    })
  }, [done])

  useEffect(() => {
    function onKey(e) {
      if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); tap() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [tap])

  // SVG bead circle
  const cx = 160, cy = 160, r = 130
  const beadR = 7
  const beads = Array.from({ length: TOTAL }, (_, i) => {
    const angle = (i / TOTAL) * 2 * Math.PI - Math.PI / 2
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), lit: i < count }
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'linear-gradient(180deg, #0a0515 0%, #12082a 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Back */}
      <button
        onClick={() => setArea(null)}
        style={{
          position: 'absolute', top: '1.25rem', left: '1.25rem',
          background: 'none', border: '1px solid rgba(255,193,7,0.25)',
          borderRadius: '8px', color: 'rgba(201,169,110,0.7)',
          fontFamily: 'Cinzel, serif', fontSize: '0.7rem',
          letterSpacing: '0.1em', padding: '0.4rem 0.8rem', cursor: 'pointer',
        }}
      >
        ← BACK
      </button>

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(0.6rem, 2vw, 0.8rem)', color: 'rgba(255,193,7,0.5)', letterSpacing: '0.3em', marginBottom: '0.3rem' }}>
          ✦ NAAM JAPA MALA ✦
        </div>
        <div style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', color: 'rgba(201,169,110,0.6)' }}>
          {language === 'hi' ? 'हनुमान जी का नाम जपें' : 'Chant the name of Hanuman Ji'}
        </div>
      </div>

      {/* Mala + tap button */}
      <div style={{ position: 'relative', width: '320px', height: '320px' }}>
        {/* SVG beads */}
        <svg width="320" height="320" style={{ position: 'absolute', inset: 0 }}>
          {beads.map((b, i) => (
            <circle
              key={i}
              cx={b.x} cy={b.y} r={beadR}
              fill={b.lit ? '#ffc107' : 'rgba(255,193,7,0.12)'}
              stroke={b.lit ? 'rgba(255,193,7,0.8)' : 'rgba(255,193,7,0.2)'}
              strokeWidth="1"
              style={{ transition: 'fill 0.2s ease, stroke 0.2s ease', filter: b.lit ? 'drop-shadow(0 0 4px #ffc107)' : 'none' }}
            />
          ))}
        </svg>

        {/* Central tap button */}
        <motion.button
          animate={pulse ? { scale: 1.12 } : { scale: 1 }}
          transition={{ duration: 0.15 }}
          onClick={tap}
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '140px', height: '140px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 40% 35%, rgba(255,193,7,0.18) 0%, rgba(10,5,21,0.9) 70%)',
            border: '2px solid rgba(255,193,7,0.35)',
            cursor: 'pointer',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
            boxShadow: pulse ? '0 0 32px rgba(255,193,7,0.4)' : '0 0 12px rgba(255,193,7,0.1)',
            transition: 'box-shadow 0.15s ease',
          }}
        >
          <span style={{ fontSize: '2.8rem', lineHeight: 1 }}>ॐ</span>
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.1rem',
            color: '#ffc107',
            letterSpacing: '0.05em',
          }}>
            {count} <span style={{ fontSize: '0.65rem', color: 'rgba(255,193,7,0.5)' }}>/ {TOTAL}</span>
          </span>
        </motion.button>
      </div>

      {/* Hint */}
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <div style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: '0.8rem', color: 'rgba(201,169,110,0.45)' }}>
          {language === 'hi' ? 'ॐ पर टैप करें या स्पेसबार दबाएं' : 'Tap ॐ or press spacebar'}
        </div>
        <div style={{ marginTop: '0.4rem', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: 'rgba(255,193,7,0.25)', letterSpacing: '0.15em' }}>
          {TOTAL - count} REMAINING
        </div>
      </div>

      {/* Completion overlay */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 10,
              background: 'rgba(10,5,21,0.92)', backdropFilter: 'blur(8px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '1rem',
              textAlign: 'center', padding: '2rem',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{ fontSize: '3.5rem' }}
            >
              🙏
            </motion.div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', color: '#ffc107', letterSpacing: '0.15em' }}>
              JAI HANUMAN
            </div>
            <div style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: 'clamp(1rem, 3vw, 1.3rem)', color: '#fff8e7' }}>
              जय हनुमान — आपकी माला पूरी हुई
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'rgba(201,169,110,0.6)', fontStyle: 'italic', maxWidth: '320px' }}>
              {language === 'hi'
                ? '१०८ नाम जप पूर्ण हुए। बजरंगबली आपकी मनोकामना पूर्ण करें।'
                : '108 names completed. May Bajrangbali fulfil all your wishes.'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem', width: '100%', maxWidth: '280px' }}>
              <button
                onClick={() => setArea('seva-sahyog')}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,193,7,0.2), rgba(255,107,53,0.15))',
                  border: '1px solid rgba(255,193,7,0.5)',
                  borderRadius: '12px', padding: '0.9rem',
                  color: '#ffc107', fontFamily: 'Cinzel, serif',
                  fontSize: '0.85rem', letterSpacing: '0.1em', cursor: 'pointer',
                }}
              >
                🙏 {language === 'hi' ? 'सेवा सहयोग करें' : 'Offer Seva Sahyog'}
              </button>
              <button
                onClick={() => { setCount(0); setDone(false) }}
                style={{
                  background: 'transparent', border: '1px solid rgba(255,193,7,0.2)',
                  borderRadius: '12px', padding: '0.75rem',
                  color: 'rgba(201,169,110,0.6)', fontFamily: 'Cinzel, serif',
                  fontSize: '0.75rem', letterSpacing: '0.08em', cursor: 'pointer',
                }}
              >
                ↺ {language === 'hi' ? 'फिर से करें' : 'Jap Again'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
