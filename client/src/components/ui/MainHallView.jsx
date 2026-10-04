import { motion } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

const SHLOKA_EN = `Om Shri Hanumate Namah
Anjaneya Mahabalaya
Ramaduta Parayana
Vayu Putra Namo Namah`

const SHLOKA_HI = `ॐ श्री हनुमते नमः
अंजनेय महाबलाय
रामदूत परायण
वायु पुत्र नमो नमः`

function GlowingDiya({ size = 60, style }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.07, 1], opacity: [0.85, 1, 0.85] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      style={{ ...style, fontSize: size, filter: 'drop-shadow(0 0 20px #ff8c00)' }}
    >
      🪔
    </motion.div>
  )
}

export default function MainHallView() {
  const { language } = useTempleStore()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'radial-gradient(ellipse at 50% 30%, #2a0d1a 0%, #0a0515 60%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 2rem 2rem',
        overflowY: 'auto',
      }}
    >
      {/* Decorative diyas */}
      <div style={{ display: 'flex', gap: '3rem', marginBottom: '2rem' }}>
        <GlowingDiya size={32} />
        <GlowingDiya size={32} style={{ animationDelay: '0.8s' }} />
        <GlowingDiya size={32} style={{ animationDelay: '1.6s' }} />
      </div>

      {/* Hindi title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          fontFamily: 'Tiro Devanagari Hindi, serif',
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          color: '#ffc107',
          textShadow: '0 0 40px rgba(255,193,7,0.8), 0 0 80px rgba(255,107,53,0.4)',
          textAlign: 'center',
          lineHeight: 1.3,
          marginBottom: '0.5rem',
        }}
      >
        श्री हनुमान जी
      </motion.h1>

      {/* English subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
          color: '#c9a96e',
          letterSpacing: '0.2em',
          marginBottom: '2.5rem',
        }}
      >
        JAI SHRI RAM
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          width: '100%',
          maxWidth: '400px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,193,7,0.6), transparent)',
          marginBottom: '2.5rem',
        }}
      />

      {/* Shloka */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          background: 'rgba(18,8,42,0.7)',
          border: '1px solid rgba(255,193,7,0.2)',
          borderRadius: '16px',
          padding: '2rem 2.5rem',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          backdropFilter: 'blur(8px)',
          marginBottom: '2rem',
        }}
      >
        <p
          style={{
            fontFamily:
              language === 'hi' ? 'Tiro Devanagari Hindi, serif' : 'Cinzel, serif',
            fontSize: language === 'hi' ? '1.2rem' : '0.95rem',
            color: '#fff8e7',
            lineHeight: 2,
            whiteSpace: 'pre-line',
          }}
        >
          {language === 'hi' ? SHLOKA_HI : SHLOKA_EN}
        </p>
      </motion.div>

      {/* Gold Om line */}
      <motion.p
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(0.85rem, 2vw, 1rem)',
          color: '#ffc107',
          letterSpacing: '0.25em',
          textShadow: '0 0 20px rgba(255,193,7,0.6)',
        }}
      >
        ॐ ॐ ॐ
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          marginTop: '2rem',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.85rem',
          color: 'rgba(201,169,110,0.6)',
          letterSpacing: '0.12em',
          textAlign: 'center',
        }}
      >
        {language === 'en'
          ? 'You stand in the sacred presence of Bajrang Bali. Bow your head in devotion.'
          : 'आप बजरंग बली की पवित्र उपस्थिति में हैं। भक्ति से शीश झुकाएं।'}
      </motion.p>
    </motion.div>
  )
}
