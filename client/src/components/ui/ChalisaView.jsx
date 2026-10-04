import { motion } from 'framer-motion'
import useTempleStore from '../../store/templeStore'
import useChalisa from '../../hooks/useChalisa'

function VerseCard({ verse, language, index }) {
  const isDoha = verse.verse_type === 'doha'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: Math.min(index * 0.04, 0.4) }}
      style={{
        background: isDoha
          ? 'linear-gradient(135deg, rgba(26,8,42,0.95) 0%, rgba(18,8,42,0.95) 100%)'
          : 'rgba(18,8,42,0.8)',
        border: `1px solid ${isDoha ? 'rgba(255,107,53,0.4)' : 'rgba(255,193,7,0.15)'}`,
        borderRadius: '16px',
        padding: '2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Verse number */}
      <div
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: '1rem',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.7rem',
          color: 'rgba(201,169,110,0.4)',
          letterSpacing: '0.1em',
        }}
      >
        {isDoha ? 'दोहा' : `॥ ${verse.verse_number} ॥`}
      </div>

      {/* Main text — always Hindi */}
      <p
        style={{
          fontFamily: 'Noto Sans Devanagari, serif',
          fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
          color: '#fff8e7',
          lineHeight: 2.2,
          marginBottom: '1.2rem',
          whiteSpace: 'pre-line',
        }}
      >
        {verse.text_hi}
      </p>

      {/* Romanised / transliteration */}
      <p
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.8rem',
          color: 'rgba(201,169,110,0.6)',
          letterSpacing: '0.06em',
          lineHeight: 1.8,
          marginBottom: '1.2rem',
          whiteSpace: 'pre-line',
          fontStyle: 'italic',
        }}
      >
        {verse.text_en}
      </p>

      {/* Meaning based on language */}
      <div
        style={{
          borderTop: '1px solid rgba(255,193,7,0.12)',
          paddingTop: '1rem',
          marginTop: '0.5rem',
        }}
      >
        <p
          style={{
            fontSize: '0.75rem',
            color: '#c9a96e',
            letterSpacing: '0.08em',
            fontFamily: 'Cinzel, serif',
            marginBottom: '0.4rem',
          }}
        >
          MEANING
        </p>
        <p
          style={{
            fontFamily:
              language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
            fontSize: language === 'hi' ? '1rem' : '0.85rem',
            color: 'rgba(255,248,231,0.7)',
            lineHeight: 1.8,
          }}
        >
          {language === 'en' ? verse.meaning_en : verse.meaning_hi}
        </p>
      </div>
    </motion.div>
  )
}

export default function ChalisaView() {
  const { language } = useTempleStore()
  const { verses, loading } = useChalisa()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'radial-gradient(ellipse at 50% 10%, #1a0520 0%, #0a0515 60%)',
        overflowY: 'auto',
        padding: '5rem 1.5rem 3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '3rem' }}
      >
        <h1
          style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            color: '#ffc107',
            textShadow: '0 0 30px rgba(255,193,7,0.7)',
            marginBottom: '0.4rem',
          }}
        >
          हनुमान चालीसा
        </h1>
        <h2
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
            color: '#c9a96e',
            letterSpacing: '0.2em',
            marginBottom: '1rem',
          }}
        >
          HANUMAN CHALISA
        </h2>
        <p
          style={{
            color: 'rgba(201,169,110,0.6)',
            fontSize: '0.85rem',
            fontFamily: 'Cinzel, serif',
            letterSpacing: '0.1em',
          }}
        >
          {language === 'en' ? '40 Sacred Verses' : '४० पवित्र दोहे'}
        </p>
      </motion.div>

      {/* Verses */}
      {loading ? (
        <p style={{ color: '#c9a96e', fontFamily: 'Cinzel, serif' }}>
          Loading chalisa verses...
        </p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            width: '100%',
            maxWidth: '680px',
          }}
        >
          {verses.map((verse, i) => (
            <VerseCard key={verse.id} verse={verse} language={language} index={i} />
          ))}
        </div>
      )}
    </motion.div>
  )
}
