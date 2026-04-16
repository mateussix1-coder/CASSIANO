import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#0A1118]">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#080d12]/95 via-[#080d12]/80 to-[#080d12]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080d12] via-[#080d12]/30 to-transparent" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 z-20"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-accent-500"></div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">
                Excelência Documental Global
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] tracking-tight mb-8">
              Sua <span className="text-accent-500" style={{ textShadow: '0 0 40px rgba(198, 168, 124, 0.3)' }}>Conexão Documental</span><br />
              entre o Brasil e o Mundo.
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 font-medium mb-12 max-w-2xl leading-relaxed">
              Unimos a autoridade de um escritório de elite com a agilidade do seu tempo. Certificados digitais, serviços cartoriais e regularizações em um padrão de luxo resolvidos de forma impecável.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <a 
                href="#services" 
                className="bg-accent-500 text-brand-900 px-10 py-5 rounded-full font-bold tracking-widest flex items-center gap-3 hover:bg-[#d8bb8d] transition-all hover:translate-y-[-2px] shadow-[0_0_30px_rgba(198,168,124,0.3)] text-xs uppercase"
              >
                Emitir Certificado <ArrowRight size={18} />
              </a>
              <a 
                href="#contact" 
                className="bg-transparent border border-white/20 text-white px-10 py-5 rounded-full font-bold tracking-widest flex items-center gap-3 hover:bg-white/10 transition-all hover:translate-y-[-2px] text-xs uppercase backdrop-blur-sm"
              >
                Organizar Portfólio
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
