import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function useChalisa() {
  const [verses, setVerses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchVerses() {
      try {
        const { data, error } = await supabase
          .from('chalisa_verses')
          .select('*')
          .order('verse_number')

        if (error) throw error
        setVerses(data || [])
      } catch (err) {
        setError(err.message)
        setVerses(FALLBACK_VERSES)
      } finally {
        setLoading(false)
      }
    }

    fetchVerses()
  }, [])

  return { verses, loading, error }
}

const FALLBACK_VERSES = [
  {
    id: '1',
    verse_number: 1,
    verse_type: 'doha',
    text_hi: 'श्रीगुरु चरन सरोज रज, निज मनु मुकुरु सुधारि।\nबरनउँ रघुबर बिमल जसु, जो दायकु फल चारि॥',
    text_en: 'Shri Guru Charan Saroj Raj, Nij Manu Mukuru Sudhari.\nBarnau Raghubar Bimal Jasu, Jo Dayaku Phal Chari.',
    meaning_hi: 'गुरु के चरण कमलों की धूल से अपने मन के दर्पण को साफ करके, मैं श्री रघुवीर के निर्मल यश का वर्णन करता हूं, जो चारों फलों को देने वाले हैं।',
    meaning_en: 'Cleansing the mirror of my heart with the dust of my Guru\'s lotus feet, I describe the pure glory of Sri Raghuvir, which bestows the four fruits of life.',
  },
  {
    id: '2',
    verse_number: 2,
    verse_type: 'doha',
    text_hi: 'बुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।\nबल बुधि बिद्या देहु मोहिं, हरहु कलेस बिकार॥',
    text_en: 'Buddhihin Tanu Jaanike, Sumirau Pavan Kumar.\nBal Buddhi Vidya Dehu Mohin, Harahu Kles Bikar.',
    meaning_hi: 'अपने शरीर को बुद्धिहीन जानकर, मैं पवनकुमार का स्मरण करता हूं। हे हनुमान! मुझे बल, बुद्धि और विद्या दीजिए और मेरे कष्टों तथा दोषों को हरिए।',
    meaning_en: 'Knowing my body to be devoid of intelligence, I meditate on Pavan Kumar. O Hanuman! Grant me strength, wisdom and knowledge, and remove my afflictions and impurities.',
  },
  {
    id: '3',
    verse_number: 3,
    verse_type: 'chaupai',
    text_hi: 'जय हनुमान ज्ञान गुण सागर।\nजय कपीस तिहुं लोक उजागर॥',
    text_en: 'Jai Hanuman Gyan Gun Sagar.\nJai Kapis Tihu Lok Ujagar.',
    meaning_hi: 'हे हनुमान! ज्ञान और गुणों के सागर की जय हो। हे कपिश्रेष्ठ! तीनों लोकों में प्रकाशित होने वाले की जय हो।',
    meaning_en: 'Victory to Hanuman, the ocean of knowledge and virtue! Victory to the Lord of Monkeys, the illuminator of all three worlds!',
  },
  {
    id: '4',
    verse_number: 4,
    verse_type: 'chaupai',
    text_hi: 'राम दूत अतुलित बल धामा।\nअंजनि-पुत्र पवनसुत नामा॥',
    text_en: 'Ram Doot Atilit Bal Dhama.\nAnjani Putra Pavan Sut Nama.',
    meaning_hi: 'वे राम के दूत हैं, अतुलनीय बल के धाम हैं। उनका नाम अंजनी-पुत्र और पवनसुत है।',
    meaning_en: 'He is Ram\'s messenger, the abode of incomparable strength. He is known by the names Anjani\'s son and Son of the Wind.',
  },
  {
    id: '5',
    verse_number: 5,
    verse_type: 'chaupai',
    text_hi: 'महाबीर बिक्रम बजरंगी।\nकुमति निवार सुमति के संगी॥',
    text_en: 'Mahavir Bikram Bajrangi.\nKumati Nivar Sumati Ke Sangi.',
    meaning_hi: 'हे महावीर! वज्र जैसे अंगों वाले बजरंगी! आप कुबुद्धि को हटाते हैं और सुबुद्धि के साथी हैं।',
    meaning_en: 'O great hero, the mighty Bajrangi! You are the remover of evil thoughts and the companion of good sense.',
  },
]
