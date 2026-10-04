import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ADMIN_PASSWORD = 'hanuman108'

const TABS = [
  { id: 'areas', label: 'Areas' },
  { id: 'stories', label: 'Stories' },
  { id: 'chalisa', label: 'Chalisa' },
]

function AuthScreen({ onAuth }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      onAuth()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at center, #1a0530 0%, #0a0515 70%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{
          background: 'rgba(18,8,42,0.9)',
          border: '1px solid rgba(255,193,7,0.3)',
          borderRadius: '20px',
          padding: '3rem',
          width: '100%',
          maxWidth: '380px',
          textAlign: 'center',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🕉️</div>
        <h1
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1.4rem',
            color: '#fff8e7',
            letterSpacing: '0.15em',
            marginBottom: '0.4rem',
          }}
        >
          ADMIN PORTAL
        </h1>
        <p
          style={{
            fontFamily: 'Cinzel, serif',
            color: '#c9a96e',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            marginBottom: '2rem',
          }}
        >
          HANUMAT TEKARI
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${error ? 'rgba(192,57,43,0.8)' : 'rgba(255,193,7,0.3)'}`,
              borderRadius: '10px',
              padding: '0.9rem 1rem',
              color: '#fff8e7',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              marginBottom: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              textAlign: 'center',
              letterSpacing: '0.15em',
            }}
          />
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  color: '#c0392b',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.75rem',
                  marginBottom: '0.75rem',
                  letterSpacing: '0.08em',
                }}
              >
                Incorrect password. Try again.
              </motion.p>
            )}
          </AnimatePresence>
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #ff6b35 0%, #c0392b 100%)',
              border: 'none',
              borderRadius: '10px',
              padding: '0.9rem',
              color: '#fff8e7',
              fontFamily: 'Cinzel, serif',
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
            }}
          >
            Enter
          </button>
        </form>
      </motion.div>
    </div>
  )
}

export default function AdminLayout({ children }) {
  const [authed, setAuthed] = useState(false)
  const [activeTab, setActiveTab] = useState('areas')

  if (!authed) return <AuthScreen onAuth={() => setAuthed(true)} />

  return (
    <div style={{ minHeight: '100vh', background: '#0a0515' }}>
      {/* Admin header */}
      <div
        style={{
          background: 'rgba(18,8,42,0.95)',
          borderBottom: '1px solid rgba(255,193,7,0.2)',
          padding: '1rem 2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        <h1
          style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '1rem',
            color: '#ffc107',
            letterSpacing: '0.15em',
          }}
        >
          🕉️ ADMIN — HANUMAT TEKARI
        </h1>
        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background:
                  activeTab === tab.id
                    ? 'rgba(255,193,7,0.15)'
                    : 'transparent',
                border:
                  activeTab === tab.id
                    ? '1px solid rgba(255,193,7,0.5)'
                    : '1px solid transparent',
                borderRadius: '8px',
                padding: '0.4rem 1rem',
                color: activeTab === tab.id ? '#ffc107' : '#c9a96e',
                fontFamily: 'Cinzel, serif',
                fontSize: '0.8rem',
                cursor: 'pointer',
                letterSpacing: '0.08em',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <button
          onClick={() => setAuthed(false)}
          style={{
            marginLeft: 'auto',
            background: 'transparent',
            border: '1px solid rgba(192,57,43,0.4)',
            borderRadius: '8px',
            padding: '0.4rem 1rem',
            color: 'rgba(192,57,43,0.7)',
            fontFamily: 'Cinzel, serif',
            fontSize: '0.75rem',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '2rem' }}>
        {children({ activeTab })}
      </div>
    </div>
  )
}
