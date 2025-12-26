"use client"

import { useState, useEffect } from "react"
import { useProducts } from "@/contexts/ProductsContext"
import { useTheme } from "@/contexts/ThemeContext"
import HeroSection from "./home/HeroSection"
import TrustBadges from "./home/TrustBadges"
import FeaturedProducts from "./home/FeaturedProducts"
import MissionVision from "./home/MissionVision"
import ProgramsSection from "./home/ProgramsSection"
import NewsletterSection from "./home/NewsletterSection"
import BreakingJargon from "./home/BreakingJargon"
import VideoModal from "@/app/home/VideoModal"
import PreferLearn from "./home/PreferLearn"

const Index = () => {
  const { theme } = useTheme()
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Get CSS custom properties with fallbacks
  const getCSSVar = (varName: string, fallback?: string) => {
    if (typeof window === 'undefined') return fallback || ''
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim() || fallback || ''
  }

  const handleWatchVideo = () => {
    setShowVideoModal(true)
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <HeroSection 
        getCSSVar={getCSSVar} 
        handleWatchVideo={handleWatchVideo} 
      />
      
      <TrustBadges getCSSVar={getCSSVar} />
      
      <FeaturedProducts 
        getCSSVar={getCSSVar} 
        isMobile={isMobile} 
      />
      
      <MissionVision getCSSVar={getCSSVar} />
      
      <ProgramsSection getCSSVar={getCSSVar} />
      
      <NewsletterSection getCSSVar={getCSSVar} />
      
      <BreakingJargon />

      <PreferLearn  />
      
      <VideoModal 
        show={showVideoModal} 
        onClose={() => setShowVideoModal(false)} 
        getCSSVar={getCSSVar}
      />
    </div>
  )
}

export default Index