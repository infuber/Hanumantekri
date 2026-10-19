import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TRACKS = [
  {
    id: 'chalisa-gulshan',
    title_en: 'Hanuman Chalisa',
    title_hi: 'हनुमान चालीसा',
    artist: 'Gulshan Kumar & Hariharan',
    videoId: 'YrPSzMYHu_o',
    emoji: '🕉️',
  },
  {
    id: 'chalisa-shankar',
    title_en: 'Hanuman Chalisa',
    title_hi: 'हनुमान चालीसा',
    artist: 'Shankar Mahadevan',
    videoId: '2G-pgs_EN2k',
    emoji: '🕉️',
  },
  {
    id: 'aarti',
    title_en: 'Aarti Kije Hanuman Lala Ki',
    title_hi: 'आरती कीजे हनुमान लला की',
    artist: 'Traditional',
    videoId: 'LX-0VGgYiG0',
    emoji: '🪔',
  },
  {
    id: 'bajrang',
    title_en: 'Jai Hanuman Gyan Gun Sagar',
    title_hi: 'जय हनुमान ज्ञान गुण सागर',
    artist: 'Devotional',
    videoId: 'laDEeVOmFdc',
    emoji: '🔔',
  },
  {
    id: 'bajrang-baan',
    title_en: 'Bajrang Baan',
    title_hi: 'बजरंग बाण',
    artist: 'Pandit Jasraj',
    videoId: 'SDGPKLBrOGw',
    emoji: '🏹',
  },
]

export default function AudioPlayer() {
  const [open, setOpen] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [playing, setPlaying] = useState(false)

  function playTrack(track) {
    setCurrentTrack(track)
    setPlaying(true)
    setOpen(false)
  }

  function stopPlay() {
    setCurrentTrack(null)
    setPlaying(false)
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.75rem',
      }}
    >
      {/* Hidden YouTube iframe — actual audio playback */}
      <AnimatePresence>
        {playing && currentTrack && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              background: 'rgba(10,5,21,0.96)',
              border: '1px solid rgba(255,193,7,0.35)',
              borderRadius: '16px',
              overflow: 'hidden',
              width: '280px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.7), 0 0 30px rgba(255,107,53,0.15)',
            }}
          >
            {/* Now playing header */}
            <div
              style={{
                padding: '0.75rem 1rem',
                borderBottom: '1px solid rgba(255,193,7,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '0.65rem',
                    color: '#ffc107',
                    letterSpacing: '0.12em',
                    marginBottom: '0.15rem',
                  }}
                >
                  ▶ NOW PLAYING
                </div>
                <div
                  style={{
                    fontFamily: 'Noto Sans Devanagari, serif',
                    fontSize: '0.85rem',
                    color: '#fff8e7',
                  }}
                >
                  {currentTrack.title_hi}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.65rem',
                    color: 'rgba(201,169,110,0.7)',
                  }}
                >
                  {currentTrack.artist}
                </div>
              </div>
              <button
                onClick={stopPlay}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(201,169,110,0.6)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  padding: '0.25rem',
                }}
              >
                ✕
              </button>
            </div>

            {/* YouTube embed */}
            <iframe
              key={currentTrack.videoId}
              src={`https://www.youtube-nocookie.com/embed/${currentTrack.videoId}?autoplay=1&rel=0&modestbranding=1`}
              width="280"
              height="157"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ border: 'none', display: 'block' }}
              title={currentTrack.title_en}
            />

            {/* Footer: browse + open on YouTube */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 1rem',
              borderTop: '1px solid rgba(255,193,7,0.1)',
            }}>
              <button
                onClick={() => { stopPlay(); setOpen(true) }}
                style={{
                  background: 'none', border: 'none',
                  color: 'rgba(201,169,110,0.6)',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.58rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  padding: '0.2rem 0',
                }}
              >
                ← ALL TRACKS
              </button>
              <a
                href={`https://www.youtube.com/watch?v=${currentTrack.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(255,100,100,0.7)',
                  fontFamily: 'Cinzel, serif',
                  fontSize: '0.58rem',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                }}
              >
                YT ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Track list panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            style={{
              background: 'rgba(10,5,21,0.96)',
              border: '1px solid rgba(255,193,7,0.25)',
              borderRadius: '16px',
              padding: '1rem',
              width: '260px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
            }}
          >
            <div
              style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '0.65rem',
                color: '#ffc107',
                letterSpacing: '0.15em',
                marginBottom: '0.75rem',
                textAlign: 'center',
              }}
            >
              ✦ DEVOTIONAL MUSIC ✦
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {TRACKS.map((track) => {
                const isActive = currentTrack?.id === track.id && playing
                return (
                  <motion.button
                    key={track.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => isActive ? stopPlay() : playTrack(track)}
                    style={{
                      background: isActive
                        ? 'rgba(255,107,53,0.2)'
                        : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isActive ? 'rgba(255,107,53,0.5)' : 'rgba(255,193,7,0.12)'}`,
                      borderRadius: '10px',
                      padding: '0.6rem 0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>{track.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: 'Noto Sans Devanagari, serif',
                          fontSize: '0.78rem',
                          color: isActive ? '#ffc107' : '#fff8e7',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {track.title_hi}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.6rem',
                          color: 'rgba(201,169,110,0.6)',
                        }}
                      >
                        {track.artist}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: isActive ? '#ff6b35' : 'rgba(201,169,110,0.4)' }}>
                      {isActive ? '⏸' : '▶'}
                    </span>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen((o) => !o)}
        animate={playing ? { boxShadow: ['0 0 0px rgba(255,107,53,0)', '0 0 20px rgba(255,107,53,0.6)', '0 0 0px rgba(255,107,53,0)'] } : {}}
        transition={playing ? { duration: 2.5, repeat: Infinity } : {}}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: open
            ? 'linear-gradient(135deg, #ff6b35, #c0392b)'
            : 'linear-gradient(135deg, rgba(255,107,53,0.3), rgba(192,57,43,0.3))',
          border: `1px solid ${open ? 'rgba(255,107,53,0.8)' : 'rgba(255,193,7,0.4)'}`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}
        title="Devotional Music"
      >
        {playing ? '🎵' : '🎶'}
      </motion.button>
    </div>
  )
}
