import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-[#0A1118]">
      {/* Background Image Setup (Luxury dark office / marble style with city view) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2670" 
          alt="Jus Digital Luxury Office" 
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Dark overlay to merge with marble/dark sophisticated tone */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080d12]/95 via-[#080d12]/85 to-[#080d12]/70 md:to-[#080d12]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080d12] via-[#080d12]/30 to-transparent" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 md:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 z-20 mt-10 md:mt-0"
          >
            <div className="inline-flex items-center gap-4 mb-6 md:mb-8">
              <div className="h-[1px] w-8 md:w-12 bg-accent-500"></div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent-500">
                O seu Elo Global
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.15] md:leading-[1.1] tracking-tight mb-6 md:mb-8 text-balance">
              <span className="text-accent-500" style={{ textShadow: '0 0 40px rgba(198, 168, 124, 0.3)' }}>Certificado Digital</span> e<br className="hidden md:block" />
              Certidões sem Fronteiras.
            </h1>
            
            <p className="text-base md:text-xl text-white/70 font-medium mb-10 md:mb-12 max-w-2xl leading-relaxed text-balance">
              Especialistas em emissão rápida de Certificados Digitais e busca de Certidões em cartórios de todo o Brasil. Unimos atendimento de alto padrão com a agilidade que cidadãos e empresas globais precisam.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch sm:items-center">
              <a 
                href="#services" 
                className="bg-accent-500 text-brand-900 px-8 md:px-10 py-4 md:py-5 rounded-full font-bold tracking-widest flex items-center justify-center gap-3 hover:bg-[#d8bb8d] transition-all hover:translate-y-[-2px] shadow-[0_0_30px_rgba(198,168,124,0.3)] text-[11px] md:text-xs uppercase w-full sm:w-auto"
              >
                Emitir Certificado <ArrowRight size={18} />
              </a>
              <a 
                href="#certidoes" 
                className="bg-transparent border border-white/20 text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold tracking-widest flex items-center justify-center gap-3 hover:bg-white/10 transition-all hover:translate-y-[-2px] text-[11px] md:text-xs uppercase backdrop-blur-sm w-full sm:w-auto mt-0"
              >
                Solicitar Certidões
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
