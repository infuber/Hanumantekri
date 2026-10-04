import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

function AnimatedDiya() {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Diya base */}
      <motion.div
        style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 16px #ff8c00)' }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        🪔
      </motion.div>
      {/* Flame glow particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: `${-10 + Math.random() * 10}%`,
            left: `${30 + Math.random() * 40}%`,
            width: '4px',
            height: '4px',
            background: '#ffc107',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
          animate={{
            y: [-5, -25 - Math.random() * 20],
            x: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 20],
            opacity: [1, 0],
            scale: [1, 0.3],
          }}
          transition={{
            duration: 1.2 + Math.random() * 0.8,
            repeat: Infinity,
            delay: Math.random() * 1.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

export default function PujaView() {
  const { language } = useTempleStore()
  const [prayer, setPrayer] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!prayer.trim()) return
    setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'radial-gradient(ellipse at 50% 30%, #2a0820 0%, #0a0515 65%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem 2rem',
        overflowY: 'auto',
      }}
    >
      <AnimatedDiya />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontFamily: 'Noto Sans Devanagari, serif',
          fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          color: '#ffc107',
          textShadow: '0 0 30px rgba(255,193,7,0.7)',
          marginTop: '1rem',
          marginBottom: '0.3rem',
          textAlign: 'center',
        }}
      >
        श्री हनुमान जी
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          fontFamily: 'Cinzel, serif',
          color: '#c9a96e',
          fontSize: '0.85rem',
          letterSpacing: '0.15em',
          marginBottom: '2.5rem',
        }}
      >
        PUJA ROOM · पूजा कक्ष
      </motion.p>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="blessed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'rgba(18,8,42,0.85)',
              border: '1px solid rgba(255,193,7,0.4)',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '480px',
              textAlign: 'center',
              backdropFilter: 'blur(12px)',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '2.5rem', marginBottom: '1.2rem' }}
            >
              🙏
            </motion.div>
            <h2
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '1.3rem',
                color: '#ffc107',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
                textShadow: '0 0 20px rgba(255,193,7,0.5)',
              }}
            >
              Jai Hanuman!
            </h2>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                color: '#fff8e7',
                lineHeight: 1.8,
                fontSize: '0.95rem',
                marginBottom: '1.5rem',
              }}
            >
              Your prayer has been received by Hanumat Tekari.
              May Bajrang Bali bless you with strength and courage. 🙏
            </p>
            <p
              style={{
                fontFamily: 'Noto Sans Devanagari, serif',
                color: '#c9a96e',
                fontSize: '1rem',
                lineHeight: 1.8,
              }}
            >
              आपकी प्रार्थना हनुमत टेकरी ने स्वीकार की।
              बजरंग बली आपको शक्ति और साहस दें।
            </p>
            <button
              onClick={() => { setSubmitted(false); setPrayer('') }}
              style={{
                marginTop: '1.5rem',
                background: 'transparent',
                border: '1px solid rgba(255,193,7,0.4)',
                borderRadius: '10px',
                padding: '0.6rem 1.5rem',
                color: '#c9a96e',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.8rem',
                cursor: 'pointer',
                letterSpacing: '0.08em',
              }}
            >
              Offer Another Prayer
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            style={{
              background: 'rgba(18,8,42,0.8)',
              border: '1px solid rgba(255,193,7,0.2)',
              borderRadius: '20px',
              padding: '2.5rem',
              maxWidth: '480px',
              width: '100%',
              backdropFilter: 'blur(12px)',
            }}
          >
            <label
              style={{
                display: 'block',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.8rem',
                color: '#c9a96e',
                letterSpacing: '0.12em',
                marginBottom: '0.75rem',
              }}
            >
              {language === 'en'
                ? 'YOUR PRAYER / आपकी प्रार्थना'
                : 'आपकी प्रार्थना / YOUR PRAYER'}
            </label>
            <textarea
              value={prayer}
              onChange={(e) => setPrayer(e.target.value)}
              placeholder={
                language === 'en'
                  ? 'Share your prayer, wish, or gratitude with Hanumat Ji...'
                  : 'हनुमत जी से अपनी प्रार्थना, मनोकामना या आभार साझा करें...'
              }
              rows={5}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,193,7,0.2)',
                borderRadius: '10px',
                padding: '1rem',
                color: '#fff8e7',
                fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                fontSize: language === 'hi' ? '1rem' : '0.9rem',
                resize: 'vertical',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                lineHeight: 1.7,
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(255,193,7,0.6)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,193,7,0.2)')}
            />
            <button
              type="submit"
              disabled={!prayer.trim()}
              style={{
                marginTop: '1.2rem',
                width: '100%',
                background: prayer.trim()
                  ? 'linear-gradient(135deg, #ff6b35 0%, #c0392b 100%)'
                  : 'rgba(255,107,53,0.2)',
                border: 'none',
                borderRadius: '10px',
                padding: '0.9rem',
                color: prayer.trim() ? '#fff8e7' : 'rgba(255,248,231,0.3)',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
                cursor: prayer.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
              }}
            >
              🙏 Offer Prayer
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
