import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="#contact"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-[0_8px_32px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_32px_rgba(37,211,102,0.6)] transition-all flex items-center justify-center group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={28} strokeWidth={2} />
      
      {/* Tooltip on Hover */}
      <span className="absolute right-full mr-4 bg-white text-graphite-900 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl shadow-lg opacity-0 -translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap">
        Falar com Especialista
      </span>
      
      {/* Pinging outline */}
      <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-20"></div>
    </motion.a>
  );
}
