import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Calendar, ExternalLink } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brand-900 mb-8">
              Pronto para dar o próximo passo?
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              Agende uma consulta ou inicie sua emissão de certificado digital hoje mesmo. Nossa equipe está pronta para resolver sua complexidade documental.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-900 group-hover:bg-brand-900 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">E-mail</div>
                  <div className="text-xl font-bold text-brand-900">contato@jusdigital.com.br</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-900 group-hover:bg-brand-900 group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Telefone / WhatsApp</div>
                  <div className="text-xl font-bold text-brand-900">+55 (11) 99999-0000</div>
                </div>
              </div>

              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-900 group-hover:bg-brand-900 group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Endereço</div>
                  <div className="text-xl font-bold text-brand-900 italic">Av. Paulista, 1000 - São Paulo, SP</div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-accent-500/5 border border-accent-500/10 rounded-3xl">
              <h4 className="font-bold text-accent-500 mb-2 flex items-center gap-2">
                <Calendar size={18} /> Atendimento com Mateus
              </h4>
              <p className="text-slate-600 font-medium mb-4">
                Fale diretamente com nosso líder comercial para soluções personalizadas em certificação digital.
              </p>
              <button className="text-brand-900 font-bold flex items-center gap-2 hover:gap-3 transition-all underline underline-offset-4">
                Ver horários disponíveis <ExternalLink size={16} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Nome Completo</label>
                  <input 
                    type="text" 
                    placeholder="Seu nome"
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">E-mail</label>
                  <input 
                    type="email" 
                    placeholder="seu@email.com"
                    className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Serviço de Interesse</label>
                <select className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 appearance-none">
                  <option>Certificado Digital (e-CPF/e-CNPJ)</option>
                  <option>Busca de Certidões</option>
                  <option>Transcrição de Documentos</option>
                  <option>Internacionalização</option>
                  <option>Sistema de Notas</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Mensagem</label>
                <textarea 
                  rows={4}
                  placeholder="Como podemos ajudar?"
                  className="w-full px-5 py-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                ></textarea>
              </div>

              <button className="w-full bg-brand-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-brand-900/10">
                Enviar Solicitação
              </button>

              <div className="text-center">
                <p className="text-xs text-slate-400">
                  Ao enviar, você concorda com nossa Política de Privacidade.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
