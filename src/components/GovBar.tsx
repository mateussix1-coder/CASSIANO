import React from 'react';

export default function GovBar() {
  return (
    <div className="bg-[#f0f0f0] border-b border-gray-200 py-1.5 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="https://www.gov.br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <img src="https://plataforma.rede.gov.br/assets/images/logo-brasil.png" alt="Brasil" className="h-4" referrerPolicy="no-referrer" />
          </a>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider hidden sm:inline-block">Simplificando sua vida digital</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-[10px] text-gray-500 font-bold uppercase tracking-wider hover:text-[#004580]">Órgãos do Governo</a>
          <a href="#" className="text-[10px] text-gray-500 font-bold uppercase tracking-wider hover:text-[#004580]">Acesso à Informação</a>
        </div>
      </div>
    </div>
  );
}
