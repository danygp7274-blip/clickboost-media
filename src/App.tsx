import React, { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Sparkles, Megaphone, ArrowUpRight, Zap, Cpu, Check, Download, AlertTriangle, ArrowRight, Layers, Target, Coins, Gauge, Globe, Instagram, Linkedin, Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import ContactFormModal from "./components/ContactFormModal";
import SupportChat from "./components/SupportChat";
import FaqSection from "./components/FaqSection";
import TestimonialsSection from "./components/TestimonialsSection";
import VideoTestimonialsSection from "./components/VideoTestimonialsSection";
import ProjectsSection from "./components/ProjectsSection";
import FastTrackModal from "./components/FastTrackModal";
import { translations, Language } from "./translations";

// Animation variants for Staggered Fade-In of cards and list features
const pricingGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const priceCardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1], // premium custom cubic-bezier
      staggerChildren: 0.08, // stagger the bullet list features inside
    }
  }
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    }
  }
};

const scrollRevealVariants = {
  hidden: { opacity: 0, y: 55, scale: 0.97, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1], // Smooth elite cubic bezier easeOutExpo
    }
  }
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [lang, setLang] = useState<Language>("es");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<"ai-web" | "ads">("ai-web");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [currency, setCurrency] = useState<"USD" | "MXN">("USD");
  const EXCHANGE_RATE = 18.5; // Tipo de cambio simulado: 1 USD = 18.50 MXN

  // Fast-Track Callback state
  const [isFastTrackOpen, setIsFastTrackOpen] = useState(false);
  const [fastTrackPlan, setFastTrackPlan] = useState("");
  const [fastTrackWaUrl, setFastTrackWaUrl] = useState("");
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleContratarHover = (planName: string, waUrl: string) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    
    hoverTimerRef.current = setTimeout(() => {
      setFastTrackPlan(planName);
      setFastTrackWaUrl(waUrl);
      setIsFastTrackOpen(true);
    }, 250); // 250ms delay for premium micro-experience
  };

  const handleContratarHoverLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleContratarClick = (e: React.MouseEvent, planName: string, waUrl: string) => {
    e.preventDefault();
    handleContratarHoverLeave();
    setFastTrackPlan(planName);
    setFastTrackWaUrl(waUrl);
    setIsFastTrackOpen(true);
  };

  const t = translations[lang];

  return (
    <div className="relative min-h-screen w-full bg-[#071330] font-sans text-white overflow-x-hidden selection:bg-sky-400 selection:text-slate-950">
      
      {/* BACKGROUND ELEMENTS & GLOW ACCENTS (Brighter, clearer blues as requested: ¡Azul más claro!) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Top-Right Neon Sky-Blue Light Core */}
        <div className="absolute top-0 right-0 w-[400px] sm:w-[600px] md:w-[900px] h-[400px] sm:h-[600px] md:h-[800px] rounded-full bg-gradient-to-bl from-cyan-400/20 via-sky-400/10 to-transparent blur-[120px] md:blur-[160px] opacity-75" />

        {/* Center Neon Cyan/Azure Ambient Orb (Lighter and brighter as requested) */}
        <motion.div
          animate={{
            scale: [1, 1.15, 0.9, 1],
            opacity: [0.5, 0.75, 0.45, 0.5],
            y: [-20, 20, -10, -20],
            x: [10, -20, 15, 10]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] md:w-[850px] h-[350px] sm:h-[600px] md:h-[850px] rounded-full bg-gradient-to-tr from-cyan-400/20 via-sky-400/15 to-sky-300/10 blur-[100px] md:blur-[140px]"
        />

        {/* Mid-screen glowing flow */}
        <div className="absolute top-[50%] left-[-10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-sky-500/10 blur-[130px]" />

        {/* Bottom Horizon sky-blue light bleed */}
        <div className="absolute bottom-0 inset-x-0 h-[400px] bg-gradient-to-t from-sky-950/20 via-slate-950 to-transparent pointer-events-none" />
      </div>

      {/* FIXED FLOATING CALL TO ACTION HEADER FOR INSTANT CONVERSION */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#071330]/80 border-b border-white/5 transition-all animate-none">
        {/* Slim Scroll Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-sky-400 to-[#38bdf8] origin-left z-50 shadow-md shadow-cyan-400/20"
          style={{ scaleX }}
        />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-sky-400 flex items-center justify-center shadow-lg shadow-cyan-400/15">
              <Zap className="h-4.5 w-4.5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-white block">
                {t.brandTitle} <span className="text-sky-400">{t.brandSpan}</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-1 block">
                {t.brandSub}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#hero" className="hover:text-white transition-colors">{t.navInicio}</a>
            <a href="#servicios" className="hover:text-white transition-colors flex items-center gap-1">
              <span>{t.navServicios}</span>
              <span className="text-[10px] bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded font-mono">IA</span>
            </a>
            <a href="#precios" className="hover:text-white transition-colors">{t.navPrecios}</a>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Elegant Floating Language Switcher */}
            <div className="flex bg-white/5 border border-white/10 p-1 rounded-full text-[10px] font-mono leading-none items-center gap-1 relative z-50">
              <button
                onClick={() => setLang("es")}
                className={`relative px-3 py-1.5 rounded-full transition-colors font-bold cursor-pointer select-none ${
                  lang === "es" ? "text-[#38bdf8] font-extrabold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {lang === "es" && (
                  <motion.span
                    layoutId="headerActiveLang"
                    className="absolute inset-0 bg-[#38bdf8]/15 border border-[#38bdf8]/30 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">ES</span>
              </button>
              <button
                onClick={() => setLang("en")}
                className={`relative px-3 py-1.5 rounded-full transition-colors font-bold cursor-pointer select-none ${
                  lang === "en" ? "text-[#38bdf8] font-extrabold" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {lang === "en" && (
                  <motion.span
                    layoutId="headerActiveLang"
                    className="absolute inset-0 bg-[#38bdf8]/15 border border-[#38bdf8]/30 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">EN</span>
              </button>
            </div>

            <button
              onClick={() => setIsContactOpen(true)}
              className="relative inline-flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-xs sm:text-sm px-4.5 py-2.5 transition-all outline-none border border-white/15"
            >
              {t.btnComenzar}
              <ArrowUpRight className="h-3.5 w-3.5 text-sky-400" />
            </button>
          </div>

        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="relative z-10">

        {/* ==================== SECCIÓN 1: HERO SECCIÓN (Minimalista, Moderno, de Alto Impacto) ==================== */}
        <motion.section
          id="hero"
          initial={{ opacity: 0, y: 45, scale: 0.98, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative pt-12 pb-20 sm:pb-28 lg:pt-20 lg:pb-32 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Hero main presentation */}
              <div className="lg:col-span-7 space-y-8 text-left">
                
                {/* Micro announcement badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-xs text-sky-300 backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-sky-400 animate-spin-slow" />
                  <span className="font-medium tracking-wide">
                    {t.heroBadge}
                  </span>
                </div>

                {/* Main Hero heading with ultra-premium typography */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] leading-[1.05] text-white">
                  {t.heroHeadingLine1} <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-sky-400 bg-clip-text text-transparent">
                    {t.heroHeadingLine2}
                  </span> <br />
                  {t.heroHeadingLine3}
                </h1>

                {/* Subtitle text */}
                <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
                  {t.heroSubtitle}
                </p>

                {/* CTA Action bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 to-sky-450 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-extrabold text-base px-8 py-4 transition-all shadow-lg shadow-cyan-400/15 cursor-pointer active:scale-95"
                  >
                    <span>{t.heroBtnMain}</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                      <ArrowRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-1" />
                    </div>
                  </button>

                  <a
                    href="#servicios"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium text-base px-6 py-4 transition-all"
                  >
                    {t.heroBtnSub}
                  </a>
                </div>

                {/* Floating micro features trust indicator */}
                <div className="pt-8 border-t border-white/5 grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#38bdf8]">100%</p>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">{t.heroSpeed}</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#38bdf8]">3x</p>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">{t.heroConversion}</p>
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-[#38bdf8]">2hr</p>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">{t.heroResponse}</p>
                  </div>
                </div>

              </div>

              {/* Right Column: High-end design abstraction */}
              <div className="lg:col-span-5 relative flex justify-center items-center">
                {/* Minimalist interactive design canvas preview */}
                <div className="relative w-full max-w-md aspect-square rounded-full border border-sky-500/15 bg-sky-950/10 p-2 backdrop-blur-3xl flex items-center justify-center overflow-hidden">
                  
                  {/* Outer animated track */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-sky-400/20"
                  />

                  {/* Inner neon orb with pulsing effect */}
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-400/20 to-sky-450/10 flex items-center justify-center p-4 relative"
                  >
                    <div className="absolute inset-4 rounded-full border border-white/5 bg-slate-950/40 backdrop-blur-xl flex flex-col justify-center items-center text-center p-6 space-y-4">
                      
                      <div className="h-12 w-12 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400">
                        <Layers className="h-6 w-6" />
                      </div>

                      <div>
                        <p className="text-xs font-mono text-sky-400 tracking-widest uppercase">{t.brandTitle} {t.brandSpan}</p>
                        <h4 className="text-lg font-bold text-white mt-1">{t.nextGenWebsites}</h4>
                      </div>

                      <div className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-3 text-left">
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono mb-1">
                          <Check className="h-3 w-3" /> {t.readyForMarket}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight">{t.readyForMarketDesc}</p>
                      </div>

                    </div>
                  </motion.div>

                  {/* Visual Floating elements */}
                  <div className="absolute top-10 right-10 bg-slate-900 border border-white/10 rounded-2xl p-3 shadow-xl flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-300">CORE INTELLIGENCE V2</span>
                  </div>

                  <div className="absolute bottom-10 left-6 bg-slate-900 border border-white/10 rounded-2xl p-3 shadow-xl flex items-center gap-2">
                    <Zap className="h-3.5 w-3.5 text-sky-400" />
                    <span className="text-[10px] font-mono text-slate-300">99/100 SPEED SCORE</span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </motion.section>


        {/* ==================== SECCIÓN 2: SERVICIOS INTERACTIVOS (Nuestra Anterior Sección, con Azul más Claro y Ajuste de Posición) ==================== */}
        <motion.section
          id="servicios"
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="relative py-20 sm:py-28 bg-[#091b40]/90 border-y border-white/5"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-400/10 px-3.5 py-1 text-xs font-semibold text-sky-400 border border-sky-400/20 uppercase tracking-widest">
                {t.serviciosBadge}
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {t.serviciosHeading}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {t.serviciosSubtitle}
              </p>
            </div>

            {/* Interactive Section Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT COLUMN: Choices */}
              <div className="lg:col-span-5 space-y-6">
                
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  {t.serviciosChoiceTitle}
                </h3>

                <div className="space-y-4">
                  {/* Option 1: AI WEB */}
                  <button
                    onClick={() => setActiveInteractiveTab("ai-web")}
                    className={`w-full p-5 rounded-2xl border text-left transition-all ${
                      activeInteractiveTab === "ai-web"
                        ? "border-sky-400 bg-sky-400/5 text-white shadow-xl shadow-sky-500/5"
                        : "border-white/5 bg-slate-900/40 text-slate-400 hover:border-white/15 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 mb-2">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                        activeInteractiveTab === "ai-web" ? "bg-sky-400/20 text-sky-400" : "bg-slate-950 text-slate-500"
                      }`}>
                        <Cpu className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono tracking-widest text-sky-400 uppercase">{t.serviciosTab1Subtitle}</span>
                        <h4 className="text-base font-bold text-white leading-none mt-0.5">{t.serviciosTab1Title}</h4>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-13">
                      {t.serviciosTab1Desc}
                    </p>
                  </button>

                  {/* Option 2: ADS */}
                  <button
                    onClick={() => setActiveInteractiveTab("ads")}
                    className={`w-full p-5 rounded-2xl border text-left transition-all ${
                      activeInteractiveTab === "ads"
                        ? "border-sky-400 bg-sky-400/5 text-white shadow-xl shadow-sky-500/5"
                        : "border-white/5 bg-slate-900/40 text-slate-400 hover:border-white/15 hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 mb-2">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                        activeInteractiveTab === "ads" ? "bg-sky-400/20 text-sky-400" : "bg-slate-950 text-slate-500"
                      }`}>
                        <Megaphone className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono tracking-widest text-sky-400 uppercase">{t.serviciosTab2Subtitle}</span>
                        <h4 className="text-base font-bold text-white leading-none mt-0.5">{t.serviciosTab2Title}</h4>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed pl-13">
                      {t.serviciosTab2Desc}
                    </p>
                  </button>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <span>{t.serviciosCta}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

              </div>

              {/* RIGHT COLUMN: Interactive details card (With lighter blue accents!) */}
              <div className="lg:col-span-7">
                <div className="relative w-full rounded-2xl border border-white/10 bg-slate-950/45 p-6 sm:p-8 overflow-hidden">
                  
                  {/* Ambient top light (Azul más claro - bright azure) */}
                  <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-sky-400/10 to-transparent pointer-events-none" />
                            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        {t.serviciosPerformanceTitle}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-sky-400 px-2 py-0.5 rounded border border-sky-400/20 bg-sky-400/5">
                      {t.serviciosPerformanceLabel}
                    </div>
                  </div>

                  <div className="min-h-[200px]">
                    {activeInteractiveTab === "ai-web" ? (
                      <motion.div
                        key="ai-web-details"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <h4 className="text-xl font-bold text-white">{t.serviciosTab1DetailsTitle}</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {t.serviciosTab1DetailsDesc}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] border border-white/5 p-3">
                            <Check className="h-4 w-4 text-sky-400 shrink-0" />
                            <span className="text-xs text-slate-200">{t.serviciosTab1Bullet1}</span>
                          </div>
                          <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] border border-white/5 p-3">
                            <Check className="h-4 w-4 text-sky-400 shrink-0" />
                            <span className="text-xs text-slate-200">{t.serviciosTab1Bullet2}</span>
                          </div>
                          <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] border border-white/5 p-3">
                            <Check className="h-4 w-4 text-sky-400 shrink-0" />
                            <span className="text-xs text-slate-200">{t.serviciosTab1Bullet3}</span>
                          </div>
                          <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] border border-white/5 p-3">
                            <Check className="h-4 w-4 text-sky-400 shrink-0" />
                            <span className="text-xs text-slate-200">{t.serviciosTab1Bullet4}</span>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="ads-details"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        <h4 className="text-xl font-bold text-white">{t.serviciosTab2DetailsTitle}</h4>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {t.serviciosTab2DetailsDesc}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] border border-white/5 p-3">
                            <Check className="h-4 w-4 text-sky-400 shrink-0" />
                            <span className="text-xs text-slate-200">{t.serviciosTab2Bullet1}</span>
                          </div>
                          <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] border border-white/5 p-3">
                            <Check className="h-4 w-4 text-sky-400 shrink-0" />
                            <span className="text-xs text-slate-200">{t.serviciosTab2Bullet2}</span>
                          </div>
                          <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] border border-white/5 p-3">
                            <Check className="h-4 w-4 text-sky-400 shrink-0" />
                            <span className="text-xs text-slate-200">{t.serviciosTab2Bullet3}</span>
                          </div>
                          <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.02] border border-white/5 p-3">
                            <Check className="h-4 w-4 text-sky-400 shrink-0" />
                            <span className="text-xs text-slate-200">{t.serviciosTab2Bullet4}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-slate-500">
                    <span>{t.serviciosFootSelection}: {activeInteractiveTab === "ai-web" ? t.serviciosFootTab1 : t.serviciosFootTab2}</span>
                    <span>{t.serviciosFootAutomation}</span>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </motion.section>


        {/* ==================== SECCIÓN DE PROYECTOS: PORTAFOLIO DE SITIOW EBS (Novedad) ==================== */}
        <ProjectsSection lang={lang} onOpenContact={() => setIsContactOpen(true)} />


        {/* ==================== SECCIÓN DE PRECIOS: PLANES DE DISEÑO WEB (Solicitado por el usuario) ==================== */}
        <motion.section
          id="precios"
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="relative py-20 sm:py-28 bg-[#071330] border-b border-white/5"
        >
          {/* Subtle Ambient Light Orb to keep typography contrast perfect and stunning */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-sky-500/5 blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-400/10 px-3.5 py-1 text-xs font-semibold text-sky-400 border border-sky-400/20 uppercase tracking-widest">
                Tarifas Transparentes
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Planes adaptados al crecimiento de tu negocio
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Descubre nuestros planes de diseño web inteligente y pauta digital. Haz clic en el botón de tu plan ideal para iniciar la conversación por WhatsApp de inmediato.
              </p>
            </div>

            {/* Currency Selector (USD / MXN) */}
            <div className="flex flex-col items-center justify-center gap-3 bg-slate-950/30 border border-white/5 rounded-3xl p-6 max-w-sm sm:max-w-md mx-auto backdrop-blur-xl">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                {lang === "es" ? "Seleccionar Divisa de Planes" : "Select Plan Currency"}
              </span>
              <div className="inline-flex p-1 rounded-2xl bg-slate-900 border border-white/10 relative">
                <button
                  onClick={() => setCurrency("USD")}
                  className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer select-none ${
                    currency === "USD"
                      ? "bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-extrabold shadow-lg shadow-cyan-400/15"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="text-sm">🇺🇸</span>
                  <span>USD ($)</span>
                </button>
                <button
                  onClick={() => setCurrency("MXN")}
                  className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer select-none ${
                    currency === "MXN"
                      ? "bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-extrabold shadow-lg shadow-cyan-400/15"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span className="text-sm">🇲🇽</span>
                  <span>MXN ($)</span>
                </button>
              </div>
              <p className="text-[10px] text-slate-500 font-mono tracking-wide text-center">
                {lang === "es"
                  ? `* Conversión estimada en tiempo real: $1 USD = $${EXCHANGE_RATE.toFixed(2)} MXN`
                  : `* Real-time estimated conversion: $1 USD = $${EXCHANGE_RATE.toFixed(2)} MXN`
                }
              </p>
            </div>

            {/* Pricing Grid */}
            <motion.div
              variants={pricingGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4"
            >
              
              {/* PLAN 1: PLAN SENCILLO */}
              <motion.div
                id="plan-sencillo"
                variants={priceCardVariants}
                whileHover={{ y: -10, scale: 1.025 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative rounded-3xl border border-white/10 bg-slate-950/40 p-8 flex flex-col justify-between group overflow-hidden z-10"
              >
                {/* Background ambient glow reveal on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-cyan-500/10 via-sky-500/5 to-transparent blur-xl -z-10 pointer-events-none"
                />
                {/* Glowing border outline reveal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-3xl border border-sky-400/30 shadow-[0_0_20px_rgba(56,189,248,0.12)] pointer-events-none z-20"
                />
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase">Esencial</span>
                      <h4 className="text-2xl font-bold text-white mt-1">Plan Sencillo</h4>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400">
                      <Zap className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    Perfecto para emprendedores o startups que necesitan un lanzamiento inmediato, profesional y optimizado para iniciar su presencia online.
                  </p>

                  <div className="py-4 border-y border-white/5">
                    <span className="text-4xl font-extrabold text-[#38bdf8]">
                      {currency === "USD" ? "$299" : `$${Math.round(299 * EXCHANGE_RATE).toLocaleString()}`}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5 font-mono">
                      {currency} {lang === "es" ? "• Pago Único" : "• One-time Payment"}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-4">¿Qué incluye este plan?</p>
                    <ul className="space-y-3.5 text-sm text-slate-300">
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>1 Landing Page de alto impacto diseñada a tu medida</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Diseño web moderno, minimalista y adaptado a móviles</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Optimización técnica para velocidad de carga ultra rápida</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Formulario de contacto integrado que envía a tu correo</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Botones directos de llamada a acción y enlaces sociales</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Soporte técnico por 15 días tras el lanzamiento</span>
                      </motion.li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/5">
                  <a
                    href="https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Sencillo%20para%20crear%20mi%20sitio%20web%20con%20Click%20boost%20Media"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => handleContratarHover("Plan Sencillo", "https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Sencillo%20para%20crear%20mi%20sitio%20web%20con%20Click%20boost%20Media")}
                    onMouseLeave={handleContratarHoverLeave}
                    onClick={(e) => handleContratarClick(e, "Plan Sencillo", "https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Sencillo%20para%20crear%20mi%20sitio%20web%20con%20Click%20boost%20Media")}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-slate-950 font-bold py-3.5 text-sm transition-all focus:ring-2 focus:ring-[#25D366]/50 shadow-lg shadow-emerald-500/5 active:scale-95"
                  >
                    <span>Contratar Plan Sencillo</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* PLAN 2: PLAN CORPORATIVO */}
              <motion.div
                id="plan-corporativo"
                variants={priceCardVariants}
                whileHover={{ y: -10, scale: 1.025 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative rounded-3xl border-2 border-sky-400 bg-[#030a1c] p-8 flex flex-col justify-between shadow-xl shadow-sky-500/10 group overflow-hidden z-10"
              >
                {/* Background ambient glow reveal on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-cyan-500/15 via-sky-400/8 to-transparent blur-xl -z-10 pointer-events-none"
                />
                {/* Glowing border outline reveal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-3xl border border-sky-300 shadow-[0_0_25px_rgba(56,189,248,0.22)] pointer-events-none z-20"
                />
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 text-slate-950 font-bold px-4 py-1 text-xs tracking-wider uppercase font-mono z-30">
                  MÁS RECOMENDADO
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-sky-300 uppercase font-bold">Empresas</span>
                      <h4 className="text-2xl font-bold text-white mt-1">Plan Corporativo</h4>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-sky-400/20 border border-sky-400/40 flex items-center justify-center text-sky-200">
                      <Layers className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Ideal para empresas y profesionales que requieren un sitio corporativo multi-página robusto, optimizado y con autogestión de contenidos.
                  </p>

                  <div className="py-4 border-y border-white/10">
                    <span className="text-4xl font-extrabold text-[#38bdf8]">
                      {currency === "USD" ? "$599" : `$${Math.round(599 * EXCHANGE_RATE).toLocaleString()}`}
                    </span>
                    <span className="text-xs text-sky-200 ml-1.5 font-mono font-semibold">
                      {currency} {lang === "es" ? "• Pago Único" : "• One-time Payment"}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-mono tracking-wider text-sky-300 uppercase mb-4">¿Qué incluye este plan?</p>
                    <ul className="space-y-3.5 text-sm text-slate-200">
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Sitio Web Multi-página completo (hasta 5 secciones o vistas)</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Redacción de copies de alto impacto potenciados con Inteligencia Artificial</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Panel autogestionable simple para blog o portafolio de servicios</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Botón flotante premium interconectado directamente a tu WhatsApp</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Integración de Analíticas y Códigos de Seguimiento (Meta Pixel y Analytics)</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Soporte prioritario por 30 días junto a un manual de administración rápida</span>
                      </motion.li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/10">
                  <a
                    href="https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Corporativo%20para%20crear%20mi%20sitio%20web%20con%20Click%20boost%20Media"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => handleContratarHover("Plan Corporativo", "https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Corporativo%20para%20crear%20mi%20sitio%20web%20con%20Click%20boost%20Media")}
                    onMouseLeave={handleContratarHoverLeave}
                    onClick={(e) => handleContratarClick(e, "Plan Corporativo", "https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Corporativo%20para%20crear%20mi%20sitio%20web%20con%20Click%20boost%20Media")}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-slate-950 font-bold py-3.5 text-sm transition-all focus:ring-2 focus:ring-[#25D366]/50 shadow-lg shadow-emerald-500/10 active:scale-95"
                  >
                    <span>Contratar Plan Corporativo</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* PLAN 3: PLAN AGREGADO */}
              <motion.div
                id="plan-agregado"
                variants={priceCardVariants}
                whileHover={{ y: -10, scale: 1.025 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative rounded-3xl border border-white/10 bg-slate-950/40 p-8 flex flex-col justify-between group overflow-hidden z-10"
              >
                {/* Background ambient glow reveal on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-purple-500/10 via-sky-500/5 to-transparent blur-xl -z-10 pointer-events-none"
                />
                {/* Glowing border outline reveal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-3xl border border-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.12)] pointer-events-none z-20"
                />
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase">Premium + Pauta</span>
                      <h4 className="text-2xl font-bold text-white mt-1">Plan Agregado</h4>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400">
                      <Sparkles className="h-5 w-5 animate-pulse" />
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    La máquina de conversión definitiva. Diseñamos tu embudo web corporativo avanzado y estructuramos tus campañas de Publicidad Digital.
                  </p>

                  <div className="py-4 border-y border-white/5">
                    <span className="text-4xl font-extrabold text-[#38bdf8]">
                      {currency === "USD" ? "$999" : `$${Math.round(999 * EXCHANGE_RATE).toLocaleString()}`}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5 font-mono">
                      {currency} {lang === "es" ? "• Pago Único" : "• One-time Payment"}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-4">¿Qué incluye este plan?</p>
                    <ul className="space-y-3.5 text-sm text-slate-300">
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span className="font-semibold text-white">Diseño Web Completo o Landing Maestro + Embudo Avanzado</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Formularios dinámicos multi-etapa y almacenamiento en base de datos</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span className="font-semibold text-white">Creación y configuración de 3 anuncios para Meta & Google Ads</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Redacción de copys altamente persuasivos orientados a la venta directa</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Integración avanzada con CRM (HubSpot, Mailchimp o similares)</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-sky-400 shrink-0 mt-0.5" />
                        <span>Soporte prioritario permanente 24/7 y optimizadores pautados</span>
                      </motion.li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/5">
                  <a
                    href="https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Agregado%20para%20crear%20mi%20sitio%20web%20y%20campañas%20con%20Click%20boost%20Media"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => handleContratarHover("Plan Agregado", "https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Agregado%20para%20crear%20mi%20sitio%20web%20y%20campañas%20con%20Click%20boost%20Media")}
                    onMouseLeave={handleContratarHoverLeave}
                    onClick={(e) => handleContratarClick(e, "Plan Agregado", "https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Agregado%20para%20crear%20mi%20sitio%20web%20y%20campañas%20con%20Click%20boost%20Media")}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-slate-950 font-bold py-3.5 text-sm transition-all focus:ring-2 focus:ring-[#25D366]/50 shadow-lg shadow-emerald-500/5 active:scale-95"
                  >
                    <span>Contratar Plan Agregado</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

            </motion.div>

          </div>
        </motion.section>


        {/* ==================== SECCIÓN DE PRECIOS: PUBLICIDAD DIGITAL (Meta & Google Ads) ==================== */}
        <motion.section
          id="precios-publicidad"
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="relative py-20 sm:py-28 bg-[#091b40]/90 border-b border-white/5"
        >
          {/* Radiant Amber/Emerald Ambient Glow representing organic conversion metrics */}
          <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-[250px] h-[250px] rounded-full bg-sky-500/5 blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
            
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-400/20 uppercase tracking-widest">
                Optimización de Pauta
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Planes de Publicidad Digital de Alto Rendimiento
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Maximizamos tu inversión publicitaria pautada en Meta Ads y Google Ads. Estructuramos embudos completos y optimizamos de forma continua con tecnología inteligente.
              </p>
            </div>

            {/* Publicidad Pricing Cards Grid */}
            <motion.div
              variants={pricingGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4"
            >
              
              {/* PLAN 1: ADS INICIAL */}
              <motion.div
                id="price-card-ads-inicial"
                variants={priceCardVariants}
                whileHover={{ y: -10, scale: 1.025 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative rounded-3xl border border-white/10 bg-slate-950/45 p-8 flex flex-col justify-between group overflow-hidden z-10"
              >
                {/* Background ambient glow reveal on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent blur-xl -z-10 pointer-events-none"
                />
                {/* Glowing border outline reveal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-3xl border border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.12)] pointer-events-none z-20"
                />
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">Tracción Básica</span>
                      <h4 className="text-2xl font-bold text-white mt-1">Plan Ads Inicial</h4>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Target className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    Excelente para negocios locales y marcas que desean iniciar pauta digital altamente segmentada para capturar clics y mensajes de WhatsApp o Messenger de inmediato.
                  </p>

                  <div className="py-4 border-y border-white/5">
                    <span className="text-4xl font-extrabold text-[#10b981]">
                      {currency === "USD" ? "$149" : `$${Math.round(149 * EXCHANGE_RATE).toLocaleString()}`}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5 font-mono">
                      {currency} {lang === "es" ? "• Mensual" : "• Monthly"}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-4">Servicios & Ventajas:</p>
                    <ul className="space-y-3.5 text-sm text-slate-300">
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Configuración profesional de tu cuenta publicitaria (Meta Business Suite)</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Instalación y verificación inicial de tu Meta Pixel</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Creación de hasta 2 campañas simultáneas dirigidas a generar mensajes directos</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Redacción de 4 copys persuasivos optimizados mediante Inteligencia Artificial</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Segmentación detallada por zona geográfica, edad e intereses clave</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Reporte mensual de rendimiento básico (impresiones, alcance y clics)</span>
                      </motion.li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/5">
                  <a
                    href="https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Ads%20Inicial%20con%20Click%20boost%20Media"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => handleContratarHover("Plan Ads Inicial", "https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Ads%20Inicial%20con%20Click%20boost%20Media")}
                    onMouseLeave={handleContratarHoverLeave}
                    onClick={(e) => handleContratarClick(e, "Plan Ads Inicial", "https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Ads%20Inicial%20con%20Click%20boost%20Media")}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-slate-950 font-bold py-3.5 text-sm transition-all focus:ring-2 focus:ring-[#25D366]/50 shadow-lg shadow-emerald-500/5 active:scale-95"
                  >
                    <span>Contratar Ads Inicial</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* PLAN 2: ADS MULTI-CANAL */}
              <motion.div
                id="price-card-ads-multicanal"
                variants={priceCardVariants}
                whileHover={{ y: -10, scale: 1.025 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative rounded-3xl border-2 border-emerald-500 bg-[#020b12] p-8 flex flex-col justify-between shadow-xl shadow-emerald-500/10 group overflow-hidden z-10"
              >
                {/* Background ambient glow reveal on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-emerald-500/15 via-teal-500/8 to-transparent blur-xl -z-10 pointer-events-none"
                />
                {/* Glowing border outline reveal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-3xl border border-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.22)] pointer-events-none z-20"
                />
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 text-slate-950 font-bold px-4 py-1 text-xs tracking-wider uppercase font-mono z-30">
                  MÁS SOLICITADO
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-emerald-300 uppercase font-bold">Meta + Google Ads</span>
                      <h4 className="text-2xl font-bold text-white mt-1">Plan Multi-Canal</h4>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                      <Megaphone className="h-5 w-5 animate-pulse" />
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    Recomendado para empresas de servicios, tiendas online e inmobiliarias que necesitan una estrategia de pauta integral para capturar la búsqueda activa e impulsar branding.
                  </p>

                  <div className="py-4 border-y border-white/10">
                    <span className="text-4xl font-extrabold text-[#10b981]">
                      {currency === "USD" ? "$349" : `$${Math.round(349 * EXCHANGE_RATE).toLocaleString()}`}
                    </span>
                    <span className="text-xs text-emerald-300 ml-1.5 font-mono font-semibold">
                      {currency} {lang === "es" ? "• Mensual" : "• Monthly"}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-mono tracking-wider text-emerald-300 uppercase mb-4">Servicios & Ventajas:</p>
                    <ul className="space-y-3.5 text-sm text-slate-200">
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Estrategia coordinada de Meta Ads (Facebook/Instagram) + Google Ads (Búsqueda)</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Configuración de Google Search y selección de palabras clave de alta compra</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Campaña activa de Retargeting para volver a conectar con visitas indecisas</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Diseño o selección de creativos óptimos de alto impacto visual para anuncios</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Pruebas A/B semanales de anuncios (copys, titulares y variaciones visuales)</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-semibold text-white">Reporte mensual detallado con evaluación real de métricas ROAS</span>
                      </motion.li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/10">
                  <a
                    href="https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Multi-Canal%20de%20Publicidad%20con%20Click%20boost%20Media"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => handleContratarHover("Plan Multi-Canal", "https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Multi-Canal%20de%20Publicidad%20con%20Click%20boost%20Media")}
                    onMouseLeave={handleContratarHoverLeave}
                    onClick={(e) => handleContratarClick(e, "Plan Multi-Canal", "https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Multi-Canal%20de%20Publicidad%20con%20Click%20boost%20Media")}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-slate-950 font-bold py-3.5 text-sm transition-all focus:ring-2 focus:ring-[#25D366]/50 shadow-lg shadow-emerald-500/10 active:scale-95"
                  >
                    <span>Contratar Plan Multi-Canal</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* PLAN 3: DOMINIO ABSOLUTO */}
              <motion.div
                id="price-card-ads-dominio"
                variants={priceCardVariants}
                whileHover={{ y: -10, scale: 1.025 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative rounded-3xl border border-white/10 bg-slate-950/45 p-8 flex flex-col justify-between group overflow-hidden z-10"
              >
                {/* Background ambient glow reveal on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-teal-500/10 via-[#00f9a9]/5 to-transparent blur-xl -z-10 pointer-events-none"
                />
                {/* Glowing border outline reveal */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 rounded-3xl border border-[#00f9a9]/30 shadow-[0_0_20px_rgba(0,249,169,0.12)] pointer-events-none z-20"
                />
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">Embudo Escala 360°</span>
                      <h4 className="text-2xl font-bold text-white mt-1">Dominio Absoluto</h4>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-[#00f9a9]/10 border border-[#00f9a9]/20 flex items-center justify-center text-[#00f9a9]">
                      <Sparkles className="h-5 w-5 text-emerald-400 animate-spin-slow" />
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed">
                    Nuestra solución insignia. Construimos tu embudo publicitario multicanal optimizado diario para marcas de comercio electrónico, franquicias o empresas con metas ambiciosas.
                  </p>

                  <div className="py-4 border-y border-white/5">
                    <span className="text-4xl font-extrabold text-[#10b981]">
                      {currency === "USD" ? "$599" : `$${Math.round(599 * EXCHANGE_RATE).toLocaleString()}`}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5 font-mono">
                      {currency} {lang === "es" ? "• Mensual" : "• Monthly"}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-mono tracking-wider text-slate-400 uppercase mb-4">Servicios & Ventajas:</p>
                    <ul className="space-y-3.5 text-sm text-slate-300">
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Meta Ads + Google Ads + YouTube & TikTok Ads integrados a la perfección</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Configuración avanzada de APIs de Conversiones Server-Side para evadir bloqueadores</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Generación y optimización continua de creativos en formato imagen y guiones de video</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-semibold text-white">Monitoreo publicitario diario, ajuste de ofertas y depuración de clics</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Limpieza de audiencias y pauta orientada estrictamente a optimizar costo por meta</span>
                      </motion.li>
                      <motion.li variants={featureItemVariants} className="flex items-start gap-2.5">
                        <Check className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>Reunión estratégica mensual personalizada por Google Meet (1 Hora)</span>
                      </motion.li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/5">
                  <a
                    href="https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Dominio%20Absoluto%20con%20Click%20boost%20Media"
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => handleContratarHover("Dominio Absoluto", "https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Dominio%20Absoluto%20con%20Click%20boost%20Media")}
                    onMouseLeave={handleContratarHoverLeave}
                    onClick={(e) => handleContratarClick(e, "Dominio Absoluto", "https://wa.me/525647805021?text=Hola!%20Estoy%20interesado%20en%20el%20Plan%20Dominio%20Absoluto%20con%20Click%20boost%20Media")}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-slate-950 font-bold py-3.5 text-sm transition-all focus:ring-2 focus:ring-[#25D366]/50 shadow-lg shadow-emerald-500/5 active:scale-95"
                  >
                    <span>Contratar Dominio Absoluto</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

            </motion.div>

          </div>
        </motion.section>


        {/* ==================== SECCIÓN 3: TABLERO DE INGENIERÍA & WORKFLOWS (Inspiración en la captura de pantalla provista) ==================== */}
        <motion.section
          id="ingenieria"
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="relative py-20 sm:py-28 bg-[#071330]"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
            
            {/* Header translation: "The workflows firms operationalize first." */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
              <div className="space-y-4 max-w-2xl">
                <span className="text-xs font-mono font-semibold tracking-[0.2em] text-sky-400 uppercase">
                  Metodología Click boost Media
                </span>
                <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-sans">
                  El motor digital con el que operamos.
                </h3>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
                Elegimos la automatización inteligente frente a la ineficiencia humana. Estructuramos cada paso de nuestro flujo para entregar resultados rápidos y trazables.
              </p>
            </div>

            {/* UPPER GRID OF 4 WORKFLOWS (Inspired by the 4 pillars in the screenshot) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Pillar 1: Deal workflows, fully automated */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-6 flex flex-col justify-between h-96 relative group hover:border-sky-500/30 transition-colors">
                <div className="space-y-4">
                  {/* Miniature functional code visualizers to mimic the high-end dashboard elements */}
                  <div className="rounded-xl bg-slate-900/60 border border-white/5 p-4 space-y-2.5 font-mono text-[10px] text-slate-400">
                    <div className="flex items-center gap-1.5 text-sky-400">
                      <Cpu className="h-3.5 w-3.5 animate-spin-slow" />
                      <span>Sourcing de Componentes</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] border-b border-white/5 pb-1">
                      <span>1. Estructura Wireframe</span>
                      <span className="text-emerald-400 font-semibold">Listo</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px] border-b border-white/5 pb-1">
                      <span>2. Generador de Código</span>
                      <span className="text-sky-400">En cola</span>
                    </div>
                    <div className="flex items-center justify-between text-[9px]">
                      <span>3. Optimización de Peso</span>
                      <span className="text-amber-400">Escaneando</span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white mt-4">
                    Flujo de desarrollo acelerado con IA
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Desde el mapa del sitio inicial hasta el despliegue automático del código depurado. Cero fricción humana.
                  </p>
                </div>
                
                <div className="text-[10px] font-mono text-slate-500 flex justify-between items-center pt-4 border-t border-white/5 mt-4">
                  <span>DESDE LA IDEA</span>
                  <span className="text-sky-400">AUTOMATIZADO</span>
                </div>
              </div>

              {/* Pillar 2: Screening as a repeatable system */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-6 flex flex-col justify-between h-96 relative group hover:border-sky-500/30 transition-colors">
                <div className="space-y-4">
                  
                  {/* Row indices layout matching the center pillar of the screenshot */}
                  <div className="rounded-xl bg-slate-900/60 border border-white/5 p-4 space-y-3 font-mono text-[9px]">
                    <div className="flex items-center justify-between text-slate-400 border-b border-white/5 pb-1">
                      <span>Público Meta manual</span>
                      <span className="bg-red-400/15 text-red-400 px-1.5 py-0.5 rounded text-[8px] font-bold">Conflicto</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 border-b border-white/5 pb-1">
                      <span>Pauta por Intereses IA</span>
                      <span className="bg-sky-400/10 text-sky-400 px-1.5 py-0.5 rounded text-[8px] font-bold">Optimizado</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400 border-b border-white/5 pb-1">
                      <span>Presupuesto Dinámico</span>
                      <span className="bg-emerald-400/10 text-emerald-400 px-1.5 py-0.5 rounded text-[8px] font-bold">Escalando</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Píxel de Conversión</span>
                      <span className="bg-sky-400/10 text-sky-400 px-1.5 py-0.5 rounded text-[8px] font-bold">Sincronizado</span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white mt-4">
                    Audiencias como sistema repetible
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Extraemos métricas de interés y datos de comportamiento para perfilar nichos viables en Meta Ads rápidamente.
                  </p>
                </div>

                <div className="text-[10px] font-mono text-slate-500 flex justify-between items-center pt-4 border-t border-white/5 mt-4">
                  <span>AUDITORÍA DE LEAD</span>
                  <span className="text-sky-400">PRECISIÓN</span>
                </div>
              </div>

              {/* Pillar 3: Automated Diligence you can rely on */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-6 flex flex-col justify-between h-96 relative group hover:border-sky-500/30 transition-colors">
                <div className="space-y-4">
                  
                  {/* Automated Diligence tree list visualizer */}
                  <div className="rounded-xl bg-slate-900/60 border border-white/5 p-4 space-y-2 font-mono text-[9px] text-slate-400">
                    <div className="flex items-center gap-1 text-slate-300">
                      <span>[01] Distribución de Anuncios</span>
                    </div>
                    <div className="pl-3 border-l border-white/10 space-y-1.5 mt-1">
                      <div className="flex justify-between">
                        <span>• Estupendo CPC Promedio</span>
                        <span className="text-sky-400">0.12 USD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• CTR Estables de Copias</span>
                        <span className="text-emerald-400">4.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>• Gasto diario controlado</span>
                        <span className="text-slate-500">100% OK</span>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white mt-4">
                    Pauta publicitaria auditable
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Toma control de tus costos de pauta. Respaldamos cada creatividad pautada en análisis de datos consolidados.
                  </p>
                </div>

                <div className="text-[10px] font-mono text-slate-500 flex justify-between items-center pt-4 border-t border-white/5 mt-4">
                  <span>CONTROL DE ROAS</span>
                  <span className="text-emerald-400">GARANTIZADO</span>
                </div>
              </div>

              {/* Pillar 4: IC outputs traceable to source */}
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-6 flex flex-col justify-between h-96 relative group hover:border-sky-500/30 transition-colors">
                <div className="space-y-4">
                  
                  {/* Export outputs list with icons resembling the screenshot */}
                  <div className="rounded-xl bg-slate-900/60 border border-white/5 p-4 space-y-2 font-mono text-[9px]">
                    <div className="flex items-center justify-between text-slate-300 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                      <span className="truncate">📄 Reporte de Metas Q2.pdf</span>
                      <Download className="h-3 w-3 text-sky-400 pointer-events-auto" />
                    </div>
                    <div className="flex items-center justify-between text-slate-300 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                      <span className="truncate">📈 Análisis de Clics Ads.xlsx</span>
                      <Download className="h-3 w-3 text-emerald-400 pointer-events-auto" />
                    </div>
                    <div className="flex items-center justify-between text-slate-300 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                      <span className="truncate">📄 Propuesta Creativa.pdf</span>
                      <Download className="h-3 w-3 text-sky-400 pointer-events-auto" />
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white mt-4">
                    Reportes y trazabilidad total
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Cada reporte de conversión está vinculado y es completamente transparente. Descubre cuáles anuncios específicos generan tus ventas.
                  </p>
                </div>

                <div className="text-[10px] font-mono text-slate-500 flex justify-between items-center pt-4 border-t border-white/5 mt-4">
                  <span>TRANSPARENCIA</span>
                  <span className="text-sky-400">ORIGEN</span>
                </div>
              </div>

            </div>

            {/* THREE LARGE STATS ROW (Inspired by the big statistics row from the screenshot: 3.6T, 10 million, 15K) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
              
              <div className="p-6 space-y-2">
                <p className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">3.6x</span>
                </p>
                <p className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  ROAS promedio de las marcas en la plataforma
                </p>
              </div>

              <div className="p-6 space-y-2">
                <p className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-400 to-sky-305 bg-clip-text text-transparent">10M+</span>
                </p>
                <p className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  Impresiones altamente interactivas generadas
                </p>
              </div>

              <div className="p-6 space-y-2">
                <p className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                  <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">12</span>
                </p>
                <p className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                  Especialistas en IA y Marketing activos para ti
                </p>
              </div>

            </div>

            {/* THREE DETAILED BEFORE / WITH CLICK BOOST COMPARISONS (Inspired by the metric data comparisons from the screenshot) */}
            <div className="pt-6 border-t border-white/5 space-y-6">
              
              <h4 className="text-xs font-mono tracking-widest text-slate-500 uppercase">
                Comparativas Reales de Eficiencia (Antes vs Click boost Media)
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Comparison 1: Desarrollo de Landing */}
                <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-6 space-y-4">
                  <p className="text-sm font-semibold text-white">Lanzamiento de Landing Page</p>
                  
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Antes (Agencia tradicional)</span>
                      <span>100+ Horas</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-red-400/60" />
                    </div>

                    <div className="flex justify-between text-sky-400 font-semibold pt-1">
                      <span>Con Click boost Media</span>
                      <span>Menos de 4 Horas</span>
                    </div>
                    <div className="h-1.5 bg-sky-400/10 rounded-full overflow-hidden">
                      <div className="w-[8%] h-full bg-gradient-to-r from-cyan-400 to-sky-400" />
                    </div>
                  </div>
                </div>

                {/* Comparison 2: Costo por Lead */}
                <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-6 space-y-4">
                  <p className="text-sm font-semibold text-white">Costo por Adquisición (CPA)</p>
                  
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Antes (Pauta a ciegas)</span>
                      <span>$18.50 USD</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-red-400/60" />
                    </div>

                    <div className="flex justify-between text-emerald-400 font-semibold pt-1">
                      <span>Con Click boost Media</span>
                      <span>$4.20 USD</span>
                    </div>
                    <div className="h-1.5 bg-emerald-400/10 rounded-full overflow-hidden">
                      <div className="w-[23%] h-full bg-gradient-to-r from-emerald-400 to-sky-400" />
                    </div>
                  </div>
                </div>

                {/* Comparison 3: Pruebas A/B de Anuncios */}
                <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-6 space-y-4">
                  <p className="text-sm font-semibold text-white">Optimización Creativa de Anuncios</p>
                  
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-slate-400">
                      <span>Antes (Pruebas manuales)</span>
                      <span>5 a 7 Días</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-red-400/60" />
                    </div>

                    <div className="flex justify-between text-sky-400 font-semibold pt-1">
                      <span>Con Click boost Media</span>
                      <span>15 Minutos (Con IA)</span>
                    </div>
                    <div className="h-1.5 bg-sky-400/10 rounded-full overflow-hidden">
                      <div className="w-[5%] h-full bg-gradient-to-r from-cyan-400 to-sky-400" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </motion.section>

      </div>

      {/* TESTIMONIALS SECTION WITH CAROUSEL */}
      <TestimonialsSection />

      {/* VIDEO TESTIMONIALS WITH FULL PLAYBACK THEATER */}
      <VideoTestimonialsSection lang={lang} />

      {/* FAQ SECTION WITH ACCORDIONS */}
      <FaqSection />

      {/* FOOTER GENERAL */}
      {(() => {
        const f = lang === "es" ? {
          tagline: "Fusionamos desarrollo web de élite con inteligencia de conversión publicitaria para multiplicar los márgenes de tu negocio.",
          servicesTitle: "Servicios de Élite",
          webAi: "Diseño Web con IA",
          googleAds: "Google & Meta Ads",
          croSeo: "Optimización CRO & SEO",
          funnels: "Lanzamiento y Embudos",
          portfolioTitle: "Casos de Éxito",
          project1: "Apex Footwear Store",
          project2: "Nova AI Dashboard",
          project3: "Prime Elite Portal",
          project4: "Zenith MedTech CRM",
          contactTitle: "Contacto & Soporte",
          phone: "+52 56 4780 5021",
          email: "contacto@clickboostmedia.com",
          hours: "Lunes a Viernes • 9 AM - 6 PM",
          newsletterPlaceholder: "Tu mejor correo...",
          newsletterSubmit: "Acelerar mi marca",
          newsletterTitle: "Suscripción Estratégica",
          newsletterDesc: "Obtén secretos semanales sobre pauta digital y diseño web de alta velocidad.",
          newsletterSuccessMsg: "¡Suscrito con éxito! Te enviaremos novedades.",
          rights: "© 2026 Click boost Media. Todos los derechos reservados.",
          tagDev: "SISTEMA DE DISEÑO RESPONSIVO ULTRA VELOZ",
          tagBoost: "IA & PUBLICIDAD SEGMENTADA"
        } : {
          tagline: "We fuse elite web development with advertising intelligence to multiply your business margins and brand reach.",
          servicesTitle: "Elite Services",
          webAi: "AI Web Design",
          googleAds: "Google & Meta Ads",
          croSeo: "CRO & SEO Optimization",
          funnels: "Launch & Funnels",
          portfolioTitle: "Success Stories",
          project1: "Apex Footwear Store",
          project2: "Nova AI Dashboard",
          project3: "Prime Elite Portal",
          project4: "Zenith MedTech CRM",
          contactTitle: "Contact & Support",
          phone: "+52 56 4780 5021",
          email: "contacto@clickboostmedia.com",
          hours: "Monday to Friday • 9 AM - 6 PM",
          newsletterPlaceholder: "Your best email...",
          newsletterSubmit: "Boost My Brand",
          newsletterTitle: "Strategic Insights",
          newsletterDesc: "Receive weekly secrets on digital advertising and high-speed web design.",
          newsletterSuccessMsg: "Subscribed successfully! Read you soon.",
          rights: "© 2026 Click boost Media. All rights reserved.",
          tagDev: "ULTRA-SPEED RESPONSIVE DESIGN LABS",
          tagBoost: "AI & HIGH-TARGET ADVERTISING"
        };

        return (
          <footer className="relative z-10 border-t border-white/10 bg-[#071330] overflow-hidden pt-20 pb-12">
            {/* Ambient Cyan Soft Glow Behind Footer */}
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
            
            {/* Celestial Blue Top Neon Divider Line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#38bdf8]/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
              
              {/* Main Columns Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
                
                {/* Column 1: Brand & Philosophy */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-sky-400 flex items-center justify-center shadow-lg shadow-cyan-400/15">
                      <Zap className="h-4.5 w-4.5 text-white animate-pulse" />
                    </div>
                    <div>
                      <span className="text-lg font-extrabold tracking-tight text-white block">
                        {t.brandTitle} <span className="text-sky-450">{t.brandSpan}</span>
                      </span>
                      <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-1 block">
                        {t.brandSub}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                    {f.tagline}
                  </p>

                  {/* Social Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 transition-all active:scale-95"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 transition-all active:scale-95"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href="mailto:contacto@clickboostmedia.com"
                      className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 transition-all active:scale-95"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a 
                      href="https://wa.me/525647805021"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 transition-all active:scale-95"
                    >
                      <MessageSquare className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Column 2: Navigation / Services */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-white text-xs font-bold tracking-widest uppercase font-mono border-l-2 border-cyan-400 pl-3">
                    {f.servicesTitle}
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-400">
                    <li>
                      <a href="#servicios" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                        <span className="h-1 w-1 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 transition-all shrink-0" />
                        <span>{f.webAi}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#servicios" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                        <span className="h-1 w-1 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 transition-all shrink-0" />
                        <span>{f.googleAds}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#precios" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                        <span className="h-1 w-1 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 transition-all shrink-0" />
                        <span>{f.croSeo}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#precios-publicidad" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                        <span className="h-1 w-1 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400 transition-all shrink-0" />
                        <span>{f.funnels}</span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 3: Cases / Grid Links */}
                <div className="lg:col-span-3 space-y-4">
                  <h3 className="text-white text-xs font-bold tracking-widest uppercase font-mono border-l-2 border-cyan-400 pl-3">
                    {f.portfolioTitle}
                  </h3>
                  <ul className="space-y-2.5 text-sm text-slate-400">
                    <li>
                      <a href="#nuestros-proyectos" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                        <span className="h-1.5 w-1 bg-cyan-400/20 group-hover:bg-cyan-400 rounded transition-all shrink-0" />
                        <span>{f.project1}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#nuestros-proyectos" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                        <span className="h-1.5 w-1 bg-cyan-400/20 group-hover:bg-cyan-400 rounded transition-all shrink-0" />
                        <span>{f.project2}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#nuestros-proyectos" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                        <span className="h-1.5 w-1 bg-cyan-400/20 group-hover:bg-cyan-400 rounded transition-all shrink-0" />
                        <span>{f.project3}</span>
                      </a>
                    </li>
                    <li>
                      <a href="#nuestros-proyectos" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 group">
                        <span className="h-1.5 w-1 bg-cyan-400/20 group-hover:bg-cyan-400 rounded transition-all shrink-0" />
                        <span>{f.project4}</span>
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Column 4: Newsletter or Action trigger */}
                <div className="lg:col-span-3 space-y-4">
                  <h3 className="text-white text-xs font-bold tracking-widest uppercase font-mono border-l-2 border-cyan-400 pl-3">
                    {f.newsletterTitle}
                  </h3>
                  <p className="text-xs text-slate-400 leading-normal">
                    {f.newsletterDesc}
                  </p>
                  
                  {newsletterSuccess ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-cyan-950/40 border border-cyan-500/30 rounded-xl p-3 text-xs text-cyan-300 font-medium flex items-center gap-2"
                    >
                      <Check className="h-4 w-4 text-cyan-400 shrink-0" />
                      <span>{f.newsletterSuccessMsg}</span>
                    </motion.div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (newsletterEmail.trim()) {
                          setNewsletterSuccess(true);
                        }
                      }}
                      className="space-y-2"
                    >
                      <div className="relative">
                        <input 
                          type="email" 
                          required
                          placeholder={f.newsletterPlaceholder}
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400/40 transition-colors"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-400 to-sky-450 hover:from-cyan-300 hover:to-sky-400 text-slate-950 text-xs font-bold py-2 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(56,189,248,0.15)] select-none cursor-pointer active:scale-98"
                      >
                        {f.newsletterSubmit}
                      </button>
                    </form>
                  )}

                  <div className="pt-2 text-slate-400 text-xs font-mono space-y-1">
                    <p className="flex items-center gap-2.5">
                      <Phone className="h-3 w-3 text-cyan-400" />
                      <span>{f.phone}</span>
                    </p>
                    <p className="text-[10px] text-slate-500 pl-5.5">
                      {f.hours}
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom Copyright and Meta tags Divider */}
              <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                
                <p className="text-xs text-slate-500 font-medium">
                  {f.rights}
                </p>

                <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
                    {f.tagDev}
                  </span>
                  <span className="text-slate-600 hidden md:inline">|</span>
                  <span>★ {f.tagBoost}</span>
                </div>

              </div>

            </div>
          </footer>
        );
      })()}

      {/* CONTACT FORM MODAL */}
      <ContactFormModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* FAST-TRACK CALLBACK MODAL */}
      <FastTrackModal
        isOpen={isFastTrackOpen}
        onClose={() => setIsFastTrackOpen(false)}
        planName={fastTrackPlan}
        waUrl={fastTrackWaUrl}
        lang={lang}
      />

      {/* PERSISTENT FLOATING CUSTOMER SUPPORT CHAT / WHATSAPP HUB */}
      <SupportChat />
    </div>
  );
}
