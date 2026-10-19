import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'react-qr-code'
import useTempleStore from '../../store/templeStore'

const OFFERINGS = [
  {
    id: 'ghanti',
    emoji: '🔔',
    title_en: 'Ghanti Bajaye',
    title_hi: 'घंटी बजाएं',
    desc_en: 'Ring the temple bell',
    desc_hi: 'मंदिर की घंटी बजाएं',
    amount: 7,
    blessing_en: 'May your prayers reach the heavens.',
    blessing_hi: 'आपकी प्रार्थना स्वर्ग तक पहुँचे।',
    url: 'https://rzp.io/rzp/nQxliom',
  },
  {
    id: 'deepak',
    emoji: '🪔',
    title_en: 'Deepak Jalaye',
    title_hi: 'दीपक जलाएं',
    desc_en: 'Light a sacred lamp',
    desc_hi: 'पवित्र दीपक प्रज्वलित करें',
    amount: 11,
    blessing_en: 'May the flame of devotion never dim.',
    blessing_hi: 'भक्ति की ज्योति सदा जलती रहे।',
    url: 'https://rzp.io/rzp/pBzAY4Rs',
  },
  {
    id: 'pushp',
    emoji: '🌸',
    title_en: 'Pushp Arpan',
    title_hi: 'पुष्प अर्पण',
    desc_en: 'Offer sacred flowers',
    desc_hi: 'पुष्प चरणों में अर्पित करें',
    amount: 21,
    blessing_en: 'May your life bloom with divine grace.',
    blessing_hi: 'आपका जीवन दिव्य कृपा से खिले।',
    url: 'https://rzp.io/rzp/5bmpglhg',
  },
  {
    id: 'prasad',
    emoji: '🍮',
    title_en: 'Prasad Chadhaye',
    title_hi: 'प्रसाद चढ़ाएं',
    desc_en: 'Sponsor blessed prasad',
    desc_hi: 'प्रसाद का भोग लगाएं',
    amount: 51,
    blessing_en: 'May Hanuman Ji fill your home with sweetness.',
    blessing_hi: 'हनुमान जी आपके घर को मधुर बनाएं।',
    url: 'https://rzp.io/rzp/jV40WQJ3',
  },
  {
    id: 'prarthana',
    emoji: '🙏',
    title_en: 'Vishesh Prarthana',
    title_hi: 'विशेष प्रार्थना',
    desc_en: 'A special prayer for you',
    desc_hi: 'आपके लिए विशेष प्रार्थना',
    amount: 101,
    blessing_en: 'Bajrangbali hears your deepest wish.',
    blessing_hi: 'बजरंगबली आपकी मनोकामना सुनते हैं।',
    url: 'https://rzp.io/rzp/9Z3XWM4O',
  },
]

function OfferingCard({ offering, selected, onSelect, language }) {
  const isSelected = selected?.id === offering.id
  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(isSelected ? null : offering)}
      style={{
        background: isSelected
          ? 'linear-gradient(145deg, rgba(255,193,7,0.18), rgba(255,107,53,0.12))'
          : 'linear-gradient(145deg, rgba(18,8,42,0.92), rgba(12,4,30,0.92))',
        border: `1px solid ${isSelected ? 'rgba(255,193,7,0.6)' : 'rgba(255,193,7,0.15)'}`,
        borderTop: `2px solid ${isSelected ? 'rgba(255,193,7,0.8)' : 'rgba(255,193,7,0.25)'}`,
        borderRadius: '12px',
        padding: '1.25rem 1rem',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.4rem',
        textAlign: 'center',
        backdropFilter: 'blur(16px)',
        boxShadow: isSelected
          ? '0 0 24px rgba(255,193,7,0.2), 0 8px 32px rgba(0,0,0,0.6)'
          : '0 4px 16px rgba(0,0,0,0.4)',
        transition: 'all 0.25s ease',
        width: '100%',
      }}
    >
      <span style={{ fontSize: '1.6rem' }}>{offering.emoji}</span>
      <div style={{
        fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
        fontSize: language === 'hi' ? '0.9rem' : '0.72rem',
        color: isSelected ? '#ffc107' : '#fff8e7',
        letterSpacing: language === 'hi' ? 0 : '0.06em',
        lineHeight: 1.3,
      }}>
        {language === 'en' ? offering.title_en : offering.title_hi}
      </div>
      <div style={{
        fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
        fontSize: '0.65rem',
        color: 'rgba(201,169,110,0.6)',
      }}>
        {language === 'en' ? offering.desc_en : offering.desc_hi}
      </div>
      <div style={{
        fontFamily: 'Cinzel, serif',
        fontSize: '0.9rem',
        color: isSelected ? '#ffc107' : 'rgba(255,193,7,0.7)',
        marginTop: '0.2rem',
        letterSpacing: '0.04em',
      }}>
        ₹{offering.amount}
      </div>
    </motion.button>
  )
}

export default function SevaSahyogView() {
  const { language, setView } = useTempleStore()
  const [selected, setSelected] = useState(null)

  return (
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
        padding: '4.5rem 1.5rem 3rem',
        background: 'rgba(10,5,21,0.88)',
        backdropFilter: 'blur(6px)',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', marginBottom: '2rem', maxWidth: '520px' }}
      >
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.55rem',
          color: 'rgba(255,193,7,0.45)',
          letterSpacing: '0.35em',
          marginBottom: '0.6rem',
        }}>
          ✦ ✦ ✦
        </div>
        <h1 style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(1.3rem, 4vw, 2rem)',
          color: '#fff8e7',
          letterSpacing: '0.2em',
          fontWeight: 400,
          marginBottom: '0.4rem',
          textShadow: '0 2px 20px rgba(255,193,7,0.3)',
        }}>
          SEVA SAHYOG
        </h1>
        <div style={{
          fontFamily: 'Noto Sans Devanagari, serif',
          fontSize: '1.1rem',
          color: 'rgba(201,169,110,0.7)',
          marginBottom: '0.75rem',
        }}>
          सेवा सहयोग
        </div>
        <p style={{
          fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
          fontSize: '0.8rem',
          color: 'rgba(201,169,110,0.55)',
          lineHeight: 1.7,
          maxWidth: '380px',
          margin: '0 auto',
        }}>
          {language === 'en'
            ? 'Join in the seva of this sacred space. Choose an offering and participate in the divine service.'
            : 'इस पवित्र स्थान की सेवा में सहयोग करें। एक अर्पण चुनें और दिव्य सेवा में भाग लें।'}
        </p>
      </motion.div>

      {/* Offering cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '0.9rem',
        width: '100%',
        maxWidth: '600px',
        marginBottom: '2rem',
      }}>
        {OFFERINGS.map((o, i) => (
          <motion.div
            key={o.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <OfferingCard
              offering={o}
              selected={selected}
              onSelect={setSelected}
              language={language}
            />
          </motion.div>
        ))}
      </div>

      {/* QR + blessing panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            style={{
              background: 'rgba(10,5,21,0.97)',
              border: '1px solid rgba(255,193,7,0.4)',
              borderRadius: '18px',
              padding: '2rem 1.75rem',
              width: '100%',
              maxWidth: '360px',
              textAlign: 'center',
              boxShadow: '0 0 40px rgba(255,193,7,0.12), 0 16px 48px rgba(0,0,0,0.7)',
            }}
          >
            {/* Blessing */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{selected.emoji}</div>
              <div style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.6rem',
                color: 'rgba(255,193,7,0.5)',
                letterSpacing: '0.2em',
                marginBottom: '0.5rem',
              }}>
                ✦ ASHIRWAD ✦
              </div>
              <p style={{
                fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                fontSize: language === 'hi' ? '0.95rem' : '0.82rem',
                color: '#fff8e7',
                lineHeight: 1.7,
                fontStyle: language === 'en' ? 'italic' : 'normal',
              }}>
                {language === 'en' ? selected.blessing_en : selected.blessing_hi}
              </p>
            </div>

            {/* QR Code */}
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '1rem',
              display: 'inline-block',
              marginBottom: '1rem',
            }}>
              <QRCode
                value={selected.url}
                size={160}
                style={{ display: 'block' }}
              />
            </div>

            <div style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.6rem',
              color: 'rgba(201,169,110,0.5)',
              letterSpacing: '0.12em',
              marginBottom: '0.4rem',
            }}>
              SCAN WITH GPAY · PHONEPE · PAYTM
            </div>
            <div style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.75rem',
              color: 'rgba(255,193,7,0.7)',
              letterSpacing: '0.08em',
              marginBottom: '1.25rem',
            }}>
              ₹{selected.amount} · Razorpay
            </div>

            <a
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                background: 'linear-gradient(135deg, rgba(255,193,7,0.2), rgba(255,107,53,0.15))',
                border: '1px solid rgba(255,193,7,0.4)',
                borderRadius: '8px',
                padding: '0.6rem 1rem',
                color: '#ffc107',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                marginBottom: '0.5rem',
              }}
            >
              OR OPEN PAYMENT PAGE ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer note */}
      <div style={{
        marginTop: '2rem',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.62rem',
        color: 'rgba(201,169,110,0.3)',
        textAlign: 'center',
        maxWidth: '320px',
        lineHeight: 1.6,
      }}>
        Payments are processed securely by Razorpay. This seva supports the maintenance of this digital temple.
      </div>
    </motion.div>
  )
}
