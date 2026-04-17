import React from 'react';
import { motion } from 'motion/react';
import { SECONDARY_SERVICES } from '../types';
import * as LucideIcons from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16 border-l-4 border-success-gov pl-6">
           <h2 className="text-3xl md:text-4xl font-black text-brand-900 mb-2 uppercase tracking-tight">Catálogo de Serviços</h2>
           <p className="text-graphite-900/60 font-medium tracking-wide">Acesso facilitado à documentação e certificação federal.</p>
        </div>

        {/* Highlight Service: Certificação */}
        <div className="grid lg:grid-cols-12 gap-8 mb-12">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="lg:col-span-12 bg-brand-900 rounded-lg p-8 md:p-12 text-white flex flex-col md:flex-row gap-12 items-center"
           >
              <div className="flex-1">
                 <div className="flex items-center gap-2 mb-4">
                    <LucideIcons.ShieldCheck className="text-accent-500" size={24} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-500">Destaque Oficial</span>
                 </div>
                 <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Certificação Digital ICP-Brasil</h3>
                 <p className="text-lg text-white/80 mb-8 max-w-xl">
                    Emissão rápida de certificados e-CPF, e-CNPJ e NF-e. Atendimento remoto total ou presencial com validadores autorizados.
                 </p>
                 <a href="#portal" className="bg-accent-500 text-brand-900 px-8 py-4 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-accent-400 transition-all inline-block shadow-lg">
                    Iniciar Emissão
                 </a>
              </div>
              <div className="w-full md:w-1/3 aspect-video bg-white/10 rounded-lg flex items-center justify-center border border-white/20 backdrop-blur-sm">
                 <LucideIcons.Fingerprint size={80} className="text-white/20" />
              </div>
           </motion.div>
        </div>

        {/* Secondary Services */}
        <div className="grid md:grid-cols-3 gap-6">
          {SECONDARY_SERVICES.map((service, index) => {
            const Icon = (LucideIcons as any)[service.icon] || LucideIcons.FileText;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#F8F8F8] p-8 rounded-lg border-b-4 border-gray-200 hover:border-brand-900 transition-all group flex flex-col"
              >
                <div className="w-12 h-12 bg-white rounded-md border border-gray-200 flex items-center justify-center text-brand-900 mb-6 shadow-sm group-hover:bg-brand-900 group-hover:text-white transition-colors">
                  <Icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-brand-900 mb-4 tracking-tight uppercase">{service.title}</h4>
                <p className="text-graphite-900/70 text-sm leading-relaxed mb-6 flex-1">{service.description}</p>
                <button className="text-[10px] font-black uppercase tracking-widest text-[#004580] flex items-center gap-2 hover:gap-4 transition-all">
                   Saber Mais <LucideIcons.ArrowRight size={14} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
