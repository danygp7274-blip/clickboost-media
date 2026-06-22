import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Sparkles, Megaphone, Terminal, CheckCircle2 } from "lucide-react";
import Confetti from "./Confetti";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("web-ai");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Real-time validation touched states
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  // Validate helper functions
  const isEmailValid = (val: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(val.trim());
  };

  const isNameValid = (val: string) => {
    return val.trim().length >= 3;
  };

  const getNameError = () => {
    if (!nameTouched) return "";
    if (!name.trim()) return "El nombre es obligatorio.";
    if (!isNameValid(name)) return "El nombre debe tener al menos 3 caracteres.";
    return "";
  };

  const getEmailError = () => {
    if (!emailTouched) return "";
    if (!email.trim()) return "El correo electrónico es obligatorio.";
    if (!isEmailValid(email)) return "Formato de correo inválido (ej. nombre@empresa.com).";
    return "";
  };

  const nameError = getNameError();
  const emailError = getEmailError();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNameTouched(true);
    setEmailTouched(true);

    if (!isNameValid(name) || !isEmailValid(email)) {
      return;
    }

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setService("web-ai");
    setMessage("");
    setIsSuccess(false);
    setNameTouched(false);
    setEmailTouched(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300); // Reset form after transition ends
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="contact-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            id="modal-body"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 text-white shadow-2xl backdrop-blur-xl"
          >
            {/* Top decorative glow */}
            <div className="absolute top-0 left-1/4 h-[2px] w-1/2 bg-gradient-to-r from-transparent via-[#38bdf8] to-transparent" />

            {/* Close Button */}
            <button
               id="close-modal-btn"
              onClick={handleClose}
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10 active:scale-95 z-30"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5 text-gray-300" />
            </button>

            <div className="p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-8">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-sky-400 border border-sky-500/20 uppercase">
                        Comienza Hoy
                      </span>
                      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                        Hagamos algo increíble
                      </h2>
                      <p className="mt-2 text-sm text-slate-400">
                        Cuéntanos tu visión y la transformaremos con diseño moderno, inteligencia artificial y marketing estratégico.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="space-y-5">
                      {/* Name input */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                            Tu Nombre
                          </label>
                          {nameTouched && isNameValid(name) && (
                            <span className="text-[10px] text-emerald-400 font-mono">✓ VÁLIDO</span>
                          )}
                        </div>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (e.target.value.length > 0) {
                              setNameTouched(true);
                            }
                          }}
                          onBlur={() => setNameTouched(true)}
                          placeholder="Ej. Carlos Mendoza"
                          className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all ${
                            nameError
                              ? "border-rose-500/40 bg-rose-950/10 focus:border-rose-500/70 focus:ring-1 focus:ring-rose-500/20"
                              : "border-white/10 bg-slate-950/40 focus:border-sky-450/50 focus:bg-slate-950/70 focus:ring-1 focus:ring-sky-500/30"
                          }`}
                        />
                        <AnimatePresence>
                          {nameError && (
                            <motion.p
                              initial={{ opacity: 0, height: 0, y: -4 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -4 }}
                              transition={{ duration: 0.2 }}
                              className="text-xs text-rose-400 font-medium font-mono pt-1"
                            >
                              ⚠️ {nameError}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Email input */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                            Tu Correo Electrónico
                          </label>
                          {emailTouched && isEmailValid(email) && (
                            <span className="text-[10px] text-emerald-400 font-mono">✓ VÁLIDO</span>
                          )}
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (e.target.value.length > 0) {
                              setEmailTouched(true);
                            }
                          }}
                          onBlur={() => setEmailTouched(true)}
                          placeholder="Ej. carlos@empresa.com"
                          className={`w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all ${
                            emailError
                              ? "border-rose-500/40 bg-rose-950/10 focus:border-rose-500/70 focus:ring-1 focus:ring-rose-500/20"
                              : "border-white/10 bg-slate-950/40 focus:border-sky-450/50 focus:bg-slate-950/70 focus:ring-1 focus:ring-sky-500/30"
                          }`}
                        />
                        <AnimatePresence>
                          {emailError && (
                            <motion.p
                              initial={{ opacity: 0, height: 0, y: -4 }}
                              animate={{ opacity: 1, height: "auto", y: 0 }}
                              exit={{ opacity: 0, height: 0, y: -4 }}
                              transition={{ duration: 0.2 }}
                              className="text-xs text-rose-400 font-medium font-mono pt-1"
                            >
                              ⚠️ {emailError}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Service selector */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                          ¿Qué servicio necesitas?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setService("web-ai")}
                            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                              service === "web-ai"
                                ? "border-sky-400 bg-sky-500/10 text-white"
                                : "border-white/10 bg-slate-950/35 text-slate-400 hover:border-white/20"
                            }`}
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-500/20">
                              <Sparkles className="h-4 w-4 text-sky-400" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white">Diseño Web con IA</p>
                              <p className="text-[10px] text-slate-400 leading-tight">Websites hiper-personalizados</p>
                            </div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setService("ads")}
                            className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                              service === "ads"
                                ? "border-sky-400 bg-sky-500/10 text-white"
                                : "border-white/10 bg-slate-950/35 text-slate-400 hover:border-white/20"
                            }`}
                          >
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20">
                              <Megaphone className="h-4 w-4 text-emerald-400" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-white">Publicidad Digital</p>
                              <p className="text-[10px] text-slate-400 leading-tight">Campañas de alto impacto</p>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Message area */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                          Cuéntanos sobre tu idea (Opcional)
                        </label>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Quiero potenciar mi negocio mediante un nuevo sitio web y campañas pautadas..."
                          className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-all focus:border-sky-450/50 focus:bg-slate-950/70 focus:ring-1 focus:ring-sky-500/30"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 to-sky-450 px-6 py-3.5 text-sm font-extrabold tracking-wide text-slate-950 transition-all hover:from-cyan-300 hover:to-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                          <>
                            <span>Enviar Solicitud</span>
                            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                        <span className="absolute inset-0 block h-full w-full bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-content"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 text-center relative"
                  >
                    {/* CONFETTI CELEBRATION FEEDBACK */}
                    <Confetti active={isSuccess} />

                    <div className="relative mb-6 z-10">
                      <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
                      ¡Solicitud Recibida!
                    </h3>
                    <p className="text-sm text-slate-300 max-w-sm mb-8 leading-relaxed">
                      ¡Gracias, <span className="font-semibold text-blue-400">{name}</span>! Nuestro equipo en <span className="font-semibold text-white">Click boost Media</span> se pondrá en contacto contigo dentro de las próximas 2 horas.
                    </p>

                    <div className="flex w-full flex-col gap-3">
                      <button
                        onClick={handleClose}
                        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
                      >
                        Cerrar Ventana
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
