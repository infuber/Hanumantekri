import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,193,7,0.3)',
  borderRadius: '8px',
  padding: '0.7rem 1rem',
  color: '#fff8e7',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.85rem',
  outline: 'none',
  marginBottom: '0.75rem',
}

const taStyle = { ...inputStyle, resize: 'vertical', minHeight: '80px' }

const labelStyle = {
  display: 'block',
  fontFamily: 'Cinzel, serif',
  fontSize: '0.7rem',
  color: '#c9a96e',
  letterSpacing: '0.08em',
  marginBottom: '0.3rem',
}

const EMPTY = { verse_number: '', verse_type: 'chaupai', text_hi: '', text_en: '', meaning_hi: '', meaning_en: '' }

function VerseForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial || EMPTY)
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSave(form) }}
      style={{ background: 'rgba(18,8,42,0.9)', border: '1px solid rgba(255,193,7,0.2)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>VERSE NUMBER</label>
          <input style={inputStyle} type="number" value={form.verse_number} onChange={(e) => set('verse_number', e.target.value)} required />
        </div>
        <div>
          <label style={labelStyle}>TYPE</label>
          <select value={form.verse_type} onChange={(e) => set('verse_type', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="chaupai">Chaupai</option>
            <option value="doha">Doha</option>
          </select>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>TEXT (HI — Devanagari)</label>
          <textarea style={{ ...taStyle, fontFamily: 'Noto Sans Devanagari, serif', fontSize: '1rem' }} value={form.text_hi} onChange={(e) => set('text_hi', e.target.value)} required />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>TEXT (EN — Romanised)</label>
          <textarea style={taStyle} value={form.text_en} onChange={(e) => set('text_en', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>MEANING (HI)</label>
          <textarea style={{ ...taStyle, fontFamily: 'Noto Sans Devanagari, serif' }} value={form.meaning_hi} onChange={(e) => set('meaning_hi', e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>MEANING (EN)</label>
          <textarea style={taStyle} value={form.meaning_en} onChange={(e) => set('meaning_en', e.target.value)} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <button type="submit" disabled={saving} style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #c0392b 100%)', border: 'none', borderRadius: '8px', padding: '0.6rem 1.5rem', color: '#fff8e7', fontFamily: 'Cinzel, serif', fontSize: '0.8rem', cursor: 'pointer', letterSpacing: '0.08em' }}>
          {saving ? 'Saving...' : 'Save Verse'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{ background: 'transparent', border: '1px solid rgba(255,193,7,0.3)', borderRadius: '8px', padding: '0.6rem 1.2rem', color: '#c9a96e', fontFamily: 'Cinzel, serif', fontSize: '0.8rem', cursor: 'pointer' }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default function ChalisaManager() {
  const [verses, setVerses] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editVerse, setEditVerse] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [msg, setMsg] = useState('')

  async function load() {
    const { data } = await supabase.from('chalisa_verses').select('*').order('verse_number')
    setVerses(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleSave(formData) {
    setSaving(true)
    let error
    const payload = { ...formData, verse_number: parseInt(formData.verse_number) }
    if (editVerse) {
      ;({ error } = await supabase.from('chalisa_verses').update(payload).eq('id', editVerse.id))
    } else {
      ;({ error } = await supabase.from('chalisa_verses').insert(payload))
    }
    if (error) setMsg('Error: ' + error.message)
    else { setMsg(editVerse ? 'Updated!' : 'Added!'); setEditVerse(null); setShowAdd(false); load() }
    setSaving(false)
    setTimeout(() => setMsg(''), 2500)
  }

  async function handleDelete(verse) {
    if (!confirm(`Delete verse ${verse.verse_number}?`)) return
    const { error } = await supabase.from('chalisa_verses').delete().eq('id', verse.id)
    if (error) setMsg('Error: ' + error.message)
    else { setMsg('Deleted.'); setVerses((prev) => prev.filter((v) => v.id !== verse.id)) }
    setTimeout(() => setMsg(''), 2500)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', color: '#fff8e7', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
          Chalisa Verses
        </h2>
        <button
          onClick={() => { setShowAdd(true); setEditVerse(null) }}
          style={{ background: 'rgba(255,193,7,0.15)', border: '1px solid rgba(255,193,7,0.4)', borderRadius: '8px', padding: '0.4rem 1rem', color: '#ffc107', fontFamily: 'Cinzel, serif', fontSize: '0.75rem', cursor: 'pointer', letterSpacing: '0.06em' }}
        >
          + Add Verse
        </button>
        {msg && <span style={{ color: '#2ecc71', fontFamily: 'Cinzel, serif', fontSize: '0.8rem' }}>{msg}</span>}
      </div>

      {showAdd && !editVerse && (
        <VerseForm onSave={handleSave} onCancel={() => setShowAdd(false)} saving={saving} />
      )}
      {editVerse && (
        <VerseForm initial={editVerse} onSave={handleSave} onCancel={() => setEditVerse(null)} saving={saving} />
      )}

      {loading ? (
        <p style={{ color: '#c9a96e' }}>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {verses.map((verse) => (
            <div key={verse.id} style={{ background: 'rgba(18,8,42,0.8)', border: '1px solid rgba(255,193,7,0.12)', borderRadius: '10px', padding: '0.85rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontFamily: 'Cinzel, serif', color: '#c9a96e', fontSize: '0.75rem', minWidth: '60px' }}>
                #{verse.verse_number} <span style={{ opacity: 0.5 }}>{verse.verse_type}</span>
              </span>
              <p style={{ fontFamily: 'Noto Sans Devanagari, serif', color: '#fff8e7', fontSize: '0.9rem', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {verse.text_hi?.split('\n')[0]}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button onClick={() => { setEditVerse(verse); setShowAdd(false) }} style={{ background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)', borderRadius: '6px', padding: '0.3rem 0.8rem', color: '#ffc107', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(verse)} style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)', borderRadius: '6px', padding: '0.3rem 0.8rem', color: '#c0392b', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
          {verses.length === 0 && <p style={{ color: 'rgba(201,169,110,0.5)', fontFamily: 'Cinzel, serif', fontSize: '0.85rem' }}>No verses yet.</p>}
        </div>
      )}
    </div>
  )
}
