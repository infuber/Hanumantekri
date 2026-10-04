import useTempleStore from '../../store/templeStore'

export default function LanguageToggle() {
  const { language, setLanguage } = useTempleStore()

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000,
        background: 'rgba(18,8,42,0.85)',
        border: '1px solid rgba(255,193,7,0.4)',
        borderRadius: '20px',
        padding: '0.4rem 0.9rem',
        color: '#ffc107',
        fontFamily: language === 'en' ? 'Cinzel, serif' : 'Tiro Devanagari Hindi, serif',
        fontSize: '0.85rem',
        letterSpacing: '0.08em',
        cursor: 'pointer',
        backdropFilter: 'blur(8px)',
        transition: 'all 0.2s ease',
        display: 'flex',
        gap: '0.4rem',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,193,7,0.9)'
        e.currentTarget.style.boxShadow = '0 0 12px rgba(255,193,7,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,193,7,0.4)'
        e.currentTarget.style.boxShadow = 'none'
      }}
      title="Toggle language"
    >
      <span style={{ opacity: language === 'en' ? 1 : 0.45 }}>EN</span>
      <span style={{ color: 'rgba(255,193,7,0.4)' }}>|</span>
      <span
        style={{
          fontFamily: 'Tiro Devanagari Hindi, serif',
          opacity: language === 'hi' ? 1 : 0.45,
        }}
      >
        हि
      </span>
    </button>
  )
}
