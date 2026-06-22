import React, { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, ArrowRight, Check, Sparkles } from "lucide-react";

interface Message {
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  cta?: {
    label: string;
    url: string;
  };
}

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "¡Hola! 👋 Soy Sofía, asesora estratégica de Click boost Media. ¿Cómo podemos acelerar el crecimiento de tu negocio hoy?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_NUMBER = "525647805021";

  const quickReplies = [
    {
      label: "Plan Sencillo ($299 USD) ⚡",
      replyText: "Me interesa conocer más o contratar el Plan Sencillo de Diseño Web por $299 USD.",
      botResponse: "¡Excelente elección! El Plan Sencillo es perfecto para un lanzamiento inmediato con diseño premium adaptado a móviles y optimizado para una carga ultra veloz. ¿Deseas que coordinemos los detalles técnicos?",
      ctaLabel: "Contratar Plan Sencillo por WhatsApp",
      whatsappText: "¡Hola! Me interesa conocer más o contratar el Plan Sencillo de Diseño Web por $299 USD. Vengo desde el chat de la web."
    },
    {
      label: "Planes de Publicidad Ads 📈",
      replyText: "Quiero cotizar información sobre los Planes de Publicidad Digital para Meta y Google Ads.",
      botResponse: "¡Estupendo! Diseñamos embudos integrales y campañas con Meta Pixel, Google Analytics y optimización semanal de ROAS. ¿Te gustaría agendar una breve llamada estratégica hoy mismo?",
      ctaLabel: "Cotizar Campaña en WhatsApp",
      whatsappText: "¡Hola! Quisiera recibir información estratégica o cotizar un Plan de Publicidad Digital en Google y Meta Ads."
    },
    {
      label: "Plan Corporativo / Personalizado 💻",
      replyText: "Me interesa una solución web a la medida de mi empresa.",
      botResponse: "Ofrecemos arquitecturas multi-página robustas con redacción SEO premium potenciada con IA, integraciones con CRM y un panel autogestionable simple. Cuéntanos, ¿de qué trata tu proyecto?",
      ctaLabel: "Hablar con Especialista",
      whatsappText: "¡Hola! Me gustaría platicar sobre una solución web a la medida o Plan Corporativo para mi empresa."
    }
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string, customBotResponse?: string, customCta?: { label: string, url: string }) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg: Message = {
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        sender: "bot",
        text: customBotResponse || "¡Perfecto! Te responderemos de inmediato. Para brindarte una respuesta instantánea y personalizada con uno de nuestros asesores, haz clic para continuar nuestro chat directo en WhatsApp.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cta: customCta || {
          label: "Iniciar Chat Directo en WhatsApp",
          url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(textToSend)}`
        }
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 850);
  };

  const handleQuickReply = (reply: typeof quickReplies[0]) => {
    const ctaUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(reply.whatsappText)}`;
    handleSendMessage(reply.replyText, reply.botResponse, {
      label: reply.ctaLabel,
      url: ctaUrl
    });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    // Default send flow
    const userText = userInput;
    const ctaUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hola Click boost Media! Tengo la siguiente consulta: " + userText)}`;
    handleSendMessage(userText, undefined, {
      label: "Enviar consulta a mi WhatsApp",
      url: ctaUrl
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-white">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-20 right-0 w-[360px] max-w-[calc(100vw-2rem)] rounded-3xl border border-white/10 bg-[#040814]/95 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col z-50 h-[520px]"
          >
            {/* Header */}
            <div className="relative p-5 bg-gradient-to-r from-cyan-950/70 via-sky-950/60 to-slate-950/80 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-400 to-sky-400 flex items-center justify-center font-extrabold text-slate-950 shadow-md text-sm border border-cyan-400/20">
                    S
                  </div>
                  {/* Active online dot indicator */}
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#040814] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Sofía
                    <span className="text-[9px] bg-sky-500/15 text-sky-400 px-1.5 py-0.5 rounded-full font-mono">Soporte IA</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 font-medium">Asesora en Línea • Activa ahora</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Simulated Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} space-y-1`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-cyan-400 to-sky-450 text-slate-950 rounded-tr-none shadow-md shadow-cyan-400/5 font-extrabold"
                        : "bg-slate-900/90 text-slate-200 border border-white/5 rounded-tl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.cta && (
                      <div className="mt-3 pt-2.5 border-t border-white/5">
                        <a
                          href={msg.cta.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba56] text-slate-950 font-bold text-xs transition-all active:scale-95 shadow-md"
                        >
                          <span>{msg.cta.label}</span>
                          <Send className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col items-start space-y-1">
                  <div className="bg-slate-900/90 border border-white/10 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick action triggers footer */}
            <div className="px-5 py-3.5 border-t border-white/5 bg-slate-950/60 space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block mb-1">Preguntas Frecuentes:</span>
              <div className="flex flex-wrap gap-1.5">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    className="text-[10px] lg:text-xs font-semibold px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-sky-500/30 hover:bg-sky-500/10 text-slate-200 hover:text-white transition-all text-left truncate max-w-full"
                  >
                    {reply.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message input */}
            <form onSubmit={handleFormSubmit} className="p-4 border-t border-white/5 bg-slate-950 flex gap-2">
              <input
                type="text"
                placeholder="Escribe tu consulta aquí..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 focus:border-sky-400/50 rounded-xl px-4 py-2 text-xs focus:outline-none transition-all placeholder:text-slate-500"
              />
              <button
                type="submit"
                disabled={!userInput.trim()}
                className="h-8 w-8 shrink-0 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-450 hover:from-cyan-300 hover:to-sky-400 text-slate-950 disabled:from-white/5 disabled:to-white/5 disabled:text-slate-500 disabled:border-white/5 flex items-center justify-center transition-all"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating launcher bubble button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-14 w-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg hover:scale-105 transition-all text-white block group"
        aria-label="Soporte WhatsApp"
      >
        {/* Pulsing beacon glow effect behind */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/45 opacity-75 blur-md group-hover:blur-lg animate-pulse pointer-events-none" />
        
        {isOpen ? (
          <X className="h-6 w-6 relative z-10" />
        ) : (
          <div className="relative z-10 flex items-center justify-center h-full w-full">
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-sky-400 border-2 border-slate-950 rounded-full flex items-center justify-center text-[8px] text-white font-bold animate-bounce">
              1
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
