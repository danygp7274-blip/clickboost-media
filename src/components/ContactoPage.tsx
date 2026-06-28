import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Sparkles, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Check, 
  MessageSquare, 
  ArrowRight, 
  X, 
  Loader2,
  AlertCircle,
  HelpCircle,
  User,
  Building,
  Target,
  ChevronDown
} from "lucide-react";
import { Language } from "../translations";

interface ContactoPageProps {
  lang: Language;
  onOpenFastTrack: (planName: string, waUrl: string) => void;
}

const LOCAL_TRANSLATIONS = {
  es: {
    badge: "Oficinas Globales • Soporte 24/7",
    title: "Inicia la Conversación",
    spanText: "Profesional",
    subtitle: "Conectemos para redefinir tu presencia digital. Completa el calificador interactivo o llena nuestro formulario de alta fidelidad.",
    
    // Cards
    waCardTitle: "WhatsApp Directo",
    waCardDesc: "Chatea con un consultor sénior de inmediato para respuestas rápidas.",
    waCardBtn: "Iniciar Chat en Segundos",
    
    mailCardTitle: "Canal de Correo",
    mailCardDesc: "Escríbenos para propuestas corporativas oficiales o contratos NDA.",
    
    hqCardTitle: "Sede Virtual Global",
    hqCardDesc: "Operaciones en Ciudad de México, Monterrey, y soporte remoto mundial.",

    // Qualifier
    qualifierTitle: "Calificador de Proyecto Express",
    qualifierDesc: "Responde 3 preguntas rápidas para que nuestro sistema configure una propuesta personalizada antes de hablar.",
    qualStep1: "1. ¿Qué canal o solución requiere tu empresa principal?",
    qualStep2: "2. ¿Cuál es el presupuesto mensual de inversión estimado?",
    qualStep3: "3. ¿Cuál es tu urgencia o ventana de lanzamiento ideal?",

    // Form
    formTitle: "Formulario de Alta Fidelidad",
    formDesc: "Completa los datos técnicos para agendar una llamada estratégica formal.",
    formName: "Tu Nombre Completo",
    formEmail: "Correo Electrónico Corporativo",
    formPhone: "Teléfono o WhatsApp (con clave de país)",
    formCompany: "Nombre de tu Empresa / Marca",
    formDetails: "Cuéntanos sobre tu proyecto o metas comerciales...",
    formSubmit: "Enviar Información y Agendar Llamada",
    formSending: "Procesando en Servidores...",
    formSuccess: "¡Información recibida con éxito! Un director de tecnología se pondrá en contacto contigo en las próximas 2 horas hábiles.",

    // Form errors
    errName: "Por favor, ingresa tu nombre (mínimo 3 caracteres).",
    errEmail: "Por favor, introduce una dirección de correo válida.",
    errPhone: "Por favor, añade tu teléfono con lada válida.",
    errDetails: "Por favor, cuéntanos un poco más sobre el proyecto (mínimo 10 caracteres)."
  },
  en: {
    badge: "Global Edge Hub • 24/7 Response",
    title: "Initiate Strategic",
    spanText: "Contact",
    subtitle: "Let's connect to transform your brand. Complete our rapid project qualifier or submit a corporate brief below.",
    
    // Cards
    waCardTitle: "Instant WhatsApp",
    waCardDesc: "Chat directly with a senior engineering architect for fast estimates.",
    waCardBtn: "Launch Chat Now",
    
    mailCardTitle: "Email Channel",
    mailCardDesc: "Write to us for formal RFPs, corporate documentation, or NDAs.",
    
    hqCardTitle: "Global Virtual HQ",
    hqCardDesc: "Based in Mexico City and Monterrey, serving growth partners globally.",

    // Qualifier
    qualifierTitle: "Express Project Qualifier",
    qualifierDesc: "Answer 3 rapid questions so our system can pre-package a custom quote before our strategic session.",
    qualStep1: "1. What is the primary service or channel you need?",
    qualStep2: "2. What is your estimated investment budget?",
    qualStep3: "3. What is your ideal launch/deployment timeline?",

    // Form
    formTitle: "Corporate Brief Intake Form",
    formDesc: "Submit your business parameters to schedule a formal strategical call.",
    formName: "Your Full Name",
    formEmail: "Corporate Email Address",
    formPhone: "Phone or WhatsApp (with country code)",
    formCompany: "Company Name / Brand Name",
    formDetails: "Briefly explain your project context or key milestones...",
    formSubmit: "Submit Parameters & Schedule Meet",
    formSending: "Encrypting and sending parameters...",
    formSuccess: "Project parameters uploaded! A tech lead will reach out via WhatsApp/Email within 2 business hours.",

    // Form errors
    errName: "Please write your name (at least 3 characters).",
    errEmail: "Please input a valid email address.",
    errPhone: "Please input a valid phone number with country code.",
    errDetails: "Please provide a brief summary of requirements (at least 10 characters)."
  }
};

const FAQ_CONTACT_DATA = [
  {
    qEs: "¿Cómo se gestiona el esquema de pago?",
    qEn: "How are project payments structured?",
    aEs: "Operamos de forma estándar y segura: 50% de anticipo al inicio de la fase de descubrimiento y diseño, y 50% final una vez que el sitio o campaña se despliega exitosamente y se aprueba por tu equipo.",
    aEn: "We operate on a standard, secure milestone framework: 50% upfront payment upon starting the strategic design phase, and the remaining 50% upon successful live deployment and approval."
  },
  {
    qEs: "¿Qué pasa si ya poseo mi propio dominio y hosting?",
    qEn: "What if I already own my hosting and domain?",
    aEs: "Lo integramos perfectamente. Nuestro equipo configurará tus claves DNS o servidores de Cloud Run/Vercel de manera directa y segura sin costo adicional.",
    aEn: "We integrate it flawlessly. Our engineering team will configure your DNS and routing settings in Vercel or Cloud Run at zero extra charge."
  },
  {
    qEs: "¿Los sitios web y datos son 100% míos al finalizar?",
    qEn: "Do I fully own the web files and data upon delivery?",
    aEs: "Sí, absolutamente. Todo el código fuente, cuentas publicitarias, accesos a bases de datos y dominios se transfieren a tu propiedad absoluta al completar el proyecto.",
    aEn: "Yes, completely. All custom source files, compiled assets, ad accounts, and databases are fully transferred under your sole legal ownership."
  }
];

export default function ContactoPage({ lang, onOpenFastTrack }: ContactoPageProps) {
  const t = LOCAL_TRANSLATIONS[lang];

  // Qualifier Wizard State
  const [qualifierStep, setQualifierStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("");

  // Form State
  const [formName, setFormName] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formPhone, setFormPhone] = useState<string>("");
  const [formCompany, setFormCompany] = useState<string>("");
  const [formDetails, setFormDetails] = useState<string>("");

  // Form Status
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Active FAQ index
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form Validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (formName.trim().length < 3) {
      newErrors.name = t.errName;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formEmail)) {
      newErrors.email = t.errEmail;
    }
    if (formPhone.trim().length < 7) {
      newErrors.phone = t.errPhone;
    }
    if (formDetails.trim().length < 10) {
      newErrors.details = t.errDetails;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API storage / lead capture
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset fields
      setFormName("");
      setFormEmail("");
      setFormPhone("");
      setFormCompany("");
      setFormDetails("");
    }, 2000);
  };

  // WhatsApp Qualifier Direct Send
  const handleQualifierWhatsApp = () => {
    const textES = `Hola!%20Complet%C3%A9%20el%20calificador%20de%20proyecto:%20Necesito%20${selectedService}%20con%20un%20presupuesto%20de%20${selectedBudget}%20y%20urgencia%20${selectedTimeline}.%20Me%20gustar%C3%ADa%20agendar%20llamada.`;
    const textEN = `Hi!%20I%20completed%20your%20project%20qualifier:%20I%20need%20${selectedService}%20with%20a%20budget%20of%20${selectedBudget}%20and%20timeline%20${selectedTimeline}.%20Let's%20schedule%20a%20brief.`;
    const text = lang === "es" ? textES : textEN;
    const waUrl = `https://wa.me/525647805021?text=${text}`;
    onOpenFastTrack(`Lead Calificado`, waUrl);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full"
      id="contacto-page-container"
    >
      {/* Hero Header */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-[#071330] border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04]" />
        
        {/* Subtle Ambient Glowing Orbs */}
        <div className="absolute -top-1/4 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute -bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-400 border border-cyan-400/20 uppercase tracking-widest font-mono">
            <Mail className="h-3.5 w-3.5" />
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

      {/* Grid: Qualifier Wizard vs Interactive Form */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
        
        {/* Left Side: Express Qualifier Wizard (5 Columns) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="rounded-3xl border border-white/10 bg-[#091b40]/60 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[#38bdf8] uppercase font-bold flex items-center gap-1.5">
                <Target className="h-4 w-4 text-cyan-400" />
                {t.qualifierTitle}
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.qualifierDesc}
              </p>
            </div>

            <div className="h-px bg-white/5" />

            {/* Steps Rendering */}
            <div className="space-y-4">
              {qualifierStep === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-3"
                >
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide font-mono">{t.qualStep1}</h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {["Desarrollo Web Inteligente", "Campañas de Publicidad Ads", "Solución Completa (Web + Ads)", "Consultoría / Soluciones IA"].map((serv) => (
                      <button
                        key={serv}
                        onClick={() => {
                          setSelectedService(serv);
                          setQualifierStep(2);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all hover:bg-[#071330] cursor-pointer select-none flex items-center justify-between ${
                          selectedService === serv ? "bg-cyan-500/10 border-cyan-400 text-white" : "bg-slate-950/20 border-white/5 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <span>{serv}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-65" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {qualifierStep === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-3"
                >
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide font-mono">{t.qualStep2}</h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {["Menos de $300 USD / mes", "$300 - $800 USD / mes", "$800 - $1,500 USD / mes", "$1,500+ USD / mes (Escala)"].map((budget) => (
                      <button
                        key={budget}
                        onClick={() => {
                          setSelectedBudget(budget);
                          setQualifierStep(3);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all hover:bg-[#071330] cursor-pointer select-none flex items-center justify-between ${
                          selectedBudget === budget ? "bg-cyan-500/10 border-cyan-400 text-white" : "bg-slate-950/20 border-white/5 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <span>{budget}</span>
                        <ArrowRight className="h-3.5 w-3.5 opacity-65" />
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setQualifierStep(1)}
                    className="text-[10px] font-mono text-slate-500 hover:text-white underline pt-1 cursor-pointer"
                  >
                    ← Volver atrás
                  </button>
                </motion.div>
              )}

              {qualifierStep === 3 && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide font-mono">{t.qualStep3}</h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {["Lanzamiento Inmediato (< 15 días)", "En proceso (1 mes)", "Planificación / Solo cotizando"].map((timeline) => (
                      <button
                        key={timeline}
                        onClick={() => {
                          setSelectedTimeline(timeline);
                        }}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all hover:bg-[#071330] cursor-pointer select-none flex items-center justify-between ${
                          selectedTimeline === timeline ? "bg-cyan-500/10 border-cyan-400 text-white" : "bg-slate-950/20 border-white/5 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <span>{timeline}</span>
                        {selectedTimeline === timeline && <Check className="h-4 w-4 text-cyan-400" />}
                      </button>
                    ))}
                  </div>

                  {selectedTimeline && (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="pt-2"
                    >
                      <button
                        onClick={handleQualifierWhatsApp}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-slate-950 font-bold py-3.5 text-xs transition-all active:scale-95 shadow-md shadow-cyan-400/10 cursor-pointer"
                      >
                        <span>Enviar Perfil de Proyecto</span>
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </motion.div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <button 
                      onClick={() => setQualifierStep(2)}
                      className="text-[10px] font-mono text-slate-500 hover:text-white underline cursor-pointer"
                    >
                      ← Volver atrás
                    </button>
                    <button 
                      onClick={() => {
                        setQualifierStep(1);
                        setSelectedService("");
                        setSelectedBudget("");
                        setSelectedTimeline("");
                      }}
                      className="text-[10px] font-mono text-rose-400/70 hover:text-rose-400 cursor-pointer"
                    >
                      Reiniciar calificador
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Location / Direct Channels column */}
          <div className="space-y-4">
            
            {/* WhatsApp Card */}
            <div className="rounded-2xl border border-white/5 bg-[#071330] p-5 flex items-center gap-4 hover:border-emerald-500/20 transition-all group">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Phone className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-bold text-white">{t.waCardTitle}</h5>
                <p className="text-xs text-slate-400 leading-snug mt-0.5">{t.waCardDesc}</p>
                <a 
                  href="https://wa.me/525647805021?text=Hola!%20Me%20gustaria%20agendar%20una%20llamada%20de%20diagnostico%20para%20mi%20marca."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold font-mono text-emerald-400 hover:text-emerald-300 mt-2"
                >
                  <span>{t.waCardBtn}</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="rounded-2xl border border-white/5 bg-[#071330] p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">{t.mailCardTitle}</h5>
                <p className="text-xs text-slate-400 leading-snug mt-0.5">{t.mailCardDesc}</p>
                <p className="text-xs font-mono text-sky-300 font-bold mt-2">contacto@clickboostmedia.com</p>
              </div>
            </div>

            {/* Virtual HQ Card */}
            <div className="rounded-2xl border border-white/5 bg-[#071330] p-5 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">{t.hqCardTitle}</h5>
                <p className="text-xs text-slate-400 leading-snug mt-0.5">{t.hqCardDesc}</p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side: Corporate Brief Intake Form (7 Columns) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-white/10 bg-[#091b40]/60 p-6 sm:p-10 shadow-2xl relative space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{t.formTitle}</h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{t.formDesc}</p>
            </div>

            <div className="h-px bg-white/5" />

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-cyan-950/40 border border-cyan-400/30 rounded-2xl p-6 text-center space-y-4"
              >
                <div className="h-12 w-12 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mx-auto">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-bold text-white">{lang === "es" ? "¡Parámetros Enviados!" : "Parameters Received!"}</h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                  {t.formSuccess}
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-xs font-mono text-cyan-400 hover:text-white underline cursor-pointer"
                >
                  Enviar otra propuesta
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Input 1: Name */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">{t.formName}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                    <input 
                      type="text" 
                      value={formName}
                      onChange={(e) => {
                        setFormName(e.target.value);
                        if (errors.name) setErrors(prev => { const n = {...prev}; delete n.name; return n; });
                      }}
                      placeholder="e.g. Alejandro Sánchez"
                      className={`w-full bg-slate-950/60 border rounded-xl pl-11 pr-4 py-3 text-xs text-white outline-none focus:bg-slate-950 transition-colors ${
                        errors.name ? "border-rose-500 focus:border-rose-500" : "border-white/10 focus:border-cyan-400/40"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <span className="text-[10px] text-rose-400 font-mono flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Input 2: Email */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">{t.formEmail}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                    <input 
                      type="email" 
                      value={formEmail}
                      onChange={(e) => {
                        setFormEmail(e.target.value);
                        if (errors.email) setErrors(prev => { const n = {...prev}; delete n.email; return n; });
                      }}
                      placeholder="e.g. alejandro@empresa.com"
                      className={`w-full bg-slate-950/60 border rounded-xl pl-11 pr-4 py-3 text-xs text-white outline-none focus:bg-slate-950 transition-colors ${
                        errors.email ? "border-rose-500 focus:border-rose-500" : "border-white/10 focus:border-cyan-400/40"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-[10px] text-rose-400 font-mono flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Grid Inputs: Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">{t.formPhone}</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                      <input 
                        type="text" 
                        value={formPhone}
                        onChange={(e) => {
                          setFormPhone(e.target.value);
                          if (errors.phone) setErrors(prev => { const n = {...prev}; delete n.phone; return n; });
                        }}
                        placeholder="e.g. +52 55 1234 5678"
                        className={`w-full bg-slate-950/60 border rounded-xl pl-11 pr-4 py-3 text-xs text-white outline-none focus:bg-slate-950 transition-colors ${
                          errors.phone ? "border-rose-500 focus:border-rose-500" : "border-white/10 focus:border-cyan-400/40"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <span className="text-[10px] text-rose-400 font-mono flex items-center gap-1 mt-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">{t.formCompany}</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                      <input 
                        type="text" 
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        placeholder="e.g. Innova Corp"
                        className="w-full bg-slate-950/60 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs text-white outline-none focus:border-cyan-400/40 focus:bg-slate-950 transition-colors"
                      />
                    </div>
                  </div>

                </div>

                {/* Details */}
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">{t.formDetails}</label>
                  <textarea 
                    rows={4}
                    value={formDetails}
                    onChange={(e) => {
                      setFormDetails(e.target.value);
                      if (errors.details) setErrors(prev => { const n = {...prev}; delete n.details; return n; });
                    }}
                    placeholder={lang === "es" ? "Ej. Necesitamos lanzar un landing page optimizado para captar Leads de un producto de software bilingüe..." : "e.g. We require a high-speed landing page integration synchronized directly within active Facebook Ads datasets..."}
                    className={`w-full bg-slate-950/60 border rounded-xl p-4 text-xs text-white outline-none focus:bg-slate-950 transition-colors resize-none ${
                      errors.details ? "border-rose-500 focus:border-rose-500" : "border-white/10 focus:border-cyan-400/40"
                    }`}
                  />
                  {errors.details && (
                    <span className="text-[10px] text-rose-400 font-mono flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errors.details}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold py-4 text-sm transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                        <span>{t.formSending}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>{t.formSubmit}</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

      </section>

      {/* Accordion FAQ Area */}
      <section className="py-20 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 space-y-10 text-left">
        <div className="text-center space-y-3">
          <HelpCircle className="h-8 w-8 text-cyan-400 mx-auto" />
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Preguntas de Contratación</h3>
          <p className="text-slate-400 text-xs sm:text-sm">Todo lo que necesitas saber sobre las fases legales y de entrega.</p>
        </div>

        <div className="space-y-4 pt-4">
          {FAQ_CONTACT_DATA.map((item, index) => {
            const isOpen = activeFaq === index;
            const question = lang === "es" ? item.qEs : item.qEn;
            const answer = lang === "es" ? item.aEs : item.aEn;

            return (
              <div 
                key={index}
                className="rounded-2xl border border-white/5 bg-[#091b40]/40 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer outline-none select-none text-white hover:text-cyan-400"
                >
                  <span className="text-sm font-bold tracking-tight">{question}</span>
                  <ChevronDown className={`h-4.5 w-4.5 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-400" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </motion.div>
  );
}
