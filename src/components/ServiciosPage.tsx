import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, 
  Code2, 
  Terminal, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  Settings, 
  Database, 
  Workflow, 
  ShieldCheck, 
  Laptop, 
  Smartphone, 
  Search,
  Check,
  Zap,
  PhoneCall
} from "lucide-react";
import { Language } from "../translations";

interface ServiciosPageProps {
  lang: Language;
  onOpenContact: (serviceName?: string) => void;
}

const LOCAL_TRANSLATIONS = {
  es: {
    badge: "Soluciones de Ingeniería Digital",
    title: "Servicios de Elite",
    spanText: "Diseño & IA",
    subtitle: "Plataformas web de altísimo rendimiento e infraestructura publicitaria optimizada con modelos avanzados de conversión.",
    
    // Core Disciplines
    webDevTitle: "Desarrollo de Software & Portales IA",
    webDevDesc: "No creamos plantillas genéricas. Programamos plataformas rápidas, robustas y escalables con tecnologías modernas, integrando herramientas de IA semántica para automatizar tus operaciones.",
    
    adsTitle: "Infraestructura de Publicidad Multi-Canal",
    adsDesc: "Pauta digital hiper-optimizada orientada puramente a ROAS (Retorno de Inversión). Estructuramos embudos avanzados que conectan con WhatsApp, CRM e integraciones de servidor.",
    
    // Feature Grid Titles
    coreFeaturesTitle: "Nuestras Disciplinas Técnicas",
    coreFeaturesSubtitle: "Cada proyecto se construye sobre bases de nivel corporativo para garantizar seguridad, velocidad y ventas.",
    
    feature1Title: "Arquitectura Serverless React & Vite",
    feature1Desc: "Sitios estáticos rápidos con renderizado híbrido para obtener calificaciones perfectas (100/100) en Google Core Web Vitals.",
    
    feature2Title: "Modelos de Lenguaje & Agentes de IA",
    feature2Desc: "Chatbots de atención al cliente y motores de búsqueda semántica entrenados específicamente con la información de tu empresa.",
    
    feature3Title: "API de Conversiones Server-Side",
    feature3Desc: "Mitigamos la pérdida de datos de iOS 14+ enviando señales directamente desde el servidor para maximizar el retorno de anuncios.",
    
    feature4Title: "Automatizaciones CRM & WhatsApp",
    feature4Desc: "Los leads son redirigidos de inmediato a agentes de ventas con plantillas interactivas, reduciendo tiempos de espera a cero.",

    // Pipeline
    pipelineTitle: "Nuestro Flujo de Trabajo Profesional",
    pipelineSubtitle: "Lanzamientos ejecutados con precisión matemática y metodologías ágiles en 5 fases estandarizadas.",
    
    phase1: "Fase 1: Diagnóstico & Descubrimiento",
    phase1Desc: "Análisis exhaustivo de tu competencia, embudos actuales y planeación de la arquitectura óptima.",
    
    phase2: "Fase 2: Diseño UI/UX de Alta Densidad",
    phase2Desc: "Maquetación visual interactiva en alta fidelidad cuidando la jerarquía de tipografía y conversión.",
    
    phase3: "Fase 3: Desarrollo & Optimización de Carga",
    phase3Desc: "Código limpio, semántico, con carga diferida e integraciones con APIs remotas o bases de datos.",
    
    phase4: "Fase 4: Despliegue en la Nube (Cloud Run)",
    phase4Desc: "Configuración en servidores de borde globales con certificados SSL, HTTPS y CDN para cargas instantáneas.",
    
    phase5: "Fase 5: Optimización Publicitaria",
    phase5Desc: "Lanzamiento oficial de campañas, configuración de audiencias personalizadas y monitoreo de atribución.",

    // Tech Stack Section
    techTitle: "Ecosistema Tecnológico de Vanguardia",
    techSubtitle: "Nuestra caja de herramientas moderna.",
    ctaText: "Agendar Sesión Estratégica",
    ctaDesc: "Sin costo. Evaluamos tu arquitectura actual y planificamos tu digitalización."
  },
  en: {
    badge: "Digital Engineering Solutions",
    title: "Elite Digital",
    spanText: "Services & AI",
    subtitle: "High-performance web platforms and digital advertising architectures engineered using advanced attribution algorithms.",
    
    // Core Disciplines
    webDevTitle: "AI-Powered Web & Portal Engineering",
    webDevDesc: "We don't do boilerplate templates. We code ultra-fast, highly-scalable, and secure custom applications matching modern visual standard with natural language search engines.",
    
    adsTitle: "Multi-Channel Acquisition Infrastructure",
    adsDesc: "Hyper-optimized ad account architecture focused heavily on ROI/ROAS metrics. We configure end-to-end funnels paired with custom server APIs and CRM bridges.",
    
    // Feature Grid Titles
    coreFeaturesTitle: "Our Technical Disciplines",
    coreFeaturesSubtitle: "Every single project is built on enterprise-level paradigms to ensure high security, low latency, and robust scaling.",
    
    feature1Title: "React & Vite Serverless Architectures",
    feature1Desc: "Blazing-fast static and dynamic single-page applications engineered to score 100/100 on Google PageSpeed metrics.",
    
    feature2Title: "Custom NLP & AI Agents",
    feature2Desc: "Train custom LLMs, smart widgets, and semantically grounded virtual assistants that talk directly with your customer base.",
    
    feature3Title: "Server-Side Conversions API",
    feature3Desc: "Bypass iOS 14+ tracking constraints by routing behavioral events securely via backend requests to Meta & Google.",
    
    feature4Title: "CRM & WhatsApp Automations",
    feature4Desc: "Direct high-intent web leads directly into your sales pipelines with auto-assigned CRM tags and instant triggers.",

    // Pipeline
    pipelineTitle: "Our Technical Workflow",
    pipelineSubtitle: "Launches executed with absolute mathematical precision across 5 standardized project phases.",
    
    phase1: "Phase 1: Discovery & Strategy Blueprint",
    phase1Desc: "Deep market analysis, competitive auditing, and detailed systems architecture planning.",
    
    phase2: "Phase 2: High-Density UI/UX Design",
    phase2Desc: "Interactive prototypes prioritizing elite visual aesthetics, clean hierarchy, and user intent.",
    
    phase3: "Phase 3: Clean Development & Optimization",
    phase3Desc: "Highly modular, semantic code with lazy loading, modern state management, and robust API hooks.",
    
    phase4: "Phase 4: Cloud Run Deployment",
    phase4Desc: "Continuous serverless deployments on global edge networks with SSL, caching, and redundant CDNs.",
    
    phase5: "Phase 5: Performance Marketing Launch",
    phase5Desc: "Targeted digital campaigns launch with server-side tracking, customized audience segments, and daily attribution tuning.",

    // Tech Stack Section
    techTitle: "Our Modern Technology Stack",
    techSubtitle: "The advanced modern toolkit we leverage.",
    ctaText: "Schedule Strategic Consultation",
    ctaDesc: "Zero cost. We audit your current tech stack and structure a modern scale roadmap."
  }
};

const PIPELINE_PHASES = [
  { id: 1, keyTitle: "phase1", keyDesc: "phase1Desc", color: "from-cyan-400 to-sky-500", shadow: "shadow-cyan-400/20" },
  { id: 2, keyTitle: "phase2", keyDesc: "phase2Desc", color: "from-blue-400 to-indigo-500", shadow: "shadow-blue-400/20" },
  { id: 3, keyTitle: "phase3", keyDesc: "phase3Desc", color: "from-purple-400 to-fuchsia-500", shadow: "shadow-purple-400/20" },
  { id: 4, keyTitle: "phase4", keyDesc: "phase4Desc", color: "from-emerald-400 to-teal-500", shadow: "shadow-emerald-400/20" },
  { id: 5, keyTitle: "phase5", keyDesc: "phase5Desc", color: "from-amber-400 to-orange-500", shadow: "shadow-amber-400/20" },
];

export default function ServiciosPage({ lang, onOpenContact }: ServiciosPageProps) {
  const t = LOCAL_TRANSLATIONS[lang];
  const [activePipeline, setActivePipeline] = useState<number>(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full"
      id="servicios-page-container"
    >
      {/* Hero Header */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-[#071330] border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04]" />
        
        {/* Subtle Ambient Glowing Orbs */}
        <div className="absolute -top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute -bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-400 border border-cyan-400/20 uppercase tracking-widest font-mono">
            <Cpu className="h-3.5 w-3.5" />
            {t.badge}
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {t.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">{t.spanText}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Two Core Disciplines Deep-Dive */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-24">
        
        {/* Discipline 1: Web Development */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="h-12 w-12 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 shadow-md">
              <Code2 className="h-6 w-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.webDevTitle}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.webDevDesc}
            </p>
            
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>SPA & SSR Next-Gen:</strong> Sitios web dinámicos cargados con transiciones de rutas fluidas.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Inteligencia Artificial Integrada:</strong> Soluciones cognitivas personalizadas y búsqueda por lenguaje natural.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Panel Administrativo Intuitivo:</strong> Edición simplificada de contenidos en segundos sin tocar código.</span>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={() => onOpenContact(t.webDevTitle)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white font-bold px-6 py-3.5 text-sm transition-all shadow-lg shadow-cyan-500/15 active:scale-95 cursor-pointer"
              >
                <span>{lang === "es" ? "Cotizar Proyecto Web" : "Get Web Proposal"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Interactive visual block representing code editor / performance metrics */}
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-cyan-500/5 rounded-3xl blur-2xl pointer-events-none" />
            
            {/* Glassmorphism Sandbox Frame */}
            <div className="relative rounded-3xl border border-white/10 bg-[#091b40]/90 p-6 sm:p-8 shadow-2xl overflow-hidden space-y-6">
              
              {/* Header simulator */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-rose-500" />
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">clickboost-media // web-engine.tsx</span>
              </div>

              {/* Fake Code / Metrics */}
              <div className="space-y-4 font-mono text-xs text-left">
                <div className="flex items-center gap-3 bg-slate-950/40 p-3 rounded-xl border border-white/5">
                  <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <div>
                    <p className="text-[10px] text-slate-400 leading-none">GOOGLE LIGHTHOUSE SCORE</p>
                    <p className="text-emerald-400 font-bold text-sm">100 / 100 PERFECT PERFORMANCE</p>
                  </div>
                </div>

                <div className="space-y-1 p-3 bg-slate-950/60 rounded-xl border border-white/5">
                  <p className="text-cyan-400 font-bold">const initAIEngine = async () {"=>"} &#123;</p>
                  <p className="text-slate-300 pl-4">const model = await GoogleGenAI.getSemanticModel();</p>
                  <p className="text-slate-300 pl-4">const response = await model.generateAnswer(userInput);</p>
                  <p className="text-emerald-400 pl-4">return response.renderSmartComponents();</p>
                  <p className="text-cyan-400">&#125;;</p>
                </div>

                {/* Simulated Server Ping */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Server status: ONLINE (Edge US-East)
                  </span>
                  <span>TTFB: 32ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discipline 2: Publicidad Digital */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12">
          
          {/* Visual block representing marketing metrics / performance */}
          <div className="lg:col-span-6 relative order-last lg:order-first">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-sky-500/5 rounded-3xl blur-2xl pointer-events-none" />
            
            {/* Glassmorphism Sandbox Frame */}
            <div className="relative rounded-3xl border border-white/10 bg-[#091b40]/90 p-6 sm:p-8 shadow-2xl overflow-hidden space-y-6">
              
              {/* Header simulator */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-3.5 rounded-full bg-sky-500/20 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide">ROAS ANALYTICS PLATFORM</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">KPI LIVE FEED</span>
              </div>

              {/* Conversion Statistics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 space-y-1 text-left">
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">Inversión Ads</span>
                  <span className="text-lg font-extrabold text-white font-mono">$1,200 USD</span>
                </div>
                <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 space-y-1 text-left">
                  <span className="text-[9px] font-mono text-slate-400 uppercase block">Retorno Directo</span>
                  <span className="text-lg font-extrabold text-emerald-400 font-mono">$5,760 USD</span>
                </div>
              </div>

              {/* ROAS bar indicator */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">Retorno de Inversión (ROAS)</span>
                  <span className="text-emerald-400 font-bold">4.8x promedio</span>
                </div>
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "88%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-sky-400" 
                  />
                </div>
              </div>

              {/* API Conversiones Trigger Simulator */}
              <div className="bg-slate-950/80 p-3 rounded-xl border border-white/10 flex items-center justify-between text-[11px] font-mono text-left">
                <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <Workflow className="h-3.5 w-3.5 text-sky-400" />
                  Meta Server API: EVENT_CONVERSION_SUCCESS
                </span>
                <span className="text-sky-300">Verified</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 shadow-md">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.adsTitle}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.adsDesc}
            </p>
            
            <ul className="space-y-3 pt-2">
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Estructura Profesional CBO / ABO:</strong> Campañas optimizadas según presupuesto de campaña o conjunto de anuncios.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Creativos Dinámicos Magnéticos:</strong> Creación y variación constante de videos de alto impacto para bajar el costo de adquisición.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-200">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Retargeting Semántico Avanzado:</strong> Alimenta tus pixeles con audiencias sumamente segmentadas para recuperar carritos vacíos o prospectos tibios.</span>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={() => onOpenContact(t.adsTitle)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-white font-bold px-6 py-3.5 text-sm transition-all shadow-lg shadow-emerald-500/15 active:scale-95 cursor-pointer"
              >
                <span>{lang === "es" ? "Escalar Mis Anuncios" : "Scale My Ads Campaign"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* Feature Disciplines Grid */}
      <section className="relative py-24 sm:py-32 bg-[#091b40]/60 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t.coreFeaturesTitle}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t.coreFeaturesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            {/* Feature 1 */}
            <div className="relative rounded-2xl border border-white/5 bg-[#071330]/80 p-6 sm:p-8 space-y-4 shadow-xl hover:border-sky-500/20 transition-all group">
              <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-2">
                <Terminal className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">{t.feature1Title}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{t.feature1Desc}</p>
            </div>

            {/* Feature 2 */}
            <div className="relative rounded-2xl border border-white/5 bg-[#071330]/80 p-6 sm:p-8 space-y-4 shadow-xl hover:border-sky-500/20 transition-all group">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400 mb-2">
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">{t.feature2Title}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{t.feature2Desc}</p>
            </div>

            {/* Feature 3 */}
            <div className="relative rounded-2xl border border-white/5 bg-[#071330]/80 p-6 sm:p-8 space-y-4 shadow-xl hover:border-sky-500/20 transition-all group">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 mb-2">
                <Database className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">{t.feature3Title}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{t.feature3Desc}</p>
            </div>

            {/* Feature 4 */}
            <div className="relative rounded-2xl border border-white/5 bg-[#071330]/80 p-6 sm:p-8 space-y-4 shadow-xl hover:border-sky-500/20 transition-all group">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-2">
                <Workflow className="h-5 w-5" />
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight">{t.feature4Title}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{t.feature4Desc}</p>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Project Development Timeline/Pipeline */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-mono text-cyan-400 border border-cyan-400/20 uppercase tracking-widest">
            ENGINEERING WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t.pipelineTitle}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.pipelineSubtitle}
          </p>
        </div>

        {/* Pipeline Interactive Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
          
          {/* Timeline phases selector (5 columns) */}
          <div className="lg:col-span-5 space-y-3">
            {PIPELINE_PHASES.map((phase) => {
              const isActive = activePipeline === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePipeline(phase.id)}
                  className={`w-full text-left rounded-2xl p-5 border transition-all flex items-center gap-4 relative cursor-pointer outline-none select-none ${
                    isActive 
                      ? "bg-[#091b40]/80 border-sky-400/30 shadow-lg text-white" 
                      : "bg-slate-950/20 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-950/40"
                  }`}
                >
                  <div className={`h-8 w-8 rounded-lg bg-gradient-to-tr ${phase.color} ${phase.shadow} flex items-center justify-center font-bold text-xs text-white`}>
                    0{phase.id}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold tracking-tight leading-none uppercase">
                      {t[phase.keyTitle as keyof typeof t]}
                    </h4>
                  </div>

                  {isActive && (
                    <div className="absolute right-4 h-2 w-2 rounded-full bg-sky-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Timeline phase detailed explanation block (7 columns) */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              {PIPELINE_PHASES.map((phase) => {
                if (phase.id !== activePipeline) return null;
                return (
                  <motion.div
                    key={phase.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    className="relative rounded-3xl border border-white/10 bg-[#091b40]/90 p-8 sm:p-10 shadow-2xl space-y-6 text-left h-full flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold tracking-widest text-[#38bdf8] uppercase">
                          PHASE 0{phase.id} DETAILED OUTCOME
                        </span>
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      </div>

                      <h3 className="text-2xl font-extrabold text-white tracking-tight leading-none">
                        {t[phase.keyTitle as keyof typeof t]}
                      </h3>

                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                        {t[phase.keyDesc as keyof typeof t]}
                      </p>

                      <div className="h-px bg-white/5 pt-2" />

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 uppercase">TIEMPO ESTIMADO</span>
                          <p className="text-xs font-bold text-white font-mono">
                            {phase.id === 1 ? "2-3 Días" : phase.id === 2 ? "3-5 Días" : phase.id === 3 ? "5-10 Días" : phase.id === 4 ? "1-2 Días" : "Continuo"}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-slate-400 uppercase">RESPONSABLE CLAVE</span>
                          <p className="text-xs font-bold text-white font-mono">
                            {phase.id === 1 ? "Arquitecto de Software" : phase.id === 2 ? "Diseñador Senior" : phase.id === 3 ? "Ingeniero Full-stack" : phase.id === 4 ? "DevOps & Cloud" : "Especialista Ads"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => onOpenContact(`Especialista Fase 0${phase.id}`)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-[#38bdf8] hover:text-white transition-colors cursor-pointer"
                      >
                        <span>{lang === "es" ? "CONSULTAR SOBRE ESTA FASE" : "INQUIRE ABOUT THIS PHASE"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* Tech Stack Banner */}
      <section className="relative py-24 sm:py-32 bg-[#071330] border-t border-white/5 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#091b40]/40 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
          
          <div className="space-y-3">
            <span className="text-xs font-bold text-sky-400 tracking-widest uppercase font-mono">{t.techSubtitle}</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">{t.techTitle}</h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-70">
            {["React 19", "Vite", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Meta API", "Google Cloud", "CRM Automated"].map((tech, i) => (
              <span key={i} className="text-xs sm:text-sm font-mono font-bold text-slate-400 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                {tech}
              </span>
            ))}
          </div>

          {/* Quick Consultation CTA */}
          <div className="pt-10 max-w-xl mx-auto space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed font-sans">{t.ctaDesc}</p>
            <button
              onClick={() => onOpenContact("Sesión Estratégica")}
              className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-950 hover:bg-slate-200 font-bold px-6 py-4 text-sm transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              <PhoneCall className="h-4.5 w-4.5 text-sky-500 fill-sky-500/10" />
              <span>{t.ctaText}</span>
            </button>
          </div>

        </div>
      </section>

    </motion.div>
  );
}
