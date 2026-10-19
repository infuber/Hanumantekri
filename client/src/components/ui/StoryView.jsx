import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'
import useStories from '../../hooks/useStories'

const SOURCE_COLORS = {
  'Valmiki Ramayana': '#ff9933',
  'Ramcharitmanas': '#ffd700',
  'Skanda Purana': '#c8a2c8',
  'Mahabharata': '#87ceeb',
  'Krittivasi Ramayana': '#98fb98',
}

function SourceBadge({ source, language }) {
  if (!source) return null
  const color = SOURCE_COLORS[source] || '#c9a96e'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      background: `${color}18`,
      border: `1px solid ${color}50`,
      borderRadius: '20px',
      padding: '0.2rem 0.65rem',
      fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
      fontSize: language === 'hi' ? '0.72rem' : '0.6rem',
      color: color,
      letterSpacing: '0.04em',
      marginBottom: '0.5rem',
    }}>
      📖 {source}
    </span>
  )
}

function StoryCard({ story, language, onClick, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={() => onClick(story)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'rgba(18,8,42,0.82)',
        border: `1px solid ${hovered ? 'rgba(255,193,7,0.55)' : 'rgba(255,193,7,0.12)'}`,
        borderRadius: '16px',
        padding: '1.2rem 1.4rem',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease',
        boxShadow: hovered ? '0 0 25px rgba(255,107,53,0.2)' : 'none',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ marginBottom: '0.4rem' }}>
        <SourceBadge
          source={story.scripture_source || 'Valmiki Ramayana'}
          language={language}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
        <span style={{ fontSize: '1.6rem', flexShrink: 0, marginTop: '0.1rem' }}>📖</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
            fontSize: language === 'hi' ? '1.1rem' : '0.95rem',
            color: '#fff8e7',
            marginBottom: '0.2rem',
            lineHeight: 1.4,
          }}>
            {language === 'en' ? story.title_en : story.title_hi}
          </p>
          <p style={{
            fontFamily: language === 'hi' ? 'Cinzel, serif' : 'Noto Sans Devanagari, serif',
            fontSize: language === 'hi' ? '0.7rem' : '0.85rem',
            color: '#c9a96e',
          }}>
            {language === 'en' ? story.title_hi : story.title_en}
          </p>
          {story.reading_time_mins && (
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.65rem',
              color: 'rgba(201,169,110,0.45)',
              marginTop: '0.3rem',
            }}>
              {story.reading_time_mins} min read
            </p>
          )}
        </div>
        <motion.span
          animate={{ x: hovered ? 5 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: '#ffc107', fontSize: '0.9rem', flexShrink: 0 }}
        >
          →
        </motion.span>
      </div>
    </motion.div>
  )
}

function StoryReader({ story, language, onBack }) {
  const t = (en, hi) => language === 'hi' ? hi : en

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      style={{
        background: 'rgba(18,8,42,0.92)',
        border: '1px solid rgba(255,193,7,0.2)',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '700px',
        width: '100%',
      }}
    >
      <button
        onClick={onBack}
        style={{
          background: 'transparent', border: 'none', color: '#c9a96e',
          fontFamily: 'Cinzel, serif', fontSize: '0.78rem', cursor: 'pointer',
          marginBottom: '1.25rem', letterSpacing: '0.08em',
          display: 'flex', alignItems: 'center', gap: '0.4rem', padding: 0,
        }}
      >
        ← {t('All Stories', 'सभी कथाएं')}
      </button>

      {/* Source badge */}
      <SourceBadge
        source={story.scripture_source || 'Valmiki Ramayana'}
        language={language}
      />

      <h2 style={{
        fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
        fontSize: language === 'hi' ? '1.7rem' : '1.3rem',
        color: '#ffc107',
        marginBottom: '0.4rem',
        marginTop: '0.5rem',
        lineHeight: 1.4,
      }}>
        {language === 'en' ? story.title_en : story.title_hi}
      </h2>
      <p style={{
        fontFamily: language === 'hi' ? 'Cinzel, serif' : 'Noto Sans Devanagari, serif',
        color: '#c9a96e', fontSize: '0.88rem', marginBottom: '1.5rem',
      }}>
        {language === 'en' ? story.title_hi : story.title_en}
      </p>

      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,193,7,0.4), transparent)',
        marginBottom: '1.75rem',
      }} />

      <p style={{
        fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
        fontSize: language === 'hi' ? '1.12rem' : '0.97rem',
        color: '#fff8e7',
        lineHeight: language === 'hi' ? 2.1 : 1.95,
        whiteSpace: 'pre-line',
      }}>
        {language === 'en' ? story.content_en : story.content_hi}
      </p>

      {/* Source info footer */}
      <div style={{
        marginTop: '2rem',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(255,193,7,0.1)',
        display: 'flex', alignItems: 'center', gap: '0.6rem',
      }}>
        <span style={{ fontSize: '1rem' }}>📚</span>
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
          color: 'rgba(201,169,110,0.55)',
        }}>
          {t('Source:', 'स्रोत:')} {story.scripture_source || 'Valmiki Ramayana'}
          {story.scripture_source_hi && ` (${story.scripture_source_hi})`}
        </span>
      </div>
    </motion.div>
  )
}

export default function StoryView() {
  const { language, goBack } = useTempleStore()
  const { stories, loading } = useStories('katha-mandap')
  const [selectedStory, setSelectedStory] = useState(null)
  const t = (en, hi) => language === 'hi' ? hi : en

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
        overflowY: 'auto',
      }}
    >
      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(10,5,21,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,193,7,0.15)',
        padding: '0.85rem 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={selectedStory ? () => setSelectedStory(null) : goBack}
          style={{
            background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)',
            borderRadius: '8px', color: '#c9a96e', fontFamily: 'Cinzel, serif',
            fontSize: '0.8rem', padding: '0.4rem 1rem', cursor: 'pointer', letterSpacing: '0.08em',
          }}>
          ← {selectedStory ? t('Stories', 'कथाएं') : t('Back', 'वापस')}
        </motion.button>
        <span style={{
          fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
          fontSize: 'clamp(0.75rem, 2vw, 0.95rem)', color: '#ffc107', letterSpacing: '0.12em',
        }}>
          {t('KATHA MANDAP', 'कथा मण्डप')}
        </span>
        <div style={{ fontSize: '1.3rem' }}>📖</div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem' }}>
        <AnimatePresence mode="wait">
          {selectedStory ? (
            <StoryReader
              key="reader"
              story={selectedStory}
              language={language}
              onBack={() => setSelectedStory(null)}
            />
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{
                  fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
                  fontSize: 'clamp(1.5rem, 4.5vw, 2.2rem)',
                  color: '#ffc107', textShadow: '0 0 25px rgba(255,193,7,0.6)',
                  marginBottom: '0.4rem',
                }}>
                  {t('Sacred Stories', 'पवित्र कथाएं')}
                </h1>
                <p style={{
                  fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                  fontSize: '0.85rem', color: 'rgba(201,169,110,0.7)', lineHeight: 1.7,
                  maxWidth: '500px', margin: '0 auto',
                }}>
                  {t(
                    'Stories of Hanuman Ji from Valmiki Ramayana, Ramcharitmanas, Skanda Purana, and Mahabharata',
                    'वाल्मीकि रामायण, रामचरितमानस, स्कंद पुराण और महाभारत से हनुमान जी की कथाएं'
                  )}
                </p>

                {/* Source legend */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginTop: '1rem' }}>
                  {Object.entries(SOURCE_COLORS).map(([src, color]) => (
                    <span key={src} style={{
                      background: `${color}15`,
                      border: `1px solid ${color}40`,
                      borderRadius: '12px',
                      padding: '0.15rem 0.5rem',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.6rem',
                      color: color,
                    }}>
                      {src}
                    </span>
                  ))}
                </div>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', color: '#c9a96e', fontFamily: 'Cinzel, serif', padding: '3rem 0' }}>
                  Loading sacred stories...
                </div>
              ) : stories.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#c9a96e' }}>No stories found.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {stories.map((s, i) => (
                    <StoryCard
                      key={s.id} story={s} language={language}
                      onClick={setSelectedStory} index={i}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
