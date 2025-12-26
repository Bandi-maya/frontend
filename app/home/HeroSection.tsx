"use client"

import { ArrowRight, Sparkles, Shield, Clock, Users, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import BackgroundDecorations from "./BackgroundDecorations"
import { useI18n } from "@/contexts/I18nContext";

interface HeroSectionProps {
  getCSSVar: (varName: string, fallback?: string) => string
  handleWatchVideo: () => void
}

const HeroSection = ({ getCSSVar, handleWatchVideo }: HeroSectionProps) => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const cssVars = {
    primary: () => getCSSVar('--primary', '#3b82f6'),
    accent: () => getCSSVar('--accent', '#8b5cf6'),
    warning: () => getCSSVar('--warning', '#f59e0b'),
    primaryForeground: () => getCSSVar('--primary-foreground', '#ffffff'),
    background: () => getCSSVar('--background', '#ffffff'),
    border: () => getCSSVar('--border', '#e2e8f0'),
    fontDisplay: () => getCSSVar('--font-display', 'system-ui, sans-serif'),
  }
  const { t } = useI18n();

  return (
    <section className="relative min-h-[90vh] sm:min-h-[85vh] flex items-center overflow-hidden p-2.5 sm:p-5 md:p-10 rounded-t-3xl mx-0 sm:mx-2 md:mx-4 mt-0 sm:mt-2 md:mt-4">
      {/* Grey Shade Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${'/assets/hero-bg.jpg'})`,
            transform: isMobile ? 'scale(1.1)' : 'scale(1.05)',
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* Dynamic gradient overlay using theme colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-black/80 opacity-95" />

        {/* Accent color overlay for branding - mixed with theme vars */}
        <div 
            className="absolute inset-0 opacity-40" 
            style={{
                background: `linear-gradient(to bottom right, ${cssVars.primary()}66, ${cssVars.accent()}4D, ${cssVars.warning()}33)`
            }}
        />

        {/* Animated gradient overlay */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(
          45deg,
          transparent 30%,
          ${cssVars.warning()} 50%,
          transparent 70%
        )`,
            backgroundSize: '400% 400%',
          }}
        />
      </div>

      <BackgroundDecorations type="hero" />

      {/* Enhanced Wave SVG at bottom */}
      <motion.figure
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 left-0 w-full z-10 pointer-events-none"
      >
        <svg
          width="100%"
          height="80"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="sm:h-[120px] md:h-[150px]"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            d="M0,80 L0,20 Q720,80 1440,20 L1440,80 Z"
            fill={cssVars.background()}
            stroke={cssVars.border()}
            strokeWidth="3"
            strokeOpacity="0.25"
          />
        </svg>
      </motion.figure>

      <div className="container relative z-30 px-4 sm:px-6 lg:px-8 w-full">
        <div className="py-6 sm:py-8 md:py-12 flex flex-col items-center sm:items-start text-center sm:text-start">
          <div className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 text-white my-3 sm:mt-0">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="py-4 sm:py-6 md:py-8"
            >
              {/* Animated Badge */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block bg-white/10 backdrop-blur-lg border border-white/20 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full mb-6 sm:mb-8 max-w-full"
              >
                <motion.p
                  className="mb-0 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg font-medium"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="badge rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm font-bold flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-0"
                    style={{
                      backgroundColor: `${cssVars.accent()}CC`,
                      color: cssVars.primaryForeground(),
                    }}
                  >
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                    {t('hero.badge.featured')}
                  </motion.span>
                  {t('hero.badge.subtext') }
                </motion.p>
              </motion.div>

              {/* Animated Title */}
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-xl"
                style={{
                  fontFamily: cssVars.fontDisplay(),
                }}
              >
                {t('hero.title.part1')}{' '}
                <motion.span
                  style={{ color: cssVars.warning() }}
                  className="relative inline-block"
                >
                  {t('hero.title.part2')}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute -bottom-2 left-0 w-full h-2 rounded-full"
                    style={{ backgroundColor: cssVars.warning() }}
                  />
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto sm:mx-0 drop-shadow-md font-light"
              >
                Premium STEM kits, 3D printer rentals, and hands-on programs designed to spark curiosity and build real-world skills.
              </motion.p>

              {/* Animated Buttons */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-8 sm:mt-10"
              >
                <Link href="/shop" className="w-full sm:w-auto">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="gap-3 px-8 py-7 rounded-full shadow-2xl transition-all duration-300 w-full sm:w-auto justify-center group relative overflow-hidden border-none"
                      style={{
                        backgroundColor: cssVars.accent(),
                        color: cssVars.primaryForeground()
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `linear-gradient(135deg, transparent, ${cssVars.primaryForeground()}, transparent)`,
                          transform: 'translateX(-100%) skewX(-15deg)',
                        }}
                        animate={{ x: ['0%', '200%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <span className="relative z-10 text-lg font-bold">{t('hero.shopNow')}</span>
                      <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <button
                    onClick={handleWatchVideo}
                    className="group flex items-center justify-center gap-3 px-6 py-3 rounded-full shadow-xl transition-all duration-300 w-full sm:w-auto backdrop-blur-md border border-white/20"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                    }}
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: `${cssVars.accent()}33` }}
                      />
                      <div
                        className="relative w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${cssVars.accent()}99` }}
                      >
                        <Play className="w-5 h-5 ml-1" fill="currentColor" />
                      </div>
                    </div>
                    <span className="text-lg font-medium">{t('hero.watchStory')}</span>
                  </button>
                </motion.div>
              </motion.div>

              {/* Animated Trust Indicators */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-12 pt-8 border-t"
                style={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 md:gap-8">
                  {[
                    { icon: Shield, key: 'hero.trust.quality' },
                    { icon: Clock, key: 'hero.trust.dispatch' },
                    { icon: Users, key: 'hero.trust.learners' },
                    { icon: Sparkles, key: 'hero.trust.certified' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5"
                    >
                      <item.icon className="w-5 h-5" style={{ color: cssVars.warning() }} />
                      <span className="text-sm md:text-base font-medium text-white/90">{t(item.key)}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection