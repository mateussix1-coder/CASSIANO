import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Globe, Scale } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[70%] bg-accent-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[60%] bg-brand-900/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 text-accent-500 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
              </span>
              Líder em Tecnologia Documental
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-brand-900 leading-[1.1] mb-6 text-balance">
              Sua <span className="text-accent-500 italic">Conexão Documental</span> entre o Brasil e o Mundo.
            </h1>
            
            <p className="text-lg text-graphite-800 mb-8 max-w-xl leading-relaxed">
              Resolvemos desde a emissão de Certificados Digitais até a busca de registros em cartórios para brasileiros e estrangeiros. Sincronizamos a burocracia com a agilidade do seu negócio.
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#services" 
                className="bg-brand-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all hover:translate-y-[-2px] shadow-lg shadow-brand-900/20"
              >
                Emitir Certificado <ArrowRight size={20} />
              </a>
              <a 
                href="#assistant" 
                className="bg-white text-brand-900 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all hover:translate-y-[-2px]"
              >
                Falar com Assistente
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8 grayscale opacity-50">
              <div className="flex items-center gap-2">
                <ShieldCheck size={24} />
                <span className="text-xs font-bold uppercase tracking-widest">Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={24} />
                <span className="text-xs font-bold uppercase tracking-widest">Global</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale size={24} />
                <span className="text-xs font-bold uppercase tracking-widest">Jurídico</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069" 
                alt="Escritório Jus Digital" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent" />
            </div>

            {/* Floating Card 1 */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 glass p-6 rounded-2xl shadow-xl z-20 w-64"
            >
              <div className="bg-accent-500 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-4">
                <ShieldCheck size={24} />
              </div>
              <div className="font-bold text-brand-900 text-sm mb-1">Certificação Digital</div>
              <div className="text-slate-500 text-xs">Emissão e-CPF e e-CNPJ em tempo recorde.</div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 glass p-6 rounded-2xl shadow-xl z-20 w-64"
            >
              <div className="bg-brand-900 w-10 h-10 rounded-lg flex items-center justify-center text-white mb-4">
                <Globe size={24} />
              </div>
              <div className="font-bold text-brand-900 text-sm mb-1">Presença Global</div>
              <div className="text-slate-500 text-xs">Brasileiros ao redor do mundo conectados à Jus Digital.</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
