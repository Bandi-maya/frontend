"use client"

import { Quote, Target, Award, Sparkles, Rocket, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import BackgroundDecorations from "./BackgroundDecorations"
import { useI18n } from "@/contexts/I18nContext"

interface MissionVisionProps {
  getCSSVar: (varName: string, fallback?: string) => string
}

const MissionVision = ({ getCSSVar }: MissionVisionProps) => {
  const cssVars = {
    primary: () => getCSSVar('--primary', '#3b82f6'),
    accent: () => getCSSVar('--accent', '#8b5cf6'),
    warning: () => getCSSVar('--warning', '#f59e0b'),
    foreground: () => getCSSVar('--foreground', '#020817'),
    fontDisplay: () => getCSSVar('--font-display', 'system-ui, sans-serif'),
    mutedForeground: () => getCSSVar('--muted-foreground', '#64748b'),
    border: () => getCSSVar('--border', '#e2e8f0'),
    card: () => getCSSVar('--card', '#ffffff'),
    secondary: () => getCSSVar('--secondary', '#f8fafc'),
    gradientFrom: () => getCSSVar('--gradient-from', '#3b82f6'),
    gradientTo: () => getCSSVar('--gradient-to', '#8b5cf6'),
  }
  const { t } = useI18n()

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-slate-100/50 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />

      {/* Animated floating elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center items-center gap-3 mb-3 sm:mb-4"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '40px' }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="h-[2px] bg-[var(--accent)]"
            />
            <span className="text-sm sm:text-base font-semibold uppercase tracking-wider text-[var(--accent)]">
              our purpose
            </span>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '40px' }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="h-[2px] bg-[var(--accent)]"
            />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Mission & Vision
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Driving innovation through education, empowering the next generation of thinkers, creators, and problem solvers.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Vision Card */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Our Vision</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  </div>
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  To establish a global ecosystem where STEM education is accessible to all,
                  creating a world where every young mind has the tools and inspiration to
                  become tomorrow's innovators and leaders in technology.
                </p>
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <Rocket className="w-4 h-4" />
                    <span>Accelerating innovation since 2020</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Our Mission</h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                  </div>
                </div>
                <ul className="space-y-5">
                  {[
                    {
                      title: "Accessible Education",
                      description: "Democratize STEM learning through affordable, high-quality resources and platforms."
                    },
                    {
                      title: "Hands-on Learning",
                      description: "Bridge theory and practice with interactive kits, workshops, and real-world projects."
                    },
                    {
                      title: "Community Building",
                      description: "Foster collaborative environments where learners, educators, and innovators connect."
                    },
                    {
                      title: "Future Readiness",
                      description: "Equip students with 21st-century skills for careers in emerging technologies."
                    }
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 group/item"
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1 group-hover/item:text-purple-600 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Quote & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Founder's Quote */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-200/50 shadow-xl overflow-hidden">
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-bl-full" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">{t('home.missionVision.title')}</h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mt-2" />
                    </div>
                  </div>

                  <blockquote className="mb-10">
                    <p className="text-2xl leading-relaxed text-slate-800 italic mb-6 relative">
                      <span className="absolute -left-4 -top-2 text-4xl text-amber-500/30">"</span>
                      {t('home.missionVision.quote')}
                      <span className="absolute -right-4 -bottom-2 text-4xl text-amber-500/30">"</span>
                    </p>
                    <footer>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-0.5">
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              SC
                            </span>
                          </div>
                        </div>
                        <div>
                          <cite className="not-italic font-bold text-lg text-slate-900 block">
                            {t('home.missionVision.founderName')}
                          </cite>
                          <span className="text-slate-600">{t('home.missionVision.founderTitle')}</span>
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { value: "10K+", label: t('home.missionVision.stats.students'), icon: Lightbulb, color: "from-blue-500 to-cyan-500" },
                { value: "200+", label: t('home.missionVision.stats.partners'), icon: Award, color: "from-purple-500 to-pink-500" },
                { value: "4.9★", label: "Satisfaction Rating", icon: Sparkles, color: "from-amber-500 to-orange-500" },
                { value: "50+", label: "Countries Reached", icon: Target, color: "from-emerald-500 to-teal-500" },
                { value: "500+", label: "Learning Resources", icon: Rocket, color: "from-violet-500 to-purple-500" },
                { value: "24/7", label: "Support Available", icon: Quote, color: "from-rose-500 to-pink-500" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 pt-8 border-t border-slate-200/50"
        >
          <div className="text-center">
            <p className="text-lg text-slate-600 mb-6">
              Ready to join our mission of transforming STEM education?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
                Explore Programs
              </button>
              <button className="px-8 py-3 bg-white text-slate-700 font-semibold rounded-xl border border-slate-300 hover:border-slate-400 hover:shadow-md transition-all duration-300">
                Partner With Us
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MissionVision