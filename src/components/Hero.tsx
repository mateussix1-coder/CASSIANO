import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Editorial Luxury Whitespace layout */}
      <div className="max-w-[1400px] w-full mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content (Oversized) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 z-20"
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-accent-500"></div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">O Elo Global</span>
            </div>
            
            <h1 className="text-6xl md:text-[5.5rem] font-medium text-brand-900 leading-[1.05] tracking-tight mb-8 text-balance">
              Jus Digital: Sua <span className="text-accent-500 italic">Conexão Documental</span> entre o Brasil e o Mundo.
            </h1>
            
            <p className="text-xl md:text-2xl text-graphite-900 font-medium mb-12 max-w-2xl leading-relaxed">
              Unimos a autoridade de um escritório especializado à velocidade da era digital. Certificados, certidões e regularizações globais em um só lugar.
            </p>

            <div className="flex flex-wrap gap-6 items-center">
              <a 
                href="#services" 
                className="bg-brand-900 text-[#F4F2EE] px-10 py-5 rounded-full font-medium tracking-wide flex items-center gap-3 hover:bg-brand-800 transition-all hover:translate-y-[-2px] shadow-2xl shadow-brand-900/20 text-sm uppercase"
              >
                Emitir Certificado Digital <ArrowRight size={18} />
              </a>
              <a 
                href="#contact" 
                className="bg-transparent border border-brand-900 text-brand-900 px-10 py-5 rounded-full font-medium tracking-wide flex items-center gap-3 hover:bg-brand-900/5 transition-all hover:translate-y-[-2px] text-sm uppercase"
              >
                Falar com Especialista
              </a>
            </div>
          </motion.div>

          {/* Architectural Image / Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative hidden lg:block h-[550px]"
          >
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
              {/* Minimalist modern architecture representing luxury office / slow-mo vibe */}
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075" 
                alt="Propriedade de Alto Padrão - Jus Digital" 
                className="w-full h-full object-cover scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-900/10" />
            </div>

            {/* Glassmorphism Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute bottom-12 -left-16 glass p-8 rounded-3xl z-20 max-w-[280px]"
            >
              <div className="text-4xl font-serif text-brand-900 mb-2 italic">100%</div>
              <div className="text-xs uppercase tracking-widest font-bold text-graphite-800 mb-2">Agilidade Jurídica</div>
              <div className="text-graphite-900/90 text-sm font-medium leading-relaxed">O concierge documental para o cidadão global.</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
