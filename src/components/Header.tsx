import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Gavel } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#services' },
    { name: 'Assistente', href: '#assistant' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'top-0' : 'top-0 md:top-8'
      } bg-white border-b-4 border-brand-900 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <div className="flex flex-col leading-tight border-l-2 border-accent-500 pl-3">
            <span className="text-2xl font-bold text-brand-900 tracking-tight font-sans">JUS DIGITAL</span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-graphite-900/60 font-sans">Gov.br • Soluções Digitais</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 h-full">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-sm font-bold text-brand-900 hover:text-success-gov transition-colors uppercase tracking-wider relative h-full flex items-center group"
            >
              {link.name}
              <span className="absolute bottom-[-4px] left-0 w-0 h-1 bg-success-gov transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="#contact" 
            className="bg-brand-900 text-white px-8 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-brand-800 transition-all shadow-btn ml-4"
          >
            Acessar Sistema
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 -mr-2 ${isScrolled ? 'text-brand-900' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.95, y: -10 }}
            animate={{ opacity: 1, scaleY: 1, y: 0 }}
            exit={{ opacity: 0, scaleY: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+16px)] left-4 right-4 bg-white/95 backdrop-blur-xl border border-brand-900/10 p-6 rounded-2xl md:hidden shadow-2xl origin-top"
          >
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-bold text-brand-900 hover:text-accent-500 transition-colors uppercase tracking-widest flex items-center justify-between border-b border-brand-900/5 pb-4 last:border-0 last:pb-0"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-brand-900 text-accent-500 px-6 py-4 rounded-xl text-center font-bold text-xs uppercase tracking-widest mt-2"
              >
                Falar com Especialista
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
