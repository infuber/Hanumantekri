import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useTempleStore = create(
  persist(
    (set) => ({
      // View state
      view: 'loading', // 'loading' | 'entrance' | 'interior' | 'area'
      currentArea: null, // null | 'main-hall' | 'katha-mandap' | 'chalisa-gallery' | 'puja-room'

      // Bell state (persisted)
      hasRungBell: false,

      // Language
      language: 'en', // 'en' | 'hi'

      // Loading
      isLoading: true,

      // Actions
      setView: (view) => set({ view }),
      setArea: (area) => set({ currentArea: area, view: 'area' }),
      ringBell: () => set({ hasRungBell: true, view: 'interior' }),
      setLanguage: (language) => set({ language }),
      setLoading: (isLoading) => set({ isLoading }),
      goToEntrance: () => set({ view: 'entrance' }),
      goToInterior: () => set({ view: 'interior', currentArea: null }),
      goBack: () =>
        set((state) => {
          if (state.view === 'area') return { view: 'interior', currentArea: null }
          if (state.view === 'interior') return { view: 'entrance' }
          return {}
        }),
    }),
    {
      name: 'hanumat-tekari-store',
      partialize: (state) => ({ hasRungBell: state.hasRungBell, language: state.language }),
    }
  )
)

export default useTempleStore
