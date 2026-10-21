import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'
import useAreas from '../../hooks/useAreas'

const ICON_MAP = {
  bell: '🔔',
  temple: '🕉️',
  book: '📖',
  scroll: '📜',
  flower: '🪔',
  star: '⭐',
  lotus: '🌸',
}

// New content tabs — hardcoded, no DB needed
const EXTRA_AREAS = [
  {
    id: 'bajrang-baan',
    slug: 'bajrang-baan',
    name_en: 'Bajrang Baan',
    name_hi: 'बजरंग बाण',
    description_en: 'The 41 powerful arrows of Bajrang Baan — complete text with transliteration and meaning.',
    description_hi: '४१ शक्तिशाली बाणों के साथ बजरंग बाण — हिंदी, रोमन और अर्थ सहित।',
    icon: '⚡',
    is_free: true,
    entry_fee: 0,
  },
  {
    id: 'sundar-kand',
    slug: 'sundar-kand',
    name_en: 'Sundar Kand',
    name_hi: 'सुंदर काण्ड',
    description_en: "Hanuman Ji's journey to Lanka — 8 sacred episodes from the Ramayana's most powerful chapter.",
    description_hi: 'हनुमान जी की लंका यात्रा — रामायण के सबसे पवित्र काण्ड के ८ प्रसंग।',
    icon: '🌊',
    is_free: true,
    entry_fee: 0,
  },
  {
    id: 'bhajan-sangrah',
    slug: 'bhajan-sangrah',
    name_en: 'Bhajan Sangrah',
    name_hi: 'भजन संग्रह',
    description_en: 'A complete collection of Hanuman bhajans with full lyrics, transliteration and meaning.',
    description_hi: 'हनुमान जी के भजनों का संग्रह — पूर्ण बोल, रोमन और अर्थ सहित।',
    icon: '🎵',
    is_free: true,
    entry_fee: 0,
  },
  {
    id: 'aarti-sangrah',
    slug: 'aarti-sangrah',
    name_en: 'Aarti Sangrah',
    name_hi: 'आरती संग्रह',
    description_en: 'Complete Hanuman aartis for morning and evening worship — with meaning and ritual guidance.',
    description_hi: 'सुबह और शाम की हनुमान आरतियाँ — अर्थ और पूजा विधि सहित।',
    icon: '🪔',
    is_free: true,
    entry_fee: 0,
  },
  {
    id: 'vrat-katha',
    slug: 'vrat-katha',
    name_en: 'Vrat Katha',
    name_hi: 'व्रत कथा',
    description_en: 'Tuesday & Saturday fasting guide — ritual steps, rules, the sacred Vrat Katha, and Hanuman Jayanti.',
    description_hi: 'मंगलवार और शनिवार व्रत विधि — नियम, कथा, और हनुमान जयंती की जानकारी।',
    icon: '📿',
    is_free: true,
    entry_fee: 0,
  },
  {
    id: 'tirth-yatra',
    slug: 'tirth-yatra',
    name_en: 'Tirth Yatra Guide',
    name_hi: 'तीर्थ यात्रा गाइड',
    description_en: 'Complete pilgrimage guide for all 9 featured Hanuman temples — timings, how to reach, what to offer.',
    description_hi: '९ प्रमुख हनुमान मंदिरों की तीर्थ यात्रा गाइड — समय, मार्ग और अर्पण की जानकारी।',
    icon: '🗺️',
    is_free: true,
    entry_fee: 0,
  },
  {
    id: 'digital-darshan',
    slug: 'digital-darshan',
    name_en: 'Digital Darshan',
    name_hi: 'डिजिटल दर्शन',
    description_en: 'Light a diya, offer mala, ring the ghanti — a full puja experience with Hanuman Ji.',
    description_hi: 'दीपक जलाएं, माला चढ़ाएं, घंटी बजाएं — हनुमान जी के साथ पूर्ण पूजा अनुभव।',
    icon: '🕉️',
    is_free: true,
    entry_fee: 0,
  },
  {
    id: 'seva-sahyog',
    slug: 'seva-sahyog',
    name_en: 'Seva Sahyog',
    name_hi: 'सेवा सहयोग',
    description_en: 'Join in the seva of this sacred space — light a diya, offer flowers, or sponsor a special prayer.',
    description_hi: 'दीपक जलाएं, पुष्प अर्पण करें, या विशेष प्रार्थना के साथ सेवा में सहयोग करें।',
    icon: '🙏',
    is_free: true,
    entry_fee: 0,
  },
]

function SectionDivider({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '1rem',
      width: '100%', maxWidth: '960px', marginBottom: '1.25rem',
    }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.25))' }} />
      <span style={{
        fontFamily: 'Cinzel, serif',
        fontSize: '0.6rem',
        color: 'rgba(255,193,7,0.55)',
        letterSpacing: '0.28em',
        whiteSpace: 'nowrap',
      }}>
        ✦ {label} ✦
      </span>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,193,7,0.25))' }} />
    </div>
  )
}

function AreaCard({ area, index, language, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const icon = ICON_MAP[area.icon] || area.icon || '🕉️'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(area)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'linear-gradient(145deg, rgba(22,10,50,0.97), rgba(16,6,40,0.97))'
          : 'linear-gradient(145deg, rgba(18,8,42,0.92), rgba(12,4,30,0.92))',
        border: `1px solid ${hovered ? 'rgba(255,193,7,0.45)' : 'rgba(255,193,7,0.12)'}`,
        borderTop: `2px solid ${hovered ? 'rgba(255,193,7,0.6)' : 'rgba(255,193,7,0.2)'}`,
        borderRadius: '12px',
        padding: '1.75rem 1.5rem 1.5rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
        textAlign: 'center',
        backdropFilter: 'blur(16px)',
        boxShadow: hovered
          ? '0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,193,7,0.1)'
          : '0 4px 16px rgba(0,0,0,0.4)',
        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Icon in a subtle ring */}
      <div style={{
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        border: `1px solid ${hovered ? 'rgba(255,193,7,0.35)' : 'rgba(255,193,7,0.15)'}`,
        background: 'rgba(255,193,7,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        marginBottom: '0.25rem',
        transition: 'border-color 0.3s ease',
      }}>
        {icon}
      </div>

      {/* Name */}
      <div>
        <div style={{
          fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
          fontSize: language === 'hi' ? 'clamp(1rem, 2.5vw, 1.15rem)' : 'clamp(0.82rem, 2vw, 0.95rem)',
          color: '#fff8e7',
          letterSpacing: language === 'hi' ? 0 : '0.06em',
          marginBottom: '0.2rem',
          lineHeight: 1.3,
        }}>
          {language === 'en' ? area.name_en : area.name_hi}
        </div>
        <div style={{
          fontFamily: language === 'hi' ? 'Cinzel, serif' : 'Noto Sans Devanagari, serif',
          fontSize: language === 'hi' ? '0.7rem' : '0.85rem',
          color: 'rgba(201,169,110,0.55)',
          letterSpacing: language === 'hi' ? '0.05em' : 0,
        }}>
          {language === 'en' ? area.name_hi : area.name_en}
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: language === 'hi' ? '0.82rem' : '0.73rem',
        color: 'rgba(201,169,110,0.55)',
        lineHeight: 1.6,
        maxWidth: '200px',
        margin: '0.1rem 0 0',
        fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
      }}>
        {language === 'en' ? area.description_en : area.description_hi}
      </p>

      {/* Hover underline */}
      <div style={{
        width: hovered ? '2.5rem' : '0',
        height: '1px',
        background: 'rgba(255,193,7,0.5)',
        marginTop: '0.25rem',
        transition: 'width 0.3s ease',
      }} />
    </motion.div>
  )
}

export default function AreaMap() {
  const { language, setArea } = useTempleStore()
  const { areas, loading } = useAreas()
  function handleSelect(area) {
    setArea(area.slug)
  }

  // Merge DB areas with the hardcoded extra areas
  const allAreas = loading ? [] : [...areas, ...EXTRA_AREAS]

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
          justifyContent: 'flex-start',
          padding: '5rem 1.5rem 3rem',
          background: 'rgba(10,5,21,0.82)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.4))' }} />
            <span style={{ color: 'rgba(255,193,7,0.5)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>ॐ</span>
            <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,193,7,0.4))' }} />
          </div>
          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(1.4rem, 4vw, 2.1rem)',
            color: '#fff8e7',
            letterSpacing: '0.22em',
            textShadow: '0 2px 20px rgba(255,193,7,0.35)',
            marginBottom: '0.5rem',
            fontWeight: 400,
          }}>
            ENTER THE TEMPLE
          </h1>
          <p style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: '1rem',
            color: 'rgba(201,169,110,0.65)',
            marginBottom: '1.25rem',
          }}>
            {language === 'en' ? 'Choose your sacred path' : 'अपना पवित्र मार्ग चुनें'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}>
            <div style={{ width: '40px', height: '1px', background: 'rgba(255,193,7,0.2)' }} />
            <span style={{ color: 'rgba(255,193,7,0.3)', fontSize: '0.55rem', letterSpacing: '0.15em' }}>✦ ✦ ✦</span>
            <div style={{ width: '40px', height: '1px', background: 'rgba(255,193,7,0.2)' }} />
          </div>
        </motion.div>

        {/* Area cards */}
        {loading ? (
          <div style={{ color: '#c9a96e', fontFamily: 'Cinzel, serif', letterSpacing: '0.1em' }}>
            Loading sacred spaces...
          </div>
        ) : (
          <>
            {/* Primary areas (from DB) */}
            <SectionDivider label={language === 'hi' ? 'मंदिर के कक्ष' : 'TEMPLE CHAMBERS'} />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem', width: '100%', maxWidth: '960px', marginBottom: '2.5rem' }}>
              {areas.map((area, i) => (
                <div key={area.id} style={{ width: 'clamp(175px, calc(25% - 1rem), 215px)', flexShrink: 1 }}>
                  <AreaCard area={area} index={i} language={language} onSelect={handleSelect} />
                </div>
              ))}
            </div>

            {/* New content tabs */}
            <SectionDivider label={language === 'hi' ? 'पवित्र ग्रंथ और यात्रा' : 'SACRED TEXTS & YATRA'} />
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.25rem', width: '100%', maxWidth: '960px' }}>
              {EXTRA_AREAS.map((area, i) => (
                <div key={area.id} style={{ width: 'clamp(175px, calc(25% - 1rem), 215px)', flexShrink: 1 }}>
                  <AreaCard area={area} index={areas.length + i} language={language} onSelect={handleSelect} />
                </div>
              ))}
            </div>
          </>
        )}
      </motion.div>

    </>
  )
}
