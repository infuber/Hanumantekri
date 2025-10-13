export default function Spinner({ label }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span className="spinner" aria-hidden="true" />
      {label ? <span>{label}</span> : null}
    </div>
  )
}


