import React from 'react';
import { Gavel, Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 py-16 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white p-2 rounded-lg text-brand-900">
                <Gavel size={24} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-serif font-bold tracking-tight">Jus Digital</span>
                <span className="text-[10px] uppercase tracking-widest font-sans font-semibold text-accent-500 opacity-80">Soluções Documentais</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Simplificando o complexo. Sua parceira digital para certificados, registros e regularização documental global.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-accent-500">Links Rápidos</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-slate-300 hover:text-white transition-colors">Início</a></li>
              <li><a href="#services" className="text-slate-300 hover:text-white transition-colors">Serviços</a></li>
              <li><a href="#assistant" className="text-slate-300 hover:text-white transition-colors">Assistente</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-accent-500">Serviços</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Certificado e-CPF</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Certificado e-CNPJ</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Busca de Registros</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Apostilamento</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-accent-500">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-6">Receba atualizações sobre legislação e tecnologia documental.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-accent-500 transition-colors"
              />
              <button className="absolute right-2 top-1.5 p-1.5 bg-accent-500 rounded-lg text-white">
                <ArrowUp size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest">
          <div>© {currentYear} Jus Digital - Todos os direitos reservados.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacidade</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Termos</a>
            <a href="#" className="hover:text-slate-300 transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
