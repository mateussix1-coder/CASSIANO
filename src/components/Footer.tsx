import React from 'react';
import { Gavel, Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#004580] py-16 text-white border-t border-accent-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 pb-12 border-b border-white/10">
          <div className="col-span-1 lg:col-span-1">
             <div className="flex flex-col gap-2 mb-8">
               <span className="text-2xl font-black tracking-tight uppercase">JUS DIGITAL</span>
               <div className="h-1 w-12 bg-accent-500"></div>
             </div>
             <p className="text-white/70 text-sm leading-relaxed mb-6 font-medium">
               Consultoria especializada em emissão de certificados digitais e busca de documentação cartórica em todo o Brasil.
             </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-xs uppercase tracking-[0.2em] text-accent-500">Rede Jus</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#home" className="text-white/80 hover:text-white transition-colors">Página Inicial</a></li>
              <li><a href="#services" className="text-white/80 hover:text-white transition-colors">Serviços e Catálogo</a></li>
              <li><a href="#portal" className="text-white/80 hover:text-white transition-colors">Portal do Cidadão</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-colors">Canais de Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-xs uppercase tracking-[0.2em] text-accent-500">Documentação</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Certificado Digital e-CPF</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Certificado e-CNPJ / NF-e</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Registro de Imóveis</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Consulta de Títulos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-xs uppercase tracking-[0.2em] text-accent-500">Institucional</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Prazos e Taxas</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">LGPD e Segurança</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex flex-col items-center md:items-start gap-4">
              <img src="https://plataforma.rede.gov.br/assets/images/logo-brasil.png" alt="Brasil" className="h-10 opacity-60 brightness-0 invert" referrerPolicy="no-referrer" />
              <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">© {currentYear} Jus Digital • Consultoria Documental Independente</div>
           </div>
           
           <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white transition-all hover:text-brand-900 group">
                <Facebook size={18} className="group-hover:scale-110" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white transition-all hover:text-brand-900 group">
                <Instagram size={18} className="group-hover:scale-110" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white transition-all hover:text-brand-900 group">
                <Linkedin size={18} className="group-hover:scale-110" />
              </a>
           </div>
        </div>
      </div>
    </footer>
  );
}
