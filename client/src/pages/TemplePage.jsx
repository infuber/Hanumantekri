import { AnimatePresence } from 'framer-motion'
import useTempleStore from '../store/templeStore'

import LoadingScreen from '../components/ui/LoadingScreen'
import Navbar from '../components/ui/Navbar'
import LanguageToggle from '../components/ui/LanguageToggle'
import TempleScene from '../components/temple/TempleScene'
import AreaMap from '../components/ui/AreaMap'
import MainHallView from '../components/ui/MainHallView'
import StoryView from '../components/ui/StoryView'
import ChalisaView from '../components/ui/ChalisaView'
import PujaView from '../components/ui/PujaView'

function AreaContent() {
  const { currentArea } = useTempleStore()

  switch (currentArea) {
    case 'main-hall':
      return <MainHallView />
    case 'katha-mandap':
      return <StoryView />
    case 'chalisa-gallery':
      return <ChalisaView />
    case 'puja-room':
      return <PujaView />
    default:
      return null
  }
}

export default function TemplePage() {
  const { view, isLoading } = useTempleStore()

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#0a0515' }}>
      {/* The 3D scene is always rendered in the background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          opacity: view === 'loading' ? 0 : 1,
          transition: 'opacity 1.5s ease',
        }}
      >
        <TempleScene />
      </div>

      {/* Loading screen */}
      <LoadingScreen />

      {/* UI overlays — shown after loading */}
      {!isLoading && (
        <>
          <Navbar />
          <LanguageToggle />

          <AnimatePresence mode="wait">
            {/* Interior map — shown when view is 'interior' */}
            {view === 'interior' && <AreaMap key="area-map" />}

            {/* Area content views */}
            {view === 'area' && <AreaContent key="area-content" />}
          </AnimatePresence>

          {/* Entrance hint — shown when view is 'entrance' */}
          {view === 'entrance' && (
            <div
              style={{
                position: 'fixed',
                bottom: '2rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 100,
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              <p
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                  color: 'rgba(201,169,110,0.6)',
                  letterSpacing: '0.15em',
                  animation: 'pulse 3s ease-in-out infinite',
                }}
              >
                RING THE BELL TO ENTER · घंटी बजाएं
              </p>
            </div>
          )}
        </>
      )}

      {/* Global pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
