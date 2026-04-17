import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Calendar, Clock, Video, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setFormState('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-[#F4F2EE] relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="h-[1px] w-8 md:w-12 bg-accent-500"></div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-accent-500">Agendador de Consultoria</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-brand-900 mb-6 md:mb-8 font-serif leading-[1.1] text-balance">
              O <span className="italic text-accent-500">concierge documental</span> para o cidadão global.
            </h2>
            <p className="text-graphite-900 text-base md:text-xl font-medium mb-8 md:mb-12 leading-relaxed">
              Sincronizamos a burocracia com a agilidade do seu tempo. Seu atendimento de forma híbrida: Remoto ou Presencial com hora marcada.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-12">
              <div className="p-6 md:p-6 border border-graphite-900/10 rounded-[1.5rem] bg-white/50 hover:bg-white transition-colors cursor-pointer group">
                <Video className="text-accent-500 mb-4 group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
                <h4 className="font-bold text-brand-900 mb-2">Home Office</h4>
                <p className="text-[13px] md:text-sm font-medium text-graphite-900/80">Conveniência total com emissão remota segura.</p>
              </div>
              <div className="p-6 md:p-6 border border-graphite-900/10 rounded-[1.5rem] bg-white/50 hover:bg-white transition-colors cursor-pointer group">
                <Clock className="text-brand-900 mb-4 group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
                <h4 className="font-bold text-brand-900 mb-2">Presencial Exclusivo</h4>
                <p className="text-[13px] md:text-sm font-medium text-graphite-900/80">Atendimento boutique com hora rigorosamente marcada.</p>
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center gap-4 md:gap-6 group cursor-pointer">
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-white border border-graphite-900/10 flex items-center justify-center text-brand-900 group-hover:bg-brand-900 group-hover:text-accent-500 transition-all">
                  <Phone size={20} className="md:w-6 md:h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-graphite-800/50 mb-1">Telefone Oficial</div>
                  <div className="text-lg md:text-xl font-medium text-brand-900">+55 (82) 99805-9127</div>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6 group cursor-pointer">
                <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-2xl bg-white border border-graphite-900/10 flex items-center justify-center text-brand-900 group-hover:bg-brand-900 group-hover:text-accent-500 transition-all">
                  <MapPin size={20} className="md:w-6 md:h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-graphite-800/50 mb-1">Office</div>
                  <div className="text-base md:text-lg font-medium text-brand-900 text-balance">R. Eng. Roberto G. Menezes, 12-202 - Centro</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="glass p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] relative mt-10 lg:mt-0"
          >
            <div className="absolute top-0 right-6 md:right-10 -translate-y-1/2 bg-accent-500 text-brand-900 px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg">
              Solicite Agendamento
            </div>

            <form className="space-y-8 mt-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-graphite-800/60">Serviço de Interesse</label>
                <select 
                  required
                  disabled={formState !== 'idle'}
                  className="w-full px-6 py-5 bg-white/80 border border-white focus:border-accent-500 rounded-[1.2rem] focus:outline-none focus:ring-4 focus:ring-accent-500/10 appearance-none font-medium text-brand-900 transition-all disabled:opacity-50"
                >
                  <option>Emissão de Certificado Digital</option>
                  <option>Busca de Certidões e Registros</option>
                  <option>Consultoria Empresarial / Notas</option>
                  <option>Outros Serviços (Apostilamento, Traduções, etc)</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-graphite-800/60">Nome Completo</label>
                  <input 
                    type="text" 
                    required
                    disabled={formState !== 'idle'}
                    placeholder="Seu nome"
                    className="w-full px-6 py-5 bg-white/80 border border-white focus:border-accent-500 rounded-[1.2rem] focus:outline-none focus:ring-4 focus:ring-accent-500/10 font-medium text-brand-900 transition-all placeholder:text-graphite-800/30 disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-graphite-800/60">E-mail</label>
                  <input 
                    type="email" 
                    required
                    disabled={formState !== 'idle'}
                    placeholder="seu@email.com"
                    className="w-full px-6 py-5 bg-white/80 border border-white focus:border-accent-500 rounded-[1.2rem] focus:outline-none focus:ring-4 focus:ring-accent-500/10 font-medium text-brand-900 transition-all placeholder:text-graphite-800/30 disabled:opacity-50"
                  />
                </div>
              </div>

              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="w-full bg-accent-500/10 text-brand-900 py-6 rounded-[1.2rem] border border-accent-500/20 font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                >
                  <CheckCircle2 className="text-brand-900" size={18} />
                  Agendamento Recebido com Sucesso!
                </motion.div>
              ) : (
                <button 
                  type="submit"
                  disabled={formState !== 'idle'}
                  className="w-full bg-brand-900 text-accent-500 py-6 rounded-[1.2rem] font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-brand-800 transition-all shadow-[0_8px_32px_rgba(10,25,47,0.15)] mt-4 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {formState === 'submitting' ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Clock size={16} />
                    </motion.div>
                  ) : (
                    <>Sincronizar Agenda <Calendar size={16} /></>
                  )}
                </button>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
