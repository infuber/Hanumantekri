import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'
import useAreas from '../../hooks/useAreas'
import AreaGate from './AreaGate'

const ICON_MAP = {
  bell: '🔔',
  temple: '🕉️',
  book: '📖',
  scroll: '📜',
  flower: '🪔',
  star: '⭐',
  lotus: '🌸',
}

function AreaCard({ area, index, language, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const icon = ICON_MAP[area.icon] || area.icon || '🕉️'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      onClick={() => onSelect(area)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(18,8,42,0.85)',
        border: `1px solid ${hovered ? 'rgba(255,193,7,0.7)' : 'rgba(255,193,7,0.2)'}`,
        borderRadius: '16px',
        padding: '2rem 1.5rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        textAlign: 'center',
        backdropFilter: 'blur(12px)',
        boxShadow: hovered
          ? '0 0 30px rgba(255,107,53,0.3), 0 8px 40px rgba(0,0,0,0.6)'
          : '0 4px 20px rgba(0,0,0,0.5)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: '2.5rem' }}>{icon}</span>

      {/* Entry fee badge */}
      <span
        style={{
          background: area.is_free
            ? 'rgba(39,174,96,0.2)'
            : 'rgba(255,107,53,0.2)',
          border: `1px solid ${area.is_free ? 'rgba(39,174,96,0.6)' : 'rgba(255,107,53,0.5)'}`,
          color: area.is_free ? '#2ecc71' : '#ff6b35',
          borderRadius: '20px',
          padding: '0.2rem 0.75rem',
          fontSize: '0.75rem',
          fontFamily: 'Cinzel, serif',
          letterSpacing: '0.08em',
        }}
      >
        {area.is_free ? 'FREE' : `₹${area.entry_fee}`}
      </span>

      {/* Name */}
      <div>
        <div
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#fff8e7',
            letterSpacing: '0.08em',
            marginBottom: '0.3rem',
          }}
        >
          {language === 'en' ? area.name_en : area.name_hi}
        </div>
        <div
          style={{
            fontFamily: language === 'hi' ? 'Cinzel, serif' : 'Noto Sans Devanagari, serif',
            fontSize: '0.9rem',
            color: '#c9a96e',
          }}
        >
          {language === 'en' ? area.name_hi : area.name_en}
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '0.8rem',
          color: 'rgba(201,169,110,0.7)',
          lineHeight: 1.5,
          maxWidth: '200px',
          fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
        }}
      >
        {language === 'en' ? area.description_en : area.description_hi}
      </p>

      {/* Enter arrow */}
      <motion.span
        animate={{ x: hovered ? 4 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ color: '#ffc107', fontSize: '0.85rem', fontFamily: 'Cinzel, serif' }}
      >
        Enter →
      </motion.span>
    </motion.div>
  )
}

export default function AreaMap() {
  const { language, setArea } = useTempleStore()
  const { areas, loading } = useAreas()
  const [gateArea, setGateArea] = useState(null)

  function handleSelect(area) {
    if (area.is_free) {
      setArea(area.slug)
    } else {
      setGateArea(area)
    }
  }

  function handleEnterAnyway() {
    if (gateArea) {
      setArea(gateArea.slug)
      setGateArea(null)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 1.5rem 2rem',
          background: 'rgba(10,5,21,0.75)',
          backdropFilter: 'blur(4px)',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <h1
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(1.3rem, 4vw, 2rem)',
              color: '#fff8e7',
              letterSpacing: '0.2em',
              textShadow: '0 0 30px rgba(255,193,7,0.6)',
              marginBottom: '0.5rem',
            }}
          >
            ENTER THE TEMPLE
          </h1>
          <p
            style={{
              fontFamily: 'Noto Sans Devanagari, serif',
              fontSize: '1.1rem',
              color: '#c9a96e',
            }}
          >
            {language === 'en' ? 'Choose your sacred path' : 'अपना पवित्र मार्ग चुनें'}
          </p>
        </motion.div>

        {/* Area cards */}
        {loading ? (
          <div style={{ color: '#c9a96e', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}>
            Loading sacred spaces...
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.25rem',
              width: '100%',
              maxWidth: '900px',
            }}
          >
            {areas.map((area, i) => (
              <AreaCard
                key={area.id}
                area={area}
                index={i}
                language={language}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Gate modal for paid areas */}
      <AnimatePresence>
        {gateArea && (
          <AreaGate
            area={gateArea}
            language={language}
            onEnter={handleEnterAnyway}
            onClose={() => setGateArea(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
