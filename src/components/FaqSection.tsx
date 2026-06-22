import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageSquare, HelpCircle, ArrowRight, ShieldCheck, Zap } from "lucide-react";

const scrollRevealVariants = {
  hidden: { opacity: 0, y: 55, scale: 0.97, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  key?: React.Key;
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
  return (
    <div 
      className={`rounded-2xl border transition-all duration-300 ${
        isOpen 
          ? "border-sky-500/30 bg-slate-900/50 shadow-lg shadow-sky-500/5" 
          : "border-white/5 bg-slate-950/30 hover:border-white/10 hover:bg-slate-900/10"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left p-5 sm:p-6 focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex gap-4">
          <span className="text-xs sm:text-sm font-mono text-sky-400 font-semibold mt-0.5 select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-sm sm:text-base font-semibold text-white tracking-tight hover:text-sky-300 transition-colors">
            {question}
          </span>
        </div>
        <div 
          className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-transform duration-300 ${
            isOpen ? "rotate-180 border-sky-400/30 bg-sky-500/10 text-sky-400" : "text-slate-400"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 pt-0 ml-9 border-t border-white/5 mt-1">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl whitespace-pre-line pt-4">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "¿Qué incluye exactamente el Plan Sencillo de $299 USD? ⚡",
      answer: "El Plan Sencillo está diseñado para lanzar tu marca al mercado rápidamente de manera súper profesional. Incluye:\n\n• Una Landing Page premium optimizada para conversiones.\n• Diseño adaptado al 100% para móviles (Google Mobile-Friendly).\n• Velocidad de carga ultrarrápida (Core Web Vitals optimizados).\n• Hosting web premium de alto desempeño por 1 año entero.\n• Certificado de seguridad SSL gratis de por vida.\n• Botón flotante dinámico de WhatsApp e integración de redes sociales.\n\nEs idóneo para startups, consultores independientes, profesionistas y negocios locales que necesitan un canal de captación efectivo de inmediato."
    },
    {
      question: "¿Cómo logran entregar los proyectos web tan rápido? 🚀",
      answer: "Utilizamos una combinación altamente eficiente de tecnologías ágiles e inteligencia artificial avanzada coordinadas por nuestro equipo de expertos. \n\nLa IA nos permite automatizar la maquetación repetitiva de código ordinario y generar borradores lingüísticos y de copywriting de conversión instantáneos. Con esta base, nuestros experimentados diseñadores humanos y programadores dedican toda su atención a perfeccionar la estética, pulir la identidad corporativa de tu marca, afinar las interfaces con micro-interacciones interactivas y configurar la estrategia de SEO técnico a la perfección."
    },
    {
      question: "¿Tienen cuotas mensuales ocultas o contratos forzosos? 🛡️",
      answer: "Absolutamente no. Creemos en la total transparencia. Al contratar el desarrollo de tu sitio web con Click boost Media realizas un pago único y final por el proyecto. Al terminar el año de cortesía incluido, solo renovarás los servicios estándar de hosting y dominio a un coste mínimo normal sin sobreprecios, y eres libre de migrarlo cuando quieras. \n\nNuestras soluciones mensuales facultativas de gestión publicitaria en Facebook, Instagram y Google Ads se manejan por períodos mensuales, pero tampoco requieren de plazos mínimos forzosos de permanencia comercial."
    },
    {
      question: "¿Cuál es la diferencia entre Click boost Media y un creador web genérico o agencia clásica? 🎯",
      answer: "Frente a las agencias clásicas, nos destacamos por la ultra-velocidad: te entregamos tu proyecto en horas en lugar de semanas o meses, lo que además reduce tus costos de inversión de forma drástica (hasta un 70% menos).\n\nEn comparación con creadores masivos (Wix, Squarespace) donde debes diseñar tú mismo sin saber de persuasión o conversión, nosotros proveemos un servicio llave en mano completo. No solo diseñamos una interfaz hermosa, sino que escribimos textos de ventas científicamente de alto impacto, configuramos códigos de seguimiento robustos (Meta Pixel, Google Tag Manager) y te aseguramos soporte post-venta constante."
    },
    {
      question: "¿Qué material y datos necesito proveer para iniciar el proceso? 📝",
      answer: "Te hacemos la vida sumamente sencilla. Únicamente necesitamos que llenes un breve cuestionario interactivo con:\n\n1. Tu nombre comercial y giro principal.\n2. Los servicios o productos insignia que deseas promover.\n3. Tu logotipo y guías de colores (si ya cuentas con ellos; si no, también te asistimos en su creación).\n4. Tus números de contacto comercial.\n\nNo necesitas redactar textos complejos ni elegir fotos de stock. Nuestro sistema impulsado por IA y nuestros editores creativos se encargarán de estructurar una propuesta impecable."
    },
    {
      question: "¿Qué garantía tengo de que la página me ayudará a vender más? 📈",
      answer: "Todos nuestros diseños siguen principios rigurosos de Neuromarketing e Ingeniería de Conversión (CRO). Colocamos llamados a la acción (CTA) intuitivos y optimizamos los tiempos de carga (la lentitud pierde el 50% de las visitas). \n\nAdemás, pre-configuramos tu embudo para el envío rápido de mensajes a WhatsApp. Al combinar esta infraestructura de alta velocidad con campañas precisas de Google o Meta Ads, los prospectos fluyen de inmediato directamente a la palma de tu mano."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question.replace(/[⚡🚀🛡️🎯📝📈]/g, "").trim(), // Remove emojis for metadata clarity if desired, or keep as is. Let's keep it clean
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer.replace(/\n\n/g, " ").replace(/\n/g, " ")
      }
    }))
  };

  return (
    <motion.section
      id="faq"
      variants={scrollRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="relative z-10 border-t border-white/5 bg-[#09183c] py-24 sm:py-32"
    >
      {/* JSON-LD Structured Data for FAQ SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background ambient radial gradients */}
      <div className="absolute left-1/4 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-sky-500/5 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-blue-500/5 blur-[150px]" />

      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 px-3.5 py-1 text-xs text-sky-400 font-mono">
            <HelpCircle className="h-3.5 w-3.5 animate-pulse" />
            <span>Centro de Respuestas</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tenemos las <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">respuestas</span> que buscas
          </h2>
          
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Resolvemos tus dudas técnicas y comerciales sobre cómo funciona nuestro sistema potenciado con Inteligencia Artificial.
          </p>
        </div>

        {/* FAQs Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              index={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Dynamic CTA at bottom of FAQ */}
        <div className="mt-12 rounded-3xl border border-white/5 bg-slate-950/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden backdrop-blur-md">
          <div className="absolute -right-12 -bottom-12 h-36 w-36 rounded-full bg-sky-500/5 blur-3xl pointer-events-none" />
          
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              ¿Tienes otra consulta en mente?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Nuestro soporte dinámico de WhatsApp está listo para asesorarte sin compromiso.
            </p>
          </div>

          <a
            href="https://wa.me/525647805021?text=Hola%20Click%20boost%20Media!%20Tengo%20una%20pregunta%20adicional%20sobre%20sus%20servicios%20de%20dise%C3%B1o%20y%20publicidad."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-450 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md shadow-cyan-400/10 hover:scale-[1.02] active:scale-[0.98] transition-all shrink-0 cursor-pointer"
          >
            <span>Preguntar por WhatsApp</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

      </div>
    </motion.section>
  );
}
