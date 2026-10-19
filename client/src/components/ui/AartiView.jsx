import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

// ── AARTI DATA ────────────────────────────────────────────────────────────────

const AARTIS = [
  {
    id: 1,
    title_hi: 'आरती कीजै हनुमान लला की',
    title_en: 'Aarti Kije Hanuman Lala Ki',
    subtitle_en: 'The Principal Hanuman Aarti',
    subtitle_hi: 'मुख्य हनुमान आरती',
    timing_en: 'Morning & evening, Tuesday, Saturday, Hanuman Jayanti',
    timing_hi: 'प्रातः व सायंकाल, मंगलवार, शनिवार, हनुमान जयंती',
    meaning_en:
      'The foremost aarti of Hanuman Ji, composed by the poet-saint Tulsidas. It celebrates Hanuman as the indomitable destroyer of evil, the mighty son of Anjani, and the devoted servant of Lord Ram. Each stanza recounts a leela — swallowing the sun in childhood, burning Lanka, rescuing Lakshman with the Sanjeevani, vanquishing Ahiravan in the netherworld. Reciting it with a lamp of camphor or ghee bestows immense divine grace and removes all afflictions.',
    meaning_hi:
      'हनुमान जी की सर्वप्रमुख आरती, तुलसीदास जी द्वारा रचित। इसमें हनुमान को दुष्टों के नाशक, अंजनि-पुत्र महाबली और राम के परम भक्त के रूप में स्तुति की गई है। हर पद उनकी एक लीला का वर्णन करता है — बालकाल में सूर्य को निगलना, लंका दहन, संजीवनी से लक्ष्मण का जीवन बचाना, पाताल में अहिरावण का वध। कपूर या घी के दीप से इसका पाठ करने से अपार कृपा प्राप्त होती है।',
    hi: `आरती कीजै हनुमान लला की।
दुष्ट दलन रघुनाथ कला की॥

जाके बल से गिरिवर काँपे।
रोग दोष जाके निकट न झाँपे॥
अंजनि पुत्र महाबलदायी।
संतन के प्रभु सदा सहायी॥

दे बीड़ा रघुनाथ पठाए।
लंका जारि सिया सुधि लाए॥
लंका सो कोट समुद्र-सी खाई।
जात पवनसुत बार न लाई॥

लंका जारि असुर संहारे।
सियारामजी के काज सँवारे॥
लक्ष्मण मूर्छित पड़े सकारे।
आनि संजीवन प्रान उबारे॥

पैठि पताल तोरि जमकारे।
अहिरावण की भुजा उखारे॥
बायें भुज असुरदल मारे।
दाहिने भुज संतजन तारे॥

सुर नर मुनि जन आरती उतारें।
जय जय जय हनुमान उचारें॥
कंचन थार कपूर लौ छाई।
आरती करत अंजना माई॥

जो हनुमानजी की आरती गावे।
बसि बैकुण्ठ परम पद पावे॥
लंक विध्वंस किए रघुराई।
तुलसीदास स्वामी कीर्ति गाई॥

आरती कीजै हनुमान लला की।
दुष्ट दलन रघुनाथ कला की॥`,
    roman: `Aarti Kijay Hanumaan Lalaa Ki |
Dusht Dalan Raghunaath Kalaa Ki ||

Jaake Bal Se Girivara Kaanpe |
Rog Dosh Jaake Nikat Na Jhaanpe ||
Anjani Putra Mahaabal Daayee |
Santan Ke Prabhu Sadaa Sahaayee ||

De Beeda Raghunaath Pathaaye |
Lanka Jaari Siyaa Sudhi Laaye ||
Lanka So Kot Samudra Si Khaaee |
Jaat Pawanasut Baar Na Laaee ||

Lanka Jaari Asur Sanhaare |
Siyaaraamji Ke Kaaj Sanwaare ||
Lakshman Moorchit Pade Sakaare |
Aani Sanjeewan Praan Ubaare ||

Paithi Pataal Tori Jamakaare |
Ahiraawan Ki Bhujaa Ukhaare ||
Baaye Bhuj Asural Maare |
Daahine Bhuj Santajan Taare ||

Sur Nar Muni Jan Aarti Utaaren |
Jai Jai Jai Hanumaan Uchaaren ||
Kanchan Thaar Kapoor Lau Chhaaee |
Aarti Karat Anjana Maaee ||

Jo Hanumaanaji Ki Aarti Gaave |
Basi Baikuntha Param Pad Paave ||
Lanka Vidhwans Kiye Raghuraaee |
Tulasidaas Svami Kirti Gaaee ||

Aarti Kijay Hanumaan Lalaa Ki |
Dusht Dalan Raghunaath Kalaa Ki ||`,
  },
  {
    id: 2,
    title_hi: 'ॐ जय हनुमान देवा',
    title_en: 'Om Jai Hanuman Deva',
    subtitle_en: 'The Devotional Aarti',
    subtitle_hi: 'भक्ति-आरती',
    timing_en: 'Daily evening aarti, temples, festivals',
    timing_hi: 'दैनिक सायंकाल, मंदिर-पूजन, उत्सव',
    meaning_en:
      'A devotional aarti sung in the classic Jagdish Hare style, recounting the glorious deeds of Hanuman Ji — his golden form, the swallowing of the sun, carrying the Sanjeevani mountain, defeating Ahiravan, and his eternal role as protector of devotees. Singing it with a burning lamp melts away sins and brings the grace of Hanuman directly into the heart.',
    meaning_hi:
      'शास्त्रीय "जगदीश-हरे" शैली में रचित यह भक्ति-आरती हनुमान जी के गौरवशाली कार्यों का वर्णन करती है — कनक-वर्ण रूप, सूर्य का भक्षण, संजीवनी पर्वत लाना, अहिरावण का वध और भक्तों की रक्षा। जलते हुए दीपक के साथ इसे गाने से पाप नष्ट होते हैं और हनुमान जी की कृपा सीधे हृदय में उतरती है।',
    hi: `ॐ जय हनुमान देवा, स्वामी जय हनुमान देवा।
अंजनि माँ के लाला, शरण तेरी आया॥
ॐ जय हनुमान देवा॥

कनक बरन तन सोहे, गदा धारण कीनी।
लंका में जाकर, सिया सुधि लीनी॥
ॐ जय हनुमान देवा॥

बाल समय रवि भक्षे, इंद्र वज्र मारा।
पवनपुत्र को देखे, मूर्छित भए बिचारा॥
ॐ जय हनुमान देवा॥

लक्ष्मण मूर्छित परे, चिंतित रघुराई।
आनि संजीवन बूटी, प्रान उबराई॥
ॐ जय हनुमान देवा॥

पैठि पाताल असुर, अहिरावण मारा।
राम-लक्ष्मण को लाए, भव से उबारा॥
ॐ जय हनुमान देवा॥

भक्तन की रक्षा करो, आपद सब हारो।
हनुमान दास पर, कृपा की धारा॥
ॐ जय हनुमान देवा॥

आरती जो गावे, श्रद्धा मन लावे।
संकट सब मिट जावे, आनंद पावे॥
ॐ जय हनुमान देवा, स्वामी जय हनुमान देवा।
अंजनि माँ के लाला, शरण तेरी आया॥
ॐ जय हनुमान देवा॥`,
    roman: `Om Jai Hanumaan Devaa, Swami Jai Hanumaan Devaa |
Anjani Maa Ke Laalaa, Sharan Teri Aayaa ||
Om Jai Hanumaan Devaa ||

Kanak Baran Tan Sohe, Gadaa Dhaaran Keeni |
Lanka Mein Jaakar, Siya Sudh Leeni ||
Om Jai Hanumaan Devaa ||

Baal Samay Ravi Bhakshe, Indra Vajra Maaraa |
Pawanaputra Ko Dekhe, Moorchit Bhaye Bichaara ||
Om Jai Hanumaan Devaa ||

Lakshman Moorchit Pare, Chintit Raghu Raaee |
Aani Sanjeewani Booti, Praan Ubraayee ||
Om Jai Hanumaan Devaa ||

Paithi Pataal Asur, Ahiraawan Maaraa |
Raam-Lakshman Ko Laaye, Bhav Se Ubaara ||
Om Jai Hanumaan Devaa ||

Bhaktan Ki Rakshaa Karo, Aapad Sab Haaro |
Hanumaan Daas Par, Kripaa Ki Dhaaraa ||
Om Jai Hanumaan Devaa ||

Aarti Jo Gaave, Shraddha Man Laave |
Sankat Sab Mit Jaave, Aanand Paave ||
Om Jai Hanumaan Devaa, Swami Jai Hanumaan Devaa |
Anjani Maa Ke Laalaa, Sharan Teri Aayaa ||
Om Jai Hanumaan Devaa ||`,
  },
  {
    id: 3,
    title_hi: 'मंगल मूर्ति मारुति नंदन',
    title_en: 'Mangal Murti Maruti Nandan',
    subtitle_en: 'The Auspicious Form Aarti',
    subtitle_hi: 'मंगलमय रूप की आरती',
    timing_en: 'Morning puja, Hanuman Jayanti, new beginnings',
    timing_hi: 'प्रातःकाल पूजा, हनुमान जयंती, नए कार्य के आरंभ में',
    meaning_en:
      'A shorter, luminous aarti that praises Hanuman Ji as the embodiment of all auspiciousness — whose very name erases every inauspicious thing. This aarti invokes his form as son of the wind, the saffron-smeared protector, the destroyer of ghosts and evil, and the matchless devotee of Lord Ram. It is ideal for morning prayers and whenever one wishes to invoke Hanuman\'s auspicious blessings at the start of any important undertaking.',
    meaning_hi:
      'एक संक्षिप्त किंतु तेजस्वी आरती, जो हनुमान जी को समस्त मंगल के मूर्त-स्वरूप के रूप में स्तुति करती है — जिनका नाम ही हर अमंगल को मिटा देता है। यह आरती उन्हें पवनपुत्र, सिंदूर-रंजित रक्षक, भूत-प्रेत नाशक और राम के अतुल भक्त के रूप में आह्वान करती है। प्रातःकाल और किसी भी नए कार्य के आरंभ में इसका पाठ अत्यंत शुभ है।',
    hi: `मंगल मूर्ति मारुति नंदन।
सकल अमंगल मूल निकंदन॥

पवनपुत्र अंजनि-कुमारा।
राम-भक्त जग में अवतारा॥
मंगल मूर्ति मारुति नंदन॥

सिंदूरी वदन गदाधारी।
वीर बजरंगी संकट-हारी॥
मंगल मूर्ति मारुति नंदन॥

जासु नाम लेत मन मेरा।
मिटे कष्ट हो जीवन उजेरा॥
मंगल मूर्ति मारुति नंदन॥

भूत-प्रेत भय दूर भगावो।
मंगल-मूर्ति, शरण में आवो॥
मंगल मूर्ति मारुति नंदन॥

लंका दहन किया बलशाली।
राम-काज हित भए मतवाली॥
मंगल मूर्ति मारुति नंदन॥

जय जय जय हनुमान दयाला।
रामचंद्र का दास रसाला॥
मंगल मूर्ति मारुति नंदन।
सकल अमंगल मूल निकंदन॥`,
    roman: `Mangal Moorti Maaruti Nandan |
Sakal Amangal Mool Nikandan ||

Pawanaputra Anjani-Kumaara |
Raam-Bhakt Jag Mein Avataaraa ||
Mangal Moorti Maaruti Nandan ||

Sindoori Vadan Gadaadhaari |
Veer Bajrangi Sankat-Haari ||
Mangal Moorti Maaruti Nandan ||

Jaasu Naam Let Man Meraa |
Mite Kasht Ho Jeevan Ujeraa ||
Mangal Moorti Maaruti Nandan ||

Bhoot-Pret Bhay Door Bhagaavo |
Mangal-Moorti, Sharan Mein Aavo ||
Mangal Moorti Maaruti Nandan ||

Lanka Dahan Kiyaa Balshaali |
Raam-Kaaj Hit Bhaye Matwaali ||
Mangal Moorti Maaruti Nandan ||

Jai Jai Jai Hanumaan Dayaalaa |
Raamachandra Kaa Daas Rasaalaa ||
Mangal Moorti Maaruti Nandan |
Sakal Amangal Mool Nikandan ||`,
  },
  {
    id: 4,
    title_hi: 'संकट मोचन नाम तिहारो',
    title_en: 'Sankat Mochan Naam Tiharo',
    subtitle_en: 'The Liberator Aarti — after Tulsidas',
    subtitle_hi: 'संकट-मोचन आरती — तुलसीदास',
    timing_en: 'In times of distress, Saturday, Purnima',
    timing_hi: 'संकट के समय, शनिवार, पूर्णिमा',
    meaning_en:
      'Inspired by the Vinay Patrika of Tulsidas, this aarti addresses Hanuman Ji as the supreme liberator from distress — "Sankat Mochan". It affirms that the very sound of his name, heard with sincerity, destroys all sorrows. It speaks of his role in vanquishing tyrants, shielding the destitute, and ever being present the moment a devotee calls in genuine need. Singing this aarti on Saturday or Purnima is said to dissolve even long-standing hardships.',
    meaning_hi:
      'तुलसीदास की "विनय-पत्रिका" से प्रेरित यह आरती हनुमान जी को परम संकट-मोचन के रूप में संबोधित करती है। यह कहती है कि उनका नाम सच्चे भाव से सुनने पर ही सारे दुःख नष्ट हो जाते हैं। यह रचना उनकी दुष्टों के नाश में, दीन-दुखियों की रक्षा में और भक्त के पुकारते ही उपस्थित होने की भूमिका को रेखांकित करती है। शनिवार या पूर्णिमा को इसका गान दीर्घकालिक कष्टों को भी मिटा देता है।',
    hi: `संकट मोचन नाम तिहारो।
सुनत दुःख हरत तुरत पुकारो॥

जय जय जय हनुमान गोपाला।
राम-दूत अतुलित बलशाला॥
संकट मोचन नाम तिहारो॥

विपत्ति में जो तुम्हें पुकारे।
दुःख-दारिद्र तुरत ही टारे॥
संकट मोचन नाम तिहारो॥

दुष्ट दलन सज्जन-सुखदायक।
दीन-शरण संतन के नायक॥
संकट मोचन नाम तिहारो॥

भक्त-वत्सल तुम अंतर्यामी।
पल में पूर्ण करो सब कामी॥
संकट मोचन नाम तिहारो॥

जय जय राम-दूत बलवाना।
भव-सागर से तारो नाना॥
संकट मोचन नाम तिहारो॥

तुलसीदास सदा हरि चेरा।
रामजी के चरणन में डेरा॥
संकट मोचन नाम तिहारो।
सुनत दुःख हरत तुरत पुकारो॥`,
    roman: `Sankat Mochan Naam Tihaaro |
Sunat Dukha Harat Turat Pukaaro ||

Jai Jai Jai Hanumaan Gopaalaa |
Raam-Doot Atulit Balshaala ||
Sankat Mochan Naam Tihaaro ||

Vipatti Mein Jo Tumhen Pukaare |
Dukha-Daaridr Turat Hi Taare ||
Sankat Mochan Naam Tihaaro ||

Dusht Dalan Sajjan-Sukhadaayak |
Deen-Sharan Santan Ke Naayak ||
Sankat Mochan Naam Tihaaro ||

Bhakta-Vatsal Tum Antaryaami |
Pal Mein Poorn Karo Sab Kaami ||
Sankat Mochan Naam Tihaaro ||

Jai Jai Raam-Doot Balwaanaa |
Bhav-Saagar Se Taaro Naanaa ||
Sankat Mochan Naam Tihaaro ||

Tulasidaas Sadaa Hari Cheraa |
Raamji Ke Charanan Mein Deraa ||
Sankat Mochan Naam Tihaaro |
Sunat Dukha Harat Turat Pukaaro ||`,
  },
]

// ── HOW TO PERFORM AARTI (content) ────────────────────────────────────────────

const HOW_TO = {
  en: [
    { icon: '🕯', step: 'Light a lamp — ghee or camphor — and place it on a thaal (plate) with flowers and incense.' },
    { icon: '🔔', step: 'Ring a bell to invite the deity\'s presence and to purify the atmosphere.' },
    { icon: '🙏', step: 'Hold the thaal with both hands and move it in slow clockwise circles before the image or idol.' },
    { icon: '🎶', step: 'Sing the aarti aloud with full devotion — the vibration of voice carries the prayer.' },
    { icon: '✋', step: 'At the close, pass the flame to all present; everyone touches it and brings hands to their eyes (receiving the divine light).' },
    { icon: '🌸', step: 'Offer prasad — sugar, fruits, or ladoo — and distribute to all as blessed food.' },
  ],
  hi: [
    { icon: '🕯', step: 'थाल में घी या कपूर का दीपक जलाएं, साथ में फूल और धूप रखें।' },
    { icon: '🔔', step: 'घंटी बजाएं — इससे देवता का आह्वान होता है और वातावरण शुद्ध होता है।' },
    { icon: '🙏', step: 'दोनों हाथों से थाल पकड़ें और मूर्ति या चित्र के सामने धीरे-धीरे दक्षिणावर्त घुमाएं।' },
    { icon: '🎶', step: 'पूरी श्रद्धा से आरती ऊँचे स्वर में गाएं — स्वर की कंपन प्रार्थना को ऊर्जा देती है।' },
    { icon: '✋', step: 'अंत में दीप की लौ सभी को दिखाएं; सब हाथ गर्म करके आँखों से लगाएं (दिव्य प्रकाश ग्रहण)।' },
    { icon: '🌸', step: 'प्रसाद — चीनी, फल या लड्डू — भोग लगाएं और सभी में वितरित करें।' },
  ],
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function HowToCard({ language }) {
  const [open, setOpen] = useState(false)
  const t = (en, hi) => language === 'hi' ? hi : en
  const steps = language === 'hi' ? HOW_TO.hi : HOW_TO.en

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      style={{
        background: 'linear-gradient(135deg, rgba(26,8,48,0.97), rgba(18,8,42,0.97))',
        border: '1px solid rgba(255,193,7,0.22)',
        borderRadius: '16px',
        overflow: 'hidden',
        marginBottom: '1.4rem',
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%',
          background: 'none', border: 'none',
          padding: '0.85rem 1.2rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <span style={{ fontSize: '1.1rem' }}>🔔</span>
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
            color: '#ffc107',
            letterSpacing: '0.1em',
          }}>
            {t('How to Perform Aarti', 'आरती कैसे करें')}
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', color: '#c9a96e' }}>
          {open ? '▲' : '▼'}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 1.2rem 1rem',
              borderTop: '1px solid rgba(255,193,7,0.1)',
            }}>
              {steps.map((s, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '0.65rem', alignItems: 'flex-start',
                  padding: '0.55rem 0',
                  borderBottom: i < steps.length - 1 ? '1px solid rgba(255,193,7,0.06)' : 'none',
                }}>
                  <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '0.05rem' }}>{s.icon}</span>
                  <p style={{
                    fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                    fontSize: '0.79rem',
                    color: '#c9a96e',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>
                    {s.step}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function AartiDisplay({ aarti, language }) {
  const [showRoman, setShowRoman] = useState(false)
  const [showMeaning, setShowMeaning] = useState(false)
  const t = (en, hi) => language === 'hi' ? hi : en

  const ytUrl =
    'https://www.youtube.com/results?search_query=' +
    encodeURIComponent(aarti.title_en + ' Hanuman aarti')

  return (
    <motion.div
      key={aarti.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {/* Aarti header card */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(28,6,44,0.97), rgba(18,8,42,0.93))',
        border: '1px solid rgba(255,193,7,0.22)',
        borderRadius: '16px',
        padding: '1.1rem 1.25rem',
        marginBottom: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <h2 style={{
              fontFamily: 'Noto Sans Devanagari, serif',
              fontSize: 'clamp(1rem, 3.5vw, 1.3rem)',
              color: '#ffc107',
              margin: '0 0 0.2rem',
              lineHeight: 1.4,
            }}>
              {aarti.title_hi}
            </h2>
            <p style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(0.62rem, 1.8vw, 0.75rem)',
              color: '#c9a96e',
              margin: '0 0 0.55rem',
              letterSpacing: '0.08em',
              fontStyle: 'italic',
            }}>
              {aarti.title_en}
            </p>
            <span style={{
              background: 'rgba(255,193,7,0.08)',
              border: '1px solid rgba(255,193,7,0.2)',
              borderRadius: '20px',
              padding: '0.15rem 0.65rem',
              fontSize: '0.6rem',
              color: '#c9a96e',
              fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
            }}>
              🕐 {language === 'hi' ? aarti.timing_hi : aarti.timing_en}
            </span>
          </div>
          <div style={{
            background: 'rgba(255,193,7,0.08)',
            border: '1px solid rgba(255,193,7,0.18)',
            borderRadius: '12px',
            padding: '0.5rem 0.7rem',
            textAlign: 'center',
            flexShrink: 0,
          }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.1rem' }}>🙏</div>
            <div style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '0.48rem',
              color: 'rgba(201,169,110,0.6)',
              letterSpacing: '0.1em',
            }}>
              AARTI
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex', gap: '0.45rem', alignItems: 'center',
        marginBottom: '0.9rem', flexWrap: 'wrap',
      }}>
        <button
          onClick={() => setShowRoman(v => !v)}
          style={{
            background: showRoman ? 'rgba(255,193,7,0.14)' : 'rgba(255,193,7,0.05)',
            border: `1px solid ${showRoman ? 'rgba(255,193,7,0.4)' : 'rgba(255,193,7,0.18)'}`,
            borderRadius: '8px',
            color: showRoman ? '#ffc107' : '#c9a96e',
            fontSize: '0.62rem',
            padding: '0.3rem 0.75rem',
            cursor: 'pointer',
            fontFamily: 'Cinzel, serif',
            letterSpacing: '0.07em',
          }}
        >
          {t('Roman Script', 'रोमन लिपि')} {showRoman ? '✓' : ''}
        </button>
        <button
          onClick={() => setShowMeaning(v => !v)}
          style={{
            background: showMeaning ? 'rgba(255,193,7,0.14)' : 'rgba(255,193,7,0.05)',
            border: `1px solid ${showMeaning ? 'rgba(255,193,7,0.4)' : 'rgba(255,193,7,0.18)'}`,
            borderRadius: '8px',
            color: showMeaning ? '#ffc107' : '#c9a96e',
            fontSize: '0.62rem',
            padding: '0.3rem 0.75rem',
            cursor: 'pointer',
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
            letterSpacing: '0.07em',
          }}
        >
          {t('Meaning', 'अर्थ')} {showMeaning ? '✓' : ''}
        </button>
        <a
          href={ytUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            background: 'rgba(255,0,0,0.07)',
            border: '1px solid rgba(255,0,0,0.22)',
            borderRadius: '8px',
            color: 'rgba(255,80,80,0.85)',
            fontSize: '0.62rem',
            padding: '0.3rem 0.75rem',
            fontFamily: 'Cinzel, serif',
            letterSpacing: '0.07em',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontSize: '0.65rem' }}>▶</span>
          {t('Listen', 'सुनें')}
        </a>
      </div>

      {/* Meaning card */}
      <AnimatePresence>
        {showMeaning && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: 'hidden', marginBottom: '0.9rem' }}
          >
            <div style={{
              background: 'rgba(255,193,7,0.04)',
              border: '1px solid rgba(255,193,7,0.14)',
              borderRadius: '12px',
              padding: '0.9rem 1.1rem',
            }}>
              <p style={{
                fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                fontSize: '0.8rem',
                color: '#c9a96e',
                lineHeight: 1.85,
                margin: 0,
              }}>
                {language === 'hi' ? aarti.meaning_hi : aarti.meaning_en}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main aarti text */}
      <div style={{
        background: 'rgba(18,8,42,0.82)',
        border: '1px solid rgba(255,193,7,0.15)',
        borderRadius: '16px',
        padding: '1.25rem 1.35rem',
      }}>
        <p style={{
          fontFamily: 'Noto Sans Devanagari, serif',
          fontSize: 'clamp(1rem, 3.2vw, 1.2rem)',
          color: '#fff8e7',
          lineHeight: 2.1,
          margin: 0,
          whiteSpace: 'pre-line',
          textAlign: 'center',
        }}>
          {aarti.hi}
        </p>

        <AnimatePresence>
          {showRoman && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                borderTop: '1px solid rgba(255,193,7,0.1)',
                marginTop: '1.1rem',
                paddingTop: '1rem',
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(0.7rem, 2.2vw, 0.82rem)',
                  color: 'rgba(201,169,110,0.6)',
                  lineHeight: 2.0,
                  margin: 0,
                  whiteSpace: 'pre-line',
                  textAlign: 'center',
                  fontStyle: 'italic',
                }}>
                  {aarti.roman}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtitle (kind) */}
      <p style={{
        textAlign: 'center',
        fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
        fontSize: '0.62rem',
        color: 'rgba(201,169,110,0.35)',
        letterSpacing: '0.12em',
        marginTop: '0.75rem',
      }}>
        {language === 'hi' ? aarti.subtitle_hi : aarti.subtitle_en}
      </p>
    </motion.div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function AartiView() {
  const { language, goBack } = useTempleStore()
  const [activeId, setActiveId] = useState(1)
  const t = (en, hi) => language === 'hi' ? hi : en

  const activeAarti = AARTIS.find(a => a.id === activeId)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'radial-gradient(ellipse at 50% 10%, #1a0520 0%, #0a0515 60%)',
        overflowY: 'auto',
      }}
    >
      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(10,5,21,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,193,7,0.15)',
        padding: '0 1.5rem',
      }}>
        {/* Top row */}
        <div style={{
          padding: '0.85rem 0',
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
            fontSize: 'clamp(0.75rem, 2vw, 0.95rem)', color: '#ffc107', letterSpacing: '0.12em',
          }}>
            {t('AARTI SANGRAH', 'आरती संग्रह')}
          </span>
          <div style={{ fontSize: '1.3rem' }}>🔔</div>
        </div>

        {/* Tab strip */}
        <div style={{
          display: 'flex', gap: '0.3rem',
          overflowX: 'auto', paddingBottom: '0.65rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}>
          {AARTIS.map(aarti => {
            const isActive = aarti.id === activeId
            return (
              <motion.button
                key={aarti.id}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.96 }}
                onClick={() => setActiveId(aarti.id)}
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(255,193,7,0.2), rgba(255,193,7,0.08))'
                    : 'rgba(255,193,7,0.04)',
                  border: `1px solid ${isActive ? 'rgba(255,193,7,0.45)' : 'rgba(255,193,7,0.14)'}`,
                  borderRadius: '8px',
                  color: isActive ? '#ffc107' : 'rgba(201,169,110,0.55)',
                  fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                  fontSize: 'clamp(0.58rem, 1.8vw, 0.68rem)',
                  padding: '0.35rem 0.8rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                  letterSpacing: language === 'hi' ? '0.02em' : '0.04em',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {language === 'hi' ? aarti.title_hi.split(' ').slice(0, 3).join(' ') + '…' : `${aarti.id}. ${aarti.subtitle_en.split(' ').slice(0, 2).join(' ')}`}
              </motion.button>
            )
          })}
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '1.4rem 1.25rem 5rem' }}>

        {/* How to perform aarti */}
        <HowToCard language={language} />

        {/* Active aarti content */}
        <AnimatePresence mode="wait">
          <AartiDisplay key={activeId} aarti={activeAarti} language={language} />
        </AnimatePresence>

        {/* All aartis index at bottom */}
        <div style={{
          marginTop: '2.5rem',
          borderTop: '1px solid rgba(255,193,7,0.1)',
          paddingTop: '1.2rem',
        }}>
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '0.62rem',
            color: 'rgba(201,169,110,0.4)',
            letterSpacing: '0.15em',
            textAlign: 'center',
            margin: '0 0 0.85rem',
            textTransform: 'uppercase',
          }}>
            {t('All Aartis in this collection', 'इस संग्रह की सभी आरतियाँ')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
            {AARTIS.map(aarti => (
              <motion.button
                key={aarti.id}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveId(aarti.id)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                style={{
                  background: activeId === aarti.id ? 'rgba(255,193,7,0.07)' : 'transparent',
                  border: `1px solid ${activeId === aarti.id ? 'rgba(255,193,7,0.2)' : 'rgba(255,193,7,0.08)'}`,
                  borderRadius: '10px',
                  padding: '0.65rem 1rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.65rem',
                  color: activeId === aarti.id ? '#ffc107' : 'rgba(201,169,110,0.4)',
                  letterSpacing: '0.1em',
                  flexShrink: 0,
                  minWidth: '1.5rem',
                }}>
                  {aarti.id}.
                </span>
                <div>
                  <p style={{
                    fontFamily: 'Noto Sans Devanagari, serif',
                    fontSize: '0.85rem',
                    color: activeId === aarti.id ? '#fff8e7' : 'rgba(255,248,231,0.6)',
                    margin: '0 0 0.1rem',
                  }}>
                    {aarti.title_hi}
                  </p>
                  <p style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.6rem',
                    color: activeId === aarti.id ? '#c9a96e' : 'rgba(201,169,110,0.4)',
                    margin: 0,
                    fontStyle: 'italic',
                  }}>
                    {aarti.subtitle_en}
                  </p>
                </div>
                {activeId === aarti.id && (
                  <span style={{ marginLeft: 'auto', color: '#ffc107', fontSize: '0.7rem' }}>▶</span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: 'center',
          fontFamily: 'Noto Sans Devanagari, serif',
          fontSize: '0.95rem',
          color: 'rgba(201,169,110,0.35)',
          marginTop: '1.5rem',
          letterSpacing: '0.06em',
        }}>
          ॥ जय श्री राम — जय हनुमान ॥
        </p>
      </div>
    </motion.div>
  )
}
