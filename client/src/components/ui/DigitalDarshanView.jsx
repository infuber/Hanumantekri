import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

const MURTIS = [
  { id: 'left',  src: '/hanuman-left.png',  label_hi: 'बाल हनुमान',      label_en: 'Bal Hanuman' },
  { id: 'main',  src: '/hanuman-main.png',  label_hi: 'श्री हनुमान जी',  label_en: 'Shri Hanuman Ji' },
  { id: 'right', src: '/hanuman-right.png', label_hi: 'पंचमुखी हनुमान', label_en: 'Panchmukhi Hanuman' },
]

const ACTIONS = [
  { id: 'diya',       emoji: '🪔', label_hi: 'दीपक जलाएं',    label_en: 'Diya Jalao',     color: '#ff8c00' },
  { id: 'agarbatti',  emoji: '🌿', label_hi: 'अगरबत्ती',       label_en: 'Agarbatti',       color: '#7ec8a0' },
  { id: 'ghanti',     emoji: '🔔', label_hi: 'घंटी बजाएं',     label_en: 'Ghanti Bajao',    color: '#ffc107' },
  { id: 'mala',       emoji: '🌸', label_hi: 'माला चढ़ाएं',    label_en: 'Mala Chadao',     color: '#ff69b4' },
  { id: 'aarti',      emoji: '🙏', label_hi: 'आरती करें',       label_en: 'Aarti Karo',      color: '#ff6b35' },
]

function playBell() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const frequencies = [523, 659, 784]
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.frequency.value = freq
      osc.type = 'sine'
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.1)
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.1 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.1 + 2.5)
      osc.start(ctx.currentTime + i * 0.1)
      osc.stop(ctx.currentTime + i * 0.1 + 2.5)
    })
  } catch (_) {}
}

function MurtiColumn({ murti, isMain, language }) {
  const [err, setErr] = useState(false)
  const h = isMain ? 'min(62vh, 520px)' : 'min(38vh, 300px)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', flex: isMain ? 2 : 1 }}>
      <div style={{ position: 'relative', height: h, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', width: '100%' }}>
        {isMain && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 65%, rgba(255,193,7,0.28) 0%, rgba(255,107,53,0.1) 45%, transparent 72%)',
              pointerEvents: 'none',
            }}
          />
        )}
        {!err ? (
          <img
            src={murti.src}
            alt={murti.label_en}
            onError={() => setErr(true)}
            style={{
              height: '100%', maxWidth: '100%',
              objectFit: 'contain', objectPosition: 'bottom',
              filter: isMain
                ? 'drop-shadow(0 0 32px rgba(255,193,7,0.5)) drop-shadow(0 0 8px rgba(255,107,53,0.3))'
                : 'drop-shadow(0 0 10px rgba(255,193,7,0.25))',
            }}
          />
        ) : (
          <div style={{
            height: '90%', width: isMain ? '160px' : '90px',
            background: 'linear-gradient(170deg, rgba(255,193,7,0.12) 0%, rgba(255,107,53,0.08) 100%)',
            border: '1px solid rgba(255,193,7,0.25)',
            borderRadius: '12px 12px 60% 60% / 12px 12px 40% 40%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
          }}>
            <span style={{ fontSize: isMain ? '3.5rem' : '2rem' }}>🚩</span>
            <div style={{
              fontFamily: 'Noto Sans Devanagari, serif',
              fontSize: isMain ? '0.9rem' : '0.65rem',
              color: 'rgba(255,193,7,0.65)', textAlign: 'center', padding: '0 0.5rem',
            }}>
              {murti.label_hi}
            </div>
          </div>
        )}
      </div>
      <div style={{
        background: 'linear-gradient(90deg, rgba(255,193,7,0.06), rgba(255,193,7,0.12), rgba(255,193,7,0.06))',
        border: '1px solid rgba(255,193,7,0.2)',
        borderRadius: '6px', padding: '0.25rem 0.75rem',
        fontFamily: isMain ? 'Cinzel, serif' : 'Noto Sans Devanagari, serif',
        fontSize: isMain ? '0.7rem' : '0.6rem',
        color: 'rgba(255,193,7,0.75)', textAlign: 'center',
        letterSpacing: isMain ? '0.12em' : 0,
      }}>
        {language === 'hi' ? murti.label_hi : murti.label_en}
      </div>
    </div>
  )
}

function Diyas({ active }) {
  if (!active) return null
  return (
    <div style={{ position: 'absolute', bottom: '3.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1.2rem', pointerEvents: 'none' }}>
      {[-1, 0, 1].map(i => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            animate={{ scaleX: [1, 1.3, 0.8, 1.1, 1], scaleY: [1, 0.8, 1.2, 0.9, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 0.8 + i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '8px', height: '16px',
              background: 'linear-gradient(to top, #ff4500, #ffd700, #fff7)',
              borderRadius: '50% 50% 20% 20%',
              boxShadow: '0 0 8px #ffd700, 0 0 16px #ff4500',
            }}
          />
          <div style={{ width: '20px', height: '10px', background: 'rgba(180,100,20,0.7)', borderRadius: '50%', marginTop: '-2px' }} />
        </div>
      ))}
    </div>
  )
}

function Agarbatti({ active }) {
  if (!active) return null
  return (
    <div style={{ position: 'absolute', bottom: '3.5rem', right: '18%', display: 'flex', gap: '1rem', pointerEvents: 'none' }}>
      {[0, 1].map(i => (
        <div key={i} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {[0, 1, 2].map(j => (
            <motion.div
              key={j}
              style={{
                position: 'absolute', bottom: '100%',
                width: '3px', height: '3px', borderRadius: '50%',
                background: 'rgba(220,220,220,0.7)',
              }}
              animate={{
                y: [0, -40 - j * 20, -80 - j * 20],
                x: [0, (i === 0 ? -1 : 1) * (j + 1) * 3, (i === 0 ? 1 : -1) * j * 4],
                opacity: [0, 0.7, 0],
                scale: [0.5, 1 + j * 0.3, 2 + j * 0.5],
              }}
              transition={{ duration: 2.5, delay: j * 0.7 + i * 0.35, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}
          <div style={{ width: '3px', height: '60px', background: 'linear-gradient(to bottom, rgba(180,120,40,0.9), rgba(80,50,20,0.6))', borderRadius: '2px' }} />
          <div style={{ width: '14px', height: '6px', background: 'rgba(180,120,40,0.5)', borderRadius: '50%' }} />
        </div>
      ))}
    </div>
  )
}

function MalaGarland({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute', top: '12%', left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '1.4rem', whiteSpace: 'nowrap',
            pointerEvents: 'none', letterSpacing: '-0.1em',
          }}
        >
          🌸🌼🌸🌼🌸🌼🌸🌼🌸🌼🌸
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AartiThali({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, rotate: [0, 360] }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ rotate: { duration: 3, repeat: Infinity, ease: 'linear' }, opacity: { duration: 0.4 }, scale: { duration: 0.4 } }}
          style={{
            position: 'absolute', bottom: '20%', left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '3rem', pointerEvents: 'none',
            filter: 'drop-shadow(0 0 20px rgba(255,150,0,0.8))',
          }}
        >
          🪔
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function PetalShower({ show }) {
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i, x: Math.random() * 90 + 5, delay: Math.random() * 1.2,
  }))
  return (
    <AnimatePresence>
      {show && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {petals.map(p => (
            <motion.div
              key={p.id}
              initial={{ y: -30, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{ y: '110vh', opacity: [1, 1, 0], rotate: 360 }}
              transition={{ duration: 2.2, delay: p.delay, ease: 'easeIn' }}
              style={{ position: 'absolute', top: 0, fontSize: '1.2rem' }}
            >
              🌸
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

export default function DigitalDarshanView() {
  const { language } = useTempleStore()
  const [active, setActive] = useState(new Set())
  const [bellRing, setBellRing] = useState(false)
  const [showPetals, setShowPetals] = useState(false)
  const [blessed, setBlessed] = useState(false)

  const toggle = useCallback((id) => {
    if (id === 'ghanti') {
      playBell()
      setBellRing(true)
      setTimeout(() => setBellRing(false), 1200)
      return
    }
    if (id === 'mala') {
      setShowPetals(true)
      setTimeout(() => setShowPetals(false), 3500)
    }
    setActive(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      if (next.size === 5) setTimeout(() => setBlessed(true), 500)
      return next
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'linear-gradient(180deg, #1a0510 0%, #2a0a18 30%, #0d0520 100%)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* CSS for flame */}
      <style>{`
        @keyframes flamePulse {
          0%,100% { transform: scaleX(1) scaleY(1); }
          25% { transform: scaleX(1.2) scaleY(0.85); }
          75% { transform: scaleX(0.85) scaleY(1.15); }
        }
      `}</style>

      {/* Top garland */}
      <div style={{
        textAlign: 'center', fontSize: '1.1rem', padding: '0.5rem 0',
        letterSpacing: '-0.05em', opacity: 0.75,
        background: 'linear-gradient(to bottom, rgba(80,20,10,0.6), transparent)',
      }}>
        {'🌼🌸'.repeat(20)}
      </div>

      {/* Title */}
      <div style={{ textAlign: 'center', padding: '0.4rem 0 0', zIndex: 2 }}>
        <div style={{
          fontFamily: 'Cinzel, serif', fontSize: 'clamp(0.6rem, 2vw, 0.8rem)',
          color: 'rgba(255,193,7,0.55)', letterSpacing: '0.3em',
        }}>
          ✦ DIGITAL DARSHAN ✦
        </div>
      </div>

      {/* Murti row */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'flex-end',
        justifyContent: 'center', gap: 'clamp(0.5rem, 2vw, 2rem)',
        padding: '0 clamp(0.5rem, 3vw, 3rem) 0',
        position: 'relative',
      }}>
        {/* Puja overlays — absolute to murti area */}
        <Diyas active={active.has('diya')} />
        <Agarbatti active={active.has('agarbatti')} />
        <MalaGarland active={active.has('mala')} />
        <AartiThali active={active.has('aarti')} />
        <PetalShower show={showPetals} />

        {/* Bell swing wrapper on the whole row */}
        <motion.div
          animate={bellRing ? { rotate: [-12, 12, -9, 9, -5, 5, 0] } : { rotate: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          style={{ display: 'flex', alignItems: 'flex-end', width: '100%', height: '100%',
            justifyContent: 'center', gap: 'clamp(0.5rem, 2vw, 2rem)', }}
        >
          {MURTIS.map(m => (
            <MurtiColumn key={m.id} murti={m} isMain={m.id === 'main'} language={language} />
          ))}
        </motion.div>
      </div>

      {/* Aarti note */}
      <AnimatePresence>
        {active.has('aarti') && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              textAlign: 'center', padding: '0.3rem',
              fontFamily: 'Cinzel, serif', fontSize: '0.6rem',
              color: 'rgba(255,107,53,0.7)', letterSpacing: '0.1em',
            }}
          >
            TAP 🎶 BOTTOM-RIGHT TO PLAY AARTI
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full blessing */}
      <AnimatePresence>
        {blessed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setBlessed(false)}
            style={{
              position: 'absolute', inset: 0, zIndex: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(10,5,21,0.85)', backdropFilter: 'blur(4px)',
              cursor: 'pointer',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🙏</div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', color: '#ffc107', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                JAI HANUMAN
              </div>
              <div style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: '1.3rem', color: '#fff8e7', marginBottom: '0.75rem' }}>
                जय हनुमान — पूजा स्वीकार हुई
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(201,169,110,0.6)', fontStyle: 'italic' }}>
                May Bajrangbali fulfil all your wishes
              </div>
              <div style={{ marginTop: '1.5rem', fontFamily: 'Cinzel, serif', fontSize: '0.6rem', color: 'rgba(201,169,110,0.4)', letterSpacing: '0.15em' }}>
                TAP TO CONTINUE
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action bar */}
      <div style={{
        display: 'flex', justifyContent: 'center',
        gap: 'clamp(0.5rem, 2vw, 1.5rem)',
        padding: 'clamp(0.75rem, 2vh, 1.25rem) 1rem',
        background: 'linear-gradient(to top, rgba(10,5,21,0.95), rgba(10,5,21,0.6))',
        flexWrap: 'wrap',
      }}>
        {ACTIONS.map(action => {
          const isOn = active.has(action.id)
          return (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => toggle(action.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
                background: isOn ? `rgba(${action.id === 'diya' ? '255,140,0' : action.id === 'agarbatti' ? '126,200,160' : action.id === 'ghanti' ? '255,193,7' : action.id === 'mala' ? '255,105,180' : '255,107,53'},0.18)` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isOn ? action.color : 'rgba(255,193,7,0.15)'}`,
                borderRadius: '14px',
                padding: '0.7rem clamp(0.6rem, 2vw, 1rem)',
                cursor: 'pointer',
                minWidth: 'clamp(56px, 10vw, 75px)',
                boxShadow: isOn ? `0 0 16px ${action.color}55` : 'none',
                transition: 'all 0.25s ease',
              }}
            >
              <span style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)' }}>{action.emoji}</span>
              <span style={{
                fontFamily: 'Noto Sans Devanagari, serif',
                fontSize: 'clamp(0.55rem, 1.5vw, 0.72rem)',
                color: isOn ? action.color : 'rgba(201,169,110,0.6)',
                whiteSpace: 'nowrap',
              }}>
                {language === 'hi' ? action.label_hi : action.label_en}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
