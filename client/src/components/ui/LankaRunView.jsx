import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTempleStore from '../../store/templeStore'

const GAME_DURATION = 45000
const GROUND_BOTTOM = 80        // px from bottom of game area
const HANUMAN_X = 15            // % from left
const HANUMAN_W = 60
const HANUMAN_H = 80
const MONSTER_W = 48
const MONSTER_H = 52
const JUMP_HEIGHT = 150
const JUMP_HALF_MS = 350
const STARTING_SPEED = 4.5
const SPEED_INCREMENT = 0.8
const SPAWN_BASE_MS = 2200

export default function LankaRunView() {
  const { language, setArea } = useTempleStore()
  const [phase, setPhase] = useState('start') // start | playing | victory
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [monsters, setMonsters] = useState([])
  const [jumping, setJumping] = useState(false)
  const [hanumanY, setHanumanY] = useState(0)     // offset up from ground
  const [invincible, setInvincible] = useState(false)
  const [flashMonster, setFlashMonster] = useState(null) // id of defeated monster

  const gameRef = useRef(null)
  const stateRef = useRef({})
  const rafRef = useRef(null)
  const spawnRef = useRef(null)
  const victoryRef = useRef(null)
  const jumpingRef = useRef(false)
  const hanumanYRef = useRef(0)
  const invincibleRef = useRef(false)
  const monstersRef = useRef([])
  const scoreRef = useRef(0)
  const livesRef = useRef(3)
  const speedRef = useRef(STARTING_SPEED)
  const nextIdRef = useRef(1)
  const gameWRef = useRef(0)
  const gameHRef = useRef(0)

  // sync refs
  useEffect(() => { jumpingRef.current = jumping }, [jumping])
  useEffect(() => { hanumanYRef.current = hanumanY }, [hanumanY])
  useEffect(() => { invincibleRef.current = invincible }, [invincible])

  const jump = useCallback(() => {
    if (jumpingRef.current || phase !== 'playing') return
    setJumping(true)
    jumpingRef.current = true
    // go up
    let start = null
    function animUp(ts) {
      if (!start) start = ts
      const t = Math.min((ts - start) / JUMP_HALF_MS, 1)
      const y = JUMP_HEIGHT * Math.sin(t * Math.PI / 2)
      hanumanYRef.current = y
      setHanumanY(y)
      if (t < 1) requestAnimationFrame(animUp)
      else {
        let start2 = null
        function animDown(ts2) {
          if (!start2) start2 = ts2
          const t2 = Math.min((ts2 - start2) / JUMP_HALF_MS, 1)
          const y2 = JUMP_HEIGHT * (1 - Math.sin(t2 * Math.PI / 2 + Math.PI / 2) + 1) / 2
          // lerp down from JUMP_HEIGHT to 0
          const yDown = JUMP_HEIGHT * (1 - t2)
          hanumanYRef.current = yDown
          setHanumanY(yDown)
          if (t2 < 1) requestAnimationFrame(animDown)
          else {
            hanumanYRef.current = 0
            setHanumanY(0)
            setJumping(false)
            jumpingRef.current = false
          }
        }
        requestAnimationFrame(animDown)
      }
    }
    requestAnimationFrame(animUp)
  }, [phase])

  // keyboard
  useEffect(() => {
    if (phase === 'start') {
      function onKey(e) {
        if (e.code === 'Space') { e.preventDefault(); startGame() }
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
    if (phase === 'playing') {
      function onKey(e) {
        if (e.code === 'Space') { e.preventDefault(); jump() }
      }
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
  }, [phase, jump])

  function startGame() {
    scoreRef.current = 0
    livesRef.current = 3
    speedRef.current = STARTING_SPEED
    monstersRef.current = []
    nextIdRef.current = 1
    jumpingRef.current = false
    hanumanYRef.current = 0
    invincibleRef.current = false
    setScore(0)
    setLives(3)
    setMonsters([])
    setJumping(false)
    setHanumanY(0)
    setInvincible(false)
    setPhase('playing')
  }

  // game loop
  useEffect(() => {
    if (phase !== 'playing') return

    const rect = gameRef.current?.getBoundingClientRect()
    gameWRef.current = rect?.width || 800
    gameHRef.current = rect?.height || 500

    let lastTs = null
    let elapsed = 0
    let speedTick = 0

    function loop(ts) {
      if (!lastTs) lastTs = ts
      const dt = ts - lastTs
      lastTs = ts
      elapsed += dt
      speedTick += dt

      // speed increase every 10s
      if (speedTick > 10000) {
        speedRef.current += SPEED_INCREMENT
        speedTick = 0
      }

      const gw = gameWRef.current
      const gh = gameHRef.current
      const groundY = gh - GROUND_BOTTOM  // px from top where ground is

      // hanuman bounding box (screen coords from top)
      const hanumanScreenX = gw * (HANUMAN_X / 100)
      const hanumanTop = groundY - hanumanYRef.current - HANUMAN_H
      const hanumanBottom = groundY - hanumanYRef.current
      const hanumanLeft = hanumanScreenX
      const hanumanRight = hanumanScreenX + HANUMAN_W

      // move monsters, check collisions
      const updated = []
      let scoreAdd = 0
      let hitLife = false
      let defeatedId = null

      for (const m of monstersRef.current) {
        const newX = m.x - speedRef.current
        if (newX < -MONSTER_W) {
          // monster escaped without collision — add score if not already scored
          if (!m.scored) scoreAdd += 10
          continue
        }

        const mLeft = newX
        const mRight = newX + MONSTER_W
        const mTop = groundY - MONSTER_H
        const mBottom = groundY

        const xOverlap = hanumanRight > mLeft + 8 && hanumanLeft < mRight - 8
        const yOverlap = hanumanBottom > mTop + 8 && hanumanTop < mBottom - 8

        if (xOverlap && yOverlap && !m.defeated) {
          if (jumpingRef.current && hanumanYRef.current > 30) {
            // landing on monster — +25pts, defeat it
            defeatedId = m.id
            scoreAdd += 25
            continue // remove from array
          } else if (!invincibleRef.current) {
            hitLife = true
            updated.push({ ...m, x: newX, scored: m.scored })
            continue
          }
        }

        // mark scored when monster passes hanuman x
        const scored = m.scored || newX + MONSTER_W < hanumanScreenX
        if (!m.scored && scored) scoreAdd += 10

        updated.push({ ...m, x: newX, scored })
      }

      if (scoreAdd > 0) {
        scoreRef.current += scoreAdd
        setScore(scoreRef.current)
      }

      if (defeatedId) {
        setFlashMonster(defeatedId)
        setTimeout(() => setFlashMonster(null), 400)
      }

      if (hitLife && !invincibleRef.current) {
        livesRef.current = Math.max(0, livesRef.current - 1)
        setLives(livesRef.current)
        invincibleRef.current = true
        setInvincible(true)
        setTimeout(() => {
          invincibleRef.current = false
          setInvincible(false)
        }, 1800)
      }

      monstersRef.current = updated
      setMonsters([...updated])

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    // spawn monsters
    function spawn() {
      const id = nextIdRef.current++
      const variant = Math.random() > 0.5 ? '👹' : '👿'
      const speedMod = 0.8 + Math.random() * 0.4
      monstersRef.current = [...monstersRef.current, {
        id, x: gameWRef.current, emoji: variant, scored: false, defeated: false, speedMod
      }]
      const next = SPAWN_BASE_MS * (1 / (speedRef.current / STARTING_SPEED)) * (0.8 + Math.random() * 0.4)
      spawnRef.current = setTimeout(spawn, Math.max(900, next))
    }
    spawnRef.current = setTimeout(spawn, 1000)

    // victory after 45s
    victoryRef.current = setTimeout(() => {
      setPhase('victory')
    }, GAME_DURATION)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(spawnRef.current)
      clearTimeout(victoryRef.current)
    }
  }, [phase])

  const groundBottom = GROUND_BOTTOM

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'linear-gradient(180deg, #0a0515 0%, #1a0a2a 60%, #0d0520 100%)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* Header bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.75rem 1.25rem',
        borderBottom: '1px solid rgba(255,193,7,0.12)',
        flexShrink: 0,
      }}>
        <button
          onClick={() => { cancelAnimationFrame(rafRef.current); clearTimeout(spawnRef.current); clearTimeout(victoryRef.current); setArea(null) }}
          style={{ background: 'none', border: '1px solid rgba(255,193,7,0.25)', borderRadius: '8px', color: 'rgba(201,169,110,0.7)', fontFamily: 'Cinzel, serif', fontSize: '0.65rem', letterSpacing: '0.1em', padding: '0.35rem 0.7rem', cursor: 'pointer' }}
        >
          ← BACK
        </button>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(0.6rem, 2vw, 0.8rem)', color: 'rgba(255,193,7,0.6)', letterSpacing: '0.25em' }}>
          ✦ JAI SHRI RAM ✦
        </div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '0.8rem', color: '#ffc107', letterSpacing: '0.05em' }}>
          {phase === 'playing' ? `${score} pts` : ''}
        </div>
      </div>

      {/* Game arena */}
      <div
        ref={gameRef}
        onTouchStart={(e) => { e.preventDefault(); phase === 'start' ? startGame() : jump() }}
        onClick={() => phase === 'start' ? startGame() : jump()}
        style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
      >
        {/* Stars bg */}
        {[...Array(18)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i * 17 + 7) % 97}%`,
            top: `${(i * 13 + 5) % 55}%`,
            width: '2px', height: '2px',
            borderRadius: '50%',
            background: `rgba(255,255,255,${0.1 + (i % 4) * 0.08})`,
          }} />
        ))}

        {/* Distant hills */}
        <div style={{
          position: 'absolute', bottom: groundBottom + 2, left: 0, right: 0, height: '60px',
          background: 'linear-gradient(to top, rgba(80,20,40,0.4), transparent)',
          borderRadius: '50% 50% 0 0 / 20px 20px 0 0',
        }} />

        {/* Ground */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: groundBottom,
          background: 'linear-gradient(to top, rgba(40,10,20,0.9), rgba(60,20,40,0.5))',
          borderTop: '2px solid rgba(255,193,7,0.3)',
        }} />

        {/* Lives */}
        {phase === 'playing' && (
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', fontSize: '1.2rem', letterSpacing: '2px' }}>
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} style={{ opacity: i < lives ? 1 : 0.2 }}>❤️</span>
            ))}
          </div>
        )}

        {/* Score live */}
        {phase === 'playing' && (
          <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', fontFamily: 'Cinzel, serif', fontSize: '1.1rem', color: '#ffc107', letterSpacing: '0.05em' }}>
            {score}
          </div>
        )}

        {/* Hanuman */}
        <motion.div
          animate={invincible ? { opacity: [1, 0.3, 1, 0.3, 1] } : { opacity: 1 }}
          transition={invincible ? { duration: 0.3, repeat: 6 } : {}}
          style={{
            position: 'absolute',
            left: `${HANUMAN_X}%`,
            bottom: groundBottom + hanumanY,
            width: HANUMAN_W,
            height: HANUMAN_H,
            transform: jumping ? 'scaleX(-1)' : 'scaleX(-1)',
          }}
        >
          <img
            src="/hanuman-main.png"
            alt="Hanuman Ji"
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom',
              filter: 'drop-shadow(0 0 8px rgba(255,193,7,0.5))' }}
          />
        </motion.div>

        {/* Monsters */}
        {monsters.map(m => (
          <motion.div
            key={m.id}
            animate={flashMonster === m.id ? { scale: [1, 1.5, 0], opacity: [1, 1, 0] } : {}}
            transition={{ duration: 0.35 }}
            style={{
              position: 'absolute',
              left: m.x,
              bottom: groundBottom,
              width: MONSTER_W, height: MONSTER_H,
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              fontSize: '2.8rem', lineHeight: 1,
              filter: 'drop-shadow(0 0 6px rgba(255,50,50,0.5))',
            }}
          >
            {m.emoji}
          </motion.div>
        ))}

        {/* START screen */}
        {phase === 'start' && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '1rem', textAlign: 'center', padding: '1.5rem',
          }}>
            <div style={{ fontSize: '3rem' }}>🏃</div>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', color: '#ffc107', letterSpacing: '0.15em' }}>
              LANKA RUN
            </div>
            <div style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', color: 'rgba(255,248,231,0.75)' }}>
              {language === 'hi' ? 'हनुमान जी को राक्षसों पर कूदने में मदद करें' : "Help Hanuman Ji defeat Ravan's army!"}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: 'rgba(201,169,110,0.5)', marginTop: '0.25rem' }}>
              {language === 'hi' ? 'कूदने के लिए टैप करें' : 'Tap or press Space to jump'}
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ fontFamily: 'Cinzel, serif', fontSize: '0.75rem', color: 'rgba(255,193,7,0.6)', letterSpacing: '0.2em', marginTop: '0.5rem' }}
            >
              TAP TO START
            </motion.div>
          </div>
        )}

        {/* VICTORY screen */}
        <AnimatePresence>
          {phase === 'victory' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                position: 'absolute', inset: 0, zIndex: 10,
                background: 'rgba(10,5,21,0.92)', backdropFilter: 'blur(8px)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '0.9rem', textAlign: 'center', padding: '2rem',
              }}
            >
              <div style={{ fontSize: '3rem' }}>🏆</div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.4rem, 5vw, 2rem)', color: '#ffc107', letterSpacing: '0.15em' }}>
                JAI SHRI RAM!
              </div>
              <div style={{ fontFamily: 'Noto Sans Devanagari, serif', fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#fff8e7' }}>
                रावण की सेना पराजित हुई!
              </div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: '1.5rem', color: '#ffc107', marginTop: '0.25rem' }}>
                {score} <span style={{ fontSize: '0.7rem', color: 'rgba(255,193,7,0.6)' }}>POINTS</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', width: '100%', maxWidth: '280px', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setArea('seva-sahyog')}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,193,7,0.2), rgba(255,107,53,0.15))',
                    border: '1px solid rgba(255,193,7,0.5)', borderRadius: '12px',
                    padding: '0.9rem', color: '#ffc107', fontFamily: 'Cinzel, serif',
                    fontSize: '0.82rem', letterSpacing: '0.1em', cursor: 'pointer',
                  }}
                >
                  🙏 {language === 'hi' ? 'जीत की सेवा अर्पण करें' : 'Offer Seva to Celebrate'}
                </button>
                <button
                  onClick={startGame}
                  style={{
                    background: 'transparent', border: '1px solid rgba(255,193,7,0.2)',
                    borderRadius: '12px', padding: '0.75rem',
                    color: 'rgba(201,169,110,0.6)', fontFamily: 'Cinzel, serif',
                    fontSize: '0.75rem', letterSpacing: '0.08em', cursor: 'pointer',
                  }}
                >
                  ↺ {language === 'hi' ? 'फिर खेलें' : 'Play Again'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
