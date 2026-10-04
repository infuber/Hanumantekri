import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function useAreas() {
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAreas() {
      try {
        const { data, error } = await supabase
          .from('areas')
          .select('*')
          .eq('is_active', true)
          .order('display_order')

        if (error) throw error
        setAreas(data || [])
      } catch (err) {
        setError(err.message)
        // Fallback data if Supabase is unavailable
        setAreas(FALLBACK_AREAS)
      } finally {
        setLoading(false)
      }
    }

    fetchAreas()
  }, [])

  return { areas, loading, error }
}

// Fallback data so the app works even without Supabase connectivity
const FALLBACK_AREAS = [
  {
    id: '1',
    slug: 'main-hall',
    name_en: 'Main Darshan Hall',
    name_hi: 'मुख्य दर्शन हॉल',
    description_en: 'Witness the divine presence of Hanumat Ji in the sacred main hall.',
    description_hi: 'मुख्य हॉल में हनुमत जी की दिव्य उपस्थिति के दर्शन करें।',
    entry_fee: 0,
    is_free: true,
    icon: '🕉️',
    display_order: 1,
    is_active: true,
  },
  {
    id: '2',
    slug: 'katha-mandap',
    name_en: 'Katha Mandap',
    name_hi: 'कथा मंडप',
    description_en: 'Sacred stories and teachings of Hanumat Ji.',
    description_hi: 'हनुमत जी की पवित्र कथाएं और शिक्षाएं।',
    entry_fee: 11,
    is_free: false,
    icon: '📖',
    display_order: 2,
    is_active: true,
  },
  {
    id: '3',
    slug: 'chalisa-gallery',
    name_en: 'Chalisa Gallery',
    name_hi: 'चालीसा गैलरी',
    description_en: 'All 40 verses of the Hanuman Chalisa with meanings.',
    description_hi: 'हनुमान चालीसा के सभी 40 दोहे अर्थ सहित।',
    entry_fee: 5,
    is_free: false,
    icon: '📜',
    display_order: 3,
    is_active: true,
  },
  {
    id: '4',
    slug: 'puja-room',
    name_en: 'Puja Room',
    name_hi: 'पूजा कक्ष',
    description_en: 'Offer your prayers and light a virtual diya.',
    description_hi: 'अपनी प्रार्थना अर्पित करें और दीया जलाएं।',
    entry_fee: 51,
    is_free: false,
    icon: '🪔',
    display_order: 4,
    is_active: true,
  },
]
