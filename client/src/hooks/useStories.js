import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function useStories(areaSlug) {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!areaSlug) return

    async function fetchStories() {
      try {
        // First get area id by slug
        const { data: areaData, error: areaError } = await supabase
          .from('areas')
          .select('id')
          .eq('slug', areaSlug)
          .single()

        if (areaError) throw areaError

        const { data, error } = await supabase
          .from('stories')
          .select('*')
          .eq('area_id', areaData.id)
          .eq('is_active', true)
          .order('display_order')

        if (error) throw error
        setStories(data || [])
      } catch (err) {
        setError(err.message)
        setStories(FALLBACK_STORIES)
      } finally {
        setLoading(false)
      }
    }

    fetchStories()
  }, [areaSlug])

  return { stories, loading, error }
}

const FALLBACK_STORIES = [
  {
    id: '1',
    title_en: 'The Birth of Hanuman Ji',
    title_hi: 'हनुमान जी का जन्म',
    content_en:
      'Hanuman Ji was born to Anjana and Kesari on the full moon day of Chaitra. Blessed by Vayu Dev, he is the embodiment of strength, devotion, and wisdom. His birth filled the universe with divine light and the Devas showered flowers from the heavens.',
    content_hi:
      'हनुमान जी का जन्म चैत्र मास की पूर्णिमा को अंजना और केसरी के घर हुआ। वायु देव के आशीर्वाद से वे शक्ति, भक्ति और ज्ञान के प्रतीक हैं। उनके जन्म से सारा ब्रह्मांड दिव्य प्रकाश से भर गया और देवताओं ने स्वर्ग से फूलों की वर्षा की।',
    display_order: 1,
    is_active: true,
  },
  {
    id: '2',
    title_en: 'Hanuman Crosses the Ocean',
    title_hi: 'हनुमान का सागर पार करना',
    content_en:
      'When Lord Ram\'s army reached the shores of Lanka, Hanuman Ji leaped across the vast ocean to find Mata Sita. With each stride he grew larger, his form blazing like the sun, fearlessly crossing mountains and seas in service of his beloved Ram.',
    content_hi:
      'जब भगवान राम की सेना लंका के तट पर पहुंची, तो हनुमान जी ने माता सीता को खोजने के लिए विशाल सागर को पार किया। प्रत्येक कदम के साथ वे बड़े होते गए, उनका रूप सूर्य की तरह चमकता था, अपने प्रिय राम की सेवा में पहाड़ों और समुद्रों को निडरता से पार करते हुए।',
    display_order: 2,
    is_active: true,
  },
  {
    id: '3',
    title_en: 'The Sanjeevani Mountain',
    title_hi: 'संजीवनी पर्वत',
    content_en:
      'When Lakshmana fell unconscious on the battlefield, Hanuman Ji was sent to the Himalayas to fetch the life-saving Sanjeevani herb. Unable to identify the herb, Hanuman Ji lifted the entire mountain and brought it to Lanka, saving Lakshmana\'s life.',
    content_hi:
      'जब लक्ष्मण युद्ध के मैदान में बेहोश हो गए, तो हनुमान जी को जीवन रक्षक संजीवनी जड़ी-बूटी लाने के लिए हिमालय भेजा गया। जड़ी-बूटी की पहचान न कर पाने पर हनुमान जी ने पूरे पर्वत को उठाया और लंका ले आए, जिससे लक्ष्मण की जान बच गई।',
    display_order: 3,
    is_active: true,
  },
]
