import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  Monitor, 
  Smartphone, 
  ExternalLink, 
  Sparkles, 
  Check, 
  Copy, 
  ArrowUpRight, 
  Zap, 
  ShoppingCart, 
  TrendingUp, 
  Globe, 
  Building, 
  Calendar, 
  ChevronRight,
  ShieldCheck,
  Star,
  Activity
} from "lucide-react";
import { translations, Language } from "../translations";

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

interface ProjectsSectionProps {
  lang: Language;
  onOpenContact: () => void;
}

export default function ProjectsSection({ lang, onOpenContact }: ProjectsSectionProps) {
  const t = translations[lang];
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [simulatorView, setSimulatorView] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);
  
  // Custom interactive state for mocks inside the previews
  const [selectedSneakerSize, setSelectedSneakerSize] = useState<number>(42);
  const [medTechDoctor, setMedTechDoctor] = useState<string>("Dr. Alexander");
  const [propertyPrice, setPropertyPrice] = useState<number>(2450000);
  const [saasAlert, setSaasAlert] = useState<string>("Normal");
  const [aeroRouteOptimized, setAeroRouteOptimized] = useState<boolean>(false);
  const [fitVibeRoutine, setFitVibeRoutine] = useState<"cardio" | "strength">("cardio");

  const projects = [
    {
      id: 1,
      category: t.project1Category,
      title: t.project1Title,
      desc: t.project1Desc,
      impact: t.project1Impact,
      tags: ["React 19", "Q-Engine SEO", "Custom CSS", "Edge CDN"],
      color: "from-cyan-400 to-sky-450",
      accent: "#22d3ee",
      stats: [
        { label: "Conversion Rate", value: "+140%", desc: "vs prior WooCommerce setup" },
        { label: "Core Web Vitals", value: "99/100", desc: "Perfect PageSpeed Score" },
        { label: "Interactive Delay", value: "0.8s", desc: "Ultra-fast Next-Gen Index" }
      ]
    },
    {
      id: 2,
      category: t.project2Category,
      title: t.project2Title,
      desc: t.project2Desc,
      impact: t.project2Impact,
      tags: ["D3.js Grid", "Tailwind 4", "Pre-trained NLP", "SSR Hub"],
      color: "from-sky-400 to-cyan-500",
      accent: "#38bdf8",
      stats: [
        { label: "User Acquisition", value: "42k+", desc: "Organic Leads Registered" },
        { label: "Ad Campaign ROI", value: "4.8x", desc: "Stable Return on Ad Spend" },
        { label: "Interactive Retention", value: "+200%", desc: "Dwell time on target dashboard" }
      ]
    },
    {
      id: 3,
      category: t.project3Category,
      title: t.project3Title,
      desc: t.project3Desc,
      impact: t.project3Impact,
      tags: ["Geo-Search", "WA Automated Engine", "Next-Gen Router", "Vite Edge"],
      color: "from-cyan-400 to-sky-500",
      accent: "#06b6d4",
      stats: [
        { label: "Leads Volume", value: "+310%", desc: "Highly-qualified direct traffic" },
        { label: "Deals Closed (Q1)", value: "180+", desc: "Integrated smart automations" },
        { label: "Reponse Latency", value: "-75%", desc: "Lower client dropouts" }
      ]
    },
    {
      id: 4,
      category: t.project4Category,
      title: t.project4Title,
      desc: t.project4Desc,
      impact: t.project4Impact,
      tags: ["AES Encryption", "Dynamic Booking Calendar", "AI Auto-Siren", "Secure HIPAA"],
      color: "from-sky-300 to-sky-500",
      accent: "#7dd3fc",
      stats: [
        { label: "Bookings Increase", value: "+210%", desc: "Automatic WhatsApp check" },
        { label: "No-show rate", value: "0%", desc: "Durable active retention" },
        { label: "Patient Satisfaction", value: "98.9%", desc: "Validated Clinic Workflow" }
      ]
    },
    {
      id: 5,
      category: t.project5Category,
      title: t.project5Title,
      desc: t.project5Desc,
      impact: t.project5Impact,
      tags: ["Trajectory Solver", "Live Weather API", "Framer Micro", "Edge Key-Value"],
      color: "from-cyan-450 to-indigo-500",
      accent: "#6366f1",
      stats: [
        { label: "Operating Cost", value: "-35%", desc: "Autonomous sat dispatch routing" },
        { label: "Customs Clearance", value: "< 2 mins", desc: "Digital verification pipeline" },
        { label: "Active Air Routes", value: "1,240+", desc: "Dynamic meteorological adjustment" }
      ]
    },
    {
      id: 6,
      category: t.project6Category,
      title: t.project6Title,
      desc: t.project6Desc,
      impact: t.project6Impact,
      tags: ["Stripe Int.", "H265 Stream", "PWA Offline Mode", "Tailwind 4"],
      color: "from-emerald-400 to-teal-500",
      accent: "#10b981",
      stats: [
        { label: "Trainer Engagement", value: "94.6%", desc: "Direct interactive streaming ratio" },
        { label: "Active Members", value: "12,500+", desc: "+190% Monthly active retention" },
        { label: "Revenue Flowing", value: "$420k/mo", desc: "Automated direct stripe subscriptions" }
      ]
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + "?demo-project=" + (selectedProject !== null ? selectedProject + 1 : "1"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render simulated components for standard cards and high-end interactive models
  const renderSimulatedApp = (projId: number, compact: boolean = true) => {
    switch (projId) {
      case 1: // Apex Footwear
        return (
          <div className="w-full h-full bg-[#070b19] flex flex-col justify-between text-white overflow-hidden text-[11px] p-2 sm:p-4 font-sans select-none relative">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="font-extrabold tracking-tight">APEX <span className="text-sky-400">LABS</span></span>
              <div className="flex gap-2 text-[9px] text-slate-400 font-mono">
                <span>SHOP</span>
                <span className="text-white font-bold">SALE -30%</span>
              </div>
            </div>

            {/* Visual Hero Content */}
            <div className="flex items-center justify-between gap-2 my-2 relative">
              {/* Abstract Sneaker background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-sky-500/20 blur-md pointer-events-none" />
              
              <div className="space-y-1 z-10">
                <span className="bg-sky-400/10 text-sky-400 text-[8px] font-mono px-1 py-0.5 rounded uppercase">NEW SEASON</span>
                <h5 className="font-extrabold text-[12px] leading-tight text-white">SKYRUNNER PRO X</h5>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400 line-through">$249.00</span>
                  <span className="text-sky-400 font-bold">$189.00</span>
                </div>
              </div>

              {/* Vector Mockup Sneaker */}
              <div className="relative w-24 h-16 shrink-0 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/10 to-transparent rounded-full filter blur-sm" />
                {/* Simulated CSS Custom Sneaker drawing shapes */}
                <div className="w-20 h-10 bg-slate-800 rounded-b-xl rounded-tl-full relative border-t-2 border-r-2 border-sky-400">
                  {/* Air sole outline */}
                  <div className="absolute bottom-0 inset-x-0 h-2 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-b-xl flex justify-around">
                    <div className="w-1.5 h-1 bg-white/40 rounded-full" />
                    <div className="w-1.5 h-1 bg-white/40 rounded-full" />
                    <div className="w-1.5 h-1 bg-white/40 rounded-full" />
                  </div>
                  {/* Neon swoosh / lines */}
                  <div className="absolute top-2 right-4 w-8 h-2 border-b border-l border-sky-400 rounded-bl-lg transform rotate-[-15deg]" />
                  {/* Red/White eyelet accents */}
                  <div className="absolute top-1 left-4 flex gap-0.5">
                    <div className="w-1 h-1 bg-red-400 rounded-full" />
                    <div className="w-1 h-1 bg-white rounded-full" />
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Interaction Row */}
            <div className="border-t border-white/5 pt-2 flex justify-between items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-slate-400">Size:</span>
                <div className="flex gap-1">
                  {[40, 41, 42].map((size) => (
                    <button
                      key={size}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSneakerSize(size);
                      }}
                      className={`w-4 h-4 rounded text-[8px] font-mono leading-none flex items-center justify-center transition-colors cursor-pointer ${
                        selectedSneakerSize === size ? "bg-sky-400 text-black font-extrabold" : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-400 to-sky-450 text-slate-950 px-2 py-1 rounded font-bold hover:from-cyan-300 hover:to-sky-400 transition-colors text-[9px] cursor-pointer">
                <ShoppingCart className="h-2.5 w-2.5 shrink-0" />
                <span>BUY NOW</span>
              </div>
            </div>

            {/* Performance Live Overlay tag */}
            <div className="absolute bottom-1 right-1 text-[8px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-1 flex items-center gap-0.5">
              <span className="h-1 w-1 bg-emerald-400 rounded-full animate-ping" />
              <span>PAGE SPEED: 100% (0.8s)</span>
            </div>
          </div>
        );

      case 2: // Nova SaaS
        return (
          <div className="w-full h-full bg-[#030612] flex flex-col justify-between text-white overflow-hidden text-[11px] p-2 sm:p-4 font-mono select-none relative">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="font-extrabold text-white text-[9px] tracking-widest">NOVA_INTELLIGENCE</span>
              </div>
              <span className="text-[7px] text-slate-400 bg-white/5 px-1 py-0.5 rounded">V2.46.0 - ACTIVE</span>
            </div>

            {/* Content Body */}
            <div className="grid grid-cols-2 gap-2 my-2">
              {/* Left Widget: Radial Score */}
              <div className="bg-white/[0.02] border border-white/5 rounded-lg p-1.5 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/5 rounded-full blur-md" />
                <span className="text-[8px] text-slate-400 tracking-wider">CLUSTER ACCURACY</span>
                <span className="text-[15px] font-extrabold text-blue-400 mt-1">99.82%</span>
                <div className="w-full bg-white/5 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-blue-400 h-full w-[99.8%]" />
                </div>
              </div>

              {/* Right Widget: Active Traffic */}
              <div className="bg-white/[0.02] border border-white/5 rounded-lg p-1.5 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[8px] text-slate-400">
                  <span>ACTIVE_USERS</span>
                  <Activity className="h-2.5 w-2.5 text-blue-400 animate-pulse" />
                </div>
                <div className="my-1">
                  <span className="text-[14px] font-extrabold text-white">8,421</span>
                  <span className="text-[8px] text-emerald-400 ml-1 font-bold">+18.5%</span>
                </div>
                <div className="text-[7px] text-slate-500">Peak hour analytics stable</div>
              </div>
            </div>

            {/* Interaction Area (Mutable status settings) */}
            <div className="flex justify-between items-center border-t border-white/5 pt-2 text-[9px]">
              <div className="flex items-center gap-1">
                <span className="text-slate-400 text-[8px]">Alert Mode:</span>
                <span className={`px-1 py-0.5 rounded text-[8px] font-bold ${
                  saasAlert === "Safety" ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"
                }`}>
                  {saasAlert}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSaasAlert(saasAlert === "Normal" ? "Safety" : "Normal");
                }}
                className="bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-[8px] px-1.5 py-0.5 rounded border border-white/10 transition-colors cursor-pointer"
              >
                SWAP ALERT
              </button>
            </div>

            {/* Performance Tracker */}
            <div className="absolute top-1 right-12 text-[7px] text-slate-500 font-mono">
              PING: 4ms
            </div>
          </div>
        );

      case 3: // Prime Real Estate
        return (
          <div className="w-full h-full bg-[#05040a] flex flex-col justify-between text-white overflow-hidden text-[11px] p-2 sm:p-4 font-sans select-none relative">
            {/* Header / Brand */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Building className="h-3 w-3 text-indigo-400" />
                <span className="font-bold tracking-widest text-[9px] uppercase text-white">PRIME <span className="text-indigo-400">ESTATES</span></span>
              </div>
              <div className="text-[8px] text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                MIAMI EXCLUSIVE
              </div>
            </div>

            {/* Card Content Listing */}
            <div className="my-2 bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden relative group/listing">
              {/* Vector representation of real estate image */}
              <div className="h-16 w-full bg-gradient-to-tr from-indigo-950/40 via-indigo-900/10 to-transparent relative flex items-end p-1.5">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#05040a]" />
                {/* Minimalist vector shapes of a villa */}
                <div className="absolute bottom-1 right-2 flex items-end gap-1 pointer-events-none">
                  <div className="w-8 h-10 bg-slate-800 border-t border-indigo-400/30 rounded-t" />
                  <div className="w-12 h-14 bg-slate-700 border-t border-indigo-400/30 rounded-t relative">
                    <div className="w-4 h-4 bg-indigo-500/10 border border-indigo-400/20 absolute top-2 left-4 rounded" />
                  </div>
                  <div className="w-6 h-6 bg-slate-800 border-t border-indigo-400/30 rounded-t" />
                </div>
                <div className="z-10 flex flex-col">
                  <span className="bg-indigo-500 text-white font-bold text-[8px] px-1 py-0.5 rounded-full w-max">FOR SALE</span>
                  <span className="text-[12px] font-extrabold text-white mt-1">
                    ${(propertyPrice / 1000000).toFixed(2)}M USD
                  </span>
                </div>
              </div>

              {/* Listing stats */}
              <div className="p-1.5 grid grid-cols-3 gap-1 text-center text-slate-400 text-[8px] border-t border-white/5 bg-black/45">
                <div>
                  <span className="text-indigo-300 block font-bold">4 BH</span>
                  <span>BEDROOMS</span>
                </div>
                <div>
                  <span className="text-indigo-300 block font-bold">5 BT</span>
                  <span>BATHS</span>
                </div>
                <div>
                  <span className="text-indigo-300 block font-bold">450 m²</span>
                  <span>TERRAIN</span>
                </div>
              </div>
            </div>

            {/* Interactive Area */}
            <div className="flex justify-between items-center text-[8px] text-slate-500">
              <div className="flex gap-1.5">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setPropertyPrice(2450000);
                  }}
                  className={`px-1 py-0.5 rounded border transition-colors cursor-pointer ${
                    propertyPrice === 2450000 ? "border-indigo-400/40 text-indigo-300 bg-indigo-400/5 font-bold" : "border-transparent bg-transparent"
                  }`}
                >
                  Miami Villa
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPropertyPrice(1850000);
                  }}
                  className={`px-1 py-0.5 rounded border transition-colors cursor-pointer ${
                    propertyPrice === 1850000 ? "border-indigo-400/40 text-indigo-300 bg-indigo-400/5 font-bold" : "border-transparent bg-transparent"
                  }`}
                >
                  Penthouse
                </button>
              </div>

              <div className="flex items-center gap-1 text-[8px] text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/20 font-mono">
                <ShieldCheck className="h-2 w-2" />
                <span>WA API READY</span>
              </div>
            </div>
          </div>
        );

      case 4: // Zenith MedTech
        return (
          <div className="w-full h-full bg-[#020509] flex flex-col justify-between text-white overflow-hidden text-[11px] p-2 sm:p-4 font-sans select-none relative">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <Activity className="h-3 w-3 text-emerald-400 animate-spin-slow" />
                <span className="font-extrabold tracking-tight text-white text-[10px]">ZENITH <span className="text-emerald-400 font-bold">MED</span></span>
              </div>
              <div className="text-[7.5px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-1 flex items-center gap-0.5">
                <div className="w-1 h-1 bg-emerald-400 rounded-full animate-ping" />
                <span>TELEHEALTH ENGINE</span>
              </div>
            </div>

            {/* Doctor Card Selector */}
            <div className="my-2 bg-white/[0.02] border border-white/5 rounded-xl p-2 flex items-center justify-between gap-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600/35 border border-emerald-500/30 flex items-center justify-center font-bold font-mono text-emerald-300 text-[10px]">
                  Dr.
                </div>
                <div>
                  <h6 className="font-bold text-white text-[10px] leading-none">{medTechDoctor}</h6>
                  <span className="text-[7.5px] text-slate-400">Cardiología / Cardiology</span>
                </div>
              </div>
              <span className="text-[8px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full font-bold">Score 5.0</span>
            </div>

            {/* Interactive Toggle */}
            <div className="flex justify-between items-center border-t border-white/5 pt-2 text-[8px] text-slate-500">
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMedTechDoctor("Dr. Alexander");
                  }}
                  className={`px-1 py-0.5 rounded cursor-pointer ${
                    medTechDoctor === "Dr. Alexander" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-400/20" : "bg-white/5 text-slate-400"
                  }`}
                >
                  Alexander
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setMedTechDoctor("Dra. Martinez");
                  }}
                  className={`px-1 py-0.5 rounded cursor-pointer ${
                    medTechDoctor === "Dra. Martinez" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-400/20" : "bg-white/5 text-slate-400"
                  }`}
                >
                  Martinez
                </button>
              </div>

              <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-400">
                <span>Select Slots</span>
                <ChevronRight className="h-2 w-2" />
              </div>
            </div>
          </div>
        );

      case 5: // AeroCargo Satellital Hub
        return (
          <div className="w-full h-full bg-[#030612] flex flex-col justify-between text-white overflow-hidden text-[11px] p-2 sm:p-4 font-mono select-none relative">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-indigo-500/10 pb-2">
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3 text-indigo-400 animate-pulse" />
                <span className="font-extrabold text-[#38bdf8] text-[9px] tracking-wider">AEROCARGO_SATELLITE</span>
              </div>
              <span className="text-[7px] text-indigo-400 border border-indigo-400/20 px-1 py-0.5 rounded">AUTO_PILOT: ON</span>
            </div>

            {/* Flight trajectory monitor simulation */}
            <div className="my-2 bg-[#050b20] border border-indigo-500/15 rounded-lg p-2 flex flex-col relative overflow-hidden h-[95px] justify-between">
              {/* Star grid background */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="flex justify-between items-center text-[8px] text-slate-400 z-10">
                <span>SECTOR: MID-ATLANTIC 4B</span>
                <span className="text-[#38bdf8] font-bold">ALTITUDE: 36,000 FT</span>
              </div>

              {/* Trajectory visualization */}
              <div className="relative h-6 flex items-center justify-center my-1 z-10">
                <div className="absolute left-1 w-2 h-2 rounded-full bg-[#38bdf8]" />
                <div className="absolute right-1 w-2 h-2 rounded-full bg-emerald-400" />
                
                {/* Connecting animated path line */}
                <svg className="w-full h-6 overflow-visible absolute inset-x-0" style={{ pointerEvents: 'none' }}>
                  <path 
                    d="M 12 12 Q 100 -2 200 12" 
                    fill="none" 
                    stroke={aeroRouteOptimized ? "#34d399" : "#6366f1"} 
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                  />
                  {/* Moving satellite dot */}
                  <circle r="3" fill="#38bdf8">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M 12 12 Q 100 -2 200 12" />
                  </circle>
                </svg>

                <span className="bg-slate-900/85 text-white text-[7.5px] border border-white/5 rounded px-1.5 py-0.5 absolute top-4 left-1/2 -translate-x-1/2 shadow">
                  {aeroRouteOptimized ? "AI Route: Optimizado (-35%)" : "Standard Aviation Way"}
                </span>
              </div>

              <div className="flex justify-between items-center text-[7.5px] text-slate-500 z-10">
                <span>ETA: {aeroRouteOptimized ? "03h 12m" : "04h 48m"}</span>
                <span className="text-emerald-400">SAT_LINK: EXCELLENT</span>
              </div>
            </div>

            {/* Micro Interaction (Optimize Route) */}
            <div className="flex justify-between items-center border-t border-indigo-500/10 pt-2 text-[8px]">
              <span className="text-slate-400">Engine Path:</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setAeroRouteOptimized(!aeroRouteOptimized);
                }}
                className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 px-2 py-1 rounded transition-all cursor-pointer font-bold uppercase tracking-wider"
              >
                {aeroRouteOptimized ? "Reset Path" : "Optimize Route"}
              </button>
            </div>
          </div>
        );

      case 6: // FitVibe Premium Ecosystem
        return (
          <div className="w-full h-full bg-[#010905] flex flex-col justify-between text-white overflow-hidden text-[11px] p-2 sm:p-4 font-sans select-none relative">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-emerald-500/10 pb-2">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-emerald-400 animate-pulse" />
                <span className="font-extrabold tracking-tight text-white text-[9px] uppercase">FITVIBE <span className="text-emerald-400">ELITE</span></span>
              </div>
              <div className="text-[7.5px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 rounded px-1 flex items-center gap-0.5">
                <span className="h-1 w-1 bg-emerald-400 rounded-full" />
                <span>ONLINE MEMBER ID</span>
              </div>
            </div>

            {/* Exercise Plan / Stats summary in body */}
            <div className="my-2 rounded-xl border border-white/5 bg-slate-950/70 p-2.5 space-y-2 relative">
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-mono tracking-wider text-slate-400">RECOMENDADO PARA HOY</span>
                <span className="text-[8px] text-emerald-400 font-bold bg-emerald-400/10 px-1 py-0.5 rounded">NIVEL PRO</span>
              </div>

              {fitVibeRoutine === "cardio" ? (
                <div className="flex items-center justify-between gap-2 animate-fadeIn">
                  <div>
                    <h6 className="font-bold text-white text-[10.5px]">HIIT Fat Burner v4.2</h6>
                    <p className="text-[8px] text-slate-400">Intervalos de alta intensidad + Cardio Activo</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[12px] font-mono font-extrabold text-[#10b981]">520 Kcal</span>
                    <span className="block text-[7px] text-slate-400">45 MINUTOS</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 animate-fadeIn">
                  <div>
                    <h6 className="font-bold text-white text-[10.5px]">Power Strength Master</h6>
                    <p className="text-[8px] text-slate-400">Hipertrofia dirigida y potencia explosiva</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[12px] font-mono font-extrabold text-[#10b981]">680 Kcal</span>
                    <span className="block text-[7px] text-slate-400">65 MINUTOS</span>
                  </div>
                </div>
              )}

              {/* Progress bar simulation */}
              <div className="pt-1">
                <div className="flex justify-between text-[7px] text-slate-500 mb-0.5">
                  <span>Esfuerzo muscular</span>
                  <span>{fitVibeRoutine === "cardio" ? "85%" : "95%"}</span>
                </div>
                <div className="bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full transition-all duration-505" style={{ width: fitVibeRoutine === "cardio" ? "85%" : "95%" }} />
                </div>
              </div>
            </div>

            {/* Interactive Toggle Button */}
            <div className="flex justify-between items-center border-t border-emerald-500/10 pt-2 text-[8px] text-slate-500">
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFitVibeRoutine("cardio");
                  }}
                  className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                    fitVibeRoutine === "cardio" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-400/20 font-bold" : "bg-white/5 text-slate-400"
                  }`}
                >
                  HIIT
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFitVibeRoutine("strength");
                  }}
                  className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                    fitVibeRoutine === "strength" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-400/20 font-bold" : "bg-white/5 text-slate-400"
                  }`}
                >
                  STRENGTH
                </button>
              </div>

              <div className="flex items-center gap-1 text-[8px] text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer">
                <span>INICIAR SESIÓN</span>
                <ChevronRight className="h-2 w-2" />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.section
      id="nuestros-proyectos"
      variants={scrollRevealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      className="relative py-20 sm:py-28 bg-[#071330] border-b border-white/5 overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute top-1/4 right-[10%] w-[350px] h-[350px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[15%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-400/10 px-3.5 py-1 text-xs font-semibold text-sky-400 border border-sky-400/20 uppercase tracking-widest">
            {t.projectsBadge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t.projectsTitle}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.projectsSubtitle}
          </p>
        </div>

        {/* Modular Bento Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <motion.div
                key={project.id}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative flex flex-col rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 p-6 sm:p-8 transition-all duration-300 overflow-hidden"
                style={{
                  boxShadow: isHovered ? `0 10px 40px -15px ${project.accent}25` : "none"
                }}
              >
                {/* Border neon line effect */}
                <div className={`absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r ${project.color} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
                
                {/* Visual live mockup portal inside card */}
                <div className="relative rounded-2xl border border-white/10 bg-[#03060f] aspect-[16/10] overflow-hidden group-hover:translate-y-[-4px] transition-transform duration-300 shadow-xl flex flex-col">
                  
                  {/* Browser simulated Address frame */}
                  <div className="h-6 bg-white/[0.04] border-b border-white/5 px-3 flex items-center justify-between shrink-0">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-red-500/50 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-yellow-500/50 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-emerald-500/50 rounded-full" />
                    </div>
                    {/* URL simulated search bar */}
                    <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 rounded px-2 py-0.5 leading-none w-5/12 text-center justify-center font-mono text-[7px] text-slate-400">
                      <Globe className="h-2 w-2 text-sky-400" />
                      <span className="truncate">https://clickboost.com/client_{project.id}</span>
                    </div>
                    <div className="w-3" /> {/* Spacer */}
                  </div>

                  {/* HTML Live Simulation Preview */}
                  <div className="flex-1 overflow-hidden relative">
                    {renderSimulatedApp(project.id, true)}
                    
                    {/* Dark glass interactive hovering selector */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-[#02050c]/80 backdrop-blur-[3px] flex flex-col justify-center items-center gap-3 p-4 z-20 text-center"
                        >
                          <span className="text-[10px] font-mono tracking-widest text-[#38bdf8] uppercase flex items-center gap-1.5">
                            <Sparkles className="h-3 w-3 text-[#38bdf8] animate-pulse" />
                            {project.category}
                          </span>
                          <span className="text-[12px] font-bold text-white px-2 leading-snug">
                            {project.desc}
                          </span>
                          
                          <button
                            onClick={() => setSelectedProject(idx)}
                            className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-white hover:bg-white hover:text-black font-semibold text-xs px-4 py-2 rounded-full transition-all cursor-pointer active:scale-95 shadow-md"
                          >
                            <span>{t.ctaDemo}</span>
                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Impact details block */}
                <div className="mt-6 flex flex-col gap-3 font-sans">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                        {project.category}
                      </span>
                      <h4 className="text-xl font-bold text-white mt-1 group-hover:text-sky-400 transition-colors">
                        {project.title}
                      </h4>
                    </div>
                    
                    {/* Micro button wrapper */}
                    <button
                      onClick={() => setSelectedProject(idx)}
                      className="h-10 w-10 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-sky-500/10 hover:border-sky-500/20 group-hover:scale-105 transition-all text-slate-400 group-hover:text-[#38bdf8] cursor-pointer"
                    >
                      <ArrowUpRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>

                  {/* Localized metrics snippet */}
                  <div className="bg-[#38bdf8]/5 border border-[#38bdf8]/10 rounded-2xl p-4 flex items-center gap-3.5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-sky-500/5 rounded-full blur-md" />
                    
                    <div className="p-2 bg-sky-500/10 rounded-xl">
                      <TrendingUp className="h-5 w-5 text-sky-400" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                        {t.projectSummaryHeader}
                      </span>
                      <p className="text-xs sm:text-sm font-semibold text-sky-300 leading-tight mt-0.5">
                        {project.impact}
                      </p>
                    </div>
                  </div>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono bg-white/[0.02] border border-white/5 text-slate-400 px-2.5 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>

      </div>

      {/* DETAILED INTERACTIVE SIMULATOR FULLSCREEN MODAL */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#071330]/90 backdrop-blur-md p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-5xl h-[85vh] bg-[#091b40] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Top control bar */}
              <div className="p-4 sm:p-6 border-b border-white/5 bg-[#091b40]/95 flex flex-col sm:flex-row gap-4 items-center justify-between shrink-0 relative z-10 z-index">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-sky-500/10 rounded-xl text-sky-400">
                    <Sparkles className="h-5 w-5 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base sm:text-lg leading-tight">
                      {projects[selectedProject].title}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {projects[selectedProject].category}
                    </p>
                  </div>
                </div>

                {/* Device Selector Buttons & Actions */}
                <div className="flex items-center gap-3.5">
                  <div className="bg-white/5 border border-white/10 p-1 rounded-full flex gap-1 text-[10px] font-mono leading-none items-center relative">
                    <button
                      onClick={() => setSimulatorView("desktop")}
                      className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-bold cursor-pointer ${
                        simulatorView === "desktop" ? "bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30 font-extrabold" : "text-slate-400 hover:text-slate-200 border border-transparent"
                      }`}
                    >
                      <Monitor className="h-3 w-3" />
                      <span>{t.demoDesktopView}</span>
                    </button>
                    <button
                      onClick={() => setSimulatorView("mobile")}
                      className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 font-bold cursor-pointer ${
                        simulatorView === "mobile" ? "bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30 font-extrabold" : "text-slate-400 hover:text-slate-200 border border-transparent"
                      }`}
                    >
                      <Smartphone className="h-3 w-3" />
                      <span>{t.demoPhoneView}</span>
                    </button>
                  </div>

                  {/* Link action */}
                  <button
                    onClick={handleCopyLink}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors hover:bg-white/10 cursor-pointer relative"
                    title={t.toastCopied}
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    {copied && (
                      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 text-[8px] text-white rounded px-1 min-w-[70px] pointer-events-none uppercase font-mono">
                        COPIED
                      </span>
                    )}
                  </button>

                  {/* Close modal */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="h-10 w-10 bg-white/5 border border-white/10 hover:bg-red-500/15 hover:border-red-500/20 rounded-xl flex items-center justify-center text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Dynamic Grid Simulator Center */}
              <div className="flex-1 bg-[#071330] flex flex-col md:flex-row relative overflow-hidden">
                
                {/* Left side: Detailed metrics overview & specs panel */}
                <div className="w-full md:w-[320px] shrink-0 border-r border-white/5 p-6 space-y-6 overflow-y-auto bg-[#091b40]/40 relative z-10">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#38bdf8] uppercase">
                      {t.projectSummaryHeader}
                    </span>
                    <h5 className="font-extrabold text-white text-base">
                      {projects[selectedProject].title}
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {projects[selectedProject].desc}
                    </p>
                  </div>

                  {/* Stats highlights */}
                  <div className="space-y-3.5 pt-3">
                    {projects[selectedProject].stats.map((stat, sKey) => (
                      <div key={sKey} className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 relative overflow-hidden">
                        <span className="text-[9px] font-mono tracking-wider text-slate-500 uppercase block">
                          {stat.label}
                        </span>
                        <span className="text-xl font-black text-white block mt-1 tracking-tight">
                          {stat.value}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {stat.desc}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack highlight */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block">
                      {t.techStackHeader}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {projects[selectedProject].tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/5 text-[9px] font-mono text-slate-300 border border-white/10 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Call to action inside modal */}
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      onOpenContact();
                    }}
                    className="w-full relative py-3 bg-gradient-to-r from-cyan-400 to-sky-450 hover:from-cyan-300 hover:to-sky-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-400/10 cursor-pointer"
                  >
                    <span>{t.btnComenzar}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Right side: Browser Simulated Viewframe representing the mockup */}
                <div className="flex-1 p-6 sm:p-10 flex items-center justify-center bg-radial-gradient from-slate-900 via-[#02050c] to-black overflow-y-auto">
                  <div className="w-full h-full flex items-center justify-center">
                    
                    {/* Simulated responsive frame container */}
                    <motion.div
                      animate={{
                        width: simulatorView === "desktop" ? "100%" : "320px",
                        maxWidth: simulatorView === "desktop" ? "740px" : "320px",
                        height: simulatorView === "desktop" ? "420px" : "480px"
                      }}
                      transition={{ type: "spring", damping: 25, stiffness: 220 }}
                      className="bg-[#03060f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col relative"
                    >
                      {/* Interactive address/control line */}
                      <div className="h-8 bg-white/[0.04] border-b border-white/5 px-4 flex items-center justify-between shrink-0">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 bg-red-400/50 rounded-full" />
                          <div className="w-2 h-2 bg-yellow-400/50 rounded-full" />
                          <div className="w-2 h-2 bg-emerald-400/50 rounded-full" />
                        </div>
                        {/* URL input box */}
                        <div className="flex items-center gap-2 bg-black/45 border border-white/5 rounded-md px-3 py-1 font-mono text-[9px] text-slate-400 leading-none w-7/12 text-center justify-center">
                          <Globe className="h-3 w-3 text-sky-400" />
                          <span className="truncate">https://clickboost.com/mockups/sim_{selectedProject + 1}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500">
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">SECURE</span>
                        </div>
                      </div>

                      {/* Display live HTML Interactive Simulation */}
                      <div className="flex-1 w-full overflow-y-auto relative bg-[#040818]">
                        {renderSimulatedApp(projects[selectedProject].id, false)}
                      </div>

                      {/* Simulator metrics HUD */}
                      <div className="h-8 bg-[#030815]/95 border-t border-white/5 px-4 flex items-center justify-between text-[8px] font-mono text-slate-500">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400 animate-pulse" />
                          <span className="text-slate-300 font-bold">{t.demoLiveText}</span>
                        </div>
                        <div className="flex gap-2">
                          <span>PAGEWEIGHT: 114KB</span>
                          <span className="text-emerald-400 uppercase font-bold">ROAS ENGINE LOADED</span>
                        </div>
                      </div>

                    </motion.div>

                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.section>
  );
}
