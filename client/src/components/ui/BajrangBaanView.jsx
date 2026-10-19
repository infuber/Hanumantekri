import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

// ── DATA ──────────────────────────────────────────────────────────────────────

const SIGNIFICANCE = {
  en: 'The Bajrang Baan (बजरंग बाण) — literally "the arrows of Bajrangbali" — is one of the most potent protective prayers in the Hindu tradition. Composed by the poet-saint Tulsidas, it invokes Hanuman Ji\'s fierce warrior aspect (his Rudra-roop) to swiftly destroy enemies, malefic forces, evil spirits, disease, and all obstacles. Tradition holds that whoever recites it with true devotion and firm faith, Hanuman Ji personally rushes to their aid at once.',
  hi: 'बजरंग बाण — शाब्दिक अर्थ "बजरंगबली के बाण" — हिंदू परंपरा की सबसे शक्तिशाली सुरक्षा-प्रार्थनाओं में से एक है। कवि-संत तुलसीदास द्वारा रचित यह स्तोत्र हनुमान जी के उग्र वीर रूप (रुद्र-रूप) का आह्वान करता है, जो शत्रुओं, दुष्ट शक्तियों, बुरी आत्माओं, रोगों और सभी बाधाओं का तुरंत नाश करते हैं। परंपरा कहती है कि जो सच्ची श्रद्धा से इसका पाठ करे, हनुमान जी स्वयं उसी क्षण दौड़ कर सहायता करते हैं।',
}

const OPENING_DOHA = {
  type: 'doha',
  hi: 'निश्चय प्रेम प्रतीति ते, बिनय करें सनमान।\nतेहि के कारज सकल शुभ, सिद्ध करें हनुमान॥',
  roman: 'Nishchaya Prema Prateeti Te, Binaya Karen Sanmaan |\nTehi Ke Kaaraj Sakal Shubh, Siddha Karen Hanumaan ||',
  meaning_en:
    'With firm love and faith, and with humility and reverence — Hanuman Ji completes all auspicious works for such a devoted soul.',
  meaning_hi:
    'जो सच्चे प्रेम और अटूट विश्वास के साथ, विनम्रता और श्रद्धा-भाव से प्रार्थना करता है — हनुमान जी उसके सभी शुभ कार्य सिद्ध करते हैं।',
}

const OPENING_CHAUPAI = {
  type: 'chaupai',
  hi: 'जय हनुमंत संत हितकारी। सुन लीजै प्रभु अरज हमारी॥\nजन के काज विलंब न कीजै। आतुर दौरि महाबल दीजै॥',
  roman:
    'Jai Hanumanth Santh Hitkari | Sun Lijay Prabhu Araj Hamari ||\nJan Ke Kaaj Vilamb Na Kijay | Aatur Dauri Mahabal Dijay ||',
  meaning_en:
    "O Hanuman, benefactor of saints! Please hear our humble prayer. Do not delay your devotee's work — rush swiftly and bestow your great strength.",
  meaning_hi:
    'हे हनुमान जी, संतों के हितकारी! हमारी विनती सुनिए। सेवक के काम में विलंब मत करिए — शीघ्र दौड़ आइए और महाबल प्रदान कीजिए।',
}

const MAIN_BAAN = [
  {
    num: 1,
    hi: 'ॐ हनु हनु हनु हनुमंत हठीले।\nबैरिहि मारु बज्र की कीले॥',
    roman: 'Om Hanu Hanu Hanu Hanumanth Hathile |\nBairihi Maaru Vajra Ki Keele ||',
    meaning_en:
      'O relentless Hanuman! Strike, strike, strike — pierce the enemies with the force of thunderbolts, leaving no escape.',
    meaning_hi:
      'हे हठी हनुमान! मारो, मारो, मारो — शत्रुओं को वज्र की कीलों की भाँति बेधो, कोई बचे नहीं।',
  },
  {
    num: 2,
    hi: 'गदा बज्र लै बैरिहिं मारौ।\nमहाराज निज दास उबारौ॥',
    roman: 'Gadaa Vajra Lai Bairihin Maaro |\nMahaaraaj Nij Daas Ubaaro ||',
    meaning_en:
      'Take up your mace and thunderbolt and smite the enemies — O great king, rescue your own servant from all affliction!',
    meaning_hi:
      'गदा और वज्र उठाकर शत्रुओं पर प्रहार करो — हे महाराज, अपने दास को सब संकटों से बचाओ!',
  },
  {
    num: 3,
    hi: 'ॐ ह्रीं ह्रीं ह्रीं हनुमंत कपीसा।\nॐ हुँ हुँ हुँ हनु अरि उर सीसा॥',
    roman: 'Om Hreem Hreem Hreem Hanumanth Kapeesa |\nOm Hum Hum Hum Hanu Ari Ur Seesa ||',
    meaning_en:
      'O Hanuman, king of monkeys, invoked by the sacred seed-syllables Hreem — strike the chest and head of all enemies!',
    meaning_hi:
      'हे वानरपति हनुमान, पवित्र बीजाक्षर ह्रीं से आह्वान — शत्रु की छाती और सिर पर प्रहार करो!',
  },
  {
    num: 4,
    hi: 'जय अंजनि कुमार बलवंता।\nशंकरसुवन वीर हनुमंता॥',
    roman: 'Jai Anjani Kumar Balawanta |\nShankar Suvan Veer Hanumanta ||',
    meaning_en:
      'Victory to the mighty son of Anjani! Glory to the brave Hanuman who is the divine son of Lord Shankara!',
    meaning_hi:
      'अंजनिपुत्र बलशाली हनुमान जी की जय हो — शंकर के पुत्र, वीर हनुमंत की जय हो!',
  },
  {
    num: 5,
    hi: 'बदन कराल काल-कुल-घालक।\nराम-सहाय सदा प्रतिपालक॥',
    roman: 'Badan Karal Kaal-Kul-Ghaalak |\nRaam Sahay Sadaa Pratipalak ||',
    meaning_en:
      "Fearsome-faced destroyer of the entire lineage of death — perpetual protector sustained by Lord Ram's grace!",
    meaning_hi:
      'भयंकर मुखवाले, काल-कुल के नाशक — राम की सहायता से सदा प्रतिपालक!',
  },
  {
    num: 6,
    hi: 'भूत, प्रेत, पिशाच निशाचर।\nअग्नि बेताल काल मारी मर॥',
    roman: 'Bhoot, Pret, Pishaach Nishaachar |\nAgni Betal Kaal Maari Mar ||',
    meaning_en:
      'Ghosts, spirits, demons, night-wanderers, fire-wraiths, vampires — all are utterly annihilated before you!',
    meaning_hi:
      'भूत, प्रेत, पिशाच, निशाचर, अग्नि-बेताल — काल-मारी सब मर जाओ! हनुमान के सामने कोई न बचे।',
  },
  {
    num: 7,
    hi: 'इन्हें मारु, तोहि शपथ राम की।\nराखु नाथ मर्याद नाम की॥',
    roman: "Inhen Maaru, Tohi Shapath Raam Ki |\nRaakhu Naath Maryaad Naam Ki ||",
    meaning_en:
      'By the oath of Lord Ram, destroy them! O master, uphold the honour and glory of your sacred name!',
    meaning_hi:
      'इन्हें मारो, तुझे राम की शपथ है — हे नाथ, अपने नाम की मर्यादा रखो!',
  },
  {
    num: 8,
    hi: 'जनकसुता हरि दास कहावो।\nताकी शपथ विलंब न लावो॥',
    roman: 'Janakasuta Hari Daas Kahaavo |\nTaaki Shapath Vilamb Na Laavo ||',
    meaning_en:
      "You who are called the devoted servant of Janaki and Hari — by her sacred oath, do not delay even a moment!",
    meaning_hi:
      'जो जानकी और हरि के दास कहलाते हो — उनकी शपथ पर विलंब मत करो!',
  },
  {
    num: 9,
    hi: 'जाँ कौ मारु, जाँ कौ जीयावो।\nतुरत करौ प्रभु आज्ञा पावो॥',
    roman: "Jaan Kou Maaru, Jaan Kou Jiyaavo |\nTurat Karo Prabhu Aajnaa Paavo ||",
    meaning_en:
      "Whoever you choose to strike or protect — act instantly, having received your Lord's divine command!",
    meaning_hi:
      'जिसे मारना हो मारो, जिसे जिलाना हो जिलाओ — तुरंत करो, प्रभु की आज्ञा पाओ!',
  },
  {
    num: 10,
    hi: 'जय जय जय हनुमान गोसाईं।\nकृपा करहु गुरुदेव की नाईं॥',
    roman: 'Jai Jai Jai Hanumaan Gosaaeen |\nKripaa Karahu Gurudev Ki Naaeen ||',
    meaning_en:
      'Victory, victory, victory to Hanuman! Grant your grace upon me just as a merciful divine guru bestows grace!',
    meaning_hi:
      'जय जय जय हनुमान गोसाईं — गुरुदेव की भाँति हम पर कृपा करो!',
  },
  {
    num: 11,
    hi: 'अपने तेज सम्हारो आपे।\nतीनों लोक हाँक ते काँपे॥',
    roman: 'Apane Tej Sambhaaro Aape |\nTeenon Lok Haank Te Kaanpe ||',
    meaning_en:
      'Contain your own dazzling brilliance within yourself — at your mighty roar, all three worlds tremble in awe!',
    meaning_hi:
      'अपने तेज को स्वयं संभालो — तुम्हारी हुंकार से तीनों लोक काँप उठते हैं!',
  },
  {
    num: 12,
    hi: 'बाल समय रवि भक्षि लियो था।\nतीनों लोक भयाकुल कियो था॥',
    roman: 'Baal Samay Ravi Bhakshi Liyo Tha |\nTeenon Lok Bhayaakul Kiyo Tha ||',
    meaning_en:
      'In your childhood you swallowed the sun — plunging all three worlds into fearful darkness and chaos!',
    meaning_hi:
      'बालकाल में सूर्य को निगल लिया था — तीनों लोकों को भयाकुल कर दिया था!',
  },
  {
    num: 13,
    hi: 'ताहि सों त्रास नहीं तुम्हारे।\nरामचंद्र के दास पियारे॥',
    roman: 'Taahi Son Traas Nahin Tumhaare |\nRaamachandra Ke Daas Piyaare ||',
    meaning_en:
      'Nothing in all creation can cause fear to you — O beloved servant of the Lord Ramachandra!',
    meaning_hi:
      'किसी भी बात से तुम्हें भय नहीं — हे रामचंद्र के प्रिय दास!',
  },
  {
    num: 14,
    hi: 'सुरपति धरि नहीं कछु मानी।\nमेघनाद की टेक बिसरानी॥',
    roman: 'Surpati Dhari Nahin Kachhu Maani |\nMeghanaaad Ki Tek Bisaraani ||',
    meaning_en:
      "You paid no heed to Indra, king of the gods — before you, Meghnaad's vaunted pride was utterly shattered!",
    meaning_hi:
      'देवराज इंद्र का भी मान न किया — मेघनाद का अभिमान चूर-चूर हो गया!',
  },
  {
    num: 15,
    hi: 'रावण-दर्प दलन तुम कीना।\nरामचंद्र कहँ तिलक हो दीना॥',
    roman: 'Raavan-Darp Dalan Tum Keena |\nRaamachandra Kahaan Tilak Ho Deena ||',
    meaning_en:
      "You crushed Ravana's mighty arrogance — and ensured the victorious tilak for Lord Ramachandra!",
    meaning_hi:
      'रावण के अभिमान को चूर किया — और रामचंद्र को विजय-तिलक दिलाया!',
  },
  {
    num: 16,
    hi: 'भूमि पताल जल गगन विचारो।\nचतुर्दिश हनुमान विस्तारो॥',
    roman: 'Bhoomi Pataal Jal Gagan Vichaaro |\nChaturadish Hanumaan Vistaaro ||',
    meaning_en:
      'Earth, underworld, waters, sky — in all four directions Hanuman pervades everything eternally!',
    meaning_hi:
      'पृथ्वी, पाताल, जल, आकाश — हनुमान चारों दिशाओं में व्याप्त हैं!',
  },
  {
    num: 17,
    hi: 'ग्रह-गुरु-राहु-केतु सब भागें।\nसिंह सरीखे मारुत जागें॥',
    roman: 'Grah-Guru-Raahu-Ketu Sab Bhaagen |\nSinha Saraikhe Maarut Jaagen ||',
    meaning_en:
      'All malefic planets — Rahu, Ketu and the rest — flee in terror when the lion-like son of the Wind-god awakens!',
    meaning_hi:
      'राहु, केतु और सब ग्रह भाग जाते हैं — जब सिंह-समान मारुत जागते हैं!',
  },
  {
    num: 18,
    hi: 'अंजनि-नंदन बलि जाऊँ तोहि।\nसब बल तेज भरो मम मोहि॥',
    roman: 'Anjani-Nandan Bali Jaaoon Tohi |\nSab Bal Tej Bharo Mam Mohi ||',
    meaning_en:
      'I surrender myself completely to you, O son of Anjani! Fill me entirely with your strength and radiance!',
    meaning_hi:
      'अंजनि-नंदन, मैं तुम पर बलिहारी जाता हूँ — मुझे सारे बल और तेज से भर दो!',
  },
  {
    num: 19,
    hi: 'रोग दोष जरा जनि सतावे।\nतुम्हरो नाम अमरता पावे॥',
    roman: 'Rog Dosh Jaraa Jani Sataave |\nTumharo Naam Amarataa Paave ||',
    meaning_en:
      'May disease, faults and old age never torment — chanting your name grants immortal well-being!',
    meaning_hi:
      'रोग, दोष और बुढ़ापा कभी न सताए — तुम्हारे नाम से अमरता-सुख मिलता है!',
  },
  {
    num: 20,
    hi: 'शत्रु-नाश करौ हे गोसाई।\nभक्त-जन पर सदा रहो सहाई॥',
    roman: 'Shatru-Naash Karo He Gosaaee |\nBhakta-Jan Par Sadaa Raho Sahaaee ||',
    meaning_en:
      'Destroy all enemies, O Lord Hanuman! Remain ever as helper and protector over all your devotees!',
    meaning_hi:
      'हे गोसाई, शत्रुओं का नाश करो — भक्तजनों पर सदा सहायक रहो!',
  },
  {
    num: 21,
    hi: 'दुःख-दरिद्र हरो महाराजा।\nपूर्ण करो भक्तन के काजा॥',
    roman: 'Dukha-Daridra Haro Mahaaraajaa |\nPoorna Karo Bhaktan Ke Kaajaa ||',
    meaning_en:
      'Remove suffering and poverty, O great king! Fulfil and complete all the righteous works of your devotees!',
    meaning_hi:
      'हे महाराज, दुःख और दरिद्रता हरो — भक्तों के सारे काम पूर्ण करो!',
  },
  {
    num: 22,
    hi: 'सुमिरत होत गात मन आनंद।\nराम-नाम सुमिरन परमानंद॥',
    roman: 'Sumirat Hot Gaat Man Aanand |\nRaam-Naam Sumiran Paramaanand ||',
    meaning_en:
      'Upon remembering you, body and mind are filled with joy — chanting Ram\'s name through you brings supreme bliss!',
    meaning_hi:
      'स्मरण करते ही तन-मन आनंदित होता है — राम-नाम का स्मरण परमानंद देता है!',
  },
  {
    num: 23,
    hi: 'तुलसी दास सदा हरि चेरा।\nकीजै नाथ हृदय महँ डेरा॥',
    roman: 'Tulasi Daas Sadaa Hari Cheraa |\nKeejay Naath Hriday Mahan Deraa ||',
    meaning_en:
      "Tulsidas is ever a servant of Lord Hari — O Master Hanuman, come and make your abode within my heart!",
    meaning_hi:
      'तुलसीदास सदा हरि के सेवक हैं — हे नाथ, मेरे हृदय में डेरा डालो!',
  },
  {
    num: 24,
    hi: 'जो सत बार पाठ कर कोई।\nछूटहिं बंदि महासुख होई॥',
    roman: 'Jo Sat Baar Paath Kar Koi |\nChhootihin Bandi Mahaasukh Hoi ||',
    meaning_en:
      'Whoever recites this a hundred times — all bondage is broken and supreme joy is attained in life.',
    meaning_hi:
      'जो सौ बार इसका पाठ करे — बंधन छूट जाते हैं और महासुख की प्राप्ति होती है।',
  },
  {
    num: 25,
    hi: 'जो यह पढ़े हनुमान-बाना।\nहोय सिद्धि साखी भगवाना॥',
    roman: 'Jo Yah Padhe Hanumaana-Baanaa |\nHoy Siddhi Saakhi Bhagavaanaa ||',
    meaning_en:
      'Whoever reads this Bajrang Baan with true faith — attains perfection, with God Himself as the witness.',
    meaning_hi:
      'जो यह बजरंग बाण पढ़ता है — सिद्धि प्राप्त होती है, भगवान साक्षी हैं।',
  },
]

const CLOSING_DOHA = {
  type: 'doha',
  hi: 'पवन तनय संकट हरन, मंगल मूरति रूप।\nराम-लखन सीता सहित, हृदय बसहु सुर-भूप॥',
  roman:
    'Pawan Tanay Sankat Haran, Mangal Moorti Roop |\nRaam-Lakhan Seeta Sahit, Hriday Basahu Sur-Bhoop ||',
  meaning_en:
    'O son of Wind, remover of all afflictions, embodiment of all auspiciousness — along with Ram, Lakshman and Sita, dwell always in my heart, O king of the divine!',
  meaning_hi:
    'हे पवनपुत्र, संकट हरण करने वाले, मंगलमूर्ति — राम, लक्ष्मण और सीता सहित मेरे हृदय में वास कीजिए, हे देवाधिराज!',
}

// ── SHARED STYLES ─────────────────────────────────────────────────────────────

const CARD_BASE = {
  borderRadius: '16px',
  overflow: 'hidden',
  marginBottom: '0.9rem',
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function SectionDivider({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.75rem',
      margin: '1.6rem 0 0.9rem',
    }}>
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,193,7,0.12)' }} />
      <span style={{
        fontFamily: 'Cinzel, serif',
        fontSize: '0.6rem',
        color: 'rgba(201,169,110,0.6)',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', background: 'rgba(255,193,7,0.12)' }} />
    </div>
  )
}

function SpecialCard({ item, language, label }) {
  const [showMeaning, setShowMeaning] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{
        ...CARD_BASE,
        background: 'linear-gradient(135deg, rgba(30,8,48,0.97), rgba(20,8,42,0.97))',
        border: '1px solid rgba(255,107,53,0.38)',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '0.5rem 1.1rem',
        borderBottom: '1px solid rgba(255,107,53,0.14)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'Noto Sans Devanagari, serif',
          fontSize: '0.62rem',
          color: '#ff6b35',
          letterSpacing: '0.08em',
        }}>
          {label}
        </span>
        <button
          onClick={() => setShowMeaning(v => !v)}
          style={{
            background: showMeaning ? 'rgba(255,107,53,0.18)' : 'transparent',
            border: '1px solid rgba(255,107,53,0.32)',
            borderRadius: '5px',
            color: '#ff6b35',
            fontSize: '0.6rem',
            padding: '0.12rem 0.55rem',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '0.05em',
          }}
        >
          {showMeaning ? '▲ Hide' : '▼ Meaning'}
        </button>
      </div>

      {/* Text */}
      <div style={{ padding: '0.9rem 1.2rem' }}>
        <p style={{
          fontFamily: 'Noto Sans Devanagari, serif',
          fontSize: 'clamp(1rem, 3vw, 1.18rem)',
          color: '#fff8e7',
          lineHeight: 2.0,
          margin: '0 0 0.55rem',
          whiteSpace: 'pre-line',
          textAlign: 'center',
        }}>
          {item.hi}
        </p>
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.72rem',
          color: 'rgba(201,169,110,0.6)',
          lineHeight: 1.75,
          margin: 0,
          whiteSpace: 'pre-line',
          textAlign: 'center',
          fontStyle: 'italic',
        }}>
          {item.roman}
        </p>
      </div>

      {/* Expandable meaning */}
      <AnimatePresence>
        {showMeaning && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0.7rem 1.2rem 0.85rem',
              borderTop: '1px solid rgba(255,107,53,0.12)',
              background: 'rgba(255,107,53,0.04)',
            }}>
              <p style={{
                fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
                fontSize: '0.82rem',
                color: '#c9a96e',
                lineHeight: 1.8,
                margin: 0,
              }}>
                {language === 'hi' ? item.meaning_hi : item.meaning_en}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function BaanCard({ verse, language, index }) {
  const [tab, setTab] = useState('text')

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.025, 0.25) }}
      style={{
        ...CARD_BASE,
        background: 'rgba(18,8,42,0.82)',
        border: '1px solid rgba(255,193,7,0.15)',
      }}
    >
      {/* Verse header */}
      <div style={{
        padding: '0.42rem 1.1rem',
        borderBottom: '1px solid rgba(255,193,7,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '0.58rem',
          color: 'rgba(201,169,110,0.5)',
          letterSpacing: '0.13em',
        }}>
          ॥ बाण {verse.num} ॥
        </span>
        <div style={{ display: 'flex', gap: '0.28rem' }}>
          {[
            { key: 'text', en: 'Text', hi: 'पाठ' },
            { key: 'meaning', en: 'Meaning', hi: 'अर्थ' },
          ].map(({ key, en, hi }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                background: tab === key ? 'rgba(255,193,7,0.14)' : 'transparent',
                border: `1px solid ${tab === key ? 'rgba(255,193,7,0.35)' : 'rgba(255,193,7,0.18)'}`,
                borderRadius: '5px',
                color: tab === key ? '#ffc107' : '#c9a96e',
                fontSize: '0.57rem',
                padding: '0.1rem 0.48rem',
                cursor: 'pointer',
                fontFamily: language === 'hi' && key === 'meaning' ? 'Noto Sans Devanagari, serif' : 'Cinzel, serif',
                letterSpacing: '0.07em',
              }}
            >
              {language === 'hi' ? hi : en}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.13 }}
          style={{ padding: '0.8rem 1.2rem' }}
        >
          {tab === 'text' ? (
            <>
              <p style={{
                fontFamily: 'Noto Sans Devanagari, serif',
                fontSize: 'clamp(0.95rem, 2.8vw, 1.1rem)',
                color: '#fff8e7',
                lineHeight: 2.0,
                margin: '0 0 0.5rem',
                whiteSpace: 'pre-line',
                textAlign: 'center',
              }}>
                {verse.hi}
              </p>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.68rem',
                color: 'rgba(201,169,110,0.55)',
                lineHeight: 1.75,
                margin: 0,
                whiteSpace: 'pre-line',
                textAlign: 'center',
                fontStyle: 'italic',
              }}>
                {verse.roman}
              </p>
            </>
          ) : (
            <p style={{
              fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
              fontSize: '0.82rem',
              color: '#c9a96e',
              lineHeight: 1.8,
              margin: 0,
            }}>
              {language === 'hi' ? verse.meaning_hi : verse.meaning_en}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function BajrangBaanView() {
  const { language, goBack } = useTempleStore()
  const t = (en, hi) => language === 'hi' ? hi : en

  const ytUrl =
    'https://www.youtube.com/results?search_query=' +
    encodeURIComponent('Bajrang Baan complete recitation Hanuman prayer')

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
          fontSize: 'clamp(0.75rem, 2vw, 0.95rem)', color: '#ffc107', letterSpacing: '0.12em',
        }}>
          {t('BAJRANG BAAN', 'बजरंग बाण')}
        </span>
        <div style={{ fontSize: '1.3rem' }}>🙏</div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '1.5rem 1.25rem 7rem' }}>

        {/* Significance card */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'linear-gradient(135deg, rgba(28,6,44,0.97), rgba(18,8,42,0.93))',
            border: '1px solid rgba(255,193,7,0.22)',
            borderRadius: '18px',
            padding: '1.25rem 1.35rem',
            marginBottom: '1.6rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>⚡</span>
            <h2 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(0.82rem, 2.5vw, 1rem)',
              color: '#ffc107',
              letterSpacing: '0.1em',
              margin: 0,
            }}>
              {t('About the Bajrang Baan', 'बजरंग बाण की महिमा')}
            </h2>
          </div>
          <p style={{
            fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
            fontSize: '0.82rem',
            color: '#c9a96e',
            lineHeight: 1.85,
            margin: '0 0 0.9rem',
          }}>
            {language === 'hi' ? SIGNIFICANCE.hi : SIGNIFICANCE.en}
          </p>
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {[
              { en: '⚡ Destroys Enemies', hi: '⚡ शत्रु-नाश' },
              { en: '🛡 Evil Protection', hi: '🛡 बुराई से रक्षा' },
              { en: '✨ Removes Obstacles', hi: '✨ बाधा-निवारण' },
              { en: '🔥 Tues & Sat', hi: '🔥 मंगल व शनिवार' },
              { en: '📿 By Tulsidas', hi: '📿 तुलसीदास रचित' },
            ].map((tag, i) => (
              <span key={i} style={{
                background: 'rgba(255,193,7,0.07)',
                border: '1px solid rgba(255,193,7,0.18)',
                borderRadius: '20px',
                padding: '0.18rem 0.65rem',
                fontSize: '0.62rem',
                color: '#c9a96e',
                fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
              }}>
                {language === 'hi' ? tag.hi : tag.en}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Opening Doha ── */}
        <SectionDivider label={t('Opening Doha', 'प्रारंभिक दोहा')} />
        <SpecialCard
          item={OPENING_DOHA}
          language={language}
          label={t('✦ Opening Doha ✦', '✦ प्रारंभिक दोहा ✦')}
        />

        {/* ── Opening Chaupai ── */}
        <SectionDivider label={t('Opening Chaupai', 'प्रारंभिक चौपाई')} />
        <SpecialCard
          item={OPENING_CHAUPAI}
          language={language}
          label={t('✦ Opening Chaupai ✦', '✦ प्रारंभिक चौपाई ✦')}
        />

        {/* ── Main Baan verses ── */}
        <SectionDivider label={t('The Baan — Arrows of Hanuman', 'मुख्य बाण — हनुमान के बाण')} />
        <p style={{
          fontFamily: language === 'hi' ? 'Noto Sans Devanagari, serif' : 'Inter, sans-serif',
          fontSize: '0.72rem',
          color: 'rgba(201,169,110,0.45)',
          textAlign: 'center',
          margin: '0 0 1rem',
          lineHeight: 1.6,
        }}>
          {t(
            'Tap any verse to switch between the text and its meaning.',
            'किसी भी बाण पर टैप करके पाठ और अर्थ देखें।'
          )}
        </p>

        {MAIN_BAAN.map((verse, i) => (
          <BaanCard key={verse.num} verse={verse} language={language} index={i} />
        ))}

        {/* ── Closing Doha ── */}
        <SectionDivider label={t('Closing Doha', 'समापन दोहा')} />
        <SpecialCard
          item={CLOSING_DOHA}
          language={language}
          label={t('✦ Closing Doha ✦', '✦ समापन दोहा ✦')}
        />

        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            padding: '1rem',
            borderTop: '1px solid rgba(255,193,7,0.1)',
          }}
        >
          <p style={{
            fontFamily: 'Noto Sans Devanagari, serif',
            fontSize: '1rem',
            color: 'rgba(201,169,110,0.5)',
            margin: 0,
            letterSpacing: '0.08em',
          }}>
            ॥ जय बजरंग बली ॥
          </p>
        </motion.div>
      </div>

      {/* Floating YouTube button */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        style={{
          position: 'fixed', bottom: '1.5rem', left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 400,
        }}
      >
        <a
          href={ytUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'linear-gradient(135deg, rgba(18,8,42,0.97), rgba(26,5,42,0.97))',
            border: '1px solid rgba(255,193,7,0.35)',
            borderRadius: '25px',
            padding: '0.65rem 1.35rem',
            color: '#ffc107',
            fontFamily: 'Cinzel, serif',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textDecoration: 'none',
            boxShadow: '0 4px 24px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,193,7,0.08)',
            backdropFilter: 'blur(12px)',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: '#ff3333', fontSize: '0.9rem' }}>▶</span>
          {t('Listen to Bajrang Baan', 'बजरंग बाण सुनें')}
        </a>
      </motion.div>
    </motion.div>
  )
}
