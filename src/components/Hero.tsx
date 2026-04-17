import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative pt-40 pb-20 overflow-hidden bg-[#F8F8F8]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-success-gov/10 text-success-gov px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            Serviço Oficial • Jus Digital
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-brand-900 leading-[1.1] mb-8 tracking-tight font-sans">
            Sua Identidade Digital no <span className="text-success-gov">Padrão Brasil.</span>
          </h1>
          
          <p className="text-xl text-graphite-900/70 mb-10 max-w-lg leading-relaxed font-sans font-medium">
            Emissão rápida de Certificados Digitais e busca de documentos em todos os cartórios do território nacional. Trust, Agilidade e Conformidade Legal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#portal" 
              className="bg-brand-900 text-white px-8 py-5 rounded-md font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand-800 transition-all shadow-lg text-[11px]"
            >
              Iniciar Agendamento <ArrowRight size={18} />
            </a>
            <a 
              href="#services" 
              className="bg-white border-2 border-brand-900 text-brand-900 px-8 py-5 rounded-md font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-gray-50 transition-all text-[11px]"
            >
              Consultar Serviços
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://picsum.photos/seed/legal${i}/100/100`} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="Usoer" referrerPolicy="no-referrer" />
              ))}
            </div>
            <p className="text-xs text-graphite-900/60 font-bold">
              +15.000 certificados emitidos este ano
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative hidden md:block"
        >
           <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative z-10">
              <div className="bg-brand-900 rounded-2xl p-6 text-white mb-6">
                 <ShieldCheck size={40} className="mb-4 text-accent-500" />
                 <h3 className="text-xl font-bold mb-2">Conformidade ICP-Brasil</h3>
                 <p className="text-white/70 text-sm">Validamos sua identidade seguindo os mais rigorosos padrões da Infraestrutura de Chaves Públicas Brasileira.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="block text-2xl font-black text-brand-900">24h</span>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Tempo Médio</span>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <span className="block text-2xl font-black text-brand-900">99%</span>
                    <span className="text-[10px] uppercase font-bold text-gray-400">Eficiência</span>
                 </div>
              </div>
           </div>
           {/* Abstract Gov Patterns */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-900/5 rounded-full blur-[100px] -z-10" />
        </motion.div>
      </div>
    </section>
  );
}
