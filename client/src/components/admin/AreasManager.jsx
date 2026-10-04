import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

const cellStyle = {
  padding: '0.75rem 1rem',
  borderBottom: '1px solid rgba(255,193,7,0.08)',
  color: '#fff8e7',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.85rem',
  verticalAlign: 'middle',
}

const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,193,7,0.3)',
  borderRadius: '6px',
  padding: '0.4rem 0.7rem',
  color: '#fff8e7',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.85rem',
  width: '90px',
  outline: 'none',
}

// Separate row component so each row can have its own state
function AreaRow({ area, onSaveFee, onToggleActive, saving }) {
  const [feeEdit, setFeeEdit] = useState(area.entry_fee)

  return (
    <tr>
      <td style={cellStyle}>{area.icon}</td>
      <td style={{ ...cellStyle, color: '#c9a96e', fontSize: '0.75rem' }}>{area.slug}</td>
      <td style={cellStyle}>{area.name_en}</td>
      <td style={{ ...cellStyle, fontFamily: 'Tiro Devanagari Hindi, serif' }}>{area.name_hi}</td>
      <td style={cellStyle}>
        <input
          type="number"
          value={feeEdit}
          onChange={(e) => setFeeEdit(e.target.value)}
          style={inputStyle}
          min={0}
        />
      </td>
      <td style={cellStyle}>
        <button
          onClick={() => onToggleActive(area)}
          disabled={saving === area.id}
          style={{
            background: area.is_active ? 'rgba(39,174,96,0.2)' : 'rgba(192,57,43,0.2)',
            border: `1px solid ${area.is_active ? 'rgba(39,174,96,0.5)' : 'rgba(192,57,43,0.5)'}`,
            borderRadius: '6px',
            padding: '0.3rem 0.7rem',
            color: area.is_active ? '#2ecc71' : '#c0392b',
            fontFamily: 'Cinzel, serif',
            fontSize: '0.7rem',
            cursor: 'pointer',
            letterSpacing: '0.06em',
          }}
        >
          {area.is_active ? 'ACTIVE' : 'HIDDEN'}
        </button>
      </td>
      <td style={cellStyle}>
        <button
          onClick={() => onSaveFee(area, feeEdit)}
          disabled={saving === area.id}
          style={{
            background: 'rgba(255,193,7,0.15)',
            border: '1px solid rgba(255,193,7,0.4)',
            borderRadius: '6px',
            padding: '0.3rem 0.9rem',
            color: '#ffc107',
            fontFamily: 'Cinzel, serif',
            fontSize: '0.7rem',
            cursor: 'pointer',
          }}
        >
          {saving === area.id ? '...' : 'Save Fee'}
        </button>
      </td>
    </tr>
  )
}

export default function AreasManager() {
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(null)
  const [msg, setMsg] = useState('')

  async function load() {
    const { data } = await supabase.from('areas').select('*').order('display_order')
    setAreas(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function saveFee(area, newFee) {
    setSaving(area.id)
    const fee = parseFloat(newFee)
    const { error } = await supabase
      .from('areas')
      .update({ entry_fee: fee, is_free: fee === 0 })
      .eq('id', area.id)
    if (error) setMsg('Error: ' + error.message)
    else { setMsg('Saved!'); load() }
    setSaving(null)
    setTimeout(() => setMsg(''), 2000)
  }

  async function toggleActive(area) {
    setSaving(area.id)
    const { error } = await supabase
      .from('areas')
      .update({ is_active: !area.is_active })
      .eq('id', area.id)
    if (error) setMsg('Error: ' + error.message)
    else { setMsg('Updated!'); load() }
    setSaving(null)
    setTimeout(() => setMsg(''), 2000)
  }

  if (loading) return <p style={{ color: '#c9a96e' }}>Loading areas...</p>

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontFamily: 'Cinzel, serif', color: '#fff8e7', fontSize: '1.1rem', letterSpacing: '0.1em' }}>
          Areas
        </h2>
        {msg && <span style={{ color: '#2ecc71', fontFamily: 'Cinzel, serif', fontSize: '0.8rem' }}>{msg}</span>}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(18,8,42,0.8)', borderRadius: '12px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,193,7,0.2)' }}>
              {['Icon', 'Slug', 'Name (EN)', 'Name (HI)', 'Entry Fee (₹)', 'Active', 'Actions'].map((h) => (
                <th key={h} style={{ ...cellStyle, color: '#c9a96e', fontFamily: 'Cinzel, serif', fontSize: '0.75rem', letterSpacing: '0.08em', textAlign: 'left' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {areas.map((area) => (
              <AreaRow
                key={area.id}
                area={area}
                onSaveFee={saveFee}
                onToggleActive={toggleActive}
                saving={saving}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
