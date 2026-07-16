import React, { useState, useCallback, useRef, useEffect } from 'react'
import { AboutHero } from './AboutHero'
import { StoryTimeline } from './StoryTimeline'
import { CredentialGrid } from './CredentialGrid'
import { AchievementPodium } from './AchievementPodium'
import { MissionCompass } from './MissionCompass'
import { InterestsSection } from './InterestsSection'
import { ShortTermGoalsSection } from './ShortTermGoalsSection'
import { ClosingQuote } from './ClosingQuote'
import { JourneyContinuumSpine, JourneyPageBackdrop } from './journey/JourneyPrimitives'

export const CinematicAbout: React.FC = () => {
  const journeyRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0.05)

  const updateScrollProgress = useCallback(() => {
    const el = journeyRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const scrollable = Math.max(el.offsetHeight - window.innerHeight * 0.35, 1)
    const traveled = Math.min(Math.max(-rect.top, 0), scrollable)
    setScrollProgress(Math.max(0.05, traveled / scrollable))
  }, [])

  useEffect(() => {
    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('resize', updateScrollProgress)
    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [updateScrollProgress])

  return (
    <div className="min-h-screen overflow-x-hidden bg-neutral-50 font-sans transition-colors duration-300 dark:bg-[#030014]">
      <div ref={journeyRef} className="relative isolate overflow-x-clip">
        <JourneyPageBackdrop />
        <JourneyContinuumSpine progress={scrollProgress} />

        <div className="relative z-10">
          <AboutHero />
          <StoryTimeline />
          <CredentialGrid />
          <AchievementPodium />
          <MissionCompass />
          <InterestsSection />
          <ShortTermGoalsSection />
          <ClosingQuote />
        </div>
      </div>
    </div>
  )
}
