import React from 'react';
import { motion } from 'motion/react';
import { SECONDARY_SERVICES } from '../types';
import * as LucideIcons from 'lucide-react';

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-20 bg-[#F4F2EE] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 relative z-10">
        
        {/* Seção 01: Certificação Digital */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="glass p-8 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
             <div>
               <div className="inline-flex items-center gap-3 mb-6">
                 <div className="h-[1px] w-6 md:w-8 bg-accent-500"></div>
                 <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent-500">Certificação Digital</span>
               </div>
               <h3 className="text-4xl md:text-5xl font-serif font-medium text-brand-900 mb-6 md:mb-8 leading-[1.1] text-balance">
                 Sua Identidade <span className="italic text-accent-500">Digital Segura</span>
               </h3>
               <p className="text-graphite-900/90 font-medium leading-relaxed mb-8 text-base md:text-xl">
                 Adquirimos uma nova franquia de emissão para garantir segurança total na sua identidade digital. Liderado pelo nosso especialista Mateus, oferecemos suporte remoto total ou atendimento físico agendado para sua conveniência.
               </p>
               <a 
                 href="#contact" 
                 className="text-[11px] md:text-xs uppercase tracking-[0.15em] font-bold text-brand-900 flex items-center gap-3 hover:gap-5 transition-all duration-300"
               >
                 Falar com Especialista 
                 <LucideIcons.ArrowRight size={16} strokeWidth={1.5} />
               </a>
             </div>
             
             <div className="relative hidden md:block">
               <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative">
                  <img loading="lazy" src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000" alt="Emissão rápida de Certificado Digital em escritório corporativo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-brand-900/10" />
               </div>
             </div>
          </div>
        </motion.div>

        {/* Seção 02: Inteligência Documental */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl text-brand-900 font-serif font-medium">Inteligência Documental</h3>
            <p className="text-graphite-900/90 font-medium mt-4 text-lg">Internacional e Cartório</p>
          </motion.div>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {SECONDARY_SERVICES.map((service, index) => {
              const Icon = (LucideIcons as any)[service.icon] || LucideIcons.FileText;
              return (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.95 },
                    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                  className="glass p-10 rounded-[2rem] group relative overflow-hidden flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#F4F2EE] text-brand-900 flex items-center justify-center mb-8 border border-white/60 shadow-sm transition-transform group-hover:scale-110 duration-500">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-2xl font-serif font-medium text-brand-900 mb-4 group-hover:text-accent-500 transition-colors duration-500 leading-[1.3]">
                    {service.title}
                  </h4>
                  <p className="text-graphite-900/90 font-medium leading-relaxed text-[15px]">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Seção 03: Inovação para Empresas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-brand-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 text-[#F4F2EE] relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-500/5 rounded-full blur-[120px] -ml-32 -mb-32" />
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
                <LucideIcons.BarChart3 className="text-accent-500" size={24} strokeWidth={1.5} />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent-500">Inovação para Empresas</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 font-serif leading-[1.1] text-balance">
                Sistema Emissor <br className="hidden sm:block" /><span className="text-accent-500 italic">de Notas</span>
              </h3>
              <p className="text-[#F4F2EE]/90 text-base md:text-lg mb-8 md:mb-10 font-medium leading-relaxed max-w-xl">
                Conheça nosso novo sistema de emissão de notas. Uma solução desenhada para atender gargalos que o mercado atual ignora. Tecnologia a serviço do direito empresarial.
              </p>
              <a href="#contact" className="inline-flex items-center justify-center gap-3 border border-accent-500/50 text-accent-500 px-8 py-4 rounded-full font-bold hover:bg-accent-500 hover:text-brand-900 transition-colors text-[11px] md:text-xs uppercase tracking-[0.2em] w-full sm:w-auto">
                Implantar Solução
              </a>
            </div>
            
            <div className="relative hidden md:block perspective-1000">
              <div className="absolute inset-0 bg-accent-500/20 blur-[60px] rounded-full" />
              <motion.div 
                initial={{ opacity: 0, rotateX: 10, y: 30 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                whileHover={{ scale: 1.02, rotateX: 5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full aspect-[4/3] bg-brand-800 border border-white/10 rounded-[2.5rem] flex flex-col relative overflow-hidden shadow-2xl cursor-pointer"
              >
                 <div className="bg-brand-900/50 p-6 flex flex-col justify-between border-b border-white/5 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-2">
                         <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                         <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                         <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                      </div>
                      <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">Painel_Servicos_Digitais.exe</span>
                    </div>
                 </div>
                 
                 <div className="p-6 space-y-4 flex-1 flex flex-col justify-center relative z-10 bg-gradient-to-b from-brand-800 to-brand-900">
                    {[
                      { icon: 'FileCheck', title: 'Auditoria de Notas Fiscais', delay: 0.2 },
                      { icon: 'Zap', title: 'Automação Tributária', delay: 0.5 },
                      { icon: 'Database', title: 'Sincronização com SEFAZ', delay: 0.8 }
                    ].map((feature, i) => {
                      const IconLabel = (LucideIcons as any)[feature.icon] || LucideIcons.Check;
                      return (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: feature.delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.06] transition-colors"
                        >
                           <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-lg bg-brand-900 border border-white/[0.05] flex items-center justify-center text-accent-500 shadow-sm">
                               <IconLabel size={18} strokeWidth={1.5} />
                             </div>
                             <span className="text-white font-medium text-[13px]">{feature.title}</span>
                           </div>
                           <div className="flex items-center gap-3">
                             <motion.span 
                               initial={{ opacity: 0 }} 
                               whileInView={{ opacity: 1 }} 
                               transition={{ delay: feature.delay + 0.8 }}
                               className="text-[10px] uppercase font-bold tracking-widest text-[#27c93f]"
                             >
                               Ativo
                             </motion.span>
                             <motion.div 
                               initial={{ scaleX: 0 }}
                               whileInView={{ scaleX: 1 }}
                               transition={{ delay: feature.delay + 0.3, duration: 0.8, ease: "circOut" }}
                               className="h-[2px] w-8 bg-[#27c93f]/50 rounded-full origin-left"
                             />
                           </div>
                        </motion.div>
                      )
                    })}
                 </div>

                 {/* Simulated notification popup */}
                 <motion.div 
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.6, type: "spring", stiffness: 100 }}
                    className="absolute bottom-6 left-6 right-6 flex items-center gap-4 p-4 rounded-2xl bg-accent-500/10 border border-accent-500/20 backdrop-blur-md z-20 shadow-xl"
                 >
                    <div className="relative">
                      <LucideIcons.ShieldCheck className="text-accent-500 shrink-0 relative z-10" size={28} />
                      <div className="absolute inset-0 bg-accent-500 blur-md opacity-40 animate-pulse"></div>
                    </div>
                    <div>
                      <h5 className="text-accent-500 font-bold text-[10px] uppercase tracking-widest mb-1">Status da API Jurídica</h5>
                      <p className="text-white/80 text-xs font-mono">100% Sincronizado e Seguro</p>
                    </div>
                 </motion.div>
              </motion.div>
              
              {/* Floating Element */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, type: "spring" }}
                className="absolute -right-6 -top-6 bg-white text-brand-900 px-4 py-3 rounded-2xl shadow-xl font-bold text-xs flex items-center gap-2 border border-brand-900/10 z-30"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Sistema Online
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
