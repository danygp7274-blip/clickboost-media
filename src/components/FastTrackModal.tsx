import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Phone, ArrowRight, Check, Zap, Sparkles, MessageSquare } from "lucide-react";

interface FastTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  waUrl: string;
  lang: "es" | "en";
}

const COUNTRY_CODES = [
  { flag: "🇲🇽", code: "+52", name: "México" },
  { flag: "🇺🇸", code: "+1", name: "USA / Can" },
  { flag: "🇨🇴", code: "+57", name: "Colombia" },
  { flag: "🇪🇸", code: "+34", name: "España" },
  { flag: "🇦🇷", code: "+54", name: "Argentina" },
  { flag: "🇨🇱", code: "+56", name: "Chile" },
  { flag: "🇵🇪", code: "+51", name: "Perú" },
];

export default function FastTrackModal({ isOpen, onClose, planName, waUrl, lang }: FastTrackModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when open
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setPhoneNumber("");
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
    }
  }, [isOpen]);

  const t = {
    es: {
      tag: "CONEXIÓN EXTREMADAMENTE RÁPIDA",
      title: "Fast-Track WhatsApp",
      subtitle: "Callback Prioritario",
      desc: `Ingresa tu móvil para que un especialista de Click boost analice tu marca y te mande un mensaje de WhatsApp directo en menos de 5 minutos para cotizar el`,
      placeholder: "55 1234 5678",
      submit: "Iniciar Callback Express",
      classicBtn: "Ir a WhatsApp Clásico (Sin callback)",
      successTitle: "¡Callback Iniciado!",
      successDesc: "Te estamos redirigiendo directamente a WhatsApp con tu código de atención prioritaria...",
      phoneLabel: "Número de WhatsApp",
      countryLabel: "Lada",
    },
    en: {
      tag: "EXTREMELY FAST CONNECTION",
      title: "Fast-Track WhatsApp",
      subtitle: "Priority Callback",
      desc: `Enter your mobile number so a Click boost strategist can look at your brand and message you via WhatsApp in under 5 minutes regarding the`,
      placeholder: "555-123-4567",
      submit: "Start Express Callback",
      classicBtn: "Go to Classic WhatsApp (No callback)",
      successTitle: "Callback Activated!",
      successDesc: "Redirecting you to WhatsApp with your priority callback request token...",
      phoneLabel: "WhatsApp Number",
      countryLabel: "Code",
    }
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsSubmitted(true);

    // Format full number
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    const fullPhone = `${selectedCountry.code}${cleanPhone}`;

    // Create custom WhatsApp callback URL
    const message = lang === "es" 
      ? `¡Hola Click boost Media! Acabo de iniciar un WhatsApp Fast-Track Callback ⚡ para el *${planName}*. Mi número es ${fullPhone}. Por favor, contáctenme por esta vía lo antes posible.`
      : `Hello Click boost Media! I just initiated a WhatsApp Fast-Track Callback ⚡ for the *${planName}*. My mobile is ${fullPhone}. Please contact me via this chat as soon as possible.`;

    const customWaUrl = `https://wa.me/525647805021?text=${encodeURIComponent(message)}`;

    // Open WhatsApp after a short delay for animation
    setTimeout(() => {
      window.open(customWaUrl, "_blank", "noopener,noreferrer");
      onClose();
    }, 1500);
  };

  const handleClassicRedirect = () => {
    window.open(waUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#02050c]/85 backdrop-blur-md"
            id="fast-track-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-cyan-400/30 bg-[#040814]/98 p-6 sm:p-8 text-white shadow-2xl shadow-cyan-400/10 backdrop-blur-2xl"
            id="fast-track-card"
          >
            {/* Top decorative cyan line indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-500" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 active:scale-90 transition-all cursor-pointer"
              aria-label="Close modal"
              id="fast-track-close"
            >
              <X className="h-4 w-4" />
            </button>

            {!isSubmitted ? (
              <div className="space-y-6" id="fast-track-form-container">
                {/* Header */}
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-mono tracking-wider text-cyan-400 border border-cyan-400/20 uppercase font-semibold">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    {t.tag}
                  </span>
                  
                  <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      {t.title}
                    </h3>
                    <span className="text-xs text-cyan-400 font-mono font-bold">
                      {t.subtitle}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pt-1">
                    {t.desc} <strong className="text-cyan-400 font-bold">{planName}</strong>.
                  </p>
                </div>

                {/* Main Interactive Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Country Quick Select Row */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                      {t.countryLabel}
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {COUNTRY_CODES.map((country) => (
                        <button
                          key={country.name}
                          type="button"
                          onClick={() => setSelectedCountry(country)}
                          className={`px-2 py-1 text-xs rounded-lg border flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
                            selectedCountry.code === country.code
                              ? "border-cyan-400 bg-cyan-400/10 text-cyan-300 font-bold"
                              : "border-white/5 bg-white/5 text-slate-400 hover:border-white/10"
                          }`}
                        >
                          <span>{country.flag}</span>
                          <span>{country.code}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Phone input row */}
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold flex justify-between items-center">
                      <span>{t.phoneLabel}</span>
                      <span className="text-cyan-400/60 font-mono italic">
                        {selectedCountry.name} ({selectedCountry.code})
                      </span>
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-4 text-slate-400">
                        <Phone className="h-4 w-4" />
                      </div>
                      
                      <div className="absolute left-11 text-slate-300 font-mono text-sm border-r border-white/10 pr-3.5 select-none">
                        {selectedCountry.code}
                      </div>

                      <input
                        ref={inputRef}
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder={t.placeholder}
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/80 pl-24 pr-4 py-3.5 text-sm font-semibold text-white placeholder-slate-600 outline-none transition-all focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/30 font-mono"
                        id="fast-track-phone-input"
                      />
                    </div>
                  </div>

                  {/* Fast track Callback Submit Button */}
                  <button
                    type="submit"
                    className="w-full group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-400 to-sky-450 px-6 py-4 text-xs sm:text-sm font-black tracking-wider uppercase text-slate-950 transition-all hover:from-cyan-300 hover:to-sky-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 active:scale-[0.98] cursor-pointer shadow-lg shadow-cyan-400/15"
                    id="fast-track-submit-btn"
                  >
                    <Zap className="h-4.5 w-4.5 text-slate-950 animate-bounce" />
                    <span>{t.submit}</span>
                    <ArrowRight className="h-4 w-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                {/* Classic fallback options */}
                <div className="border-t border-white/5 pt-4 text-center">
                  <button
                    onClick={handleClassicRedirect}
                    className="text-xs text-slate-400 hover:text-cyan-400 hover:underline transition-all cursor-pointer font-medium inline-flex items-center gap-1.5"
                    id="fast-track-classic-btn"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{t.classicBtn}</span>
                  </button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-5"
                id="fast-track-success-container"
              >
                {/* Out-of-bounds callback ring & success animation */}
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center">
                  <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/30" />
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-400">
                    <Check className="h-8 w-8 text-cyan-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {t.successTitle}
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                    {t.successDesc}
                  </p>
                </div>

                {/* Double-pulse custom loader */}
                <div className="pt-2 flex justify-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
