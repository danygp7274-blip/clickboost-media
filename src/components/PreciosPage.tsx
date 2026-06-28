import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator, 
  Sparkles, 
  Check, 
  HelpCircle, 
  Zap, 
  DollarSign, 
  ArrowRight, 
  AlertCircle, 
  Compass, 
  TrendingUp, 
  Layers, 
  Flame, 
  Workflow, 
  Cpu,
  BadgeDollarSign
} from "lucide-react";
import { Language } from "../translations";

interface PreciosPageProps {
  lang: Language;
  currency: "USD" | "MXN";
  setCurrency: (cur: "USD" | "MXN") => void;
  exchangeRate: number;
  onOpenFastTrack: (planName: string, waUrl: string) => void;
  onOpenContact: (serviceName?: string) => void;
}

const PLANS_DATA = {
  web: [
    {
      id: "plan-sencillo",
      name: "Plan Sencillo",
      nameEn: "Single Launch Plan",
      priceUSD: 149,
      badge: "Lanzamiento Rápido",
      badgeEn: "Express Launch",
      desc: "Excelente para profesionales, emprendedores o startups que necesitan presencia digital inmediata y pulida.",
      descEn: "Perfect for independent professionals, entrepreneurs or startups needing clean, immediate digital footprint.",
      popular: false,
      features: [
        "1 Sección Principal (Landing Page Ultra-Estilizada)",
        "Diseño Adaptativo Móvil al 100%",
        "Formulario de Contacto Funcional",
        "Integración Directa con WhatsApp",
        "Animaciones sutiles y profesionales",
        "SEO Técnico básico y velocidad optimizada"
      ],
      featuresEn: [
        "1 Main Landing Page Section (High-Density Design)",
        "100% Responsive Layout for Mobile",
        "Fully Functional Lead Capture Form",
        "Direct WhatsApp Instant Click Integration",
        "Sleek and professional animations",
        "Basic Core Web Vitals SEO checklist"
      ],
      ctaText: "Contratar Plan Sencillo",
      ctaTextEn: "Order Single Launch",
      waText: "Hola! Estoy interesado en el Plan Sencillo para crear mi sitio web con Click boost Media"
    },
    {
      id: "plan-agregado",
      name: "Plan Agregado",
      nameEn: "Growth Engine Plan",
      priceUSD: 399,
      badge: "El Más Solicitado",
      badgeEn: "Most Requested",
      desc: "Ideal para empresas en crecimiento que buscan exhibir servicios detallados y automatizar su captación de prospectos.",
      descEn: "Engineered for growing businesses wanting separate landing points and automation integrations.",
      popular: true,
      features: [
        "Hasta 5 Secciones Independientes (Inicio, Servicios, FAQs, etc.)",
        "Llamadas a la Acción (CTA) dinámicas de alta conversión",
        "Integración con CRM o Google Sheets automatizado",
        "Animaciones premium, carga diferida",
        "Hosting optimizado con CDN por 1 año",
        "Soporte post-lanzamiento de 30 días"
      ],
      featuresEn: [
        "Up to 5 Fully Configured Sections (Home, Services, FAQs, etc.)",
        "Dynamic High-Conversion Calls to Action",
        "Direct API Integration with CRM or Google Sheets",
        "Premium layout animations, lazy loading optimization",
        "Optimized SSD Cloud Hosting with CDN for 1 year",
        "30-day dedicated post-launch assistance"
      ],
      ctaText: "Contratar Plan Agregado",
      ctaTextEn: "Order Growth Engine",
      waText: "Hola! Estoy interesado en el Plan Agregado para crear mi sitio web con Click boost Media"
    },
    {
      id: "plan-corporativo",
      name: "Plan Corporativo",
      nameEn: "Enterprise Intelligence Plan",
      priceUSD: 799,
      badge: "Poder Ilimitado",
      badgeEn: "Uncapped Power",
      desc: "Desarrollo a medida con integraciones complejas, automatizaciones avanzadas y componentes impulsados por Inteligencia Artificial.",
      descEn: "Bespoke development with sophisticated integrations, database services, and custom AI components.",
      popular: false,
      features: [
        "Secciones y Páginas Ilimitadas",
        "Asistente Virtual / Chatbot IA entrenado con tus datos",
        "Multi-idioma instantáneo (Bilingüe ES/EN)",
        "Panel Administrativo autogestionable avanzado",
        "Configuración de Analytics, Píxeles y Atribución Server-side",
        "Capacitación de uso por videollamada de 2 horas"
      ],
      featuresEn: [
        "Unlimited custom layouts and landing paths",
        "Fully automated Virtual Assistant/AI chatbot matching your records",
        "Dynamic Bilingual Translation architecture (ES/EN)",
        "Advanced self-managing administrative console",
        "Sovereign Analytics, Conversion API, and pixel deployment",
        "2-hour dedicated team onboarding workshop via Meet/Zoom"
      ],
      ctaText: "Contratar Plan Corporativo",
      ctaTextEn: "Order Enterprise Plan",
      waText: "Hola! Estoy interesado en el Plan Corporativo para crear mi sitio web con Click boost Media"
    }
  ],
  ads: [
    {
      id: "plan-ads-inicial",
      name: "Ads Inicial",
      nameEn: "Starter Ads Plan",
      priceUSD: 199,
      badge: "Tracción Inmediata",
      badgeEn: "Immediate Traction",
      desc: "Perfecto para negocios locales o de nicho que quieren validar su oferta y captar sus primeros clientes de inmediato.",
      descEn: "Designed for local businesses or early-stage products wanting validated conversion funnels right away.",
      popular: false,
      features: [
        "Configuración y Estructura de 1 Canal (Meta Ads o Google Ads)",
        "Investigación profunda de palabras clave o públicos ideales",
        "Estructura de pauta profesional CBO/ABO",
        "Monitoreo semanal del retorno y costo por lead",
        "Reporte de resultados simple cada 15 días",
        "Optimización de presupuesto para evitar desperdicio"
      ],
      featuresEn: [
        "Complete 1-Channel Advertising Pipeline Setup (Meta Ads or Google)",
        "Deep competitor, keyword, and audience demographic analysis",
        "Professional CBO/ABO ad set budget allocation setup",
        "Weekly performance audit on Acquisition Cost (CPA)",
        "Simple bi-weekly performance spreadsheet reviews",
        "Constant bid adjustments to minimize wasted ad spend"
      ],
      ctaText: "Contratar Ads Inicial",
      ctaTextEn: "Order Starter Ads",
      waText: "Hola! Estoy interesado en el Plan Ads Inicial con Click boost Media"
    },
    {
      id: "plan-ads-multicanal",
      name: "Multi-Canal",
      nameEn: "Multi-Channel Scaling",
      priceUSD: 399,
      badge: "Escalabilidad Total",
      badgeEn: "Full Scale",
      desc: "Estrategias omnicanal robustas combinando múltiples plataformas publicitarias para adueñarse de tu sector comercial.",
      descEn: "Sophisticated omni-channel acquisition architectures connecting multiple ad networks concurrently.",
      popular: true,
      features: [
        "Campaña coordinada Meta Ads (FB/IG) + Google Search/Display",
        "Retargeting dinámico para re-impactar prospectos indecisos",
        "Creación de copys (textos publicitarios) altamente persuasivos",
        "Píxeles y API de Conversión configurados al 100%",
        "Dashboard interactivo en tiempo real para ver tus métricas",
        "Llamadas semanales de revisión y ajuste estratégico"
      ],
      featuresEn: [
        "Coordinated Meta Ads (FB/IG) + Google Search/Display setup",
        "Dynamic behavioral remarketing to convert warm prospects",
        "High-persuasion copywriting and hook angles generator",
        "Pixel verification and Server-Side Conversion API integration",
        "Dynamic live analytical dashboard tracking your campaign ROAS",
        "Weekly optimization briefing sessions with your account lead"
      ],
      ctaText: "Contratar Plan Multi-Canal",
      ctaTextEn: "Order Multi-Channel",
      waText: "Hola! Estoy interesado en el Plan Multi-Canal de Publicidad con Click boost Media"
    },
    {
      id: "dominio-absoluto",
      name: "Dominio Absoluto",
      nameEn: "Absolute Market Domain",
      priceUSD: 699,
      badge: "Socio de Crecimiento",
      badgeEn: "Growth Partner",
      desc: "El plan definitivo para corporaciones que exigen dominio absoluto del mercado digital, embudos a escala e integraciones CRM.",
      descEn: "Ultimate corporate package designed for maximum brand presence, advanced workflows and unified CRMs.",
      popular: false,
      features: [
        "Estrategia Omnicanal sin límites (Meta, Google, YouTube, TikTok)",
        "Automatización total del embudo de leads a llamadas calificadas",
        "Edición de videos publicitarios y creativos dinámicos por nuestro equipo",
        "Integración Server-to-Server para optimización offline en CRM",
        "Soporte prioritario 24/7 vía canal de comunicación privado",
        "Auditoría continua de usabilidad (CRO) del sitio web de destino"
      ],
      featuresEn: [
        "Unlimited Multi-Platform Strategy (Meta, Google, YouTube, TikTok)",
        "End-to-end automated qualified leads routing to Sales teams",
        "Video editing, design iteration, and creative hooks generated monthly",
        "Server-to-Server offline conversion sync within CRM",
        "Priority 24/7 technical and strategic assistance channel",
        "Continuous Destination Page Conversion Rate Optimization (CRO)"
      ],
      ctaText: "Contratar Dominio Absoluto",
      ctaTextEn: "Order Absolute Domain",
      waText: "Hola! Estoy interesado en el Plan Dominio Absoluto con Click boost Media"
    }
  ]
};

export default function PreciosPage({
  lang,
  currency,
  setCurrency,
  exchangeRate,
  onOpenFastTrack,
  onOpenContact
}: PreciosPageProps) {
  const [activeCategory, setActiveCategory] = useState<"web" | "ads">("web");

  // Custom Project Configurator State
  const [calcPages, setCalcPages] = useState<number>(3); // 1 to 10
  const [calcAIBot, setCalcAIBot] = useState<boolean>(false);
  const [calcBilingual, setCalcBilingual] = useState<boolean>(false);
  const [calcCRM, setCalcCRM] = useState<boolean>(false);
  const [calcHosting, setCalcHosting] = useState<boolean>(true);

  // Marketing ROI Calculator State
  const [roiBudget, setRoiBudget] = useState<number>(1000); // 300 to 10000 USD
  const [roiAOV, setRoiAOV] = useState<number>(50); // 10 to 500 USD
  const [roiConvRate, setRoiConvRate] = useState<number>(2.5); // 0.5% to 8%
  const [roiROAS, setRoiROAS] = useState<number>(3.5); // 1x to 8x

  // Format Helper matching currency selection
  const formatPrice = (usdVal: number) => {
    if (currency === "MXN") {
      return `$${Math.round(usdVal * exchangeRate).toLocaleString()} MXN`;
    }
    return `$${usdVal.toLocaleString()} USD`;
  };

  // Web Project Configurator Estimate
  const calculatedWebPrice = useMemo(() => {
    let base = 149; // base single section
    if (calcPages > 1) {
      base += (calcPages - 1) * 60; // $60 extra per additional page/section
    }
    if (calcAIBot) base += 250; // AI Bot feature
    if (calcBilingual) base += 180; // Bilingual structure
    if (calcCRM) base += 120; // CRM connectivity
    if (calcHosting) base += 80; // Secure hosting and CDN setup
    return base;
  }, [calcPages, calcAIBot, calcBilingual, calcCRM, calcHosting]);

  // Marketing ROI Calculator Estimations
  const roiResults = useMemo(() => {
    // Basic marketing mechanics calculation
    const avgCPC = 0.50; // average CPC estimate in USD
    const estimatedClicks = Math.round(roiBudget / avgCPC);
    const estimatedSales = Math.round(estimatedClicks * (roiConvRate / 100));
    const estimatedRevenue = estimatedSales * roiAOV;
    
    // Revenue based on ROAS slider is more accurate to what a client expects
    const targetRevenue = roiBudget * roiROAS;
    const targetSales = Math.round(targetRevenue / roiAOV);
    const netProfit = targetRevenue - roiBudget;

    return {
      clicks: estimatedClicks,
      sales: targetSales,
      revenue: targetRevenue,
      profit: netProfit,
      actualROAS: roiROAS.toFixed(1)
    };
  }, [roiBudget, roiAOV, roiConvRate, roiROAS]);

  // Construct Custom Web Config WhatsApp Message URL
  const handleConfigContact = () => {
    const textES = `Hola!%20Utilic%C3%A9%20el%20configurador%20web%20en%20su%20p%C3%A1gina%20y%20quiero%20cotizar:%20SITIO%20DE%20${calcPages}%20SECCIONES%20${calcAIBot ? "%2B%20BOT%20INTELIGENTE" : ""}%20${calcBilingual ? "%2B%20BILING%C3%9CE" : ""}%20${calcCRM ? "%2B%20CONEXI%C3%93N%20CRM" : ""}%20${calcHosting ? "%2B%20HOSTING" : ""}.%20Precio%20estimado:%20${formatPrice(calculatedWebPrice)}`;
    const textEN = `Hi!%20I%20used%20your%20web%20configurator%20tool%20and%20want%20to%20quote:%20${calcPages}-SECTION%20SITE%20${calcAIBot ? "%2B%20AI%20CHATBOT" : ""}%20${calcBilingual ? "%2B%20BILINGUAL" : ""}%20${calcCRM ? "%2B%20CRM%20API" : ""}%20${calcHosting ? "%2B%20HOSTING" : ""}.%20Estimated%20price:%20${formatPrice(calculatedWebPrice)}`;
    const text = lang === "es" ? textES : textEN;
    const waUrl = `https://wa.me/525647805021?text=${text}`;
    onOpenFastTrack(`Custom Config (${calcPages} Sec)`, waUrl);
  };

  const currentCategoryPlans = PLANS_DATA[activeCategory];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full"
      id="precios-page-container"
    >
      {/* Hero Header */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-[#071330] border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04]" />
        <div className="absolute -top-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute -bottom-1/4 left-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-400/20 uppercase tracking-widest font-mono">
            <BadgeDollarSign className="h-3.5 w-3.5" />
            {lang === "es" ? "Inversión Transparente" : "Transparent Investment"}
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            {lang === "es" ? "Planes de Inversión" : "Pricing & Investment"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">{lang === "es" ? "Justos" : "Plans"}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-slate-300 text-base sm:text-lg leading-relaxed font-sans">
            {lang === "es"
              ? "Despliega plataformas de nivel mundial y pauta digital optimizada. Explora tarifas fijas o estima tu proyecto a medida a continuación."
              : "Deploy world-class portals and ROI-tuned digital campaigns. Choose standard plans below or use our dynamic sliders for custom quotes."
            }
          </p>

          {/* Currency Switcher synced with App */}
          <div className="flex justify-center pt-4">
            <div className="inline-flex p-1 rounded-2xl bg-slate-950/80 border border-white/10 relative">
              <button
                onClick={() => setCurrency("USD")}
                className={`relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer select-none ${
                  currency === "USD"
                    ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-500/15"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🇺🇸 USD ($)</span>
              </button>
              <button
                onClick={() => setCurrency("MXN")}
                className={`relative z-10 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer select-none ${
                  currency === "MXN"
                    ? "bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-500/15"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>🇲🇽 MXN ($)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Selector & Standard Pricing Cards */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
        
        {/* Toggle between Web Plans and Ads Plans */}
        <div className="flex justify-center">
          <div className="bg-slate-950/50 p-1.5 rounded-2xl border border-white/5 flex items-center relative z-10">
            <button
              onClick={() => setActiveCategory("web")}
              className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer relative select-none flex items-center gap-2 ${
                activeCategory === "web"
                  ? "bg-[#091b40] text-cyan-400 border border-cyan-400/20 shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="h-4.5 w-4.5" />
              <span>{lang === "es" ? "Diseño & Desarrollo Web" : "Web Development Plans"}</span>
            </button>
            <button
              onClick={() => setActiveCategory("ads")}
              className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all cursor-pointer relative select-none flex items-center gap-2 ${
                activeCategory === "ads"
                  ? "bg-[#091b40] text-emerald-400 border border-emerald-400/20 shadow-md"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <TrendingUp className="h-4.5 w-4.5" />
              <span>{lang === "es" ? "Campañas Publicitarias" : "Advertising Campaigns"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic pricing grids matching selected tab */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-4">
          <AnimatePresence mode="wait">
            {currentCategoryPlans.map((plan) => {
              const displayPrice = formatPrice(plan.priceUSD);
              const planName = lang === "es" ? plan.name : plan.nameEn;
              const planDesc = lang === "es" ? plan.desc : plan.descEn;
              const planBadge = lang === "es" ? plan.badge : plan.badgeEn;
              const planCtaText = lang === "es" ? plan.ctaText : plan.ctaTextEn;
              const planFeatures = lang === "es" ? plan.features : plan.featuresEn;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, scale: 0.98, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -15 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -6 }}
                  className={`relative rounded-3xl border p-8 flex flex-col justify-between overflow-hidden z-10 text-left ${
                    plan.popular
                      ? activeCategory === "web" 
                        ? "border-sky-400 bg-[#091b40]/80 shadow-2xl shadow-sky-500/10" 
                        : "border-emerald-500 bg-[#09223c]/80 shadow-2xl shadow-emerald-500/10"
                      : "border-white/10 bg-slate-950/40 hover:border-white/20"
                  }`}
                >
                  {plan.popular && (
                    <div className={`absolute top-4 right-4 rounded-full px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest ${
                      activeCategory === "web" ? "bg-sky-400/10 text-sky-400 border border-sky-400/20" : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    }`}>
                      {planBadge}
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
                        {activeCategory === "web" ? "SOFTWARE ENGINEERING" : "METRICS DRIVEN"}
                      </span>
                      <h3 className="text-2xl font-extrabold text-white mt-1">{planName}</h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed h-12 overflow-hidden">{planDesc}</p>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-white font-mono tracking-tight">{displayPrice}</span>
                      {activeCategory === "ads" && (
                        <span className="text-xs text-slate-400 font-mono">/ {lang === "es" ? "mes" : "mo"}</span>
                      )}
                    </div>

                    <div className="h-px bg-white/5" />

                    <ul className="space-y-3.5">
                      {planFeatures.map((feat, index) => (
                        <li key={index} className="flex items-start gap-3 text-xs leading-relaxed text-slate-300">
                          <Check className={`h-4.5 w-4.5 shrink-0 mt-0.5 ${plan.popular ? "text-cyan-400" : "text-slate-400"}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={() => {
                        const baseWa = `https://wa.me/525647805021?text=${encodeURIComponent(plan.waText)}`;
                        onOpenFastTrack(planName, baseWa);
                      }}
                      className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-md ${
                        plan.popular
                          ? activeCategory === "web"
                            ? "bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 shadow-cyan-400/10"
                            : "bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 shadow-emerald-400/10"
                          : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                      }`}
                    >
                      <span>{planCtaText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </section>

      {/* Interactive Tool 1: Custom Web Project Estimator */}
      <section className="relative py-24 bg-[#091b40]/40 border-y border-white/5 overflow-hidden text-left">
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02]" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-mono text-cyan-400 border border-cyan-400/20 uppercase tracking-widest">
              BUILDER TOOL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {lang === "es" ? "Configurador de Sitios Web" : "Interactive Project Builder"}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {lang === "es"
                ? "Elige exactamente los componentes que requiere tu plataforma corporativa. Desliza las secciones necesarias y activa módulos opcionales para ver una estimación transparente en tiempo real."
                : "Estimate custom technical scopes on the fly. Drag section parameters and select complex micro-services (like LLM training or multilingual layouts) below."
              }
            </p>

            {/* Range slider for sections/pages */}
            <div className="space-y-3 pt-4">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>{lang === "es" ? "Secciones o páginas independientes:" : "Total Sections / Navigation Landing Pages:"}</span>
                <span className="text-cyan-400 font-extrabold">{calcPages} {calcPages === 1 ? (lang === "es" ? "Sección" : "Section") : (lang === "es" ? "Secciones" : "Sections")}</span>
              </div>
              <input 
                type="range" 
                min={1} 
                max={10} 
                value={calcPages}
                onChange={(e) => setCalcPages(parseInt(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-900 rounded-lg cursor-pointer border border-white/5 outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1 (Landing Sencilla)</span>
                <span>5 (Portal Estándar)</span>
                <span>10 (Corporativo Complejo)</span>
              </div>
            </div>

            {/* Checkboxes parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              
              {/* Feature A: AI chatbot */}
              <button
                onClick={() => setCalcAIBot(!calcAIBot)}
                className={`flex items-center gap-3 rounded-2xl p-4 border text-left cursor-pointer transition-all select-none ${
                  calcAIBot ? "bg-cyan-500/10 border-cyan-400 text-white" : "bg-slate-950/20 border-white/5 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center shrink-0 ${calcAIBot ? "bg-cyan-400 border-cyan-400 text-slate-950" : "border-white/20"}`}>
                  {calcAIBot && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{lang === "es" ? "Asistente Virtual IA" : "AI Customer Chatbot"}</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">{lang === "es" ? "Entrenado con tus datos" : "Contextualized smart bot"}</p>
                </div>
              </button>

              {/* Feature B: Bilingual */}
              <button
                onClick={() => setCalcBilingual(!calcBilingual)}
                className={`flex items-center gap-3 rounded-2xl p-4 border text-left cursor-pointer transition-all select-none ${
                  calcBilingual ? "bg-cyan-500/10 border-cyan-400 text-white" : "bg-slate-950/20 border-white/5 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center shrink-0 ${calcBilingual ? "bg-cyan-400 border-cyan-400 text-slate-950" : "border-white/20"}`}>
                  {calcBilingual && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{lang === "es" ? "Multilingüe ES/EN" : "Bilingual Framework"}</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">{lang === "es" ? "Estructura traducida" : "Dynamic language hooks"}</p>
                </div>
              </button>

              {/* Feature C: CRM integration */}
              <button
                onClick={() => setCalcCRM(!calcCRM)}
                className={`flex items-center gap-3 rounded-2xl p-4 border text-left cursor-pointer transition-all select-none ${
                  calcCRM ? "bg-cyan-500/10 border-cyan-400 text-white" : "bg-slate-950/20 border-white/5 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center shrink-0 ${calcCRM ? "bg-cyan-400 border-cyan-400 text-slate-950" : "border-white/20"}`}>
                  {calcCRM && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{lang === "es" ? "Conexión CRM / Sheets" : "CRM / Automation Sync"}</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">{lang === "es" ? "Traspaso de leads instantáneo" : "Automated spreadsheet sync"}</p>
                </div>
              </button>

              {/* Feature D: Cloud Hosting */}
              <button
                onClick={() => setCalcHosting(!calcHosting)}
                className={`flex items-center gap-3 rounded-2xl p-4 border text-left cursor-pointer transition-all select-none ${
                  calcHosting ? "bg-cyan-500/10 border-cyan-400 text-white" : "bg-slate-950/20 border-white/5 text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center shrink-0 ${calcHosting ? "bg-cyan-400 border-cyan-400 text-slate-950" : "border-white/20"}`}>
                  {calcHosting && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">{lang === "es" ? "Hosting & CDN Express" : "Enterprise Hosting & CDN"}</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">{lang === "es" ? "Servidor premium 1 año" : "Global servers SSL"}</p>
                </div>
              </button>

            </div>
          </div>

          {/* Calculator Output Card */}
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />
            
            <div className="relative rounded-3xl border border-cyan-400/20 bg-slate-950/90 p-8 sm:p-10 shadow-2xl text-center space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase font-extrabold bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
                {lang === "es" ? "PROPUESTA DE COTIZACIÓN ESTIMADA" : "ESTIMATED PROPOSAL SUMMARY"}
              </span>

              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-mono">{lang === "es" ? "Inversión Única Estimada:" : "One-time Estimated Investment:"}</span>
                <span className="text-5xl font-extrabold text-white font-mono tracking-tight">
                  {formatPrice(calculatedWebPrice)}
                </span>
                <span className="text-[10px] text-slate-500 block font-mono pt-1">
                  * {lang === "es" ? "Impuestos incluidos • Código modular transferible" : "All assets compiled and transferred upon completion"}
                </span>
              </div>

              <div className="h-px bg-white/5" />

              <div className="text-left text-xs text-slate-300 space-y-2.5">
                <div className="flex justify-between">
                  <span>{lang === "es" ? "Páginas del proyecto" : "Page templates"}</span>
                  <span className="font-bold text-white">{calcPages} sections</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === "es" ? "Módulo Asistente de IA" : "AI Smart module"}</span>
                  <span className="font-bold text-white">{calcAIBot ? (lang === "es" ? "Sí (Incluido)" : "Yes (Active)") : (lang === "es" ? "No" : "No")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === "es" ? "Multi-idioma (Bilingüe)" : "Bilingual setup"}</span>
                  <span className="font-bold text-white">{calcBilingual ? (lang === "es" ? "Sí (Incluido)" : "Yes (Active)") : (lang === "es" ? "No" : "No")}</span>
                </div>
                <div className="flex justify-between">
                  <span>{lang === "es" ? "Puertos API CRM" : "CRM data sync"}</span>
                  <span className="font-bold text-white">{calcCRM ? (lang === "es" ? "Sí (Incluido)" : "Yes (Active)") : (lang === "es" ? "No" : "No")}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleConfigContact}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold py-4 text-sm transition-all shadow-lg active:scale-95 cursor-pointer"
                >
                  <Calculator className="h-4.5 w-4.5" />
                  <span>{lang === "es" ? "Solicitar este Proyecto por WhatsApp" : "Discuss this Custom Build"}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Tool 2: ROI / Ads Profit Calculator */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16 text-left">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
            PERFORMANCE METRICS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {lang === "es" ? "Calculadora de Rentabilidad (ROAS)" : "Ad Return & Profit Forecaster"}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed text-center">
            {lang === "es"
              ? "Estimación de conversión y retornos directos según el presupuesto mensual destinado a pauta digital."
              : "Forecast returns and metrics scaling based on monthly targeted advertising spend."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
          
          {/* Sliders panel */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Slider A: Monthly budget */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>{lang === "es" ? "Presupuesto Mensual de Anuncios:" : "Monthly Ads Adspend:"}</span>
                <span className="text-emerald-400 font-extrabold">${roiBudget.toLocaleString()} USD</span>
              </div>
              <input 
                type="range" 
                min={300} 
                max={10000} 
                step={100}
                value={roiBudget}
                onChange={(e) => setRoiBudget(parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-900 rounded-lg cursor-pointer border border-white/5 outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>$300 USD</span>
                <span>$5,000 USD</span>
                <span>$10,000 USD</span>
              </div>
            </div>

            {/* Slider B: Average Ticket Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>{lang === "es" ? "Precio Promedio de tu Producto/Servicio (AOV):" : "Average Order Value (AOV):"}</span>
                <span className="text-emerald-400 font-extrabold">${roiAOV.toLocaleString()} USD</span>
              </div>
              <input 
                type="range" 
                min={10} 
                max={500} 
                step={5}
                value={roiAOV}
                onChange={(e) => setRoiAOV(parseInt(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-900 rounded-lg cursor-pointer border border-white/5 outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>$10 USD</span>
                <span>$250 USD</span>
                <span>$500 USD</span>
              </div>
            </div>

            {/* Slider C: ROAS Expectations */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>{lang === "es" ? "Retorno Esperado (ROAS):" : "Target Ad Return (ROAS):"}</span>
                <span className="text-emerald-400 font-extrabold">{roiROAS}x Return</span>
              </div>
              <input 
                type="range" 
                min={1.5} 
                max={8.0} 
                step={0.1}
                value={roiROAS}
                onChange={(e) => setRoiROAS(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 h-2 bg-slate-900 rounded-lg cursor-pointer border border-white/5 outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1.5x (Conservador)</span>
                <span>4.0x (Estándar de Clickboost)</span>
                <span>8.0x (Elite)</span>
              </div>
            </div>

          </div>

          {/* Results panel */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-emerald-500/20 bg-slate-950/60 p-6 sm:p-8 grid grid-cols-2 gap-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

              <div className="col-span-2 text-center border-b border-white/5 pb-4 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{lang === "es" ? "FACTURACIÓN MENSUAL ESTIMADA" : "ESTIMATED MONTHLY RETURNS"}</span>
                <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                  ${roiResults.revenue.toLocaleString()} USD
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">{lang === "es" ? "Beneficio Neto:" : "Net Ad Profit:"}</span>
                <p className="text-xl font-bold text-white font-mono">
                  ${roiResults.profit.toLocaleString()} USD
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">{lang === "es" ? "Ventas mensuales:" : "Total Sales volume:"}</span>
                <p className="text-xl font-bold text-white font-mono">
                  ~ {roiResults.sales} {lang === "es" ? "Ordenes" : "Orders"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">{lang === "es" ? "Clicks esperados:" : "Estimated Clicks:"}</span>
                <p className="text-xl font-bold text-slate-300 font-mono">
                  ~ {roiResults.clicks.toLocaleString()}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Atribución ROAS:</span>
                <p className="text-xl font-bold text-emerald-400 font-mono">
                  {roiResults.actualROAS}x
                </p>
              </div>

              <div className="col-span-2 pt-2">
                <button
                  onClick={() => onOpenContact(`Especialista Pauta ROI`)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 text-xs transition-all active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/10"
                >
                  <Flame className="h-4 w-4 text-slate-950 fill-slate-950/20" />
                  <span>{lang === "es" ? "Agendar Auditoría de Ads Gratis" : "Claim Free Ads Audit Sessions"}</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

    </motion.div>
  );
}
