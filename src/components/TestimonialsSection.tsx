import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight, MessageSquareCode, ShieldCheck } from "lucide-react";

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

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  avatarBg: string;
  initials: string;
  tag: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Alejandro Ruiz",
    role: "Director de Operaciones",
    company: "Grupo Inmobiliario AR",
    rating: 5,
    text: "Nuestra anterior agencia tardó 2 meses en entregarnos un sitio que nunca funcionó bien. Click boost Media lo diseñó y montó en tiempo récord. Lo mejor es que la integración de anuncios Meta capturó 45 clientes calificados el primer mes.",
    avatarBg: "from-cyan-400 to-sky-500",
    initials: "AR",
    tag: "Diseño Web + Meta Ads"
  },
  {
    id: 2,
    name: "Dra. Sofía Martínez",
    role: "Fundadora & Médica Principal",
    company: "Dermalight Clinic",
    rating: 5,
    text: "El Plan Sencillo de $299 USD transformó la manera en que agendamos citas. Los pacientes entran a la landing, eligen su tratamiento y dan clic al botón de WhatsApp. Mi clínica local duplicó consultas de inmediato.",
    avatarBg: "from-sky-300 to-cyan-450",
    initials: "SM",
    tag: "Plan Sencillo $299"
  },
  {
    id: 3,
    name: "Carlos Mendoza",
    role: "CEO & Cofundador",
    company: "E-Commerce Velox",
    rating: 5,
    text: "Montamos toda nuestra arquitectura de embudo y pixel con el Plan Multi-Canal. La optimización del API de conversiones server-side realmente marcó un antes y un después en nuestro retorno de inversión ROAS frente a iOS 14. Se nota que entienden de ingeniería publicitaria.",
    avatarBg: "from-cyan-500 to-sky-600",
    initials: "CM",
    tag: "Publicidad Multi-Canal"
  },
  {
    id: 4,
    name: "Patricia Herrera",
    role: "Coordinadora de Educación",
    company: "Instituto de Idiomas EuroLingua",
    rating: 5,
    text: "Excelente servicio técnico y post-venta. El panel autogestionable es increíblemente sencillo; el equipo nos capacitó en 20 minutos. El soporte que brindan por WhatsApp es inmediato, cercano y sumamente profesional.",
    avatarBg: "from-sky-400 to-sky-600",
    initials: "PH",
    tag: "Plan Corporativo"
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(timer);
  }, [activeIndex, isAutoPlaying]);

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Variants for slick slide animations
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 28 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 150 : -150,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 260, damping: 28 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <motion.section
      id="testimonios"
      variants={scrollRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="relative z-10 border-t border-white/5 bg-[#071330] py-24 sm:py-32"
    >
      {/* Background ambient light */}
      <div className="absolute right-10 top-1/3 -z-10 h-64 w-64 rounded-full bg-emerald-500/5 blur-[120px]" />
      <div className="absolute left-10 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-sky-500/5 blur-[140px]" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
        
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-400/20 uppercase tracking-widest font-mono">
            Social Proof
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Casos de Éxito de Negocios Reales
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Descubre por qué decenas de empresas y profesionales confían en nuestro desarrollo de alta velocidad integrado con IA y optimización de pauta.
          </p>
        </div>

        {/* Testimonials Carousel Chassis */}
        <div className="relative min-h-[460px] md:min-h-[380px] flex items-center justify-center max-w-4xl mx-auto pt-4">
          
          <div className="absolute -left-2 md:-left-16 z-20">
            <button
              onClick={handlePrev}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/10 bg-[#040814]/80 hover:bg-[#070e20] text-slate-300 hover:text-sky-400 flex items-center justify-center transition-all hover:border-sky-500/30 shadow-lg cursor-pointer backdrop-blur-md"
              aria-label="Opinión anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </div>

          <div className="absolute -right-2 md:-right-16 z-20">
            <button
              onClick={handleNext}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/10 bg-[#040814]/80 hover:bg-[#070e20] text-slate-300 hover:text-sky-400 flex items-center justify-center transition-all hover:border-sky-500/30 shadow-lg cursor-pointer backdrop-blur-md"
              aria-label="Opinión siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="w-full overflow-hidden px-1 py-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full rounded-3xl border border-white/10 bg-slate-950/45 p-6 sm:p-10 md:p-12 shadow-xl backdrop-blur-sm grid grid-cols-1 md:grid-cols-4 gap-8 items-start relative select-none"
              >
                {/* Decorative absolute components */}
                <Quote className="absolute right-6 top-6 h-12 w-12 text-slate-500/10 pointer-events-none" />

                {/* Left Profile Area */}
                <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-tr ${current.avatarBg} flex items-center justify-center font-bold text-white shadow-lg text-lg border border-white/10`}>
                    {current.initials}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white flex items-center justify-center md:justify-start gap-1">
                      {current.name}
                      <ShieldCheck className="h-4 w-4 text-sky-400" />
                    </h4>
                    <p className="text-xs text-sky-300 font-medium">{current.role}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{current.company}</p>
                  </div>
                </div>

                {/* Right Content Area */}
                <div className="md:col-span-3 space-y-6 flex flex-col justify-between h-full">
                  
                  {/* Rating & Tag */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: current.rating }).map((_, is) => (
                        <Star key={is} className="h-4.5 w-4.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="self-start sm:self-auto text-[10px] font-mono tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-semibold uppercase">
                      {current.tag}
                    </span>
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-slate-200 text-sm sm:text-base leading-relaxed italic md:not-italic font-medium">
                    "{current.text}"
                  </blockquote>

                  {/* Verified user note */}
                  <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] text-slate-400 font-mono font-medium">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Transacción y opiniones de cliente 100% verificadas</span>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center items-center gap-2.5">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoPlaying(false);
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx 
                  ? "w-8 bg-sky-400 shadow-md shadow-sky-500/20" 
                  : "w-2.5 bg-slate-700 hover:bg-slate-500"
              }`}
              aria-label={`Ir a opinión ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </motion.section>
  );
}
