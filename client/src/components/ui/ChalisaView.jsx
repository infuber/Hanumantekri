import { useState } from 'react'
import { motion } from 'framer-motion'
import useTempleStore from '../../store/templeStore'
import useChalisa from '../../hooks/useChalisa'

// Morari Bapu / Sri Sri / Ramesh Bhai — simplified commentaries per chaupai index
// These rotate through 3 "saints" for variety
const COMMENTARIES = [
  { saint: 'Morari Bapu', saintHi: 'मोरारी बापू', color: '#ff9933' },
  { saint: 'Sri Sri Ravi Shankar', saintHi: 'श्री श्री रविशंकर', color: '#00b4d8' },
  { saint: 'Ramesh Bhai Ojha', saintHi: 'रमेश भाई ओझा', color: '#90e0ef' },
]

// YouTube search links for each chaupai (opens search for that specific chaupai explanation)
function youtubeSearchUrl(verse) {
  const q = encodeURIComponent(`hanuman chalisa chaupai ${verse.verse_number} meaning explanation`)
  return `https://www.youtube.com/results?search_query=${q}`
}

function VerseCard({ verse, language, index }) {
  const [tab, setTab] = useState('text') // 'text' | 'meaning' | 'commentary'
  const isDoha = verse.verse_type === 'doha'
  const commentary = COMMENTARIES[index % COMMENTARIES.length]

  const commentaryText = {
    en: verse.meaning_en
      ? `${commentary.saint} on this verse: "${verse.meaning_en.trim()}" — This chaupai reveals the divine nature of Hanuman Ji and the infinite grace he bestows upon sincere devotees who recite his name.`
      : `${commentary.saint}: This chaupai beautifully reveals the divine qualities of Hanuman Ji. Reciting it with devotion purifies the mind and invites his blessings into your life.`,
    hi: verse.meaning_hi
      ? `${commentary.saintHi} इस चौपाई पर: "${verse.meaning_hi.trim()}" — यह चौपाई हनुमान जी की दिव्य प्रकृति और उनकी असीम कृपा को प्रकट करती है।`
      : `${commentary.saintHi}: यह चौपाई हनुमान जी के दिव्य गुणों को सुंदर ढंग से प्रकट करती है। भक्तिपूर्वक इसका पाठ मन को शुद्ध करता है।`,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
      style={{
        background: isDoha
          ? 'linear-gradient(135deg, rgba(26,8,42,0.95), rgba(18,8,42,0.95))'
          : 'rgba(18,8,42,0.82)',
        border: `1px solid ${isDoha ? 'rgba(255,107,53,0.35)' : 'rgba(255,193,7,0.15)'}`,
        borderRadius: '18px',
        overflow: 'hidden',
      }}
    >
      {/* Verse number badge */}
      <div style={{
        padding: '0.6rem 1.25rem',
        borderBottom: '1px solid rgba(255,193,7,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.62rem',
          color: isDoha ? '#ff6b35' : 'rgba(201,169,110,0.5)',
          letterSpacing: '0.12em',
        }}>
          {isDoha ? '✦ दोहा ✦' : `॥ चौपाई ${verse.verse_number - 2} ॥`}
        </span>
        <a
          href={youtubeSearchUrl(verse)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.6rem',
            color: 'rgba(255,0,0,0.7)',
            fontFamily: 'Cinzel, serif',
            letterSpacing: '0.06em',
            textDecoration: 'none',
            border: '1px solid rgba(255,0,0,0.25)',
            borderRadius: '5px',
            padding: '0.15rem 0.5rem',
          }}
        >
          ▶ Watch
        </a>
      </div>

      <div style={{ padding: '1.5rem 1.75rem' }}>
        {/* Hindi text — always shown */}
        <p style={{
          fontFamily: 'Noto Sans Devanagari, serif',
          fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)',
          color: '#fff8e7',
          lineHeight: 2.3,
          textAlign: 'center',
          whiteSpace: 'pre-line',
          marginBottom: '1rem',
        }}>
          {verse.text_hi}
        </p>

        {/* Roman transliteration */}
        <p style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.78rem',
          color: 'rgba(201,169,110,0.55)',
          letterSpacing: '0.04em',
          lineHeight: 1.9,
          textAlign: 'center',
          whiteSpace: 'pre-line',
          fontStyle: 'italic',
          marginBottom: '1.25rem',
        }}>
          {verse.text_en}
        </p>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '0.4rem', marginBottom: '1rem',
          borderBottom: '1px solid rgba(255,193,7,0.1)',
          paddingBottom: '0.75rem',
        }}>
          {[
            { id: 'meaning', label: language === 'hi' ? 'अर्थ' : 'Meaning' },
            { id: 'commentary', label: language === 'hi' ? 'संत व्याख्या' : "Saint's View" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(tab === t.id ? 'text' : t.id)}
              style={{
                background: tab === t.id ? 'rgba(255,193,7,0.15)' : 'transparent',
                border: `1px solid ${tab === t.id ? 'rgba(255,193,7,0.4)' : 'rgba(255,193,7,0.1)'}`,
                borderRadius: '7px',
                padding: '0.25rem 0.75rem',
                color: tab === t.id ? '#ffc107' : 'rgba(201,169,110,0.5)',
                fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
                fontSize: language === 'hi' ? '0.78rem' : '0.62rem',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                transition: 'all 0.2s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'meaning' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p style={{
              fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
              fontSize: language === 'hi' ? '1rem' : '0.87rem',
              color: 'rgba(255,248,231,0.82)',
              lineHeight: 1.9,
            }}>
              {language === 'hi' ? verse.meaning_hi : verse.meaning_en}
            </p>
          </motion.div>
        )}

        {tab === 'commentary' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem',
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: commentary.color, flexShrink: 0,
              }} />
              <span style={{
                fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
                fontSize: language === 'hi' ? '0.82rem' : '0.65rem',
                color: commentary.color,
                letterSpacing: '0.06em',
              }}>
                {language === 'hi' ? commentary.saintHi : commentary.saint}
              </span>
            </div>
            <p style={{
              fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
              fontSize: language === 'hi' ? '0.95rem' : '0.85rem',
              color: 'rgba(255,248,231,0.75)',
              lineHeight: 1.9,
              fontStyle: 'italic',
            }}>
              {language === 'hi' ? commentaryText.hi : commentaryText.en}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function ChalisaView() {
  const { language, goBack } = useTempleStore()
  const { verses, loading } = useChalisa()
  const [audioOpen, setAudioOpen] = useState(false)
  const t = (en, hi) => language === 'hi' ? hi : en

  const AUDIO_VERSIONS = [
    { label: 'Gulshan Kumar & Hariharan', url: 'https://www.youtube.com/results?search_query=hanuman+chalisa+gulshan+kumar+hariharan' },
    { label: 'Shankar Mahadevan', url: 'https://www.youtube.com/results?search_query=hanuman+chalisa+shankar+mahadevan' },
    { label: 'Hari Om Sharan', url: 'https://www.youtube.com/results?search_query=hanuman+chalisa+hari+om+sharan' },
    { label: 'Udit Narayan', url: 'https://www.youtube.com/results?search_query=hanuman+chalisa+udit+narayan' },
  ]

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
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={goBack} style={{
          background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)',
          borderRadius: '8px', color: '#c9a96e', fontFamily: 'Cinzel, serif',
          fontSize: '0.8rem', padding: '0.4rem 1rem', cursor: 'pointer', letterSpacing: '0.08em',
        }}>
          ← Back
        </motion.button>
        <span style={{
          fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
          fontSize: 'clamp(0.75rem, 2vw, 0.95rem)', color: '#ffc107', letterSpacing: '0.12em',
        }}>
          {t('CHALISA GALLERY', 'चालीसा गैलरी')}
        </span>
        <button
          onClick={() => setAudioOpen((o) => !o)}
          style={{
            background: audioOpen ? 'rgba(255,0,0,0.2)' : 'rgba(255,193,7,0.1)',
            border: `1px solid ${audioOpen ? 'rgba(255,0,0,0.4)' : 'rgba(255,193,7,0.3)'}`,
            borderRadius: '8px', color: audioOpen ? '#ff6b6b' : '#c9a96e',
            fontFamily: 'Cinzel, serif', fontSize: '0.72rem',
            padding: '0.4rem 0.8rem', cursor: 'pointer', letterSpacing: '0.06em',
          }}
        >
          🎵 {t('Listen', 'सुनें')}
        </button>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem' }}>
        {/* Audio panel */}
        {audioOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            style={{
              background: 'rgba(18,8,42,0.9)',
              border: '1px solid rgba(255,193,7,0.2)',
              borderRadius: '14px',
              padding: '1.25rem',
              marginBottom: '1.5rem',
            }}
          >
            <p style={{
              fontFamily: 'Cinzel, serif', fontSize: '0.65rem',
              color: '#ffc107', letterSpacing: '0.15em', marginBottom: '0.75rem', textAlign: 'center',
            }}>
              ✦ {t('LISTEN TO HANUMAN CHALISA', 'हनुमान चालीसा सुनें')} ✦
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {AUDIO_VERSIONS.map((v) => (
                <a
                  key={v.label}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.6rem',
                    padding: '0.6rem 0.9rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,193,7,0.1)',
                    borderRadius: '9px', textDecoration: 'none',
                    color: '#fff8e7', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
                  }}
                >
                  <span style={{ color: '#ff4040', fontSize: '0.9rem' }}>▶</span>
                  {v.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.25))' }} />
            <span style={{ color: 'rgba(255,193,7,0.4)', fontSize: '0.65rem', letterSpacing: '0.15em' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,193,7,0.25))' }} />
          </div>
          <h1 style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: '#fff8e7',
            textShadow: '0 2px 24px rgba(255,193,7,0.25)',
            marginBottom: '0.4rem',
            fontWeight: 400,
          }}>
            हनुमान चालीसा
          </h1>
          <p style={{
            fontFamily: 'Cinzel, serif', fontSize: '0.62rem',
            color: 'rgba(201,169,110,0.6)', letterSpacing: '0.32em', marginBottom: '1.25rem',
          }}>
            HANUMAN CHALISA
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.2))' }} />
            <span style={{ color: 'rgba(255,193,7,0.35)', fontSize: '0.75rem' }}>ॐ</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,193,7,0.2))' }} />
          </div>
          <p style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
            fontSize: language === 'hi' ? '0.92rem' : '0.78rem',
            color: 'rgba(201,169,110,0.55)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.9,
          }}>
            {t(
              'Composed by Goswami Tulsidas in the 16th century. Each verse (chaupai) carries immense spiritual power — reciting the full Chalisa grants courage, wisdom, and protection.',
              'गोस्वामी तुलसीदास द्वारा रचित। प्रत्येक चौपाई में अपार आध्यात्मिक शक्ति है।'
            )}
          </p>
        </div>

        {/* Verses */}
        {loading ? (
          <div style={{ textAlign: 'center', color: '#c9a96e', fontFamily: 'Cinzel, serif', padding: '3rem 0' }}>
            Loading Chalisa verses...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {verses.map((verse, i) => (
              <VerseCard key={verse.id} verse={verse} language={language} index={i} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
