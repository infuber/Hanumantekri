import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

// ─── Data ────────────────────────────────────────────────────────────────────

const PUJA_STEPS = [
  {
    num: 1,
    icon: '🌅',
    en: 'Wake up before sunrise and take a purifying bath.',
    hi: 'सूर्योदय से पहले उठें और शुद्धिकारक स्नान करें।',
  },
  {
    num: 2,
    icon: '👘',
    en: 'Wear clean clothes — preferably red or saffron (especially on Tuesday).',
    hi: 'स्वच्छ वस्त्र पहनें — विशेषतः मंगलवार को लाल या केसरिया रंग।',
  },
  {
    num: 3,
    icon: '🔴',
    en: 'Apply sindoor (vermillion) tilak on Hanuman Ji\'s idol or image using your ring finger.',
    hi: 'अनामिका उंगली से हनुमान जी की मूर्ति या चित्र पर सिंदूर का तिलक लगाएं।',
  },
  {
    num: 4,
    icon: '🪔',
    en: 'Light a diya (lamp) with mustard oil (sarson ka tel). Keep it burning throughout the puja.',
    hi: 'सरसों के तेल का दीपक जलाएं। पूजा के दौरान इसे जलता रहने दें।',
  },
  {
    num: 5,
    icon: '🌸',
    en: 'Offer a jasmine garland (chameli mala) and red flowers — marigold and hibiscus are especially beloved.',
    hi: 'चमेली की माला और लाल फूल चढ़ाएं — गेंदा और गुड़हल विशेष रूप से प्रिय हैं।',
  },
  {
    num: 6,
    icon: '🟡',
    en: 'Offer boondi laddoo as prasad — 21 for major occasions, 11 for regular puja.',
    hi: 'प्रसाद के रूप में बूंदी लड्डू चढ़ाएं — बड़े अवसरों पर २१, नियमित पूजा पर ११।',
  },
  {
    num: 7,
    icon: '📖',
    en: 'Recite Hanuman Chalisa — minimum 1 paath (recitation), ideally 5 or 11 on special days.',
    hi: 'हनुमान चालीसा का पाठ करें — न्यूनतम १ बार, विशेष दिनों पर ५ या ११ बार।',
  },
  {
    num: 8,
    icon: '📜',
    en: 'Read or recite the Vrat Katha (the sacred story below).',
    hi: 'व्रत कथा (नीचे दी गई पवित्र कहानी) पढ़ें या सुनाएं।',
  },
  {
    num: 9,
    icon: '🙏',
    en: 'Perform the aarti — light the camphor (kapur) flame and sing Aarti Kije Hanuman Lala Ki.',
    hi: 'आरती करें — कपूर की लौ जलाएं और "आरती कीजे हनुमान लला की" गाएं।',
  },
  {
    num: 10,
    icon: '🎁',
    en: 'Distribute prasad to family, neighbors, and the needy. The act of giving multiplies blessings.',
    hi: 'परिवार, पड़ोसियों और जरूरतमंदों को प्रसाद बांटें। देने से आशीर्वाद कई गुना होता है।',
  },
]

const SPECIAL_OCCASIONS = [
  {
    icon: '📚',
    en: 'Exams & Interviews',
    hi: 'परीक्षा और साक्षात्कार',
    detail: {
      en: 'Visit the temple on Tuesday before the exam. Recite the Hanuman Chalisa 5 times and pray for clarity of mind, memory, and confidence. Hanuman Ji, as the embodiment of Bal (strength), Buddhi (intellect), and Vidya (knowledge), is the ideal deity to seek before any test of knowledge or skill.',
      hi: 'परीक्षा से पहले मंगलवार को मंदिर जाएं। हनुमान चालीसा का ५ बार पाठ करें और मन की स्पष्टता, स्मृति और आत्मविश्वास के लिए प्रार्थना करें। हनुमान जी बल, बुद्धि और विद्या के अवतार हैं।',
    },
    color: '#ffd700',
    day: 'tuesday',
  },
  {
    icon: '🏥',
    en: 'Health Crises & Illness',
    hi: 'स्वास्थ्य संकट और बीमारी',
    detail: {
      en: 'Light a mustard-oil lamp and recite the Hanuman Bahuk composed by Tulsidas — a prayer he wrote when suffering from intense physical pain. Read the Sundar Kand for healing of body and mind. Any day works, but Tuesday is most auspicious.',
      hi: 'सरसों के तेल का दीया जलाएं और तुलसीदास रचित हनुमान बाहुक का पाठ करें — एक प्रार्थना जो उन्होंने भीषण शारीरिक पीड़ा में लिखी थी। शरीर और मन की चिकित्सा के लिए सुंदरकांड पढ़ें।',
    },
    color: '#64c8ff',
    day: 'any',
  },
  {
    icon: '🪐',
    en: 'Shani Dasha (Saturn Period)',
    hi: 'शनि दशा (शनि की साढ़े साती)',
    detail: {
      en: 'During Shani Mahadasha or Sade Sati (7.5-year Saturn transit), visit the Hanuman temple every Saturday. Light a sesame oil lamp, offer black urad dal, and recite the Hanuman Chalisa. Since Hanuman Ji freed Shani Dev from Ravana\'s captivity, Shani Dev promised to not afflict Hanuman\'s devotees. This is among the most powerful remedies in Vedic astrology.',
      hi: 'शनि महादशा या साढ़े साती के दौरान प्रत्येक शनिवार को हनुमान मंदिर जाएं। तिल के तेल का दीपक जलाएं, काली उड़द दाल चढ़ाएं और हनुमान चालीसा का पाठ करें। चूंकि हनुमान जी ने शनि देव को रावण की कैद से मुक्त किया था, इसलिए शनि देव ने प्रतिज्ञा की थी कि वे हनुमान के भक्तों को पीड़ा नहीं देंगे।',
    },
    color: '#b0b0ff',
    day: 'saturday',
  },
  {
    icon: '✈️',
    en: 'Before Journeys & Travel',
    hi: 'यात्रा से पहले',
    detail: {
      en: 'Hanuman Ji crossed vast distances — from India to Lanka in a single leap — making him the supreme protector of travelers. Before any significant journey, visit the temple, offer a coconut, and recite 3 Hanuman Chalisa paaths. Many devotees keep a small Hanuman image or yantra in their vehicle for protection.',
      hi: 'हनुमान जी ने भारत से लंका तक एक ही छलांग में विशाल दूरी पार की — वे यात्रियों के परम रक्षक हैं। किसी भी महत्वपूर्ण यात्रा से पहले मंदिर जाएं, नारियल चढ़ाएं और ३ बार हनुमान चालीसा का पाठ करें।',
    },
    color: '#90e0ef',
    day: 'any',
  },
  {
    icon: '⚖️',
    en: 'Court Cases & Legal Disputes',
    hi: 'न्यायालय और कानूनी विवाद',
    detail: {
      en: 'Hanuman Ji is celebrated as a master of strategy, diplomacy, and righteous conflict resolution. Recite the Bajrang Baan on Tuesdays for protection in legal matters. Offer sindoor and boondi laddoo, and pray for truth to prevail. The Bajrang Baan is considered one of the most powerful protective prayers in the Hanuman canon.',
      hi: 'हनुमान जी रणनीति, कूटनीति और धार्मिक संघर्ष समाधान के स्वामी के रूप में प्रसिद्ध हैं। कानूनी मामलों में सुरक्षा के लिए मंगलवार को बजरंग बाण का पाठ करें। सिंदूर और बूंदी लड्डू चढ़ाएं और सत्य की जीत के लिए प्रार्थना करें।',
    },
    color: '#ffa07a',
    day: 'tuesday',
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionCard({ title, titleHi, icon, language, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  const t = (en, hi) => language === 'hi' ? hi : en

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4 }}
      style={{
        background: 'rgba(18,8,42,0.82)',
        border: '1px solid rgba(255,193,7,0.15)',
        borderRadius: '18px',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', textAlign: 'left',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '1.25rem 1.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.4rem' }}>{icon}</span>
          <h2 style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
            fontSize: language === 'hi' ? 'clamp(1rem, 3vw, 1.2rem)' : 'clamp(0.85rem, 2.5vw, 1rem)',
            color: '#ffc107',
            margin: 0,
            letterSpacing: language === 'hi' ? 0 : '0.06em',
          }}>
            {t(title, titleHi)}
          </h2>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ color: '#c9a96e', fontSize: '1rem', flexShrink: 0 }}
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              borderTop: '1px solid rgba(255,193,7,0.1)',
              padding: '1.5rem',
            }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Para({ children, language, size = 'normal' }) {
  const fontSizes = {
    normal: { en: '0.85rem', hi: '0.97rem' },
    large: { en: '0.95rem', hi: '1.08rem' },
    small: { en: '0.78rem', hi: '0.88rem' },
  }
  return (
    <p style={{
      fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
      fontSize: language === 'hi' ? fontSizes[size].hi : fontSizes[size].en,
      color: 'rgba(255,248,231,0.82)',
      lineHeight: language === 'hi' ? 2 : 1.85,
      marginBottom: '1rem',
    }}>
      {children}
    </p>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: 'Cinzel, serif',
      fontSize: '0.58rem',
      color: '#ffc107',
      letterSpacing: '0.14em',
      marginBottom: '0.75rem',
      marginTop: '1.5rem',
    }}>
      ✦ {children} ✦
    </p>
  )
}

// ─── Diya animation ──────────────────────────────────────────────────────────

function DiyaFlame() {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Flame */}
      <motion.div
        animate={{
          scaleY: [1, 1.15, 0.92, 1.08, 1],
          scaleX: [1, 0.88, 1.06, 0.94, 1],
          opacity: [0.9, 1, 0.85, 1, 0.9],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '14px', height: '22px',
          background: 'radial-gradient(ellipse at 50% 70%, #fff176 0%, #ffb300 45%, rgba(255,80,0,0.3) 100%)',
          borderRadius: '50% 50% 30% 30%',
          boxShadow: '0 0 12px 4px rgba(255,180,0,0.5)',
          marginBottom: '2px',
          transformOrigin: 'bottom center',
        }}
      />
      {/* Wick */}
      <div style={{ width: '2px', height: '8px', background: '#555', borderRadius: '1px' }} />
      {/* Diya bowl */}
      <div style={{
        width: '36px', height: '14px',
        background: 'radial-gradient(ellipse at 50% 100%, #b8860b 0%, #8b6914 100%)',
        borderRadius: '50% 50% 40% 40%',
        boxShadow: '0 2px 8px rgba(200,120,0,0.3)',
        marginTop: '-2px',
      }} />
      {/* Glow */}
      <motion.div
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60px', height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,180,0,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function VratKathaView() {
  const { language, goBack } = useTempleStore()
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
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={goBack}
          style={{
            background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)',
            borderRadius: '8px', color: '#c9a96e', fontFamily: 'Cinzel, serif',
            fontSize: '0.8rem', padding: '0.4rem 1rem', cursor: 'pointer', letterSpacing: '0.08em',
          }}
        >
          ← {t('Back', 'वापस')}
        </motion.button>

        <span style={{
          fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
          fontSize: 'clamp(0.75rem, 2vw, 0.95rem)',
          color: '#ffc107', letterSpacing: language === 'hi' ? 0 : '0.12em',
        }}>
          {t('VRAT KATHA', 'व्रत कथा')}
        </span>

        <div style={{ width: '80px' }} />
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '1.5rem 1.25rem 5rem' }}>

        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.25))' }} />
            <DiyaFlame />
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
            व्रत कथा
          </h1>
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.62rem',
            color: 'rgba(201,169,110,0.6)',
            letterSpacing: '0.32em',
            marginBottom: '1.25rem',
          }}>
            VRAT KATHA
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.2))' }} />
            <span style={{ color: 'rgba(255,193,7,0.35)', fontSize: '0.55rem', letterSpacing: '0.15em' }}>✦ ✦ ✦</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,193,7,0.2))' }} />
          </div>
          <p style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
            fontSize: language === 'hi' ? '0.92rem' : '0.78rem',
            color: 'rgba(201,169,110,0.55)',
            maxWidth: '460px',
            margin: '0 auto',
            lineHeight: 1.9,
          }}>
            {t(
              'A complete guide to Hanuman Ji\'s vrat — fasting rules, puja steps, the complete sacred Katha, Hanuman Jayanti observances, and when to seek his blessings.',
              'हनुमान जी के व्रत की पूर्ण मार्गदर्शिका — उपवास नियम, पूजा विधि, पूर्ण पवित्र कथा और हनुमान जयंती के नियम।'
            )}
          </p>
        </motion.div>

        {/* ─── Day color indicator ─── */}
        <div style={{
          display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap',
        }}>
          {[
            { label: t('Tuesday', 'मंगलवार'), labelSub: t('Hanuman\'s birth', 'जन्म दिवस'), color: '#ff6b35', bg: 'rgba(255,107,53,0.1)', border: 'rgba(255,107,53,0.35)' },
            { label: t('Saturday', 'शनिवार'), labelSub: t('Shani deliverance', 'शनि मुक्ति'), color: '#b0b0ff', bg: 'rgba(176,176,255,0.1)', border: 'rgba(176,176,255,0.35)' },
          ].map((day) => (
            <div key={day.label} style={{
              background: day.bg,
              border: `1px solid ${day.border}`,
              borderRadius: '12px',
              padding: '0.6rem 1.25rem',
              textAlign: 'center',
            }}>
              <p style={{
                fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
                fontSize: language === 'hi' ? '1rem' : '0.78rem',
                color: day.color,
                margin: '0 0 0.15rem',
                letterSpacing: language === 'hi' ? 0 : '0.08em',
              }}>
                {day.label}
              </p>
              <p style={{
                fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                fontSize: language === 'hi' ? '0.75rem' : '0.65rem',
                color: 'rgba(255,248,231,0.45)',
                margin: 0,
              }}>
                {day.labelSub}
              </p>
            </div>
          ))}
        </div>

        {/* ─── All sections ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* SECTION 1: Tuesday & Saturday significance */}
          <SectionCard
            title="Why Tuesday & Saturday?"
            titleHi="मंगलवार और शनिवार क्यों?"
            icon="📅"
            language={language}
            defaultOpen={true}
          >
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem',
            }}>
              {/* Tuesday */}
              <div style={{
                background: 'rgba(255,107,53,0.07)',
                border: '1px solid rgba(255,107,53,0.25)',
                borderRadius: '12px',
                padding: '1.25rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff6b35', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
                    fontSize: language === 'hi' ? '1rem' : '0.75rem',
                    color: '#ff6b35',
                    letterSpacing: language === 'hi' ? 0 : '0.08em',
                  }}>
                    {t('TUESDAY (MANGALWAR)', 'मंगलवार')}
                  </span>
                </div>
                <Para language={language}>
                  {t(
                    'Hanuman Ji was born on the Chaitra Purnima of a Tuesday, in the Treta Yuga. Mars (Mangal Graha) governs Tuesday, and Mars embodies the qualities of strength, courage, and valor — the very essence of Hanuman Ji\'s being. On this day, the red color is especially sacred: devotees wear red or saffron, offer red flowers, and apply sindoor (vermillion) on Hanuman Ji\'s idol. The red tilak on his forehead represents his eternal readiness for battle against evil.',
                    'हनुमान जी का जन्म त्रेता युग में चैत्र पूर्णिमा के एक मंगलवार को हुआ था। मंगल ग्रह मंगलवार का स्वामी है, और मंगल शक्ति, साहस और वीरता का प्रतीक है — जो हनुमान जी के स्वभाव का सार है। इस दिन लाल रंग विशेष रूप से पवित्र है: भक्त लाल या केसरिया पहनते हैं, लाल फूल चढ़ाते हैं और हनुमान जी की मूर्ति पर सिंदूर लगाते हैं।'
                  )}
                </Para>
                <Para language={language}>
                  {t(
                    'Fasting on Tuesday and visiting the Hanuman temple is one of the most widely practised devotional acts in India. The fast, when observed with sincerity, is believed to remove fear, grant physical strength, and protect the devotee from enemies and obstacles.',
                    'मंगलवार को उपवास रखना और हनुमान मंदिर जाना भारत में सबसे व्यापक रूप से प्रचलित भक्ति कार्यों में से एक है। ईमानदारी से किया गया व्रत भय को दूर करता है, शारीरिक शक्ति प्रदान करता है और भक्त को शत्रुओं और बाधाओं से बचाता है।'
                  )}
                </Para>
              </div>

              {/* Saturday */}
              <div style={{
                background: 'rgba(176,176,255,0.07)',
                border: '1px solid rgba(176,176,255,0.25)',
                borderRadius: '12px',
                padding: '1.25rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#b0b0ff', flexShrink: 0 }} />
                  <span style={{
                    fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
                    fontSize: language === 'hi' ? '1rem' : '0.75rem',
                    color: '#b0b0ff',
                    letterSpacing: language === 'hi' ? 0 : '0.08em',
                  }}>
                    {t('SATURDAY (SHANIWAR)', 'शनिवार')}
                  </span>
                </div>
                <Para language={language}>
                  {t(
                    'The connection between Hanuman Ji and Shani Dev (Saturn) is one of the most beloved stories in the Ramayana tradition. When Ravana captured Shani Dev and imprisoned him upside-down, Hanuman Ji rescued him during the burning of Lanka. In profound gratitude, Shani Dev promised that he would reduce his malefic influence on any person who is a true devotee of Hanuman Ji.',
                    'हनुमान जी और शनि देव (शनि) के बीच का संबंध रामायण परंपरा की सबसे प्रिय कहानियों में से एक है। जब रावण ने शनि देव को उल्टा कारावास में बंद कर दिया था, तो हनुमान जी ने लंका दहन के दौरान उन्हें मुक्त कराया था। गहरी कृतज्ञता में, शनि देव ने वचन दिया कि वे हनुमान जी के सच्चे भक्त पर अपना बुरा प्रभाव कम करेंगे।'
                  )}
                </Para>
                <Para language={language}>
                  {t(
                    'For this reason, Saturday worship of Hanuman Ji is especially powerful for those undergoing Shani Dasha (Saturn\'s major period), Sade Sati (7.5-year Saturn transit), or Dhaiya (2.5-year transit). Oil lamps (sesame or mustard), black sesame seeds, and blue/black cloth are offered on Saturdays. This practice simultaneously pleases both Hanuman Ji and Shani Dev.',
                    'इसीलिए शनि दशा, साढ़े साती या ढैय्या से गुज़र रहे लोगों के लिए शनिवार को हनुमान जी की पूजा विशेष रूप से शक्तिशाली है। शनिवार को तेल के दीपक (तिल या सरसों), काले तिल और नीले/काले वस्त्र चढ़ाए जाते हैं। यह अभ्यास हनुमान जी और शनि देव दोनों को एक साथ प्रसन्न करता है।'
                  )}
                </Para>
              </div>
            </div>
          </SectionCard>

          {/* SECTION 2: Vrat (Fasting) Rules */}
          <SectionCard
            title="Vrat (Fasting) Rules"
            titleHi="व्रत के नियम"
            icon="🌿"
            language={language}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              {/* What to eat */}
              <div style={{
                background: 'rgba(100,220,100,0.06)',
                border: '1px solid rgba(100,220,100,0.2)',
                borderRadius: '12px',
                padding: '1.25rem',
              }}>
                <p style={{
                  fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: '#90ee90',
                  letterSpacing: '0.1em', marginBottom: '0.75rem',
                }}>
                  ✓ {t('PERMITTED FOODS', 'अनुमत खाद्य पदार्थ')}
                </p>
                {[
                  t('Fruits (all varieties)', 'फल (सभी प्रकार)'),
                  t('Milk, curd (dahi), buttermilk', 'दूध, दही, छाछ'),
                  t('Sendha namak (rock salt) only', 'केवल सेंधा नमक'),
                  t('Potatoes (aloo), sweet potatoes', 'आलू, शकरकंद'),
                  t('Sabudana (sago/tapioca pearls)', 'साबूदाना'),
                  t('Makhana (fox nuts / lotus seeds)', 'मखाना'),
                  t('Peanuts (groundnuts)', 'मूंगफली'),
                  t('Boondi laddoo (as prasad first)', 'बूंदी लड्डू (पहले प्रसाद के रूप में)'),
                  t('Singhare ka atta (water chestnut flour)', 'सिंघाड़े का आटा'),
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#90ee90', fontSize: '0.7rem', flexShrink: 0, marginTop: '0.1rem' }}>•</span>
                    <span style={{
                      fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                      fontSize: language === 'hi' ? '0.88rem' : '0.78rem',
                      color: 'rgba(255,248,231,0.8)',
                      lineHeight: 1.6,
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* What to avoid */}
              <div style={{
                background: 'rgba(220,80,80,0.06)',
                border: '1px solid rgba(220,80,80,0.2)',
                borderRadius: '12px',
                padding: '1.25rem',
              }}>
                <p style={{
                  fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: '#ff8080',
                  letterSpacing: '0.1em', marginBottom: '0.75rem',
                }}>
                  ✕ {t('FORBIDDEN ITEMS', 'वर्जित वस्तुएँ')}
                </p>
                {[
                  t('Non-vegetarian food (meat, fish, eggs)', 'मांसाहारी भोजन (मांस, मछली, अंडे)'),
                  t('Alcohol and tobacco in all forms', 'शराब और तंबाकू सभी रूपों में'),
                  t('Regular salt (only rock salt permitted)', 'सामान्य नमक (केवल सेंधा नमक)'),
                  t('Onion and garlic', 'प्याज और लहसुन'),
                  t('Wheat, rice, and other grains (full fast)', 'गेहूं, चावल और अन्य अनाज (पूर्ण व्रत में)'),
                  t('Oil-fried foods in excess', 'अत्यधिक तले-भुने खाद्य पदार्थ'),
                  t('Lying, anger, or harsh speech on fast days', 'व्रत के दिन झूठ, क्रोध या कटु वाणी'),
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#ff8080', fontSize: '0.7rem', flexShrink: 0, marginTop: '0.1rem' }}>×</span>
                    <span style={{
                      fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                      fontSize: language === 'hi' ? '0.88rem' : '0.78rem',
                      color: 'rgba(255,248,231,0.8)',
                      lineHeight: 1.6,
                    }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Timing note */}
            <div style={{
              background: 'rgba(255,193,7,0.06)',
              border: '1px solid rgba(255,193,7,0.2)',
              borderRadius: '10px',
              padding: '1rem 1.25rem',
            }}>
              <p style={{
                fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: '#ffc107',
                letterSpacing: '0.1em', margin: '0 0 0.5rem',
              }}>
                ⏰ {t('FASTING DURATION', 'उपवास की अवधि')}
              </p>
              <Para language={language} size="small">
                {t(
                  'The fast may be observed from sunrise to sunset (partial fast), allowing a single meal of permitted foods in the evening. For a full-day fast, take only water, milk, and fruit. The key is intention and sincerity — Hanuman Ji values devotion over ritual perfection.',
                  'व्रत सूर्योदय से सूर्यास्त तक (आंशिक उपवास) रखा जा सकता है, जिसमें शाम को अनुमत खाद्य पदार्थों का एक भोजन लिया जा सकता है। पूर्ण दिन के उपवास के लिए केवल पानी, दूध और फल लें। सबसे महत्वपूर्ण है भाव और ईमानदारी — हनुमान जी अनुष्ठान की पूर्णता से अधिक भक्ति को महत्व देते हैं।'
                )}
              </Para>
            </div>
          </SectionCard>

          {/* SECTION 3: Puja Ritual Steps */}
          <SectionCard
            title="Step-by-Step Puja Ritual"
            titleHi="पूजा की विधि — चरण दर चरण"
            icon="🪔"
            language={language}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {PUJA_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    background: 'rgba(10,5,21,0.4)',
                    border: '1px solid rgba(255,193,7,0.08)',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                  }}
                >
                  {/* Step number */}
                  <div style={{
                    width: '32px', height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255,193,7,0.12)',
                    border: '1px solid rgba(255,193,7,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      fontFamily: 'Cinzel, serif', fontSize: '0.68rem',
                      color: '#ffc107', fontWeight: 600,
                    }}>
                      {step.num}
                    </span>
                  </div>

                  {/* Icon + text */}
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', flex: 1 }}>
                    <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }}>{step.icon}</span>
                    <p style={{
                      fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                      fontSize: language === 'hi' ? '0.95rem' : '0.83rem',
                      color: 'rgba(255,248,231,0.85)',
                      lineHeight: language === 'hi' ? 2 : 1.75,
                      margin: 0,
                    }}>
                      {language === 'hi' ? step.hi : step.en}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionCard>

          {/* SECTION 4: The Complete Vrat Katha */}
          <SectionCard
            title="The Complete Vrat Katha"
            titleHi="सम्पूर्ण व्रत कथा"
            icon="📜"
            language={language}
            defaultOpen={true}
          >
            {/* English Katha */}
            <div style={{
              background: 'rgba(10,5,21,0.5)',
              borderLeft: '3px solid rgba(255,193,7,0.4)',
              borderRadius: '0 12px 12px 0',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.5rem',
            }}>
              <p style={{
                fontFamily: 'Cinzel, serif', fontSize: '0.6rem',
                color: '#ffc107', letterSpacing: '0.14em',
                margin: '0 0 1rem',
              }}>
                ✦ {t('SACRED KATHA (ENGLISH)', 'पवित्र कथा')} ✦
              </p>

              {language !== 'hi' && (
                <>
                  <Para language="en" size="normal">
                    Long ago, in a prosperous village in the kingdom of Ayodhya, there lived a widow named Sulochana. She was poor in worldly wealth but immeasurably rich in devotion. Every Tuesday without fail, she would fast from sunrise, sweep and clean her small home, bathe in the river before dawn, and walk barefoot to the local Hanuman temple — even through rain, even through illness.
                  </Para>
                  <Para language="en">
                    The seasons changed. A terrible drought descended upon the land. The river ran dry. Crops failed. Sulochana could no longer afford even a single laddoo for prasad. On one Mangalwar, she arrived at the temple with empty hands, trembling with grief. She sat before the murti and wept, speaking aloud: "Maharaj, I have come as always. But today I have nothing to offer you. I am too poor to bring your prasad. Forgive me."
                  </Para>
                  <Para language="en">
                    That evening, a traveler appeared at her doorstep — a tall, saffron-robed man with gentle eyes and powerful hands. He said he was hungry and tired. With her last handful of rice and lentils, Sulochana prepared a meal and served him with all love, asking for nothing in return.
                  </Para>
                  <Para language="en">
                    The man smiled and said: "Mother, I know you came to the temple today with empty hands, and wept. But your empty hands carry the greatest offering — a heart full of love. Hanuman Ji does not weigh gold or count laddoos. He weighs the sincerity of the heart." The traveler ate the meal, blessed her with folded palms, and departed.
                  </Para>
                  <Para language="en">
                    The next morning, Sulochana found her small earthen pot filled with gold coins. Her courtyard had filled with grain. The well in her village — dry for two years — had water again. She ran to the temple and wept with joy. The priests of the temple said they had seen a divine light emanating from the temple the previous night, and the murti's eyes had seemed to shimmer.
                  </Para>
                  <Para language="en">
                    Sulochana understood: the traveler had been Hanuman Ji himself, testing her faith. From that day forward, she shared her wealth with the entire village, observing the Tuesday fast until the end of her life. She taught her children and grandchildren: "The vrat of Hanuman Ji is not a ritual — it is a relationship. Come with whatever you have. He only wants your heart."
                  </Para>
                  <Para language="en" size="small">
                    <span style={{ color: '#ffc107' }}>Moral:</span> Sincere devotion, even without material offering, is equally accepted — and abundantly blessed — by Hanuman Ji. Those who observe the Tuesday fast with genuine faith and a generous spirit receive his protection, prosperity, and grace.
                  </Para>
                </>
              )}

              {/* Hindi Katha */}
              {language === 'hi' && (
                <>
                  <p style={{
                    fontFamily: 'Noto Sans Devanagari, serif',
                    fontSize: '1.05rem',
                    color: '#fff8e7',
                    lineHeight: 2.3,
                    marginBottom: '1rem',
                  }}>
                    एक समय की बात है, अयोध्या राज्य के एक समृद्ध गाँव में सुलोचना नाम की एक विधवा स्त्री रहती थी। वह सांसारिक धन में निर्धन थी, परंतु भक्ति में अतुलनीय रूप से धनी थी। प्रत्येक मंगलवार बिना नागा, वह सूर्योदय से उपवास रखती, अपने छोटे से घर को साफ करती, भोर से पहले नदी में स्नान करती और नंगे पाँव स्थानीय हनुमान मंदिर जाती — बारिश में भी, बीमारी में भी।
                  </p>
                  <p style={{
                    fontFamily: 'Noto Sans Devanagari, serif',
                    fontSize: '1.05rem',
                    color: '#fff8e7',
                    lineHeight: 2.3,
                    marginBottom: '1rem',
                  }}>
                    समय बदला। भयंकर अकाल पड़ा। नदी सूख गई। फसलें नष्ट हो गईं। सुलोचना के पास अब एक भी लड्डू नहीं था। एक मंगलवार, वह खाली हाथ मंदिर पहुँची, दुख से काँप रही थी। वह मूर्ति के सामने बैठ गई और रो पड़ी: "महाराज, मैं हमेशा की तरह आई हूँ। पर आज मेरे पास कुछ भी नहीं है। मैं इतनी गरीब हूँ कि आपका प्रसाद नहीं ला सकती। मुझे क्षमा करें।"
                  </p>
                  <p style={{
                    fontFamily: 'Noto Sans Devanagari, serif',
                    fontSize: '1.05rem',
                    color: '#fff8e7',
                    lineHeight: 2.3,
                    marginBottom: '1rem',
                  }}>
                    उस शाम, एक यात्री उसके द्वार पर आया — एक लंबा, केसरिया वस्त्र धारी पुरुष, सौम्य आँखें और शक्तिशाली हाथ। उसने कहा वह भूखा और थका हुआ है। सुलोचना ने अपने अंतिम मुट्ठी चावल और दाल से भोजन बनाया और प्रेम से परोसा, बदले में कुछ माँगे बिना।
                  </p>
                  <p style={{
                    fontFamily: 'Noto Sans Devanagari, serif',
                    fontSize: '1.05rem',
                    color: '#fff8e7',
                    lineHeight: 2.3,
                    marginBottom: '1rem',
                  }}>
                    वह पुरुष मुस्कुराया और बोला: "माँ, मैं जानता हूँ कि आज तुम खाली हाथ मंदिर आई थीं और रोई थीं। पर तुम्हारे खाली हाथों में सबसे बड़ी भेंट है — प्रेम से भरा हृदय। हनुमान जी सोना नहीं तोलते, लड्डू नहीं गिनते। वे हृदय की सच्चाई तोलते हैं।" यात्री ने भोजन किया, हाथ जोड़कर आशीर्वाद दिया और चला गया।
                  </p>
                  <p style={{
                    fontFamily: 'Noto Sans Devanagari, serif',
                    fontSize: '1.05rem',
                    color: '#fff8e7',
                    lineHeight: 2.3,
                    marginBottom: '1rem',
                  }}>
                    अगली सुबह, सुलोचना ने पाया कि उसका छोटा मिट्टी का घड़ा सोने के सिक्कों से भरा था। उसके आँगन में अनाज भर गया था। गाँव का कुआँ — जो दो साल से सूखा था — फिर से भर गया था। वह मंदिर दौड़ी और खुशी से रो पड़ी। पुजारियों ने कहा कि पिछली रात मंदिर से दिव्य प्रकाश निकलता देखा था, और मूर्ति की आँखें चमकती लग रही थीं।
                  </p>
                  <p style={{
                    fontFamily: 'Noto Sans Devanagari, serif',
                    fontSize: '1rem',
                    color: 'rgba(255,248,231,0.7)',
                    lineHeight: 2.2,
                    marginBottom: 0,
                    fontStyle: 'italic',
                  }}>
                    <span style={{ color: '#ffc107' }}>कथा का सार:</span> सच्ची भक्ति, चाहे सामग्री भेंट के बिना हो, हनुमान जी द्वारा समान रूप से स्वीकार और प्रचुर रूप से आशीर्वादित होती है। जो लोग वास्तविक आस्था और उदार भावना से मंगलवार का व्रत रखते हैं, उन्हें उनकी सुरक्षा, समृद्धि और कृपा प्राप्त होती है।
                  </p>
                </>
              )}
            </div>

            {/* Katha chanting note */}
            <div style={{
              background: 'rgba(255,193,7,0.05)',
              border: '1px solid rgba(255,193,7,0.15)',
              borderRadius: '10px',
              padding: '0.85rem 1.1rem',
              display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>🎙️</span>
              <p style={{
                fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                fontSize: language === 'hi' ? '0.88rem' : '0.77rem',
                color: 'rgba(255,248,231,0.65)',
                lineHeight: 1.75,
                margin: 0,
              }}>
                {t(
                  'The Vrat Katha should be recited aloud (or listened to) after the Hanuman Chalisa paath and before the aarti. Reading it with devotion, even once, is believed to complete the vrat. Those who are unable to fast but read the Katha with sincerity receive its merit.',
                  'व्रत कथा हनुमान चालीसा के पाठ के बाद और आरती से पहले ऊँची आवाज़ में पढ़नी (या सुननी) चाहिए। इसे भक्तिपूर्वक एक बार भी पढ़ना व्रत को पूर्ण करता है। जो लोग उपवास नहीं कर सकते लेकिन कथा को ईमानदारी से पढ़ते हैं, उन्हें भी इसका फल मिलता है।'
                )}
              </p>
            </div>
          </SectionCard>

          {/* SECTION 5: Hanuman Jayanti */}
          <SectionCard
            title="Hanuman Jayanti"
            titleHi="हनुमान जयंती"
            icon="🎉"
            language={language}
          >
            {/* Date badge */}
            <div style={{
              display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem',
            }}>
              {[
                { label: t('Date', 'तिथि'), value: t('Chaitra Purnima', 'चैत्र पूर्णिमा'), icon: '🌕' },
                { label: t('Month', 'माह'), value: t('March–April (varies yearly)', 'मार्च–अप्रैल (वार्षिक भिन्न)'), icon: '📆' },
                { label: t('Significance', 'महत्व'), value: t('Birth anniversary of Hanuman Ji', 'हनुमान जी की जन्म जयंती'), icon: '✨' },
              ].map((item) => (
                <div key={item.label} style={{
                  background: 'rgba(255,193,7,0.07)',
                  border: '1px solid rgba(255,193,7,0.2)',
                  borderRadius: '10px',
                  padding: '0.6rem 1rem',
                  flex: '1 1 160px',
                }}>
                  <p style={{
                    fontFamily: 'Cinzel, serif', fontSize: '0.55rem',
                    color: 'rgba(255,193,7,0.5)', letterSpacing: '0.1em',
                    margin: '0 0 0.2rem',
                  }}>
                    {item.icon} {item.label}
                  </p>
                  <p style={{
                    fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                    fontSize: language === 'hi' ? '0.88rem' : '0.8rem',
                    color: '#fff8e7',
                    margin: 0,
                    lineHeight: 1.5,
                  }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <Para language={language}>
              {t(
                'Hanuman Jayanti marks the birth of Shri Hanuman Ji, born to Anjana and Kesari (a vanara chief), with the blessing of Vayu Dev (the wind god) on the full moon of the Chaitra month. According to the Ramayana and Puranic texts, Hanuman Ji is a Chiranjeevi — an immortal being who continues to be present wherever the name of Rama is chanted. He is believed to be present at every Ramayana recitation on Earth.',
                'हनुमान जयंती श्री हनुमान जी के जन्म का उत्सव है। वे चैत्र माह की पूर्णिमा को अंजना और केसरी (एक वानर सरदार) के यहाँ, वायु देव के आशीर्वाद से जन्मे थे। रामायण और पुराणिक ग्रंथों के अनुसार हनुमान जी एक चिरंजीवी हैं — एक अमर प्राणी जो सदा उपस्थित रहते हैं जहाँ राम का नाम लिया जाता है।'
              )}
            </Para>

            <SectionLabel>{t('SPECIAL OBSERVANCES', 'विशेष अनुष्ठान')}</SectionLabel>

            {[
              {
                icon: '📿',
                en: '108 Paath (recitations) of Hanuman Chalisa — the ultimate offering on this day. Many devotees sit from midnight and complete all 108 paaths before sunrise.',
                hi: '१०८ बार हनुमान चालीसा का पाठ — इस दिन का परम अर्पण। कई भक्त मध्यरात्रि से बैठकर सूर्योदय से पहले सभी १०८ पाठ पूरे करते हैं।',
              },
              {
                icon: '🫙',
                en: 'Special Abhishek (sacred bathing of the idol) with panchamrit — milk, curd, honey, ghee, and sugar — followed by Gangajal.',
                hi: 'पंचामृत — दूध, दही, शहद, घी और चीनी — से विशेष अभिषेक, उसके बाद गंगाजल।',
              },
              {
                icon: '🥁',
                en: 'Processions (shobha yatras) in towns and cities carrying Hanuman Ji\'s decorated idol on a chariot, accompanied by bhajans and kirtan.',
                hi: 'नगरों और शहरों में शोभायात्रा — हनुमान जी की सजी-धजी मूर्ति को रथ पर बैठाकर भजन और कीर्तन के साथ जुलूस।',
              },
              {
                icon: '🏠',
                en: 'Home celebration: Decorate the puja space with marigolds and red flowers. Light 11 or 21 diyas. Invite family and recite the Sundar Kand together.',
                hi: 'घर पर उत्सव: पूजा स्थान को गेंदे और लाल फूलों से सजाएं। ११ या २१ दीपक जलाएं। परिवार को आमंत्रित करें और साथ में सुंदरकांड पढ़ें।',
              },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', gap: '0.75rem', alignItems: 'flex-start',
                marginBottom: '0.75rem',
                background: 'rgba(10,5,21,0.35)',
                borderRadius: '10px',
                padding: '0.75rem 1rem',
                border: '1px solid rgba(255,193,7,0.07)',
              }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</span>
                <p style={{
                  fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                  fontSize: language === 'hi' ? '0.92rem' : '0.8rem',
                  color: 'rgba(255,248,231,0.8)',
                  lineHeight: language === 'hi' ? 2 : 1.75,
                  margin: 0,
                }}>
                  {language === 'hi' ? item.hi : item.en}
                </p>
              </div>
            ))}
          </SectionCard>

          {/* SECTION 6: Special Occasions */}
          <SectionCard
            title="When to Seek Hanuman Ji's Blessings"
            titleHi="हनुमान जी का आशीर्वाद कब माँगें"
            icon="🙏"
            language={language}
          >
            <Para language={language}>
              {t(
                'Hanuman Ji is the guardian of those who are in danger, and his blessings are especially potent in specific life situations. Here is guidance on when his grace is most powerfully sought and how to approach him.',
                'हनुमान जी उन लोगों के रक्षक हैं जो संकट में हैं, और उनका आशीर्वाद विशिष्ट जीवन परिस्थितियों में विशेष रूप से प्रभावशाली होता है। यहाँ मार्गदर्शन है कि उनकी कृपा कब और कैसे सबसे प्रभावी ढंग से माँगी जाती है।'
              )}
            </Para>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem' }}>
              {SPECIAL_OCCASIONS.map((occ, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    background: 'rgba(10,5,21,0.4)',
                    border: `1px solid rgba(${occ.color === '#ffd700' ? '255,215,0' : occ.color === '#64c8ff' ? '100,200,255' : occ.color === '#b0b0ff' ? '176,176,255' : occ.color === '#90e0ef' ? '144,224,239' : '255,160,122'},0.2)`,
                    borderRadius: '14px',
                    padding: '1rem 1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.2rem' }}>{occ.icon}</span>
                    <span style={{
                      fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
                      fontSize: language === 'hi' ? '1rem' : '0.78rem',
                      color: occ.color,
                      letterSpacing: language === 'hi' ? 0 : '0.06em',
                    }}>
                      {language === 'hi' ? occ.hi : occ.en}
                    </span>
                    {occ.day !== 'any' && (
                      <span style={{
                        background: occ.day === 'tuesday' ? 'rgba(255,107,53,0.12)' : 'rgba(176,176,255,0.12)',
                        border: `1px solid ${occ.day === 'tuesday' ? 'rgba(255,107,53,0.3)' : 'rgba(176,176,255,0.3)'}`,
                        borderRadius: '20px',
                        padding: '0.1rem 0.5rem',
                        fontSize: language === 'hi' ? '0.7rem' : '0.58rem',
                        color: occ.day === 'tuesday' ? '#ff6b35' : '#b0b0ff',
                        fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                      }}>
                        {occ.day === 'tuesday' ? t('Tuesday', 'मंगलवार') : t('Saturday', 'शनिवार')}
                      </span>
                    )}
                  </div>
                  <p style={{
                    fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                    fontSize: language === 'hi' ? '0.9rem' : '0.79rem',
                    color: 'rgba(255,248,231,0.75)',
                    lineHeight: language === 'hi' ? 2 : 1.8,
                    margin: 0,
                  }}>
                    {language === 'hi' ? occ.detail.hi : occ.detail.en}
                  </p>
                </motion.div>
              ))}
            </div>
          </SectionCard>

        </div>{/* end sections */}

        {/* Footer blessing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginTop: '2.5rem',
            padding: '1.5rem',
            background: 'rgba(18,8,42,0.5)',
            borderRadius: '14px',
            border: '1px solid rgba(255,193,7,0.08)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <DiyaFlame />
          </div>
          <p style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            color: '#ffc107',
            marginBottom: '0.4rem',
            textShadow: '0 0 12px rgba(255,193,7,0.4)',
          }}>
            ॥ जय हनुमान ॥
          </p>
          <p style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
            fontSize: language === 'hi' ? '0.88rem' : '0.75rem',
            color: 'rgba(201,169,110,0.5)',
            margin: 0,
            lineHeight: 1.7,
            maxWidth: '440px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {t(
              'May Hanuman Ji, the remover of all obstacles and the bestower of strength and wisdom, bless you and your family with health, prosperity, and unwavering devotion.',
              'हनुमान जी — सभी बाधाओं के हरणकर्ता और शक्ति-ज्ञान के दाता — आपको और आपके परिवार को स्वास्थ्य, समृद्धि और अटल भक्ति का आशीर्वाद दें।'
            )}
          </p>
        </motion.div>

      </div>
    </motion.div>
  )
}
