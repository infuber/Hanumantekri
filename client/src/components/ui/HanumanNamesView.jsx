import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import useTempleStore from '../../store/templeStore'
import { supabase } from '../../lib/supabase'

// Static fallback — first 30 of the 108 names
const FALLBACK_NAMES = [
  { number: 1, name_sanskrit: 'हनुमान', name_en: 'Hanuman', meaning_en: 'The one whose jaw was broken (and then healed by Indra)', meaning_hi: 'जिनकी हनु (जबड़ा) टूटी थी' },
  { number: 2, name_sanskrit: 'अंजनेय', name_en: 'Anjaneya', meaning_en: 'Son of Anjana', meaning_hi: 'अंजना के पुत्र' },
  { number: 3, name_sanskrit: 'महावीर', name_en: 'Mahavira', meaning_en: 'The great hero of incomparable courage', meaning_hi: 'महान वीर, अतुलनीय साहस वाले' },
  { number: 4, name_sanskrit: 'मारुति', name_en: 'Maruti', meaning_en: 'Son of Marut (Vayu Dev, the Wind God)', meaning_hi: 'मरुत (वायुदेव) के पुत्र' },
  { number: 5, name_sanskrit: 'पवनसुत', name_en: 'Pavansuta', meaning_en: 'Son of Pavan (the Wind)', meaning_hi: 'पवन के पुत्र' },
  { number: 6, name_sanskrit: 'बजरंगबली', name_en: 'Bajrangbali', meaning_en: 'The powerful one with a body as strong as a thunderbolt (vajra)', meaning_hi: 'वज्र जैसे बलिष्ठ अंगों वाले' },
  { number: 7, name_sanskrit: 'संकट मोचन', name_en: 'Sankat Mochan', meaning_en: 'The remover of all troubles and sorrows', meaning_hi: 'सभी संकटों को हरने वाले' },
  { number: 8, name_sanskrit: 'केसरी नंदन', name_en: 'Kesari Nandan', meaning_en: 'Son of Kesari (the monkey king)', meaning_hi: 'केसरी के पुत्र' },
  { number: 9, name_sanskrit: 'रामदूत', name_en: 'Ramaduta', meaning_en: 'The divine messenger of Lord Rama', meaning_hi: 'भगवान राम के दिव्य दूत' },
  { number: 10, name_sanskrit: 'लंकादहन', name_en: 'Lankadahana', meaning_en: 'The one who burned Lanka with his tail', meaning_hi: 'अपनी पूंछ से लंका को जलाने वाले' },
  { number: 11, name_sanskrit: 'अमित विक्रम', name_en: 'Amit Vikrama', meaning_en: 'Of immeasurable valour and might', meaning_hi: 'असीमित पराक्रम वाले' },
  { number: 12, name_sanskrit: 'उदधिक्रमण', name_en: 'Udadhikramana', meaning_en: 'The one who leaped across the ocean', meaning_hi: 'सागर को लांघने वाले' },
  { number: 13, name_sanskrit: 'सीताशोक विनाशन', name_en: 'Sitashoka Vinashana', meaning_en: 'Destroyer of Sita\'s grief', meaning_hi: 'सीता जी का शोक हरने वाले' },
  { number: 14, name_sanskrit: 'लक्ष्मण प्राणदाता', name_en: 'Lakshmana Pranadaata', meaning_en: 'The giver of life to Lakshmana', meaning_hi: 'लक्ष्मण के प्राण देने वाले' },
  { number: 15, name_sanskrit: 'दशग्रीव दर्पहा', name_en: 'Dashagriva Darpaha', meaning_en: 'The destroyer of the pride of ten-headed Ravana', meaning_hi: 'दसमुखी रावण का अहंकार नाशक' },
  { number: 16, name_sanskrit: 'रामभक्त', name_en: 'Rambhakta', meaning_en: 'The eternal devotee of Lord Rama', meaning_hi: 'भगवान राम के परम भक्त' },
  { number: 17, name_sanskrit: 'वायुपुत्र', name_en: 'Vayuputra', meaning_en: 'Son of Vayu, the Wind God', meaning_hi: 'वायुदेव के पुत्र' },
  { number: 18, name_sanskrit: 'महाबल', name_en: 'Mahabala', meaning_en: 'One of immense strength and power', meaning_hi: 'महान बल के स्वामी' },
  { number: 19, name_sanskrit: 'रुद्रावतार', name_en: 'Rudravatara', meaning_en: 'The eleventh avatar of Lord Shiva (Rudra)', meaning_hi: 'भगवान शिव (रुद्र) के ग्यारहवें अवतार' },
  { number: 20, name_sanskrit: 'ज्ञान गुण सागर', name_en: 'Gyana Guna Sagara', meaning_en: 'Ocean of knowledge and virtues', meaning_hi: 'ज्ञान और गुणों के सागर' },
  { number: 21, name_sanskrit: 'कपीश', name_en: 'Kapisha', meaning_en: 'Lord of the monkeys', meaning_hi: 'वानरों के स्वामी' },
  { number: 22, name_sanskrit: 'चिरंजीव', name_en: 'Chiranjeevi', meaning_en: 'The immortal one, living forever', meaning_hi: 'अमर, सदा जीवित रहने वाले' },
  { number: 23, name_sanskrit: 'अष्टसिद्धि निधान', name_en: 'Ashtasiddhi Nidhana', meaning_en: 'Bestower of the eight supernatural powers', meaning_hi: 'आठ सिद्धियों के दाता' },
  { number: 24, name_sanskrit: 'नवनिधि', name_en: 'Navanidhi', meaning_en: 'Giver of the nine divine treasures', meaning_hi: 'नव निधियों के दाता' },
  { number: 25, name_sanskrit: 'पंचमुखी', name_en: 'Panchamukhi', meaning_en: 'The five-faced form of Hanuman', meaning_hi: 'पाँच मुखों वाले हनुमान' },
  { number: 26, name_sanskrit: 'रामेष्ट', name_en: 'Rameshta', meaning_en: 'The beloved of Lord Rama', meaning_hi: 'भगवान राम के प्रिय' },
  { number: 27, name_sanskrit: 'फाल्गुन सखा', name_en: 'Phalguna Sakha', meaning_en: 'Friend of Arjuna (Phalguna)', meaning_hi: 'अर्जुन के मित्र' },
  { number: 28, name_sanskrit: 'पिंगाक्ष', name_en: 'Pingaksha', meaning_en: 'The reddish-eyed one, blazing with divine energy', meaning_hi: 'लाल आँखों वाले, दिव्य ऊर्जा से दमकते' },
  { number: 29, name_sanskrit: 'अमित विभव', name_en: 'Amita Vibhava', meaning_en: 'One of unlimited glory and power', meaning_hi: 'असीमित वैभव और शक्ति वाले' },
  { number: 30, name_sanskrit: 'उदार', name_en: 'Udara', meaning_en: 'The magnanimous and generous one', meaning_hi: 'उदार और दयालु' },
]

export default function HanumanNamesView() {
  const { language, goBack } = useTempleStore()
  const [names, setNames] = useState(FALLBACK_NAMES)
  const [search, setSearch] = useState('')
  const [expandedNum, setExpandedNum] = useState(null)
  const t = (en, hi) => language === 'hi' ? hi : en

  useEffect(() => {
    supabase.from('hanuman_names').select('*').order('number').then(({ data }) => {
      if (data && data.length > 0) setNames(data)
    })
  }, [])

  const filtered = names.filter((n) => {
    const q = search.toLowerCase()
    if (!q) return true
    return (
      n.name_en?.toLowerCase().includes(q) ||
      n.name_sanskrit?.includes(q) ||
      n.meaning_en?.toLowerCase().includes(q) ||
      n.meaning_hi?.includes(q)
    )
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'radial-gradient(ellipse at 50% 0%, #1a0a2a 0%, #0a0515 60%)',
        overflowY: 'auto',
      }}
    >
      {/* Header */}
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
          fontFamily: 'Noto Sans Devanagari, serif',
          fontSize: 'clamp(0.8rem, 2vw, 1rem)', color: '#ffc107',
        }}>
          १०८ नाम
        </span>
        <div style={{ fontSize: '1.3rem' }}>🙏</div>
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.25))' }} />
            <span style={{ color: 'rgba(255,193,7,0.4)', fontSize: '0.65rem', letterSpacing: '0.15em' }}>✦</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,193,7,0.25))' }} />
          </div>
          <h1 style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            color: '#fff8e7', textShadow: '0 2px 24px rgba(255,193,7,0.25)',
            marginBottom: '0.4rem', fontWeight: 400,
          }}>
            हनुमान जी के १०८ नाम
          </h1>
          <p style={{
            fontFamily: 'Cinzel, serif', fontSize: '0.62rem',
            color: 'rgba(201,169,110,0.6)', letterSpacing: '0.32em', marginBottom: '1.25rem',
          }}>
            108 DIVINE NAMES
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(255,193,7,0.2))' }} />
            <span style={{ color: 'rgba(255,193,7,0.35)', fontSize: '0.75rem' }}>ॐ</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(255,193,7,0.2))' }} />
          </div>
          <p style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
            fontSize: language === 'hi' ? '0.92rem' : '0.78rem',
            color: 'rgba(201,169,110,0.55)', maxWidth: '440px', margin: '0 auto', lineHeight: 1.9,
          }}>
            {t(
              'Each name reveals a divine quality of Hanuman Ji. Reciting all 108 names is considered equivalent to the Sahasranam.',
              'प्रत्येक नाम हनुमान जी के एक दिव्य गुण को प्रकट करता है। १०८ नाम जपना सहस्रनाम के समकक्ष है।'
            )}
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('Search names or meanings...', 'नाम या अर्थ खोजें...')}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,193,7,0.2)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            color: '#fff8e7',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.88rem',
            outline: 'none',
            marginBottom: '1.5rem',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => e.target.style.borderColor = 'rgba(255,193,7,0.5)'}
          onBlur={(e) => e.target.style.borderColor = 'rgba(255,193,7,0.2)'}
        />

        {/* Names grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '0.7rem',
        }}>
          {filtered.map((n) => {
            const isOpen = expandedNum === n.number
            return (
              <motion.div
                key={n.number}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                onClick={() => setExpandedNum(isOpen ? null : n.number)}
                style={{
                  background: isOpen ? 'rgba(26,8,42,0.95)' : 'rgba(18,8,42,0.75)',
                  border: `1px solid ${isOpen ? 'rgba(255,193,7,0.4)' : 'rgba(255,193,7,0.1)'}`,
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.62rem',
                    color: 'rgba(201,169,110,0.4)',
                    minWidth: '22px',
                    textAlign: 'right',
                  }}>
                    {n.number}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: 'Noto Sans Devanagari, serif',
                      fontSize: '1.05rem',
                      color: isOpen ? '#ffc107' : '#fff8e7',
                      marginBottom: '0.1rem',
                    }}>
                      {n.name_sanskrit || n.name_hi}
                    </div>
                    <div style={{
                      fontFamily: 'Cinzel, serif',
                      fontSize: '0.65rem',
                      color: 'rgba(201,169,110,0.55)',
                      letterSpacing: '0.04em',
                    }}>
                      {n.name_en}
                    </div>
                  </div>
                  <span style={{ color: 'rgba(201,169,110,0.4)', fontSize: '0.7rem' }}>
                    {isOpen ? '▲' : '▼'}
                  </span>
                </div>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{
                      marginTop: '0.75rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid rgba(255,193,7,0.12)',
                    }}
                  >
                    <p style={{
                      fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                      fontSize: language === 'hi' ? '0.92rem' : '0.82rem',
                      color: 'rgba(255,248,231,0.8)',
                      lineHeight: 1.75,
                    }}>
                      {language === 'hi' ? n.meaning_hi : n.meaning_en}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <p style={{ textAlign: 'center', color: '#c9a96e', fontFamily: 'Cinzel, serif', marginTop: '2rem' }}>
            No names found for "{search}"
          </p>
        )}

        {names.length < 108 && !search && (
          <p style={{
            textAlign: 'center', marginTop: '2rem',
            fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
            color: 'rgba(201,169,110,0.4)',
          }}>
            {t(
              `Showing ${names.length} of 108 names — more coming soon`,
              `${names.length} में से 108 नाम — शीघ्र और नाम आ रहे हैं`
            )}
          </p>
        )}
      </div>
    </motion.div>
  )
}
