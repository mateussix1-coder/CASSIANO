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
    <section id="contact" className="py-20 bg-[#F4F2EE] relative">
      <div className="max-w-[1400px] mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-accent-500"></div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent-500">Agendador de Consultoria</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-medium text-brand-900 mb-8 font-serif leading-[1.1]">
              O <span className="italic text-accent-500">concierge documental</span> para o cidadão global.
            </h2>
            <p className="text-graphite-900 text-xl font-medium mb-12 leading-relaxed">
              Sincronizamos a burocracia com a agilidade do seu tempo. Seu atendimento de forma híbrida: Remoto ou Presencial com hora marcada.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="p-6 border border-graphite-900/10 rounded-[1.5rem] bg-white/50 hover:bg-white transition-colors cursor-pointer group">
                <Video className="text-accent-500 mb-4 group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
                <h4 className="font-bold text-brand-900 mb-2">Home Office</h4>
                <p className="text-sm font-medium text-graphite-900/80">Conveniência total com emissão remota segura via videoconferência.</p>
              </div>
              <div className="p-6 border border-graphite-900/10 rounded-[1.5rem] bg-white/50 hover:bg-white transition-colors cursor-pointer group">
                <Clock className="text-brand-900 mb-4 group-hover:scale-110 transition-transform" size={28} strokeWidth={1.5} />
                <h4 className="font-bold text-brand-900 mb-2">Presencial Exclusivo</h4>
                <p className="text-sm font-medium text-graphite-900/80">Atendimento em nosso escritório boutique com hora rigorosamente marcada.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white border border-graphite-900/10 flex items-center justify-center text-brand-900 group-hover:bg-brand-900 group-hover:text-accent-500 transition-all">
                  <Phone size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-graphite-800/50 mb-1">Telefone Oficial</div>
                  <div className="text-xl font-medium text-brand-900">+55 (82) 99805-9127</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-white border border-graphite-900/10 flex items-center justify-center text-brand-900 group-hover:bg-brand-900 group-hover:text-accent-500 transition-all">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-graphite-800/50 mb-1">Office</div>
                  <div className="text-lg font-medium text-brand-900">R. Eng. Roberto Gonçalves Menezes, 12-202 - Centro</div>
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
            className="glass p-12 rounded-[2.5rem] relative"
          >
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-accent-500 text-brand-900 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
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
                  <option>Certificação Digital com Mateus</option>
                  <option>Busca de Registros e Certidões</option>
                  <option>Transcrição de Documentos</option>
                  <option>Novo Sistema de Notas</option>
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
                  className="w-full bg-brand-900 text-accent-500 py-6 rounded-[1.2rem] font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-brand-800 transition-all shadow-[0_8px_32px_rgba(16,42,32,0.15)] mt-4 flex items-center justify-center gap-3 disabled:opacity-70"
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
