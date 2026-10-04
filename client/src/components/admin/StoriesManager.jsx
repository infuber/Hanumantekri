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

const EMPTY_FORM = { title_en: '', title_hi: '', content_en: '', content_hi: '' }

function StoryForm({ initial, areaId, onSave, onCancel, saving }) {
  const [form, setForm] = useState(initial || EMPTY_FORM)
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  function handleSubmit(e) {
    e.preventDefault()
    onSave({ ...form, area_id: areaId })
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: 'rgba(18,8,42,0.9)', border: '1px solid rgba(255,193,7,0.2)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>TITLE (EN)</label>
          <input style={inputStyle} value={form.title_en} onChange={(e) => set('title_en', e.target.value)} required />
        </div>
        <div>
          <label style={labelStyle}>TITLE (HI)</label>
          <input style={{ ...inputStyle, fontFamily: 'Tiro Devanagari Hindi, serif' }} value={form.title_hi} onChange={(e) => set('title_hi', e.target.value)} required />
        </div>
        <div>
          <label style={labelStyle}>CONTENT (EN)</label>
          <textarea style={taStyle} value={form.content_en} onChange={(e) => set('content_en', e.target.value)} required />
        </div>
        <div>
          <label style={labelStyle}>CONTENT (HI)</label>
          <textarea style={{ ...taStyle, fontFamily: 'Tiro Devanagari Hindi, serif' }} value={form.content_hi} onChange={(e) => set('content_hi', e.target.value)} required />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <button type="submit" disabled={saving} style={{ background: 'linear-gradient(135deg, #ff6b35 0%, #c0392b 100%)', border: 'none', borderRadius: '8px', padding: '0.6rem 1.5rem', color: '#fff8e7', fontFamily: 'Cinzel, serif', fontSize: '0.8rem', cursor: 'pointer', letterSpacing: '0.08em' }}>
          {saving ? 'Saving...' : 'Save Story'}
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

export default function StoriesManager() {
  const [areas, setAreas] = useState([])
  const [selectedArea, setSelectedArea] = useState(null)
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editStory, setEditStory] = useState(null)
  const [showAdd, setShowAdd] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase.from('areas').select('id,slug,name_en').order('display_order').then(({ data }) => {
      setAreas(data || [])
      if (data && data.length > 0) setSelectedArea(data[0])
    })
  }, [])

  useEffect(() => {
    if (!selectedArea) return
    setLoading(true)
    supabase.from('stories').select('*').eq('area_id', selectedArea.id).order('display_order').then(({ data }) => {
      setStories(data || [])
      setLoading(false)
    })
  }, [selectedArea])

  async function handleSave(formData) {
    setSaving(true)
    let error
    if (editStory) {
      ;({ error } = await supabase.from('stories').update(formData).eq('id', editStory.id))
    } else {
      ;({ error } = await supabase.from('stories').insert({ ...formData, display_order: stories.length + 1, is_active: true }))
    }
    if (error) setMsg('Error: ' + error.message)
    else {
      setMsg(editStory ? 'Updated!' : 'Added!')
      setEditStory(null)
      setShowAdd(false)
      const { data } = await supabase.from('stories').select('*').eq('area_id', selectedArea.id).order('display_order')
      setStories(data || [])
    }
    setSaving(false)
    setTimeout(() => setMsg(''), 2500)
  }

  async function handleDelete(story) {
    if (!confirm(`Delete "${story.title_en}"?`)) return
    const { error } = await supabase.from('stories').delete().eq('id', story.id)
    if (error) setMsg('Error: ' + error.message)
    else {
      setMsg('Deleted.')
      setStories((prev) => prev.filter((s) => s.id !== story.id))
    }
    setTimeout(() => setMsg(''), 2500)
  }

  return (
    <div>
      {/* Area selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', color: '#fff8e7', fontSize: '1.1rem', letterSpacing: '0.1em' }}>Stories</h2>
        <select
          value={selectedArea?.id || ''}
          onChange={(e) => setSelectedArea(areas.find((a) => a.id === e.target.value))}
          style={{ background: 'rgba(18,8,42,0.9)', border: '1px solid rgba(255,193,7,0.3)', borderRadius: '8px', padding: '0.4rem 0.8rem', color: '#fff8e7', fontFamily: 'Cinzel, serif', fontSize: '0.8rem', cursor: 'pointer', outline: 'none' }}
        >
          {areas.map((a) => <option key={a.id} value={a.id}>{a.name_en}</option>)}
        </select>
        <button
          onClick={() => { setShowAdd(true); setEditStory(null) }}
          style={{ background: 'rgba(255,193,7,0.15)', border: '1px solid rgba(255,193,7,0.4)', borderRadius: '8px', padding: '0.4rem 1rem', color: '#ffc107', fontFamily: 'Cinzel, serif', fontSize: '0.75rem', cursor: 'pointer', letterSpacing: '0.06em' }}
        >
          + Add Story
        </button>
        {msg && <span style={{ color: '#2ecc71', fontFamily: 'Cinzel, serif', fontSize: '0.8rem' }}>{msg}</span>}
      </div>

      {/* Add form */}
      {showAdd && !editStory && (
        <StoryForm areaId={selectedArea?.id} onSave={handleSave} onCancel={() => setShowAdd(false)} saving={saving} />
      )}

      {/* Edit form */}
      {editStory && (
        <StoryForm initial={editStory} areaId={selectedArea?.id} onSave={handleSave} onCancel={() => setEditStory(null)} saving={saving} />
      )}

      {/* Stories table */}
      {loading ? (
        <p style={{ color: '#c9a96e' }}>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {stories.map((story) => (
            <div key={story.id} style={{ background: 'rgba(18,8,42,0.8)', border: '1px solid rgba(255,193,7,0.12)', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'Cinzel, serif', color: '#fff8e7', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{story.title_en}</p>
                <p style={{ fontFamily: 'Tiro Devanagari Hindi, serif', color: '#c9a96e', fontSize: '0.85rem' }}>{story.title_hi}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => { setEditStory(story); setShowAdd(false) }} style={{ background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)', borderRadius: '6px', padding: '0.3rem 0.8rem', color: '#ffc107', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(story)} style={{ background: 'rgba(192,57,43,0.1)', border: '1px solid rgba(192,57,43,0.3)', borderRadius: '6px', padding: '0.3rem 0.8rem', color: '#c0392b', fontFamily: 'Cinzel, serif', fontSize: '0.7rem', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
          {stories.length === 0 && <p style={{ color: 'rgba(201,169,110,0.5)', fontFamily: 'Cinzel, serif', fontSize: '0.85rem' }}>No stories yet for this area.</p>}
        </div>
      )}
    </div>
  )
}
