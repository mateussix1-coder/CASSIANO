import React from 'react';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { SERVICES } from '../types';

export default function Services() {
  return (
    <section id="services" className="py-24 bg-[#F9F9F8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 rounded-full bg-brand-900/5 text-brand-900 text-xs font-bold uppercase tracking-widest mb-4"
          >
            Nossas Soluções
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-brand-900 mb-6"
          >
            Especialidades Jus Digital
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-graphite-800 max-w-2xl mx-auto text-lg"
          >
            Sincronizamos a burocracia dos cartórios com a agilidade do seu negócio.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = (LucideIcons as any)[service.icon] || LucideIcons.FileText;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-slate-200 group"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                  service.category === 'digital' ? 'bg-accent-500 text-brand-900 border border-accent-500' : 
                  service.category === 'cartorial' ? 'bg-brand-900 text-accent-500' : 'bg-graphite-900 text-accent-500'
                }`}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-3 group-hover:text-accent-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-graphite-800 leading-relaxed mb-6">
                  {service.description}
                </p>
                <a 
                  href="#contact" 
                  className="text-sm font-bold text-brand-900 flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                  Falar com {service.id === 'certificacao-digital' ? 'Mateus' : 'Especialista'} <LucideIcons.ArrowRight size={16} />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 bg-brand-900 rounded-[3rem] p-12 text-[#F9F9F8] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/20 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h3 className="text-3xl font-bold mb-6 font-serif text-accent-500">Sistema Inovador de Emissão de Notas</h3>
              <p className="text-[#F9F9F8]/80 text-lg mb-8">
                Viemos suprir uma demanda de mercado que os sistemas tradicionais não atendem. Acelere seus negócios com integração total e o fim dos gargalos operacionais na gestão fiscal.
              </p>
              <button className="bg-accent-500 text-brand-900 px-8 py-4 rounded-xl font-bold hover:bg-accent-400 transition-colors shadow-lg">
                Falar com Especialista
              </button>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-sm aspect-square bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 p-8">
                <div className="flex flex-col gap-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-12 bg-white/10 rounded-lg animate-pulse" />
                  ))}
                  <div className="mt-8 flex justify-between items-end">
                    <div className="w-16 h-24 bg-accent-500/50 rounded-lg border border-accent-500/30" />
                    <div className="w-16 h-32 bg-accent-500/80 rounded-lg border border-accent-500/50" />
                    <div className="w-16 h-16 bg-accent-500/40 rounded-lg border border-accent-500/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
