import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search, Navigation } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export function Hero() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [, navigate] = useLocation();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    setShowResult(true);
    const lookups = JSON.parse(localStorage.getItem('fs_tracking') || '[]');
    lookups.push(trackingNumber);
    localStorage.setItem('fs_tracking', JSON.stringify(lookups.slice(-3)));
  };

  const goToQuote = () => navigate("/contact");

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-brand-navy">
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero.png" 
          alt="Container ship at port" 
          className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Trusted by SA importers since 2018
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              We deliver <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-brand-blue">freight solutions.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed">
              Reliable freight forwarding, customs clearance, warehousing, and delivery between China and South Africa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white text-base h-14 px-8 border-none shadow-lg shadow-brand-orange/20"
                onClick={goToQuote}
              >
                Get a Quote
              </Button>
              <a href="https://wa.me/message/EVTMLWYQY2OCG1" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white h-14 px-8 gap-2 w-full"
                >
                  <FaWhatsapp className="w-5 h-5 text-green-400" />
                  WhatsApp Us
                </Button>
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-brand-blue" />
                Track Shipment
              </h3>
              <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input 
                    placeholder="Enter Waybill or Container Number" 
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 pl-10 focus-visible:ring-brand-blue"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                </div>
                <Button type="submit" className="bg-brand-orange hover:bg-brand-orange/90 text-white h-12 px-6">
                  Track
                </Button>
              </form>

              {showResult && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-white/10 overflow-hidden"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="w-5 h-5 text-brand-blue" />
                    <span className="text-white/90 font-mono text-sm">{trackingNumber}</span>
                    <span className="ml-auto text-xs font-medium px-2 py-1 rounded bg-blue-500/20 text-blue-200">In Transit</span>
                  </div>
                  <div className="relative flex justify-between items-center px-2">
                    <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-white/10 -translate-y-1/2 z-0" />
                    <div className="absolute top-1/2 left-4 right-1/2 h-[2px] bg-brand-blue -translate-y-1/2 z-0" />
                    
                    {['Booked', 'Customs', 'Transit', 'Delivery'].map((step, i) => (
                      <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border-[3px] ${i <= 2 ? 'bg-brand-blue border-brand-navy' : 'bg-brand-navy border-white/30'}`} />
                        <span className={`text-[10px] uppercase tracking-wider font-semibold ${i <= 2 ? 'text-white' : 'text-white/40'}`}>{step}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="hidden lg:block relative h-[400px]"
          >
            {/* Stylized Route Visual */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 500 300" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1F73D8" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#1F73D8" stopOpacity="1" />
                  </linearGradient>
                </defs>
                
                {/* Arc path */}
                <path 
                  d="M 400,80 Q 250,-20 100,220" 
                  fill="none" 
                  stroke="url(#route-gradient)" 
                  strokeWidth="3" 
                  strokeDasharray="8 8"
                  className="opacity-60"
                />

                {/* Ports */}
                <g transform="translate(400, 80)">
                  <circle r="6" fill="#1F73D8" className="animate-pulse" />
                  <circle r="12" fill="#1F73D8" fillOpacity="0.2" />
                  <text x="15" y="4" fill="white" fontSize="12" fontWeight="bold" className="drop-shadow-md">Shanghai</text>
                  <text x="15" y="20" fill="rgba(255,255,255,0.6)" fontSize="10">Origin</text>
                </g>

                <g transform="translate(100, 220)">
                  <circle r="6" fill="#F28C28" />
                  <circle r="12" fill="#F28C28" fillOpacity="0.2" />
                  <text x="-15" y="4" fill="white" fontSize="12" fontWeight="bold" textAnchor="end" className="drop-shadow-md">Durban</text>
                  <text x="-15" y="20" fill="rgba(255,255,255,0.6)" fontSize="10" textAnchor="end">Destination</text>
                </g>
              </svg>

              {/* Moving ship */}
              <motion.div 
                className="absolute top-0 left-0 w-8 h-8 -ml-4 -mt-4"
                animate={{
                  x: [400, 250, 100],
                  y: [80, 50, 220],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="w-4 h-4 bg-white rounded-sm shadow-[0_0_15px_rgba(255,255,255,0.8)] border-2 border-brand-blue flex items-center justify-center transform -rotate-45">
                  <div className="w-1 h-1 bg-brand-orange rounded-full" />
                </div>
              </motion.div>
            </div>
            
            {/* Dashboard floating elements */}
            <div className="absolute top-10 left-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg p-3 shadow-2xl">
              <div className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Status</div>
              <div className="text-sm font-medium text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                Active Sailings
              </div>
            </div>
            
            <div className="absolute bottom-20 right-0 bg-brand-navy/80 backdrop-blur-md border border-brand-blue/30 rounded-lg p-4 shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-brand-blue font-mono text-xs">CN → ZA</div>
                <div className="text-white/40 text-xs">Transit Time</div>
              </div>
              <div className="text-2xl font-bold text-white">28 <span className="text-sm font-normal text-white/60">Days</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
