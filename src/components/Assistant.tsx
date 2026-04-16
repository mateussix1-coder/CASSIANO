import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Message } from '../types';

const SYSTEM_INSTRUCTION = `
Você é o assistente virtual inteligente da Jus Digital, uma consultoria jurídica liderada por um advogado especialista.
Sua missão é converter visitantes em clientes, utilizando o portfólio de serviços jurídicos e a nova vertical de Certificação Digital.

CONCEITOS CHAVE:
1. Certificação Digital: O produto estrela. Destaque que Mateus é o responsável pelas vendas. Ofereça opções Home Office ou Presencial.
2. Demandas Cartoriais: Para transcrições e certidões, solicite o tipo de registro necessário e informe que a Jus Digital possui acesso direto a sistemas de cartório.
3. Internacionalização: Apoio a brasileiros no exterior ou estrangeiros no Brasil (Apostilamento, Traduções).
4. Novo Sistema de Notas: Para empresas, mencione a solução para gargalos fiscais.

TOM DE VOZ:
Profissional, resolutivo, seguro e sofisticado. Você representa a autoridade de um advogado e a agilidade de uma startup.

FLUXO:
- Seja breve e direto.
- Tente identificar rapidamente a categoria do serviço.
- Sempre direcione para um agendamento ou contato com Mateus ao final.
- Evite termos jurídicos densos; foque na solução.
`;

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou o assistente da Jus Digital. Como posso ajudar com sua documentação ou certificação digital hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages.concat(userMessage).map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      const assistantMessage: Message = { 
        role: 'assistant', 
        content: response.text || 'Desculpe, tive um problema ao processar sua solicitação. Poderia repetir?' 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Houve um erro técnico. Por favor, tente novamente em instantes.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="assistant" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-brand-900/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900 text-white text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Sparkles size={14} /> IA Especialista
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6 !leading-tight">
              Triagem Digital Inteligente
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Não sabe por onde começar? Converse com nosso assistente. Ele foi treinado para identificar suas necessidades documentais e recomendar o melhor caminho jurídico em segundos.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 mt-1 shrink-0">
                  <span className="font-bold text-xs">01</span>
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 mb-1">Identificação de Serviço</h4>
                  <p className="text-sm text-slate-500">Categoriza sua necessidade em Digital, Cartorial ou Internacional.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 mt-1 shrink-0">
                  <span className="font-bold text-xs">02</span>
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 mb-1">Pré-análise Documental</h4>
                  <p className="text-sm text-slate-500">Informa quais documentos você já deve ter em mãos para agilizar.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 mt-1 shrink-0">
                  <span className="font-bold text-xs">03</span>
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 mb-1">Conexão com Especialista</h4>
                  <p className="text-sm text-slate-500">Direciona você diretamente para o fechamento com nossa equipe comercial.</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-[600px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-brand-900 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <div className="font-bold">Assistente Jus Digital</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-70">Sempre Online</div>
                </div>
              </div>
              <button 
                onClick={() => setMessages([{ role: 'assistant', content: 'Olá! Sou o assistente da Jus Digital. Como posso ajudar com sua documentação ou certificação digital hoje?' }])}
                className="text-white/50 hover:text-white transition-colors"
                title="Reiniciar chat"
              >
                <RefreshCw size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-end gap-3 max-w-[85%] ${msg.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'assistant' ? 'bg-slate-100 text-brand-900' : 'bg-accent-500 text-white'
                    }`}>
                      {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'assistant' 
                        ? 'bg-slate-50 text-slate-700 rounded-bl-none border border-slate-100' 
                        : 'bg-brand-900 text-white rounded-br-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-50 p-4 rounded-2xl rounded-bl-none border border-slate-100 flex gap-1">
                    <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-brand-900 rounded-full" />
                    <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-brand-900 rounded-full" />
                    <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-brand-900 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Descreva sua necessidade..."
                  className="w-full pl-6 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-3 bg-brand-900 text-white rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:hover:bg-brand-900 transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-3 uppercase tracking-widest font-bold">
                Poder Jurídico & Inteligência Digital
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
