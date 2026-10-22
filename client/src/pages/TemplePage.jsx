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
import HanumanNamesView from '../components/ui/HanumanNamesView'
import BajrangBaanView from '../components/ui/BajrangBaanView'
import SundarKandView from '../components/ui/SundarKandView'
import BhajanView from '../components/ui/BhajanView'
import AartiView from '../components/ui/AartiView'
import VratKathaView from '../components/ui/VratKathaView'
import TirthYatraView from '../components/ui/TirthYatraView'
import SevaSahyogView from '../components/ui/SevaSahyogView'
import DigitalDarshanView from '../components/ui/DigitalDarshanView'
import NaamJapaView from '../components/ui/NaamJapaView'
import LankaRunView from '../components/ui/LankaRunView'
import AudioPlayer from '../components/ui/AudioPlayer'
import ChadhavaPrompt from '../components/ui/ChadhavaPrompt'
import SevaSahyogNudge from '../components/ui/SevaSahyogNudge'

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
    case 'hanuman-names':
      return <HanumanNamesView />
    case 'bajrang-baan':
      return <BajrangBaanView />
    case 'sundar-kand':
      return <SundarKandView />
    case 'bhajan-sangrah':
      return <BhajanView />
    case 'aarti-sangrah':
      return <AartiView />
    case 'vrat-katha':
      return <VratKathaView />
    case 'tirth-yatra':
      return <TirthYatraView />
    case 'seva-sahyog':
      return <SevaSahyogView />
    case 'digital-darshan':
      return <DigitalDarshanView />
    case 'naam-japa':
      return <NaamJapaView />
    case 'lanka-run':
      return <LankaRunView />
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

          {/* Global devotional audio player — always visible after loading */}
          <AudioPlayer />

          {/* Chadhava prompt — appears 5s after bell is rung, bottom-left */}
          <ChadhavaPrompt />

          {/* Seva Sahyog nudge — time-based, bottom-right, max 3× per session */}
          <SevaSahyogNudge />

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
