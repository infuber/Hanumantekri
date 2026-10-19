import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'
import { supabase } from '../../lib/supabase'

// ─── Static prayer data (rendered instantly; DB supplements) ─────────────────
const HANUMAN_AARTI = {
  slug: 'hanuman-aarti',
  title_hi: 'आरती कीजे हनुमान लला की',
  title_en: 'Aarti Kije Hanuman Lala Ki',
  prayer_type: 'aarti',
  content_hi: `आरती कीजे हनुमान लला की।
दुष्ट दलन रघुनाथ कला की॥

जाके बल से गिरिवर काँपे।
रोग दोष जाके निकट न झाँपे॥

अंजनिपुत्र महाबलदायी।
संतन के प्रभु सदा सहाई॥

दे बीड़ा रघुपति कर लीन्हा।
लंका जारि सिय सुधि लीन्हा॥

लंका सो कोट समुद्र सी खाई।
जात पवनसुत बार न लाई॥

लंका जारि असुर संहारे।
सियाराम जी के काज संवारे॥

लक्ष्मण मूर्छित पड़े सकारे।
आणि संजीवन प्राण उबारे॥

पैठि पाताल तोरि यम कारे।
अहिरावण की भुजा उखारे॥

बाईं भुजा असुर दल मारे।
दाहिनी भुजा संत जन तारे॥

सुर नर मुनि जन आरती उतारें।
जय जय जय हनुमान उचारे॥

कंचन थार कपूर लौ छाई।
आरती करत अंजना माई॥

जो हनुमानजी की आरती गावे।
बसि बैकुण्ठ परम पद पावे॥`,
  content_en: `Perform the aarti of Hanuman, the darling child,
He who destroys the wicked through the power of Raghunath.

With whose strength the great mountains tremble,
Near whom no disease or fault can approach.

Son of Anjana, giver of great strength,
Always a helper to the saints, O Lord.

He accepted the betel leaf from Raghupati's hand,
Burned Lanka and found news of Sita.

Lanka was like a fortress with an ocean as its moat,
Yet the Son of Wind crossed it in no time.

He burned Lanka and destroyed the demons,
He accomplished the work of Siyaram Ji.

When Lakshmana lay unconscious in the morning,
He brought Sanjeevani and saved his life.

He entered the netherworld and broke the prison of Yama,
He uprooted the arms of Ahiravana.

With his left arm he struck down the army of demons,
With his right arm he uplifted the saints.

Gods, humans, sages all perform his aarti,
Chanting victory, victory, victory to Hanuman.

On a golden plate, the light of camphor glows,
Mother Anjana performs his aarti.

Whoever sings the aarti of Hanuman Ji,
Attains the supreme abode of Vaikuntha.`,
}

const STATIC_PRAYERS = [
  {
    slug: 'bajrang-baan',
    title_hi: 'बजरंग बाण',
    title_en: 'Bajrang Baan',
    prayer_type: 'baan',
    content_hi: `निश्चय प्रेम प्रतीति ते, बिनय करैं सनमान।
तेहि के कारज सकल शुभ, सिद्ध करैं हनुमान॥

जय हनुमंत संत हितकारी।
सुन लीजै प्रभु अरज हमारी॥

जन के काज बिलंब न कीजै।
आतुर दौरि महा सुख दीजै॥

जैसे कूदि सिंधु महि पारा।
सुरसा बदन पैठि बिस्तारा॥

आगे जाय लंकिनी रोका।
मारेहु लात गई सुरलोका॥

जाय बिभीषण को सुख दीन्हा।
सीताजी की खोज कब लीन्हा॥

यह बजरंग बाण जो जापै।
तासु शत्रु सब त्रास न व्यापै॥`,
    content_en: `With love, faith and reverence, he who humbly prays,
All his auspicious tasks, Hanuman accomplishes.

Victory to Hanumat, the benefactor of saints,
O Lord, please listen to our humble prayer.

Do not delay in the works of your devotees,
Run eagerly and grant great happiness.

Just as you leaped and crossed the great ocean,
And entered the mouth of Surasa and expanded.

When Lankini blocked the path ahead,
You kicked her and she went to the heavenly realm.

You went and gave happiness to Vibhishana,
Then found Mother Sita quickly.

Whoever chants this Bajrang Baan,
No fear from enemies shall ever touch them.`,
  },
  {
    slug: 'sankat-mochan-ashtak',
    title_hi: 'संकट मोचन हनुमान अष्टक',
    title_en: 'Sankat Mochan Hanuman Ashtak',
    prayer_type: 'stotra',
    content_hi: `बाल समय रवि भक्षि लियो तब,
तीनहुँ लोक भयो अँधियारो।
ताहि सों त्रास भयो जग को,
यह संकट काहु सों जात न टारो॥

देवन आनि करी बिनती तब,
छाड़ि दियो रवि कष्ट निवारो।
को नहिं जानत है जग में कपि,
संकट मोचन नाम तिहारो॥

बालि की त्रास कपीस बसै गिरि,
जात महाप्रभु पंथ निहारो।
चाहत सीय अशोक सों आगे,
देखि पवनसुत ताहि सुधारो॥

हनुमान अष्टक पढ़त जो कोई,
शत्रु संकट सब दूर करैगो।
भक्ति भाव भर नित नित गावत,
पावत पद हरि का यह जैगो॥`,
    content_en: `In childhood you swallowed the Sun,
And all three worlds fell into darkness.
The world was filled with terror,
This crisis no one could remove.

Then the gods came and pleaded with you,
You released the Sun and ended their suffering.
Who in this world does not know, O Monkey Lord,
Your name — Sankat Mochan (Remover of Sorrow).

While Bali terrorized the monkey kingdom on the mountain,
You walked the path of the great Lord.
When Sita longed to move beyond the Ashok grove,
The Son of Wind came and set things right.

Whoever reads the Hanuman Ashtak,
All enemy troubles will be removed.
Singing with devotion day after day,
One attains the feet of Hari.`,
  },
  {
    slug: 'ram-stuti',
    title_hi: 'श्री राम स्तुति',
    title_en: 'Shri Ram Stuti',
    prayer_type: 'stuti',
    content_hi: `श्री रामचंद्र कृपालु भज मन,
हरण भव भय दारुणम्।
नव कंज लोचन कंज मुख,
कर कंज पद कंजारुणम्॥

कंदर्प अगणित अमित छवि,
नव नील नीरद सुंदरम्।
पट पीत मानहु तड़ित रुचि,
शुचि नौमि जनक सुता वरम्॥

भजु दीन बंधु दिनेश दानव,
दैत्य वंश निकंदनम्।
रघुनंद आनंद कंद कोशल,
चंद दशरथ नंदनम्॥

सिर मुकुट कुंडल तिलक,
चारु उदार अंग विभूषणम्।
आजानु भुज शर चाप धर,
संग्राम जित खर दूषणम्॥`,
    content_en: `O mind, worship the merciful Shri Ramachandra,
Who destroys the terrible fear of worldly existence.
His eyes are like new lotus flowers, his face is lotus-like,
His hands are lotus-like, his feet glow like red lotuses.

His beauty surpasses countless Kamadevas,
He is lovely like a new blue rain cloud.
His yellow garments shine like lightning,
Pure I bow to the one who married Janaka's daughter.

Worship the protector of the downtrodden, the sun for the needy,
The destroyer of the demon and Daitya lineage.
The joy of Raghu's clan, the source of bliss, the moon of Kosala,
The beloved son of Dasharatha.

He wears a crown, earrings, and tilak,
Adorned with beautiful and gracious ornaments.
He holds a bow and arrows, his arms reaching to his knees,
He who conquered Khar and Dushan in battle.`,
  },
]

// ─── Animated Diya ─────────────────────────────────────────────────────────────
function AnimatedDiya({ size = 48 }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', fontSize: size }}>
      <motion.span
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ filter: 'drop-shadow(0 0 16px #ff8c00)' }}
      >
        🪔
      </motion.span>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: '-10%',
            left: `${35 + i * 6}%`,
            width: 3,
            height: 3,
            background: '#ffc107',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
          animate={{ y: [-4, -20 - i * 6], opacity: [1, 0], scale: [1, 0.2] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.28, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

// ─── Manokamna tab ────────────────────────────────────────────────────────────
function ManokamnaTab({ language }) {
  const [prayer, setPrayer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)

  const t = (en, hi) => language === 'hi' ? hi : en

  async function handleSubmit(e) {
    e.preventDefault()
    if (!prayer.trim()) return
    setSaving(true)
    try {
      await supabase.from('manokamna').insert({ prayer_text: prayer.trim(), language })
    } catch (_) { /* silently ignore — blessing still shown */ }
    setSaving(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '1rem 0' }}
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}
        >
          🙏
        </motion.div>

        <h2 style={{
          fontFamily: 'Noto Sans Devanagari, serif',
          fontSize: 'clamp(1.2rem, 3.5vw, 1.7rem)',
          color: '#ffc107',
          textShadow: '0 0 25px rgba(255,193,7,0.6)',
          marginBottom: '1rem',
          lineHeight: 1.5,
        }}>
          {t('Jai Bajrang Bali! 🙏', 'जय बजरंग बली! 🙏')}
        </h2>

        <div style={{
          background: 'rgba(18,8,42,0.8)',
          border: '1px solid rgba(255,193,7,0.3)',
          borderRadius: '16px',
          padding: '1.75rem',
          marginBottom: '1.5rem',
        }}>
          <p style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: '#fff8e7',
            lineHeight: 1.9,
            marginBottom: '0.75rem',
          }}>
            ॐ हनुमान जी ने आपकी प्रार्थना स्वीकार की।
          </p>
          <p style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
            color: '#ffc107',
            lineHeight: 1.9,
            marginBottom: '0.75rem',
          }}>
            आपकी मनोकामना अवश्य पूरी होगी।
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.88rem',
            color: 'rgba(201,169,110,0.75)',
            lineHeight: 1.8,
          }}>
            {t(
              'Your prayer has reached the divine feet of Bajrang Bali. With his blessings of strength and courage, your wish shall be fulfilled. Have faith — Sankat Mochan is always with you.',
              'आपकी प्रार्थना बजरंग बली के दिव्य चरणों तक पहुंच गई है। उनकी शक्ति और साहस की कृपा से आपकी मनोकामना पूरी होगी। विश्वास रखें — संकट मोचन सदा आपके साथ हैं।'
            )}
          </p>
        </div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: '1.5rem',
            color: '#ffc107',
            letterSpacing: '0.5em',
            marginBottom: '1.5rem',
            textShadow: '0 0 20px rgba(255,193,7,0.5)',
          }}
        >
          ॐ ॐ ॐ
        </motion.div>

        <button
          onClick={() => { setSubmitted(false); setPrayer('') }}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,193,7,0.3)',
            borderRadius: '10px',
            padding: '0.6rem 1.5rem',
            color: '#c9a96e',
            fontFamily: 'Cinzel, serif',
            fontSize: '0.8rem',
            cursor: 'pointer',
            letterSpacing: '0.08em',
          }}
        >
          {t('Offer Another Prayer', 'एक और प्रार्थना करें')}
        </button>
      </motion.div>
    )
  }

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <AnimatedDiya size={44} />
        <p style={{
          fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
          fontSize: '0.88rem',
          color: 'rgba(201,169,110,0.8)',
          marginTop: '0.75rem',
          lineHeight: 1.7,
        }}>
          {t(
            'Share your prayer or wish with Hanuman Ji. He is Sankat Mochan — the remover of all sorrows.',
            'हनुमान जी से अपनी प्रार्थना या मनोकामना साझा करें। वे संकट मोचन हैं — सभी कष्टों को हरने वाले।'
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <label style={{
          display: 'block',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.72rem',
          color: '#c9a96e',
          letterSpacing: '0.12em',
          marginBottom: '0.6rem',
        }}>
          {t('YOUR PRAYER / MANOKAMNA', 'आपकी प्रार्थना / मनोकामना')}
        </label>
        <textarea
          value={prayer}
          onChange={(e) => setPrayer(e.target.value)}
          placeholder={t(
            'O Bajrang Bali, please hear my prayer...',
            'हे बजरंग बली, मेरी प्रार्थना सुनिए...'
          )}
          rows={5}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,193,7,0.2)',
            borderRadius: '10px',
            padding: '0.9rem 1rem',
            color: '#fff8e7',
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
            fontSize: language === 'hi' ? '1rem' : '0.9rem',
            resize: 'vertical',
            outline: 'none',
            lineHeight: 1.75,
            boxSizing: 'border-box',
          }}
          onFocus={(e) => (e.target.style.borderColor = 'rgba(255,193,7,0.55)')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(255,193,7,0.2)')}
        />

        <button
          type="submit"
          disabled={!prayer.trim() || saving}
          style={{
            marginTop: '1rem',
            width: '100%',
            background: prayer.trim()
              ? 'linear-gradient(135deg, #ff6b35, #c0392b)'
              : 'rgba(255,107,53,0.15)',
            border: 'none',
            borderRadius: '10px',
            padding: '0.9rem',
            color: prayer.trim() ? '#fff8e7' : 'rgba(255,248,231,0.3)',
            fontFamily: 'Cinzel, serif',
            fontSize: '0.88rem',
            letterSpacing: '0.1em',
            cursor: prayer.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
          }}
        >
          {saving ? '🙏 Submitting...' : `🙏 ${t('Offer Prayer', 'प्रार्थना अर्पित करें')}`}
        </button>
      </form>
    </div>
  )
}

// ─── Aarti tab ────────────────────────────────────────────────────────────────
function AartiTab({ language }) {
  const [showEnglish, setShowEnglish] = useState(false)
  const t = (en, hi) => language === 'hi' ? hi : en

  return (
    <div>
      {/* Animated aarti thali */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '0.75rem' }}>
          {[0, 0.5, 1].map((delay) => (
            <motion.div
              key={delay}
              animate={{ rotate: [-8, 8, -8], y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay }}
              style={{ fontSize: '2.2rem', filter: 'drop-shadow(0 0 14px #ff8c00)' }}
            >
              🪔
            </motion.div>
          ))}
        </div>
        <div style={{
          fontFamily: 'Noto Sans Devanagari, serif',
          fontSize: 'clamp(1.2rem, 3.5vw, 1.6rem)',
          color: '#ffc107',
          textShadow: '0 0 20px rgba(255,193,7,0.6)',
        }}>
          {HANUMAN_AARTI.title_hi}
        </div>
        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.75rem',
          color: '#c9a96e',
          letterSpacing: '0.12em',
          marginTop: '0.25rem',
        }}>
          {HANUMAN_AARTI.title_en}
        </div>
      </div>

      {/* Language toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        {['Hindi', 'English'].map((lang) => (
          <button
            key={lang}
            onClick={() => setShowEnglish(lang === 'English')}
            style={{
              background: (lang === 'English') === showEnglish
                ? 'rgba(255,193,7,0.2)'
                : 'transparent',
              border: `1px solid ${(lang === 'English') === showEnglish ? 'rgba(255,193,7,0.6)' : 'rgba(255,193,7,0.15)'}`,
              borderRadius: '8px',
              padding: '0.3rem 0.9rem',
              color: (lang === 'English') === showEnglish ? '#ffc107' : 'rgba(201,169,110,0.6)',
              fontFamily: 'Cinzel, serif',
              fontSize: '0.7rem',
              cursor: 'pointer',
              letterSpacing: '0.08em',
            }}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Aarti text */}
      <div style={{
        background: 'rgba(18,8,42,0.7)',
        border: '1px solid rgba(255,193,7,0.15)',
        borderRadius: '14px',
        padding: '1.5rem',
        maxHeight: '320px',
        overflowY: 'auto',
      }}>
        <p style={{
          fontFamily: showEnglish ? 'Inter, sans-serif' : 'Noto Sans Devanagari, serif',
          fontSize: showEnglish ? '0.88rem' : '1.05rem',
          color: '#fff8e7',
          lineHeight: 2.1,
          whiteSpace: 'pre-line',
        }}>
          {showEnglish ? HANUMAN_AARTI.content_en : HANUMAN_AARTI.content_hi}
        </p>
      </div>

      {/* YouTube listen button */}
      <a
        href="https://www.youtube.com/results?search_query=aarti+kije+hanuman+lala+ki"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '1rem',
          padding: '0.7rem',
          background: 'rgba(255,0,0,0.12)',
          border: '1px solid rgba(255,0,0,0.3)',
          borderRadius: '10px',
          color: '#ff6b6b',
          fontFamily: 'Cinzel, serif',
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        ▶ {t('Listen on YouTube', 'YouTube पर सुनें')}
      </a>
    </div>
  )
}

// ─── Prayer Library tab ───────────────────────────────────────────────────────
function PrayerLibraryTab({ language }) {
  const [dbPrayers, setDbPrayers] = useState([])
  const [expanded, setExpanded] = useState(null)
  const [showEnglish, setShowEnglish] = useState({})
  const t = (en, hi) => language === 'hi' ? hi : en

  useEffect(() => {
    supabase.from('prayers').select('*').order('display_order').then(({ data }) => {
      if (data && data.length > 0) setDbPrayers(data)
    })
  }, [])

  const allPrayers = dbPrayers.length > 0 ? dbPrayers : STATIC_PRAYERS

  const TYPE_LABELS = {
    aarti: { en: 'Aarti', hi: 'आरती' },
    baan: { en: 'Baan', hi: 'बाण' },
    stotra: { en: 'Stotra', hi: 'स्तोत्र' },
    stuti: { en: 'Stuti', hi: 'स्तुति' },
    prayer: { en: 'Prayer', hi: 'प्रार्थना' },
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <p style={{
        fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
        fontSize: '0.82rem',
        color: 'rgba(201,169,110,0.7)',
        textAlign: 'center',
        marginBottom: '0.5rem',
      }}>
        {t('Sacred prayers and stotras for Hanuman Ji', 'हनुमान जी की पवित्र प्रार्थनाएं और स्तोत्र')}
      </p>

      {allPrayers.map((p) => {
        const isOpen = expanded === p.slug
        const typeLabel = TYPE_LABELS[p.prayer_type] || TYPE_LABELS.prayer
        const showEn = showEnglish[p.slug]

        return (
          <div
            key={p.slug}
            style={{
              background: 'rgba(18,8,42,0.7)',
              border: `1px solid ${isOpen ? 'rgba(255,193,7,0.35)' : 'rgba(255,193,7,0.12)'}`,
              borderRadius: '14px',
              overflow: 'hidden',
              transition: 'border-color 0.3s',
            }}
          >
            {/* Header */}
            <button
              onClick={() => setExpanded(isOpen ? null : p.slug)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                padding: '1rem 1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                gap: '0.75rem',
              }}
            >
              <div style={{ textAlign: 'left', flex: 1 }}>
                <span style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.58rem',
                  color: '#ff6b35',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.2rem',
                }}>
                  {language === 'hi' ? typeLabel.hi : typeLabel.en}
                </span>
                <span style={{
                  fontFamily: 'Noto Sans Devanagari, serif',
                  fontSize: '1rem',
                  color: '#fff8e7',
                  display: 'block',
                }}>
                  {p.title_hi}
                </span>
                <span style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.65rem',
                  color: 'rgba(201,169,110,0.6)',
                }}>
                  {p.title_en}
                </span>
              </div>
              <span style={{ color: '#c9a96e', fontSize: '0.9rem' }}>
                {isOpen ? '▲' : '▼'}
              </span>
            </button>

            {/* Expanded content */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ padding: '0 1.2rem 1.2rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.9rem' }}>
                      {['Hindi', 'English'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setShowEnglish((prev) => ({ ...prev, [p.slug]: lang === 'English' }))}
                          style={{
                            background: (lang === 'English') === showEn ? 'rgba(255,193,7,0.15)' : 'transparent',
                            border: `1px solid ${(lang === 'English') === showEn ? 'rgba(255,193,7,0.5)' : 'rgba(255,193,7,0.12)'}`,
                            borderRadius: '6px',
                            padding: '0.2rem 0.7rem',
                            color: (lang === 'English') === showEn ? '#ffc107' : 'rgba(201,169,110,0.5)',
                            fontFamily: 'Cinzel, serif',
                            fontSize: '0.62rem',
                            cursor: 'pointer',
                            letterSpacing: '0.06em',
                          }}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                    <div style={{
                      maxHeight: '260px',
                      overflowY: 'auto',
                      paddingRight: '0.25rem',
                    }}>
                      <p style={{
                        fontFamily: showEn ? 'Inter, sans-serif' : 'Noto Sans Devanagari, serif',
                        fontSize: showEn ? '0.85rem' : '1rem',
                        color: '#fff8e7',
                        lineHeight: 2.1,
                        whiteSpace: 'pre-line',
                      }}>
                        {showEn ? p.content_en : p.content_hi}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ─── Main PujaView ────────────────────────────────────────────────────────────
const TABS = [
  { id: 'manokamna', label_en: 'Manokamna', label_hi: 'मनोकामना', emoji: '🙏' },
  { id: 'aarti', label_en: 'Aarti', label_hi: 'आरती', emoji: '🪔' },
  { id: 'prayers', label_en: 'Prayers', label_hi: 'प्रार्थनाएं', emoji: '📜' },
]

export default function PujaView() {
  const { language, goBack } = useTempleStore()
  const [activeTab, setActiveTab] = useState('manokamna')
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
        background: 'radial-gradient(ellipse at 50% 0%, #2a0820 0%, #0a0515 65%)',
        overflowY: 'auto',
      }}
    >
      {/* Sticky header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(10,5,21,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,193,7,0.15)',
        padding: '0.85rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
          {t('PUJA ROOM', 'पूजा कक्ष')}
        </span>
        <div style={{ fontSize: '1.4rem', filter: 'drop-shadow(0 0 8px #ff8c00)' }}>🪔</div>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <h1 style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: 'clamp(2rem, 6vw, 3.2rem)',
            color: '#ffc107',
            textShadow: '0 0 35px rgba(255,193,7,0.8)',
            marginBottom: '0.25rem',
          }}>
            श्री हनुमान जी
          </h1>
          <p style={{
            fontFamily: 'Cinzel, serif', fontSize: '0.8rem',
            color: '#c9a96e', letterSpacing: '0.2em',
          }}>
            PUJA ROOM · DIVINE BLESSINGS
          </p>
        </motion.div>

        {/* Tabs */}
        <div style={{
          display: 'flex', gap: '0.5rem', marginBottom: '2rem',
          background: 'rgba(18,8,42,0.6)', borderRadius: '14px', padding: '0.4rem',
          border: '1px solid rgba(255,193,7,0.12)',
        }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1, padding: '0.65rem 0.5rem',
                background: activeTab === tab.id ? 'linear-gradient(135deg, rgba(255,107,53,0.25), rgba(192,57,43,0.2))' : 'transparent',
                border: activeTab === tab.id ? '1px solid rgba(255,107,53,0.4)' : '1px solid transparent',
                borderRadius: '10px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem',
                transition: 'all 0.25s ease',
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{tab.emoji}</span>
              <span style={{
                fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
                fontSize: language === 'hi' ? '0.82rem' : '0.62rem',
                color: activeTab === tab.id ? '#ffc107' : 'rgba(201,169,110,0.6)',
                letterSpacing: '0.06em',
              }}>
                {t(tab.label_en, tab.label_hi)}
              </span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'manokamna' && <ManokamnaTab language={language} />}
            {activeTab === 'aarti' && <AartiTab language={language} />}
            {activeTab === 'prayers' && <PrayerLibraryTab language={language} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
