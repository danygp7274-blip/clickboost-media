import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Video, 
  Sparkles, 
  CheckCircle, 
  Building2, 
  Stethoscope, 
  ShoppingBag, 
  GraduationCap, 
  Quote, 
  X,
  Plus
} from "lucide-react";
import { Language } from "../translations";

interface VideoTestimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  techStack: string;
  videoUrl: string;
  quote: string;
  details: string;
  logoIcon: React.ElementType;
  accentColor: string;
  glowColor: string;
  initials: string;
}

const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 1,
    name: "Alejandro Ruiz",
    role: "Director de Operaciones",
    company: "Grupo Inmobiliario AR",
    techStack: "Portal Inmobiliario IA & Ads",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-working-at-her-office-desk-42289-large.mp4",
    quote: "Capturamos 45 clientes de alto valor el primer mes de campaña.",
    details: "Implementamos un portal con búsqueda semántica que redujo las llamadas preliminares un 75% y conectó clientes directamente a WhatsApp.",
    logoIcon: Building2,
    accentColor: "from-cyan-400 to-sky-500",
    glowColor: "rgba(34,211,238,0.4)",
    initials: "AR"
  },
  {
    id: 2,
    name: "Dra. Sofía Martínez",
    role: "Fundadora & Médica Principal",
    company: "Dermalight Clinic",
    techStack: "Landing Page Oro & WhatsApp CRM",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-woman-works-on-a-laptop-42293-large.mp4",
    quote: "Duplicamos las consultas médicas locales gracias al embudo de WhatsApp.",
    details: "El diseño optimizado para dispositivos móviles y el agendamiento instantáneo eliminaron las fricciones en la asignación de citas.",
    logoIcon: Stethoscope,
    accentColor: "from-emerald-400 to-teal-500",
    glowColor: "rgba(16,185,129,0.4)",
    initials: "SM"
  },
  {
    id: 3,
    name: "Carlos Mendoza",
    role: "CEO & Cofundador",
    company: "E-Commerce Velox",
    techStack: "Embudo Multi-Canal + API Server",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34287-large.mp4",
    quote: "El API de conversiones server-side levantó nuestro ROAS un 4.8x.",
    details: "La integración técnica avanzada mitigó por completo la pérdida de atribución por bloqueadores y actualizaciones de iOS.",
    logoIcon: ShoppingBag,
    accentColor: "from-purple-400 to-pink-500",
    glowColor: "rgba(168,85,247,0.4)",
    initials: "CM"
  },
  {
    id: 4,
    name: "Patricia Herrera",
    role: "Coordinadora de Educación",
    company: "EuroLingua Institute",
    techStack: "Plan Corporativo + Autogestión",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-working-on-a-laptop-in-a-coffeeshop-42284-large.mp4",
    quote: "El panel autogestionable nos permite actualizar promociones en 3 clics.",
    details: "Una solución administrativa intuitiva con base remota que permite al personal sin conocimientos técnicos mantener todo el sitio al día.",
    logoIcon: GraduationCap,
    accentColor: "from-amber-400 to-orange-500",
    glowColor: "rgba(245,158,11,0.4)",
    initials: "PH"
  }
];

const LOCAL_TRANSLATIONS = {
  es: {
    sectionBadge: "Social Proof Interactivo",
    sectionTitle: "Casos de Éxito en Formato de Video",
    sectionSubtitle: "Escucha directamente a los directores y fundadores que impulsaron la digitalización de sus empresas mediante nuestras soluciones.",
    verifiedBadge: "Opiniones auténticas grabadas de forma 100% real",
    playInteractive: "Clic para maximizar video",
    hoverPrompt: "Previsualización táctil activa",
    modalSuccess: "Proyecto Implementado con Éxito",
    techLabel: "Flujo Aplicado:",
    closeLabel: "Cerrar Teatro",
    verifiedTitle: "Cliente Verificado",
    watchCase: "Estudiar Caso"
  },
  en: {
    sectionBadge: "Interactive Social Proof",
    sectionTitle: "High-Fidelity Video Testimonials",
    sectionSubtitle: "Hear directly from directors and business owners who automated client acquisition & modernized their operations.",
    verifiedBadge: "Authentic customer reviews fully verified",
    playInteractive: "Click to open interactive theater player",
    hoverPrompt: "Hover to play clip preview",
    modalSuccess: "Fully Deployed Solution",
    techLabel: "Applied Architecture:",
    closeLabel: "Close Theater",
    verifiedTitle: "Verified Client",
    watchCase: "Study Case"
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
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

interface VideoCardProps {
  testimonial: VideoTestimonial;
  lang: Language;
  onOpenTheater: (item: VideoTestimonial) => void;
}

function VideoCard({ testimonial, lang, onOpenTheater }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Play clip preview when hovered
  const handleMouseEnter = async () => {
    if (videoRef.current) {
      try {
        setIsPlaying(true);
        videoRef.current.muted = isMuted;
        await videoRef.current.play();
      } catch (err) {
        // Handle potential autoplay blocking safely
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const state = !videoRef.current.muted;
      videoRef.current.muted = state;
      setIsMuted(state);
    }
  };

  const LogoIcon = testimonial.logoIcon;
  const lt = LOCAL_TRANSLATIONS[lang];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenTheater(testimonial)}
      className="relative flex-none w-[270px] sm:w-[310px] h-[480px] rounded-3xl overflow-hidden border border-white/10 bg-slate-950/80 shadow-2xl cursor-pointer select-none group"
      id={`video-card-${testimonial.id}`}
    >
      {/* Background Video element */}
      <video
        ref={videoRef}
        src={testimonial.videoUrl}
        loop
        playsInline
        muted={isMuted}
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none"
      />

      {/* Default placeholder cover image or overlay glow when not playing */}
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-[#02050b]/20 to-[#030815] transition-all duration-300 ${isPlaying ? "opacity-90" : "opacity-100"}`} />

      {/* Decorative colored ambient lighting behind card top */}
      <div className={`absolute top-0 inset-x-0 h-1/3 bg-gradient-to-b ${testimonial.accentColor} opacity-5 blur-xl pointer-events-none`} />

      {/* Top Header Overlays */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
        {/* Client Logo Badge */}
        <div className="flex items-center gap-2 rounded-xl bg-[#02050b]/80 border border-white/10 backdrop-blur-md px-3 py-1.5 shadow-lg">
          <LogoIcon className="h-4 w-4 text-sky-400" />
          <span className="text-[10px] font-bold text-white tracking-wide uppercase">{testimonial.company}</span>
        </div>

        {/* Pulsing Live indicator */}
        <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 px-2.5 py-1 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono tracking-wider font-bold text-emerald-400 uppercase">REEL</span>
        </div>
      </div>

      {/* Play Icon in the Center triggered on hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <motion.div
          animate={{ scale: isPlaying ? [1, 1.1, 1] : 1 }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`h-14 w-14 rounded-full flex items-center justify-center border bg-[#02050c]/90 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:border-sky-400/50 group-hover:shadow-[0_0_30px_rgba(56,189,248,0.25)] transition-all duration-300 ${isPlaying ? "opacity-75" : "opacity-100"}`}
        >
          {isPlaying ? (
            <Play className="h-6 w-6 text-sky-400 fill-sky-400 ml-1 translate-x-px" />
          ) : (
            <Video className="h-6 w-6 text-slate-300" />
          )}
        </motion.div>
      </div>

      {/* Small volume selector on the card */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="absolute right-4 bottom-44 z-20 h-8 w-8 rounded-full bg-[#02050b]/80 border border-white/10 backdrop-blur-md text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Toggle Mute Preview"
        >
          {isMuted ? <VolumeX className="h-4 w-4 text-slate-400" /> : <Volume2 className="h-4 w-4 text-sky-400" />}
        </button>
      )}

      {/* Core Bottom Information Section */}
      <div className="absolute bottom-0 inset-x-0 p-5 space-y-3.5 z-10">
        <div className="space-y-1">
          {/* Rating */}
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="text-[10px] text-amber-400">★</span>
            ))}
          </div>
          {/* Main Snippet quote */}
          <p className="text-white text-[13px] font-bold leading-snug tracking-tight">
            "{testimonial.quote}"
          </p>
        </div>

        {/* Horizontal Divider */}
        <div className="h-px bg-white/5" />

        <div className="flex justify-between items-center">
          {/* User Details */}
          <div className="space-y-0.5">
            <h4 className="text-[12px] font-bold text-white tracking-wide">{testimonial.name}</h4>
            <p className="text-[10px] text-sky-300 font-medium leading-none">{testimonial.role}</p>
          </div>

          {/* Solution pill */}
          <div className="rounded-lg bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-[9px] font-mono font-semibold text-sky-400 uppercase tracking-wider">
            {testimonial.initials}
          </div>
        </div>

        {/* Mini progress bar matching clip length on card */}
        <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-sky-400 transition-all duration-100 ease-linear"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}

interface VideoTheaterProps {
  testimonial: VideoTestimonial;
  lang: Language;
  onClose: () => void;
}

function VideoTheater({ testimonial, lang, onClose }: VideoTheaterProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Auto play when loaded
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [testimonial]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTime = () => setCurrentTime(video.currentTime);
    const handleDuration = () => setDuration(video.duration || 0);

    video.addEventListener("timeupdate", handleTime);
    video.addEventListener("loadedmetadata", handleDuration);

    return () => {
      video.removeEventListener("timeupdate", handleTime);
      video.removeEventListener("loadedmetadata", handleDuration);
    };
  }, []);

  const handlePlayToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      const state = !isMuted;
      videoRef.current.muted = state;
      setIsMuted(state);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextTime = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVol = Number(e.target.value);
    setVolume(nextVol);
    if (videoRef.current) {
      videoRef.current.volume = nextVol;
      videoRef.current.muted = nextVol === 0;
      setIsMuted(nextVol === 0);
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const LogoIcon = testimonial.logoIcon;
  const lt = LOCAL_TRANSLATIONS[lang];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#02050b]/98 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-[#09183c] overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Absolute Top right Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-40 h-10 w-10 sm:h-12 sm:w-12 rounded-full border border-white/10 bg-slate-950/80 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer hover:border-sky-500/30 transition-all backdrop-blur-md"
          aria-label="Cerrar reproductor"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: Video Theater Player (7 columns) */}
        <div className="md:col-span-7 bg-slate-950 relative flex items-center justify-center aspect-video md:aspect-auto md:h-[600px]">
          <video
            ref={videoRef}
            src={testimonial.videoUrl}
            loop
            playsInline
            controls={false}
            className="w-full h-full object-cover"
            onClick={handlePlayToggle}
          />

          {/* Shadow Overlay Gradient */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 space-y-4">
            
            {/* Play Head Scrubber */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-300">
                <span>{Math.floor(currentTime / 60)}:{( "0" + Math.floor(currentTime % 60) ).slice(-2)}</span>
                <span>{Math.floor(duration / 60)}:{( "0" + Math.floor(duration % 60) ).slice(-2)}</span>
              </div>
              <div className="relative group/scrub">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  step={0.1}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 rounded-lg bg-white/20 appearance-none cursor-pointer accent-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <div 
                  className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-cyan-400 to-sky-400 rounded-lg pointer-events-none"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* In-Video Controls bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Play/Pause Button */}
                <button
                  onClick={handlePlayToggle}
                  className="p-2 rounded-lg hover:bg-white/10 text-white transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 fill-white" />}
                </button>

                {/* Volume slider */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMuteToggle}
                    className="p-2 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5 text-red-400" /> : <Volume2 className="h-5 w-5 text-sky-400" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 rounded-lg bg-white/20 appearance-none cursor-pointer accent-sky-450"
                  />
                </div>
              </div>

              {/* HD Tag */}
              <span className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-[9px] font-mono font-bold text-white tracking-widest uppercase">
                1080P HD
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Case Study Description (5 columns) */}
        <div className="md:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/5 space-y-8 max-h-[400px] md:max-h-none overflow-y-auto">
          <div className="space-y-6">
            {/* Verified tag */}
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3.5 py-1 text-xs font-semibold self-start tracking-wide uppercase font-mono w-fit">
              <CheckCircle className="h-3.5 w-3.5 fill-emerald-500/10" />
              <span>{lt.verifiedTitle}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-tr ${testimonial.accentColor} flex items-center justify-center font-bold text-white text-sm border border-white/10`}>
                  <LogoIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight leading-none">{testimonial.company}</h3>
                  <p className="text-xs text-slate-400 font-medium font-mono pt-1">{testimonial.name}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-sky-300 font-mono">{testimonial.role}</p>
            </div>

            {/* Testimonial Quote quote box */}
            <div className="relative rounded-2xl bg-white/5 border border-white/10 p-5">
              <Quote className="absolute right-4 top-4 h-8 w-8 text-white/5" />
              <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed font-semibold">
                "{testimonial.quote}"
              </p>
            </div>

            {/* Technical Case Details */}
            <div className="space-y-2">
              <h5 className="text-xs font-mono font-bold uppercase tracking-widest text-[#38bdf8] flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{lt.techLabel}</span>
              </h5>
              <div className="rounded-xl border border-white/5 bg-slate-950/40 p-3 text-xs font-bold text-emerald-400 font-mono">
                {testimonial.techStack}
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed p-1">
                {testimonial.details}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-4 text-xs font-mono">
            <span className="text-slate-400">{lt.modalSuccess}</span>
            <div className="flex items-center gap-1 text-emerald-400 font-bold">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface VideoTestimonialsSectionProps {
  lang: Language;
}

export default function VideoTestimonialsSection({ lang }: VideoTestimonialsSectionProps) {
  const [theaterItem, setTheaterItem] = useState<VideoTestimonial | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const keyTranslation = LOCAL_TRANSLATIONS[lang];

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <motion.section
      id="video-testimonios"
      variants={scrollRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="relative z-10 border-t border-white/5 bg-[#09183c] py-24 sm:py-32 overflow-hidden"
    >
      {/* Background radial gradients */}
      <div className="absolute left-10 bottom-1/4 -z-10 h-80 w-80 rounded-full bg-sky-500/5 blur-[150px]" />
      <div className="absolute right-10 top-1/4 -z-10 h-72 w-72 rounded-full bg-cyan-500/5 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
        
        {/* Headings */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4 text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400/10 px-3.5 py-1 text-xs font-semibold text-cyan-400 border border-cyan-400/20 uppercase tracking-widest font-mono">
              <Video className="h-3.5 w-3.5" />
              {keyTranslation.sectionBadge}
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {keyTranslation.sectionTitle}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {keyTranslation.sectionSubtitle}
            </p>
          </div>

          {/* Slider Controllers */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleScrollLeft}
              className="h-12 w-12 rounded-full border border-white/10 bg-[#040814]/80 hover:bg-[#070e20] text-slate-300 hover:text-sky-400 flex items-center justify-center transition-all hover:border-sky-500/30 shadow-lg cursor-pointer"
              aria-label="Carousel left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleScrollRight}
              className="h-12 w-12 rounded-full border border-white/10 bg-[#040814]/80 hover:bg-[#070e20] text-slate-300 hover:text-sky-400 flex items-center justify-center transition-all hover:border-sky-500/30 shadow-lg cursor-pointer"
              aria-label="Carousel right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Video Reel Slider Base Container */}
        <div className="relative">
          {/* Edge blur shadows to enrich slider feeling */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#030611] to-transparent z-10 pointer-events-none hidden sm:block" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#030611] to-transparent z-10 pointer-events-none hidden sm:block" />

          {/* Scrollable list */}
          <div
            ref={carouselRef}
            className="flex items-center gap-6 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent justify-start md:grid-cols-4 snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {VIDEO_TESTIMONIALS.map((item) => (
              <div key={item.id} className="snap-center">
                <VideoCard
                  testimonial={item}
                  lang={lang}
                  onOpenTheater={(selected) => setTheaterItem(selected)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Verified User Label */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono font-medium pt-2 text-center">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{keyTranslation.verifiedBadge}</span>
        </div>

      </div>

      {/* Full screen video theater modal overlay */}
      <AnimatePresence>
        {theaterItem && (
          <VideoTheater
            testimonial={theaterItem}
            lang={lang}
            onClose={() => setTheaterItem(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
