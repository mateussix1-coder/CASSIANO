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
    <section id="contact" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block bg-brand-900/5 text-brand-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
              Canais de Atendimento
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-brand-900 mb-8 tracking-tight uppercase">Fale com o Jus Digital</h2>
            <p className="text-graphite-900/70 text-lg font-medium mb-12 leading-relaxed">
              Estamos à disposição para desburocratizar seus processos de certificação e documentação. Atendimento em conformidade com as normas federais.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-[#F8F8F8] border border-gray-200 rounded-lg flex items-center justify-center text-brand-900 shadow-sm group-hover:bg-brand-900 group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Telefone / WhatsApp</h4>
                  <p className="text-xl font-bold text-brand-900">+55 (82) 99805-9127</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-[#F8F8F8] border border-gray-200 rounded-lg flex items-center justify-center text-brand-900 shadow-sm group-hover:bg-brand-900 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">E-mail Institucional</h4>
                  <p className="text-xl font-bold text-brand-900">contato@jusdigital.com.br</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-[#F8F8F8] border border-gray-200 rounded-lg flex items-center justify-center text-brand-900 shadow-sm group-hover:bg-brand-900 group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">Endereço</h4>
                  <p className="text-xl font-bold text-brand-900">R. Eng. Roberto G. Menezes, 12-202 - Centro, Maceió - AL</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#F8F8F8] p-8 md:p-12 rounded-lg border-b-8 border-brand-900 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-brand-900 mb-8 uppercase tracking-tight">Formulário de Contato</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Serviço Pretendido</label>
                <select className="w-full bg-white border border-gray-200 p-4 rounded-md focus:outline-none focus:border-brand-900 font-bold text-sm text-brand-900">
                  <option>Emissão de Certificado Digital</option>
                  <option>Cartórios e Certidões</option>
                  <option>Apostilamento de Haia</option>
                  <option>Outros Serviços</option>
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Seu Nome</label>
                  <input type="text" className="w-full bg-white border border-gray-200 p-4 rounded-md focus:outline-none focus:border-brand-900 text-sm font-medium" placeholder="Nome completo" />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Seu E-mail</label>
                  <input type="email" className="w-full bg-white border border-gray-200 p-4 rounded-md focus:outline-none focus:border-brand-900 text-sm font-medium" placeholder="nome@email.com" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-2 block tracking-widest">Informações Adicionais</label>
                <textarea className="w-full bg-white border border-gray-200 p-4 rounded-md focus:outline-none focus:border-brand-900 text-sm font-medium h-32" placeholder="Como podemos te ajudar?"></textarea>
              </div>

              {formState === 'success' ? (
                 <div className="bg-success-gov/10 text-success-gov p-4 rounded-md border border-success-gov/20 text-center font-bold text-sm">
                    Mensagem enviada com sucesso! Em breve um especialista entrará em contato.
                 </div>
              ) : (
                <button type="submit" className="w-full bg-brand-900 text-white py-5 rounded-md font-bold uppercase tracking-widest hover:bg-brand-800 transition-all shadow-lg text-xs">
                  {formState === 'submitting' ? 'Enviando...' : 'Enviar Solicitação'}
                </button>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
