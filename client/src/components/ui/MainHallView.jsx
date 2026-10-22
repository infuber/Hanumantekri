import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'
import { supabase } from '../../lib/supabase'

const FAMOUS_TEMPLES = [
  {
    id: 'hanuman-garhi',
    name_hi: 'हनुमान गढ़ी',
    name_en: 'Hanuman Garhi',
    location_en: 'Ayodhya, Uttar Pradesh',
    location_hi: 'अयोध्या, उत्तर प्रदेश',
    sig_en: 'Believed to be Hanuman Ji\'s own abode — he guards Ram Lalla from this sacred hilltop fort. Built in a unique Awadhi style, the temple sits atop a 76-step staircase and is one of the holiest sites in Ayodhya.',
    sig_hi: 'ऐसा माना जाता है कि यह हनुमान जी का निवास स्थान है — वे इस पवित्र किले से राम लला की रक्षा करते हैं। अनोखी अवधी शैली में निर्मित, मंदिर 76 सीढ़ियों के ऊपर स्थित है।',
    country: 'India 🇮🇳',
    photos: [
      { img: '/images/temples/hanuman-garhi.jpg',   label_en: 'Main Temple',      label_hi: 'मुख्य मंदिर',    objPos: 'center 35%', portrait: false },
      { img: '/images/temples/hanuman-garhi-2.jpg', label_en: 'Temple Approach',  label_hi: 'मंदिर मार्ग',   objPos: 'center 12%', portrait: true },
    ],
  },
  {
    id: 'sankat-mochan',
    name_hi: 'संकट मोचन मंदिर',
    name_en: 'Sankat Mochan Mandir',
    location_en: 'Varanasi, Uttar Pradesh',
    location_hi: 'वाराणसी, उत्तर प्रदेश',
    sig_en: 'Founded by Tulsidas, author of Ramcharitmanas. Hanuman Ji here is Sankat Mochan — remover of all troubles. The temple stands beside the Assi Ghat and is filled with devotees at every hour of the day.',
    sig_hi: 'रामचरितमानस के रचयिता तुलसीदास जी द्वारा स्थापित। यहाँ हनुमान जी संकट मोचन रूप में पूजे जाते हैं। मंदिर असी घाट के पास स्थित है।',
    country: 'India 🇮🇳',
    photos: [
      { img: '/images/temples/sankat-mochan.jpg', label_en: 'Temple Exterior',  label_hi: 'बाहरी दृश्य',  objPos: 'center 8%',  portrait: true },
      { img: '/images/temples/sankat-2.jpg',      label_en: 'Darshan Hall',     label_hi: 'दर्शन कक्ष',   objPos: 'center center', portrait: false },
    ],
  },
  {
    id: 'salasar-balaji',
    name_hi: 'सालासर बालाजी',
    name_en: 'Salasar Balaji',
    location_en: 'Salasar, Rajasthan',
    location_hi: 'सालासर, राजस्थान',
    sig_en: 'Famous for the unique bearded and mustached form of Hanuman Ji, found at no other temple in the world. The idol emerged from the earth in 1754 and is enshrined in an ornate silver-gold sanctum.',
    sig_hi: 'दाढ़ी-मूँछ वाले हनुमान जी की अद्वितीय प्रतिमा, जो विश्व में और कहीं नहीं मिलती। 1754 में यह प्रतिमा धरती से प्रकट हुई और सोने-चाँदी के गर्भगृह में विराजमान है।',
    country: 'India 🇮🇳',
    photos: [
      { img: '/images/temples/salasar-balaji.jpg', label_en: 'Temple Facade',  label_hi: 'मंदिर मुखमंडप', objPos: 'center 5%',     portrait: true },
      { img: '/images/temples/salasar-2.jpg',      label_en: 'Main Shrine',    label_hi: 'मुख्य मंदिर',   objPos: 'center center', portrait: false },
    ],
  },
  {
    id: 'jakhu',
    name_hi: 'जाखू मंदिर',
    name_en: 'Jakhu Temple',
    location_en: 'Shimla, Himachal Pradesh',
    location_hi: 'शिमला, हिमाचल प्रदेश',
    sig_en: 'Perched at 8,048 ft — one of the highest Hanuman temples in India. According to the Ramayana, Hanuman Ji rested here while searching for the Sanjeevani herb. The 108-ft statue is visible from all across Shimla.',
    sig_hi: '8,048 फीट की ऊँचाई पर — भारत के सर्वोच्च हनुमान मंदिरों में। रामायण के अनुसार, हनुमान जी संजीवनी खोजते हुए यहाँ विश्राम किए। 108 फीट की प्रतिमा पूरे शिमला से दिखती है।',
    country: 'India 🇮🇳',
    photos: [
      { img: '/images/temples/jakhu.jpg',        label_en: 'Temple Complex',       label_hi: 'मंदिर परिसर',    objPos: 'center 30%', portrait: false },
      { img: '/images/temples/jakhu-statue.jpg', label_en: '108-ft Hanuman Murti', label_hi: '108 फीट की प्रतिमा', objPos: 'center top', portrait: true },
      { img: '/images/temples/jakhu-2.jpg',      label_en: 'Jakhu Hill View',      label_hi: 'जाखू पहाड़ी',    objPos: 'center 15%', portrait: true },
    ],
  },
  {
    id: 'mahavir-mandir',
    name_hi: 'महावीर मंदिर',
    name_en: 'Mahavir Mandir',
    location_en: 'Patna, Bihar',
    location_hi: 'पटना, बिहार',
    sig_en: 'One of India\'s most visited temples — over 50,000 devotees daily. The prasad (naivedya) is prepared and distributed on a massive scale. Famous for miraculous healing of incurable diseases.',
    sig_hi: 'भारत के सर्वाधिक दर्शनार्थियों वाले मंदिरों में से एक — प्रतिदिन 50,000+ भक्त। नैवेद्य का वितरण बड़े पैमाने पर होता है। असाध्य रोगों के चमत्कारी उपचार के लिए प्रसिद्ध।',
    country: 'India 🇮🇳',
    photos: [
      { img: '/images/temples/mahavir-mandir.jpg', label_en: 'Main Temple',  label_hi: 'मुख्य मंदिर',  objPos: 'center center' },
    ],
  },
  {
    id: 'mehandipur-balaji',
    name_hi: 'मेहंदीपुर बालाजी',
    name_en: 'Mehandipur Balaji',
    location_en: 'Dausa, Rajasthan',
    location_hi: 'दौसा, राजस्थान',
    sig_en: 'World-renowned for liberation from negative energies and supernatural afflictions. The swayambhu (self-manifested) idol of Hanuman Ji appeared from within a rock. Devotees from across the globe seek his divine protection here.',
    sig_hi: 'नकारात्मक शक्तियों से मुक्ति के लिए विश्व प्रसिद्ध। हनुमान जी की स्वयंभू प्रतिमा चट्टान से प्रकट हुई। दुनियाभर के भक्त यहाँ आकर हनुमान जी की शरण में आते हैं।',
    country: 'India 🇮🇳',
    photos: [
      { img: '/images/temples/mehandipur-balaji.jpg', label_en: 'Temple Complex', label_hi: 'मंदिर परिसर', objPos: 'center center', portrait: false },
    ],
  },
  {
    id: 'hanumat-tekri-guna',
    name_hi: 'हनुमत् टेकरी, गुना',
    name_en: 'Hanuman Tekri',
    location_en: 'Guna, Madhya Pradesh',
    location_hi: 'गुना, मध्य प्रदेश',
    sig_en: 'The sacred hillock temple after which this virtual mandir is named. Hanuman Ji here is worshipped as Tekri Sarkar — the Lord of the Hill. Thousands of devotees climb the steps each day to seek his blessings at dawn.',
    sig_hi: 'यह वही पवित्र टेकरी मंदिर है जिसके नाम पर यह आभासी मंदिर समर्पित है। यहाँ हनुमान जी को "टेकरी सरकार" के रूप में पूजा जाता है। प्रतिदिन हजारों भक्त भोर में सीढ़ियाँ चढ़कर उनका आशीर्वाद लेते हैं।',
    country: 'India 🇮🇳',
    photos: [
      { img: '/images/temples/guna-tekri.jpg', label_en: 'Tekri Sarkar', label_hi: 'टेकरी सरकार', objPos: 'center 10%', portrait: true },
    ],
  },
  {
    id: 'salangpur',
    name_hi: 'काष्ठभंजन देव, सालंगपुर',
    name_en: 'Kashtabhanjan Dev',
    location_en: 'Sarangpur, Gujarat',
    location_hi: 'सारंगपुर, गुजरात',
    sig_en: 'Hanuman Ji as Kashtabhanjan Dev — the destroyer of all sorrows. The temple was consecrated by Swaminarayan Sampraday saint Gopalanand Swami in 1890. The idol is famed for miraculous cures and liberation from evil influences.',
    sig_hi: 'हनुमान जी यहाँ काष्ठभंजन देव के रूप में विराजमान हैं — सभी कष्टों का नाश करने वाले। मंदिर की प्राण-प्रतिष्ठा 1890 में स्वामीनारायण संप्रदाय के संत गोपालानंद स्वामी ने की थी।',
    country: 'India 🇮🇳',
    photos: [
      { img: '/images/temples/salangpur.jpg',     label_en: 'Temple Exterior', label_hi: 'मंदिर बाहर',   objPos: 'center 30%', portrait: false },
      { img: '/images/temples/salangpur-idol.jpg', label_en: 'Main Shrine',     label_hi: 'मुख्य गर्भगृह', objPos: 'center 25%', portrait: false },
    ],
  },
  {
    id: 'anjanadri-hampi',
    name_hi: 'अंजनाद्री पर्वत, हम्पी',
    name_en: 'Anjanadri Hill',
    location_en: 'Hampi, Karnataka',
    location_hi: 'हम्पी, कर्नाटक',
    sig_en: 'Believed to be the birthplace of Hanuman Ji. Anjanadri is the sacred hill where Anjana Devi prayed for a son. The 575-step climb leads to a hilltop shrine with breathtaking views of the Tungabhadra river and Hampi ruins.',
    sig_hi: 'ऐसा माना जाता है कि यही हनुमान जी का जन्मस्थल है। माता अंजना ने यहीं पुत्र-प्राप्ति के लिए तप किया था। 575 सीढ़ियाँ चढ़ने पर शिखर पर बना मंदिर और तुंगभद्रा नदी का अद्भुत दृश्य मिलता है।',
    country: 'India 🇮🇳',
    photos: [
      { img: '/images/temples/anjanadri-shrine.jpg', label_en: 'Hilltop Shrine',   label_hi: 'पर्वत मंदिर',    objPos: 'center 25%', portrait: false },
      { img: '/images/temples/anjanadri-hill.jpg',   label_en: 'Anjanadri Summit', label_hi: 'अंजनाद्री शिखर', objPos: 'center 20%', portrait: true },
    ],
  },
]

const ABROAD_TEMPLES = [
  { name_en: 'Carapichaima Hanuman', name_hi: 'हनुमान मूर्ति', location_en: 'Trinidad & Tobago', location_hi: 'त्रिनिदाद', note_en: "World's tallest Hanuman outside India — 85 ft", note_hi: 'भारत के बाहर विश्व की सबसे ऊँची हनुमान प्रतिमा — 85 फीट', flag: '🇹🇹' },
  { name_en: 'Hanuman Temple', name_hi: 'हनुमान मंदिर', location_en: 'Washington D.C., USA', location_hi: 'वाशिंगटन डी.सी.', note_en: 'Serving the Indian diaspora since the 1990s', note_hi: '1990 से भारतीय प्रवासियों की सेवा में', flag: '🇺🇸' },
  { name_en: 'Batu Caves Hanuman', name_hi: 'बाटू गुफा', location_en: 'Kuala Lumpur, Malaysia', location_hi: 'कुआलालंपुर', note_en: 'Grand Hanuman murti revered by the Malaysian Hindu community', note_hi: 'मलेशिया के हिंदू समुदाय द्वारा पूजित', flag: '🇲🇾' },
]

const GALLERY_IMAGES = [
  { url: '/images/hanuman-chola.jpg', caption_en: 'Standing Hanuman — Chola Dynasty, 11th Century', caption_hi: 'खड़े हनुमान — चोल राजवंश, ११वीं सदी' },
  { url: '/images/hanuman-sun.jpg',   caption_en: 'Baby Hanuman reaches for the Sun',              caption_hi: 'शिशु हनुमान — सूर्य को फल समझकर' },
  { url: '/images/hanuman-indra.jpg', caption_en: 'Indra and the young Hanuman',                  caption_hi: 'इंद्र और बाल हनुमान' },
]

const ATTRIBUTES = [
  { icon: '💪', label_en: 'Strength',  label_hi: 'शक्ति', desc_en: 'Infinite power',         desc_hi: 'अनंत बल' },
  { icon: '🧠', label_en: 'Wisdom',    label_hi: 'बुद्धि', desc_en: 'Supreme knowledge',       desc_hi: 'परम ज्ञान' },
  { icon: '❤️', label_en: 'Devotion',  label_hi: 'भक्ति', desc_en: 'Eternal love for Rama',   desc_hi: 'राम-भक्ति' },
  { icon: '🌬️', label_en: 'Vayu',     label_hi: 'वायु',  desc_en: 'Son of Wind God',          desc_hi: 'पवनपुत्र' },
]

function FullscreenViewer({ temple, photoIdx, onPhotoChange, onClose, language }) {
  const t = (en, hi) => language === 'hi' ? hi : en
  const photo = temple.photos[photoIdx]
  const total = temple.photos.length

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  onPhotoChange((photoIdx - 1 + total) % total)
      if (e.key === 'ArrowRight') onPhotoChange((photoIdx + 1) % total)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [photoIdx, total, onClose, onPhotoChange])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000', overflow: 'hidden' }}
    >
      {/* Main image — portrait uses contain + blurred backdrop; landscape pans */}
      <AnimatePresence mode="wait">
        <motion.div key={`fs-${temple.id}-${photoIdx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {photo.portrait ? (
            <>
              {/* Blurred fill behind contained portrait image */}
              <img src={photo.img} alt="" aria-hidden style={{ position: 'absolute', inset: '-50px', width: 'calc(100% + 100px)', height: 'calc(100% + 100px)', objectFit: 'cover', objectPosition: photo.objPos, filter: 'blur(32px)', opacity: 0.55, transform: 'scale(1.08)', display: 'block', maxWidth: 'none' }} />
              {/* Full portrait contained in frame */}
              <img src={photo.img} alt={photo.label_en} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', display: 'block', animation: 'subtleZoom 22s ease-in-out infinite' }} />
            </>
          ) : (
            <img src={photo.img} alt={photo.label_en} style={{ width: '130%', height: '100%', objectFit: 'cover', objectPosition: photo.objPos, display: 'block', maxWidth: 'none', animation: 'grandPan 30s ease-in-out infinite' }} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Gradient vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 18%, transparent 58%, rgba(0,0,0,0.92) 100%)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.45) 100%)', pointerEvents: 'none', zIndex: 2 }} />

      {/* Close × */}
      <motion.button whileHover={{ scale: 1.1, background: 'rgba(255,80,80,0.3)' }} whileTap={{ scale: 0.95 }} onClick={onClose} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', zIndex: 20, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: 48, height: 48, color: '#fff', cursor: 'pointer', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
        ×
      </motion.button>

      {/* Photo label badge */}
      <AnimatePresence mode="wait">
        <motion.div key={`fslabel-${photoIdx}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', zIndex: 20, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,193,7,0.25)', borderRadius: '18px', padding: '0.3rem 0.85rem' }}>
          <span style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif', fontSize: '0.68rem', color: '#ffc107', letterSpacing: '0.08em' }}>{t(photo.label_en, photo.label_hi)}</span>
        </motion.div>
      </AnimatePresence>

      {/* Temple name (above strip) */}
      <div style={{ position: 'absolute', bottom: total > 1 ? '7.5rem' : '5.5rem', left: '1.75rem', zIndex: 20 }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: 'rgba(255,193,7,0.65)', letterSpacing: '0.18em', marginBottom: '0.3rem' }}>{temple.country}</div>
        <div style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff8e7', textShadow: '0 3px 25px rgba(0,0,0,0.95)', lineHeight: 1.1, marginBottom: '0.3rem' }}>
          {t(temple.name_en, temple.name_hi)}
        </div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.82rem', color: 'rgba(255,193,7,0.8)', letterSpacing: '0.12em' }}>
          {t(temple.location_en, temple.location_hi)}
        </div>
      </div>

      {/* Photo strip at bottom */}
      {total > 1 && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,193,7,0.12)', padding: '0.7rem 1.5rem', display: 'flex', gap: '0.65rem', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {temple.photos.map((p, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onPhotoChange(i)} style={{ flexShrink: 0, width: 120, cursor: 'pointer', borderRadius: '8px', overflow: 'hidden', border: `2px solid ${i === photoIdx ? '#ffc107' : 'rgba(255,193,7,0.12)'}`, boxShadow: i === photoIdx ? '0 0 14px rgba(255,193,7,0.4)' : 'none', transition: 'all 0.25s' }}>
              <img src={p.img} alt={p.label_en} style={{ width: '100%', height: 68, objectFit: 'cover', objectPosition: p.objPos, display: 'block' }} />
              <div style={{ padding: '0.22rem 0.45rem', background: i === photoIdx ? 'rgba(255,193,7,0.08)' : 'rgba(8,4,18,0.95)' }}>
                <div style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif', fontSize: language === 'hi' ? '0.6rem' : '0.5rem', color: i === photoIdx ? '#ffc107' : '#c9a96e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '0.04em' }}>
                  {t(p.label_en, p.label_hi)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ‹ › nav arrows */}
      {total > 1 && [
        { side: 'left',  label: '‹', action: () => onPhotoChange((photoIdx - 1 + total) % total) },
        { side: 'right', label: '›', action: () => onPhotoChange((photoIdx + 1) % total) },
      ].map(({ side, label, action }) => (
        <motion.button key={side} whileHover={{ scale: 1.1, background: 'rgba(255,193,7,0.2)' }} whileTap={{ scale: 0.95 }} onClick={action} style={{ position: 'absolute', [side]: '1.5rem', top: '48%', transform: 'translateY(-50%)', zIndex: 20, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,193,7,0.35)', borderRadius: '50%', width: 56, height: 56, color: '#ffc107', cursor: 'pointer', fontSize: '2rem', fontFamily: 'serif', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '2px' }}>
          {label}
        </motion.button>
      ))}

      {/* Dot indicators */}
      {total > 1 && (
        <div style={{ position: 'absolute', bottom: total > 1 ? '6.2rem' : '1.5rem', right: '1.5rem', zIndex: 20, display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
          {temple.photos.map((_, i) => (
            <motion.div key={i} onClick={() => onPhotoChange(i)} animate={{ width: i === photoIdx ? 20 : 7, background: i === photoIdx ? '#ffc107' : 'rgba(255,193,7,0.3)' }} transition={{ duration: 0.3 }} style={{ height: 7, borderRadius: 4, cursor: 'pointer' }} />
          ))}
        </div>
      )}

      {/* Keyboard hint */}
      <div style={{ position: 'absolute', bottom: total > 1 ? '6.4rem' : '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 20, fontFamily: 'Cinzel, serif', fontSize: '0.5rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
        {total > 1 ? '← → ARROWS TO NAVIGATE · ESC TO CLOSE' : 'ESC TO CLOSE'}
      </div>
    </motion.div>
  )
}

function GlowingDiya({ delay = 0 }) {
  return (
    <motion.span animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay }} style={{ fontSize: '1.6rem', filter: 'drop-shadow(0 0 12px #ff8c00)' }}>🪔</motion.span>
  )
}

function ImageWithFallback({ src, alt, style }) {
  const [error, setError] = useState(false)
  if (error) return <div style={{ ...style, background: 'radial-gradient(ellipse, #3a1200 0%, #1a0505 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>🙏</div>
  return <img src={src} alt={alt} onError={() => setError(true)} style={{ ...style, objectFit: 'cover' }} />
}

function PanoramicHero({ temple, photoIdx, onPhotoChange, onOpenFullscreen, language }) {
  const photo = temple.photos[photoIdx]
  const t = (en, hi) => language === 'hi' ? hi : en
  const totalPhotos = temple.photos.length

  return (
    <div style={{ position: 'relative', width: '100%', height: 'clamp(300px, 58vh, 520px)', overflow: 'hidden', background: '#0a0515' }}>
      {/* Panning image */}
      <AnimatePresence mode="wait">
        <motion.div key={`${temple.id}-${photoIdx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <img
            src={photo.img}
            alt={photo.label_en}
            style={{
              width: photo.portrait ? '100%' : '135%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: photo.objPos,
              display: 'block',
              maxWidth: 'none',
              animation: photo.portrait ? 'subtleZoom 22s ease-in-out infinite' : 'grandPan 28s ease-in-out infinite',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradients */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 28%, transparent 52%, rgba(0,0,0,0.85) 100%)', pointerEvents: 'none', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, transparent 22%, transparent 78%, rgba(0,0,0,0.65) 100%)', pointerEvents: 'none', zIndex: 2 }} />

      {/* LIVE DARSHAN */}
      <div style={{ position: 'absolute', top: '1.1rem', right: '1.25rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '0.25rem 0.7rem' }}>
        <motion.span animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff3333', display: 'inline-block', flexShrink: 0 }} />
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.58rem', color: 'rgba(255,255,255,0.75)', letterSpacing: '0.18em' }}>LIVE DARSHAN</span>
      </div>

      {/* Photo label top-left */}
      <AnimatePresence mode="wait">
        <motion.div key={`label-${photoIdx}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ position: 'absolute', top: '1.1rem', left: '1.25rem', zIndex: 10, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,193,7,0.2)', borderRadius: '16px', padding: '0.22rem 0.65rem' }}>
          <span style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif', fontSize: '0.6rem', color: '#ffc107', letterSpacing: '0.08em' }}>
            {t(photo.label_en, photo.label_hi)}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Temple info bottom-left */}
      <div style={{ position: 'absolute', bottom: '1.75rem', left: '1.5rem', zIndex: 10, maxWidth: '58%' }}>
        <motion.div key={temple.id + '-bottom'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: 'rgba(255,193,7,0.65)', letterSpacing: '0.18em', marginBottom: '0.25rem' }}>{temple.country}</div>
          <div style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: 'clamp(1.3rem, 4vw, 2rem)', color: '#fff8e7', textShadow: '0 3px 20px rgba(0,0,0,0.9)', lineHeight: 1.15, marginBottom: '0.2rem' }}>
            {t(temple.name_en, temple.name_hi)}
          </div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(0.6rem, 1.5vw, 0.75rem)', color: 'rgba(255,193,7,0.8)', letterSpacing: '0.1em' }}>
            {t(temple.location_en, temple.location_hi)}
          </div>
        </motion.div>
      </div>

      {/* ‹ › arrows (cycle through THIS temple's photos) */}
      {totalPhotos > 1 && [
        { dir: 'prev', side: 'left', label: '‹', action: () => onPhotoChange((photoIdx - 1 + totalPhotos) % totalPhotos) },
        { dir: 'next', side: 'right', label: '›', action: () => onPhotoChange((photoIdx + 1) % totalPhotos) },
      ].map(({ dir, side, label, action }) => (
        <motion.button key={dir} whileHover={{ scale: 1.1, background: 'rgba(255,193,7,0.2)' }} whileTap={{ scale: 0.95 }} onClick={action} style={{ position: 'absolute', [side]: '1.1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,193,7,0.3)', borderRadius: '50%', width: 44, height: 44, color: '#ffc107', cursor: 'pointer', fontSize: '1.5rem', fontFamily: 'serif', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1, paddingBottom: '2px' }}>
          {label}
        </motion.button>
      ))}

      {/* Photo counter bottom-right */}
      {totalPhotos > 1 && (
        <div style={{ position: 'absolute', bottom: '1.85rem', right: '1.4rem', zIndex: 10, display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
          {temple.photos.map((_, i) => (
            <motion.div key={i} onClick={() => onPhotoChange(i)} animate={{ width: i === photoIdx ? 18 : 6, background: i === photoIdx ? '#ffc107' : 'rgba(255,193,7,0.3)' }} transition={{ duration: 0.3 }} style={{ height: 6, borderRadius: 3, cursor: 'pointer' }} />
          ))}
        </div>
      )}

      {/* Fullscreen button — click image or this button */}
      <motion.button
        whileHover={{ scale: 1.05, background: 'rgba(0,0,0,0.65)' }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenFullscreen}
        style={{ position: 'absolute', bottom: '1.6rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,193,7,0.22)', borderRadius: '20px', padding: '0.32rem 1rem', color: '#c9a96e', cursor: 'pointer', fontFamily: 'Cinzel, serif', fontSize: '0.58rem', letterSpacing: '0.14em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
      >
        ⛶ {language === 'hi' ? 'पूर्ण स्क्रीन' : 'FULL SCREEN'}
      </motion.button>

      {/* Whole-image click area for fullscreen */}
      <div onClick={onOpenFullscreen} style={{ position: 'absolute', inset: 0, zIndex: 1, cursor: 'zoom-in' }} />
    </div>
  )
}

function PhotoStrip({ temple, photoIdx, onPhotoChange, language }) {
  const t = (en, hi) => language === 'hi' ? hi : en
  if (temple.photos.length <= 1) return null

  return (
    <div style={{ background: 'rgba(8,4,18,0.98)', borderBottom: '1px solid rgba(255,193,7,0.08)', padding: '0.9rem 1.25rem' }}>
      <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.55rem', color: 'rgba(255,193,7,0.4)', letterSpacing: '0.2em', marginBottom: '0.6rem' }}>
        ✦ {t(`EXPLORE ${temple.name_en.toUpperCase()}`, `${temple.name_hi} के दृश्य`)} ✦
      </div>
      <div style={{ display: 'flex', gap: '0.7rem', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {temple.photos.map((photo, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => onPhotoChange(i)} style={{ flexShrink: 0, width: 130, cursor: 'pointer', borderRadius: '10px', overflow: 'hidden', border: `2px solid ${i === photoIdx ? '#ffc107' : 'rgba(255,193,7,0.08)'}`, boxShadow: i === photoIdx ? '0 0 16px rgba(255,193,7,0.35)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
            <img src={photo.img} alt={photo.label_en} style={{ width: '100%', height: 82, objectFit: 'cover', objectPosition: photo.objPos, display: 'block' }} />
            <div style={{ padding: '0.35rem 0.5rem', background: i === photoIdx ? 'rgba(255,193,7,0.07)' : 'rgba(10,5,21,0.97)' }}>
              <div style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif', fontSize: language === 'hi' ? '0.65rem' : '0.55rem', color: i === photoIdx ? '#ffc107' : '#c9a96e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '0.04em', lineHeight: 1.35 }}>
                {t(photo.label_en, photo.label_hi)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function MainHallView() {
  const { language, goBack, setArea } = useTempleStore()
  const [activeTemple, setActiveTemple] = useState(0)
  const [activePhoto, setActivePhoto] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [dailyShloka, setDailyShloka] = useState(null)
  const t = (en, hi) => language === 'hi' ? hi : en

  const switchTemple = useCallback((idx) => {
    setActiveTemple(idx)
    setActivePhoto(0)
  }, [])

  // Auto-advance temples every 12 s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTemple(p => (p + 1) % FAMOUS_TEMPLES.length)
      setActivePhoto(0)
    }, 12000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
    supabase.from('daily_shlokas').select('*').eq('day_of_year', dayOfYear % 365 || 1).single().then(({ data }) => {
      if (data) setDailyShloka(data)
    })
  }, [])

  const currentTemple = FAMOUS_TEMPLES[activeTemple]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, zIndex: 300, background: '#0a0515', overflowY: 'auto' }}>
      {/* Fullscreen viewer overlay */}
      <AnimatePresence>
        {fullscreen && (
          <FullscreenViewer
            temple={currentTemple}
            photoIdx={activePhoto}
            onPhotoChange={setActivePhoto}
            onClose={() => setFullscreen(false)}
            language={language}
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes grandPan {
          0%   { transform: translateX(0) scale(1.04); }
          50%  { transform: translateX(-22%) scale(1.04); }
          100% { transform: translateX(0) scale(1.04); }
        }
        @keyframes subtleZoom {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.07); }
          100% { transform: scale(1); }
        }
      `}</style>

      {/* Nav */}
      <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(10,5,21,0.94)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(255,193,7,0.12)', padding: '0.8rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={goBack} style={{ background: 'rgba(255,193,7,0.08)', border: '1px solid rgba(255,193,7,0.25)', borderRadius: '8px', color: '#c9a96e', fontFamily: 'Cinzel, serif', fontSize: '0.78rem', padding: '0.4rem 0.9rem', cursor: 'pointer', letterSpacing: '0.08em' }}>
          ← {t('Back', 'वापस')}
        </motion.button>
        <span style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(0.72rem, 2vw, 0.9rem)', color: '#ffc107', letterSpacing: '0.15em' }}>
          {t('MAIN DARSHAN HALL', 'मुख्य दर्शन कक्ष')}
        </span>
        <div style={{ display: 'flex', gap: '0.35rem' }}><GlowingDiya delay={0} /><GlowingDiya delay={0.8} /></div>
      </div>

      {/* ─── PANORAMIC VIEWER ─── */}
      <PanoramicHero temple={currentTemple} photoIdx={activePhoto} onPhotoChange={setActivePhoto} onOpenFullscreen={() => setFullscreen(true)} language={language} />

      {/* ─── PHOTO STRIP (multiple views of this temple) ─── */}
      <PhotoStrip temple={currentTemple} photoIdx={activePhoto} onPhotoChange={setActivePhoto} language={language} />

      {/* ─── TEMPLE SELECTOR ─── */}
      <div style={{ background: 'rgba(6,3,14,0.99)', borderBottom: '1px solid rgba(255,193,7,0.08)', padding: '0.85rem 0' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.5rem', color: 'rgba(255,193,7,0.35)', letterSpacing: '0.25em', textAlign: 'center', marginBottom: '0.55rem' }}>
          {t('FAMOUS HANUMAN TEMPLES', 'प्रसिद्ध हनुमान मंदिर')}
        </div>
        <div style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', padding: '0.1rem 1.1rem', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {FAMOUS_TEMPLES.map((temple, i) => (
            <motion.div key={temple.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => switchTemple(i)} style={{ flexShrink: 0, width: 100, borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${i === activeTemple ? '#ffc107' : 'rgba(255,193,7,0.08)'}`, boxShadow: i === activeTemple ? '0 0 14px rgba(255,193,7,0.3)' : 'none', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
              <img src={temple.photos[0].img} alt={temple.name_en} style={{ width: '100%', height: 60, objectFit: 'cover', objectPosition: temple.photos[0].objPos, display: 'block' }} />
              <div style={{ padding: '0.3rem 0.4rem', background: i === activeTemple ? 'rgba(255,193,7,0.07)' : 'rgba(8,4,18,0.99)' }}>
                <div style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: '0.62rem', color: i === activeTemple ? '#ffc107' : '#c9a96e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.25 }}>{temple.name_hi}</div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.44rem', color: 'rgba(201,169,110,0.4)', letterSpacing: '0.04em', marginTop: '0.08rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{temple.location_en.split(',').pop()?.trim()}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── REST OF CONTENT ─── */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.25rem' }}>

        {/* Significance */}
        <AnimatePresence mode="wait">
          <motion.div key={currentTemple.id + '-sig'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} style={{ marginTop: '1.25rem', background: 'rgba(18,8,42,0.7)', border: '1px solid rgba(255,193,7,0.14)', borderRadius: '14px', padding: '1.1rem 1.4rem', display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
            <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '0.1rem' }}>🕌</span>
            <div>
              <div style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif', fontSize: '0.6rem', color: '#ffc107', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>
                {t(`ABOUT ${currentTemple.name_en.toUpperCase()}`, currentTemple.name_hi + ' के बारे में')}
              </div>
              <p style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif', fontSize: language === 'hi' ? '0.9rem' : '0.84rem', color: 'rgba(255,248,231,0.82)', lineHeight: 1.9, margin: 0 }}>
                {t(currentTemple.sig_en, currentTemple.sig_hi)}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Abroad temples */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ marginTop: '1.5rem' }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: 'rgba(255,193,7,0.5)', letterSpacing: '0.2em', textAlign: 'center', marginBottom: '0.85rem' }}>
            ✦ {t('HANUMAN JI ACROSS THE WORLD', 'विश्व में हनुमान जी')} ✦
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
            {ABROAD_TEMPLES.map((temple, i) => (
              <div key={i} style={{ background: 'rgba(18,8,42,0.55)', border: '1px solid rgba(255,193,7,0.1)', borderRadius: '12px', padding: '0.9rem 0.7rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{temple.flag}</div>
                <div style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif', fontSize: '0.7rem', color: '#c9a96e', marginBottom: '0.18rem', lineHeight: 1.3 }}>{t(temple.name_en, temple.name_hi)}</div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.5rem', color: 'rgba(201,169,110,0.45)', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>{t(temple.location_en, temple.location_hi)}</div>
                <div style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif', fontSize: language === 'hi' ? '0.65rem' : '0.6rem', color: 'rgba(255,248,231,0.45)', lineHeight: 1.5 }}>{t(temple.note_en, temple.note_hi)}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.8 }} style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,193,7,0.4), transparent)', margin: '2rem 0' }} />

        {/* Hanuman Ji title */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h1 style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: '#ffc107', textShadow: '0 0 40px rgba(255,193,7,0.7), 0 0 80px rgba(255,107,53,0.3)', lineHeight: 1.2, marginBottom: '0.35rem' }}>श्री हनुमान जी</h1>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(0.72rem, 2vw, 0.9rem)', color: '#c9a96e', letterSpacing: '0.28em' }}>JAI SHRI RAM · JAI BAJRANG BALI</p>
        </div>

        {/* Gallery */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.9rem', marginBottom: '2rem' }}>
          {GALLERY_IMAGES.map((img, idx) => (
            <div key={idx} style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid rgba(255,193,7,0.2)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', background: 'rgba(18,8,42,0.6)' }}>
              <ImageWithFallback src={img.url} alt={img.caption_en} style={{ width: '100%', height: 'clamp(100px, 18vw, 190px)', display: 'block' }} />
              <div style={{ padding: '0.5rem 0.6rem', fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif', fontSize: 'clamp(0.58rem, 1.3vw, 0.7rem)', color: '#c9a96e', lineHeight: 1.35, textAlign: 'center' }}>
                {t(img.caption_en, img.caption_hi)}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Attributes */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif', fontSize: 'clamp(0.82rem, 2.5vw, 1.05rem)', color: '#ffc107', letterSpacing: '0.15em', textAlign: 'center', marginBottom: '1.1rem' }}>{t('DIVINE ATTRIBUTES', 'दिव्य गुण')}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.7rem' }}>
            {ATTRIBUTES.map((attr, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + idx * 0.08 }} style={{ background: 'rgba(18,8,42,0.7)', border: '1px solid rgba(255,193,7,0.18)', borderRadius: '14px', padding: '1rem 0.5rem', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                <div style={{ fontSize: '1.7rem', marginBottom: '0.4rem' }}>{attr.icon}</div>
                <div style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif', fontSize: 'clamp(0.68rem, 1.7vw, 0.82rem)', color: '#fff8e7', marginBottom: '0.2rem', fontWeight: 600 }}>{t(attr.label_en, attr.label_hi)}</div>
                <div style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif', fontSize: 'clamp(0.58rem, 1.3vw, 0.7rem)', color: 'rgba(201,169,110,0.8)' }}>{t(attr.desc_en, attr.desc_hi)}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mantra */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ background: 'rgba(18,8,42,0.75)', border: '1px solid rgba(255,193,7,0.25)', borderRadius: '18px', padding: '1.75rem', textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.65rem', color: '#ffc107', letterSpacing: '0.2em', marginBottom: '1.1rem' }}>✦ {t('MANTRA', 'मंत्र')} ✦</div>
          <p style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)', color: '#fff8e7', lineHeight: 2.2, whiteSpace: 'pre-line', marginBottom: '1.1rem' }}>{`ॐ श्री हनुमते नमः\nअंजनेय महाबलाय\nरामदूत परायण\nवायु पुत्र नमो नमः`}</p>
          <p style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(0.68rem, 1.5vw, 0.82rem)', color: 'rgba(201,169,110,0.65)', lineHeight: 1.9, whiteSpace: 'pre-line' }}>{`Om Shri Hanumate Namah\nAnjaneya Mahabalaya\nRamaduta Parayana\nVayu Putra Namo Namah`}</p>
        </motion.div>

        {/* About */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.82 }} style={{ background: 'rgba(18,8,42,0.5)', border: '1px solid rgba(255,193,7,0.1)', borderRadius: '18px', padding: '1.5rem 1.75rem', marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif', fontSize: 'clamp(0.88rem, 2.5vw, 1.08rem)', color: '#ffc107', letterSpacing: '0.1em', marginBottom: '0.9rem' }}>{t('About Shri Hanuman Ji', 'श्री हनुमान जी के बारे में')}</h3>
          <p style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif', fontSize: 'clamp(0.8rem, 1.9vw, 0.93rem)', color: 'rgba(255,248,231,0.82)', lineHeight: 1.95, marginBottom: '0.85rem' }}>
            {t('Shri Hanuman Ji is the eternal devotee and messenger of Lord Ram. Born to Anjana and blessed by Vayu Dev (the Wind God), he is known as Anjaneya, Mahavira, and Bajrangbali — worshipped across India and around the world for strength, courage, and protection.', 'श्री हनुमान जी भगवान राम के परम भक्त और दूत हैं। अंजना के पुत्र और वायु देव के आशीर्वाद से जन्मे, उन्हें अंजनेय, महावीर और बजरंगबली के नाम से जाना जाता है — भारत और विश्वभर में शक्ति, साहस और सुरक्षा के लिए पूजे जाते हैं।')}
          </p>
          <p style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif', fontSize: 'clamp(0.8rem, 1.9vw, 0.93rem)', color: 'rgba(255,248,231,0.82)', lineHeight: 1.95, margin: 0 }}>
            {t('He crossed the ocean to find Sita Mata in Lanka, burned the demon city with his tail, and carried the Sanjeevani mountain to save Laxman Ji. His unwavering devotion to Lord Ram is the highest ideal of Bhakti.', 'उन्होंने लंका में सीता माता को खोजने के लिए समुद्र पार किया, अपनी पूंछ से लंका जलाई और लक्ष्मण जी को बचाने के लिए संजीवनी पर्वत उठा लाए। भगवान राम के प्रति उनकी अटल भक्ति भक्ति का सर्वोच्च आदर्श है।')}
          </p>
        </motion.div>

        {/* Daily Shloka */}
        {dailyShloka && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.92 }} style={{ background: 'linear-gradient(135deg, rgba(26,8,42,0.9), rgba(18,8,42,0.9))', border: '1px solid rgba(255,107,53,0.25)', borderRadius: '18px', padding: '1.6rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: '#ff6b35', letterSpacing: '0.2em', marginBottom: '0.85rem' }}>✦ {t('SHLOKA OF THE DAY', 'आज का श्लोक')} ✦</div>
            <p style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: 'clamp(0.95rem, 2.5vw, 1.18rem)', color: '#fff8e7', lineHeight: 2.1, whiteSpace: 'pre-line', marginBottom: '0.7rem' }}>{dailyShloka.shloka_hi}</p>
            {dailyShloka.meaning_en && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(201,169,110,0.65)', lineHeight: 1.8 }}>{language === 'hi' ? dailyShloka.meaning_hi : dailyShloka.meaning_en}</p>}
          </motion.div>
        )}

        {/* 108 Names */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} style={{ marginBottom: '2rem' }}>
          <motion.button whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,193,7,0.18)' }} whileTap={{ scale: 0.98 }} onClick={() => setArea('hanuman-names')} style={{ width: '100%', background: 'rgba(18,8,42,0.7)', border: '1px solid rgba(255,193,7,0.2)', borderRadius: '16px', padding: '1.2rem 1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: '1.05rem', color: '#ffc107', marginBottom: '0.18rem' }}>हनुमान जी के १०८ नाम</div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.62rem', color: '#c9a96e', letterSpacing: '0.1em' }}>{t('108 DIVINE NAMES WITH MEANINGS', '१०८ दिव्य नाम अर्थ सहित')}</div>
            </div>
            <span style={{ color: '#ffc107', fontSize: '1.2rem' }}>→</span>
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.div animate={{ opacity: [0.45, 1, 0.45] }} transition={{ duration: 3.5, repeat: Infinity }} style={{ textAlign: 'center', paddingBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: '1.9rem', color: '#ffc107', letterSpacing: '0.6em', textShadow: '0 0 25px rgba(255,193,7,0.55)' }}>ॐ ॐ ॐ</span>
          <p style={{ fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif', fontSize: '0.75rem', color: 'rgba(201,169,110,0.5)', letterSpacing: '0.1em', marginTop: '0.6rem' }}>
            {t('You stand in the sacred presence of Bajrang Bali.', 'आप बजरंग बली की पवित्र उपस्थिति में हैं।')}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
