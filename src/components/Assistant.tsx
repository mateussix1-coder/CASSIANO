import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Message } from '../types';

const SYSTEM_INSTRUCTION = `
Você é o "Jus Bot", a inteligência comercial e Consultor Sênior da Jus Digital.
Sua função é atuar como o primeiro ponto de contato de uma consultoria jurídica de alto padrão, especializada em desburocratização documental global (liderada por um advogado especialista).

CONTEXTO OPERACIONAL / BASE DE CONHECIMENTO:
1. CERTIFICAÇÃO DIGITAL: Nosso produto de expansão/estrela, operado através de uma nova franquia. O atendimento comercial é liderado pelo Mateus e pode ser feito via Home Office (remoto) ou Presencial com agenda.
2. SERVIÇOS DE CARTÓRIO E NOTAS: Especialistas em Certidões de Ônus Digital (Provimento 195/2025) e transcrições de documentos.
3. SISTEMA DE NOTAS (PJ): Um novo sistema inovador de emissão de notas focada em suprir demandas reprimidas do mercado para empresas.
4. PÚBLICO INTERNACIONAL: Atendemos brasileiros no exterior e estrangeiros vindo para o Brasil (Tradução Juramentada Oficial, Apostilamento de Haia, etc.).

DIRETRIZES DE COMPORTAMENTO E TOM DE VOZ:
- Sofisticado, resolutivo, direto e seguro. Você tem a autoridade de quem domina o sistema de notas e registros e a agilidade de uma startup.
- REGRAS DE OURO: NUNCA use clichês de IA (ex: "como um assistente virtual"). 
- FORMATAÇÃO: Responda como se fosse uma mensagem de WhatsApp Corporativo. NÃO use asteriscos (**) ou formatação complexa de Markdown. Use hifens (-) para criar listas limpas e separe parágrafos pulando linhas.
- Você conversa direto ao ponto.

LÓGICA DE TRIAGEM:
- Se Certificado Digital: Enfatize agilidade, liderança do Mateus, emissão Home Office ou Presencial.
- Se Cartório/Certidões: Solicite detalhes/quais documentos a pessoa já possui, informe que temos acesso direto a sistemas de cartório.
- Se PJ/Empresa: Apresente a inovação do nosso sistema de emissão de notas.
- Se Internacional/Exterior: Destaque nossa capacidade de resolver registros diretamente nos cartórios brasileiros.

OBJETIVO DE CONVERSÃO EXCLUSIVO:
Seu objetivo final é convencer o visitante a fechar a venda com o Mateus (se for certificado) ou agendar uma reunião para "Organização de Portfólio de Documentos" na sexta-feira.
`;

const formatMessage = (content: string) => {
  return content.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <React.Fragment key={i}>
        {parts.map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j} className="font-bold">{part.slice(2, -2)}</strong>;
          }
          return <span key={j}>{part}</span>;
        })}
        {i < content.split('\n').length - 1 && <br className="mb-2" />}
      </React.Fragment>
    );
  });
};

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Sou o assistente da Jus Digital. Como posso ajudar com sua documentação ou certificação digital hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // The API key is securely injected by Vite's define plugin during build/runtime
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey || apiKey === 'undefined') {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: 'Erro: Chave da API (GEMINI_API_KEY) não configurada. Se você publicou no Vercel, por favor adicione a variável de ambiente GEMINI_API_KEY no painel do Vercel e faça um novo deploy.' 
        }]);
        setIsLoading(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
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
        content: response.text || 'Desculpe, não consegui gerar uma resposta. Poderia repetir?' 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Houve um erro técnico de comunicação. Detalhe: ${errorMessage}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="assistant" className="py-16 relative overflow-hidden">
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
            <p className="text-graphite-900 text-lg mb-8 leading-relaxed font-medium">
              Não sabe por onde começar? Converse com nosso assistente. Ele foi treinado para identificar suas necessidades documentais e recomendar o melhor caminho jurídico em segundos.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 mt-1 shrink-0">
                  <span className="font-bold text-xs">01</span>
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 mb-1">Identificação de Serviço</h4>
                  <p className="text-sm text-graphite-900/80 font-medium">Categoriza sua necessidade em Digital, Cartorial ou Internacional.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 mt-1 shrink-0">
                  <span className="font-bold text-xs">02</span>
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 mb-1">Pré-análise Documental</h4>
                  <p className="text-sm text-graphite-900/80 font-medium">Informa quais documentos você já deve ter em mãos para agilizar.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-500 mt-1 shrink-0">
                  <span className="font-bold text-xs">03</span>
                </div>
                <div>
                  <h4 className="font-bold text-brand-900 mb-1">Conexão com Especialista</h4>
                  <p className="text-sm text-graphite-900/80 font-medium">Direciona você diretamente para o fechamento com nossa equipe comercial.</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-graphite-900/10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-graphite-900/10 flex items-center justify-between bg-brand-900 text-white">
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
              className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-graphite-900/20"
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
                      msg.role === 'assistant' ? 'bg-[#F9F9F8] text-brand-900' : 'bg-accent-500 text-brand-900'
                    }`}>
                      {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'assistant' 
                        ? 'bg-[#F9F9F8] text-graphite-900 rounded-bl-none border border-graphite-900/10' 
                        : 'bg-brand-900 text-accent-500 rounded-br-none'
                    }`}>
                      {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#F9F9F8] p-4 rounded-2xl rounded-bl-none border border-graphite-900/10 flex gap-1">
                    <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-brand-900 rounded-full" />
                    <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-brand-900 rounded-full" />
                    <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-brand-900 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-graphite-900/10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Descreva sua necessidade..."
                  className="w-full pl-6 pr-14 py-4 bg-[#F9F9F8] border border-graphite-900/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 transition-all text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-3 bg-brand-900 text-accent-500 rounded-xl hover:bg-brand-800 disabled:opacity-50 disabled:hover:bg-brand-900 transition-all"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-[10px] text-center text-graphite-800/50 mt-3 uppercase tracking-widest font-bold">
                Poder Jurídico & Inteligência Digital
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
