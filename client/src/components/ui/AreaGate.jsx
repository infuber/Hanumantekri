import { motion } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

const ICON_MAP = {
  bell: '🔔',
  temple: '🕉️',
  book: '📖',
  scroll: '📜',
  flower: '🪔',
  star: '⭐',
  lotus: '🌸',
}

export default function AreaGate({ area, language, onEnter, onClose }) {
  const { setArea } = useTempleStore()
  const icon = ICON_MAP[area.icon] || area.icon || '🕉️'
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 900,
        background: 'rgba(5,2,15,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        backdropFilter: 'blur(6px)',
      }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #12082a 0%, #1a0f3a 100%)',
          border: '1px solid rgba(255,193,7,0.4)',
          borderRadius: '20px',
          padding: '2.5rem',
          maxWidth: '420px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 0 60px rgba(255,107,53,0.2), 0 20px 60px rgba(0,0,0,0.8)',
        }}
      >
        {/* Icon */}
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>

        {/* Name */}
        <h2
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.5rem',
            color: '#fff8e7',
            letterSpacing: '0.1em',
            marginBottom: '0.4rem',
          }}
        >
          {language === 'en' ? area.name_en : area.name_hi}
        </h2>
        <p
          style={{
            fontFamily: language === 'hi' ? 'Cinzel, serif' : 'Noto Sans Devanagari, serif',
            color: '#c9a96e',
            fontSize: '0.9rem',
            marginBottom: '1.2rem',
          }}
        >
          {language === 'en' ? area.name_hi : area.name_en}
        </p>

        {/* Description */}
        <p
          style={{
            color: 'rgba(255,248,231,0.75)',
            fontSize: '0.9rem',
            lineHeight: 1.7,
            marginBottom: '1.5rem',
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
          }}
        >
          {language === 'en' ? area.description_en : area.description_hi}
        </p>

        {/* Donation amount */}
        <div
          style={{
            background: 'rgba(255,107,53,0.12)',
            border: '1px solid rgba(255,107,53,0.4)',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <p style={{ color: '#c9a96e', fontSize: '0.8rem', marginBottom: '0.3rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.08em' }}>
            SUGGESTED DONATION
          </p>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: '2rem', color: '#ffc107' }}>
            ₹{area.entry_fee}
          </p>
          <p style={{ color: 'rgba(201,169,110,0.6)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
            Your contribution supports Hanumat Tekari
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* Seva Sahyog */}
          <button
            onClick={() => { onClose(); setArea('seva-sahyog') }}
            style={{
              background: 'rgba(255,193,7,0.1)',
              border: '1px solid rgba(255,193,7,0.4)',
              borderRadius: '10px',
              padding: '0.85rem',
              color: '#ffc107',
              fontFamily: 'Cinzel, serif',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,193,7,0.18)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,193,7,0.1)'}
          >
            🙏 Seva Sahyog · सेवा सहयोग
          </button>

          {/* Enter anyway */}
          <button
            onClick={onEnter}
            style={{
              background: 'linear-gradient(135deg, #ff6b35 0%, #c0392b 100%)',
              border: 'none',
              borderRadius: '10px',
              padding: '0.85rem',
              color: '#fff8e7',
              fontFamily: 'Cinzel, serif',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease, transform 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.88'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            🙏 Enter Temple (Free for now)
          </button>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(201,169,110,0.5)',
              fontFamily: 'Cinzel, serif',
              fontSize: '0.75rem',
              cursor: 'pointer',
              padding: '0.5rem',
              letterSpacing: '0.08em',
            }}
          >
            ← Go Back
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
