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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(16,42,32,0.05)] border border-brand-900/10 rounded-full py-3 px-8' : ''
      }`}>
        <a href="#home" className="flex items-center gap-2 group">
          <div className={`p-2 rounded-lg transition-transform shadow-lg group-hover:scale-110 ${isScrolled ? 'bg-brand-900 text-accent-500' : 'bg-accent-500 text-brand-900'}`}>
            <Gavel size={22} strokeWidth={2}/>
          </div>
          <div className="flex flex-col leading-none">
            <span className={`text-xl font-serif font-bold tracking-tight ${isScrolled ? 'text-brand-900' : 'text-white'}`}>Jus Digital</span>
            <span className={`text-[10px] uppercase tracking-widest font-sans font-semibold mt-[2px] ${isScrolled ? 'text-graphite-900/60' : 'text-white/70'}`}>Consultoria Jurídica</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className={`text-sm font-bold transition-colors uppercase tracking-widest ${isScrolled ? 'text-graphite-900 hover:text-accent-500' : 'text-white/80 hover:text-accent-500'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className={`${isScrolled ? 'bg-brand-900 text-accent-500' : 'bg-white text-brand-900'} px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-md ml-4`}
          >
            Falar com Especialista
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-brand-900' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 md:hidden shadow-xl"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-700 hover:text-accent-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-brand-900 text-white px-6 py-3 rounded-xl text-center font-bold"
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
