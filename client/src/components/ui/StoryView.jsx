import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'
import useStories from '../../hooks/useStories'

function StoryCard({ story, language, onClick, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      onClick={() => onClick(story)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(18,8,42,0.8)',
        border: `1px solid ${hovered ? 'rgba(255,193,7,0.6)' : 'rgba(255,193,7,0.15)'}`,
        borderRadius: '14px',
        padding: '1.5rem',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered ? '0 0 20px rgba(255,107,53,0.2)' : 'none',
      }}
    >
      <span style={{ fontSize: '1.8rem' }}>📖</span>
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontFamily: language === 'hi' ? 'Tiro Devanagari Hindi, serif' : 'Cinzel, serif',
            fontSize: language === 'hi' ? '1.1rem' : '0.95rem',
            color: '#fff8e7',
            marginBottom: '0.25rem',
          }}
        >
          {language === 'en' ? story.title_en : story.title_hi}
        </p>
        <p
          style={{
            fontFamily: language === 'hi' ? 'Cinzel, serif' : 'Tiro Devanagari Hindi, serif',
            fontSize: '0.8rem',
            color: '#c9a96e',
          }}
        >
          {language === 'en' ? story.title_hi : story.title_en}
        </p>
      </div>
      <motion.span
        animate={{ x: hovered ? 4 : 0 }}
        style={{ color: '#ffc107', fontSize: '0.9rem' }}
      >
        →
      </motion.span>
    </motion.div>
  )
}

function StoryReader({ story, language, onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      style={{
        background: 'rgba(18,8,42,0.9)',
        border: '1px solid rgba(255,193,7,0.25)',
        borderRadius: '20px',
        padding: '2.5rem',
        maxWidth: '700px',
        width: '100%',
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#c9a96e',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.8rem',
          cursor: 'pointer',
          marginBottom: '1.5rem',
          letterSpacing: '0.08em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: 0,
        }}
      >
        ← All Stories
      </button>

      <h2
        style={{
          fontFamily: language === 'hi' ? 'Tiro Devanagari Hindi, serif' : 'Cinzel, serif',
          fontSize: language === 'hi' ? '1.8rem' : '1.4rem',
          color: '#ffc107',
          marginBottom: '0.5rem',
          lineHeight: 1.4,
        }}
      >
        {language === 'en' ? story.title_en : story.title_hi}
      </h2>
      <p
        style={{
          fontFamily: language === 'hi' ? 'Cinzel, serif' : 'Tiro Devanagari Hindi, serif',
          color: '#c9a96e',
          fontSize: '0.9rem',
          marginBottom: '2rem',
        }}
      >
        {language === 'en' ? story.title_hi : story.title_en}
      </p>

      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,193,7,0.4), transparent)',
          marginBottom: '2rem',
        }}
      />

      <p
        style={{
          fontFamily: language === 'hi' ? 'Tiro Devanagari Hindi, serif' : 'Inter, sans-serif',
          fontSize: language === 'hi' ? '1.15rem' : '1rem',
          color: '#fff8e7',
          lineHeight: 2,
          whiteSpace: 'pre-line',
        }}
      >
        {language === 'en' ? story.content_en : story.content_hi}
      </p>
    </motion.div>
  )
}

export default function StoryView() {
  const { language } = useTempleStore()
  const { stories, loading } = useStories('katha-mandap')
  const [selectedStory, setSelectedStory] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'radial-gradient(ellipse at 50% 20%, #1a082a 0%, #0a0515 70%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '5rem 1.5rem 2rem',
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        <h1
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            color: '#fff8e7',
            letterSpacing: '0.2em',
            textShadow: '0 0 20px rgba(255,193,7,0.5)',
            marginBottom: '0.4rem',
          }}
        >
          📖 KATHA MANDAP
        </h1>
        <p style={{ fontFamily: 'Tiro Devanagari Hindi, serif', color: '#c9a96e', fontSize: '1rem' }}>
          {language === 'en' ? 'Sacred Stories of Hanumat Ji' : 'हनुमत जी की पवित्र कथाएं'}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {selectedStory ? (
          <StoryReader
            key="reader"
            story={selectedStory}
            language={language}
            onBack={() => setSelectedStory(null)}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {loading ? (
              <p style={{ textAlign: 'center', color: '#c9a96e', fontFamily: 'Cinzel, serif' }}>
                Loading stories...
              </p>
            ) : stories.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#c9a96e' }}>No stories found.</p>
            ) : (
              stories.map((s, i) => (
                <StoryCard
                  key={s.id}
                  story={s}
                  language={language}
                  onClick={setSelectedStory}
                  index={i}
                />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
