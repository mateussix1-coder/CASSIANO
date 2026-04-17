import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db, googleProvider } from '../firebase';
import { signInWithPopup, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import * as LucideIcons from 'lucide-react';

// IndexedDB Helper for large media
const openDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('JusDigitalMedia', 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore('media_blobs');
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const storeBlob = async (key: string, blob: string) => {
  const db = await openDB();
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction('media_blobs', 'readwrite');
    transaction.objectStore('media_blobs').put(blob, key);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

const getBlob = async (key: string) => {
  const db = await openDB();
  return new Promise<string | null>((resolve, reject) => {
    const transaction = db.transaction('media_blobs', 'readonly');
    const request = transaction.objectStore('media_blobs').get(key);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
};

enum OperationType { CREATE='create', UPDATE='update', DELETE='delete', LIST='list', GET='get', WRITE='write' }

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(p => ({
        providerId: p.providerId, displayName: p.displayName, email: p.email, photoUrl: p.photoURL
      })) || []
    },
    operationType, path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function Portal() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'image' | 'video'>('chat');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setIsAuthReady(true);
      if (u) {
        try {
          await setDoc(doc(db, 'users', u.uid), {
            email: u.email,
            name: u.displayName || 'User',
            role: 'client',
            createdAt: new Date().toISOString()
          });
        } catch(e) {
             // Let rules reject if it already exists, this is just a naive bootstrap for demo
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch(e) {
      console.error(e);
    }
  };

  if (!isAuthReady) return <div className="py-20 text-center text-brand-900">Carregando portal...</div>;

  if (!user) {
    return (
      <section id="portal" className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-xl mx-auto text-center px-6 bg-[#F8F8F8] p-12 rounded-lg border-b-4 border-brand-900 shadow-sm">
           <LucideIcons.Lock size={48} className="mx-auto text-brand-900 mb-6" />
           <h2 className="text-3xl font-bold text-brand-900 mb-4 uppercase tracking-tight">Portal Gov.br • Jus Digital</h2>
           <p className="text-graphite-900/70 mb-8 font-medium">Faça login com sua conta Google para acessar os serviços de inteligência documental e certificação.</p>
           <button onClick={handleLogin} className="bg-brand-900 text-white px-8 py-4 rounded-md font-bold uppercase tracking-widest flex items-center gap-3 mx-auto hover:bg-brand-800 shadow-lg">
             <LucideIcons.LogIn size={18} /> Acessar com Google
           </button>
        </div>
      </section>
    );
  }

  return (
    <section id="portal" className="py-20 bg-[#F8F8F8] relative min-h-[800px]">
       <div className="max-w-[1400px] mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
            <h3 className="text-xs font-bold text-brand-900 mb-4 px-4 uppercase tracking-[0.2em]">Painel de Controle</h3>
            <button onClick={() => setActiveTab('chat')} className={`text-left px-6 py-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-l-4 ${activeTab === 'chat' ? 'bg-white border-brand-900 shadow-sm text-brand-900' : 'border-transparent text-graphite-900/60 hover:bg-white/50'}`}>Consulta com IA</button>
            <button onClick={() => setActiveTab('image')} className={`text-left px-6 py-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-l-4 ${activeTab === 'image' ? 'bg-white border-brand-900 shadow-sm text-brand-900' : 'border-transparent text-graphite-900/60 hover:bg-white/50'}`}>Gerar Documento</button>
            <button onClick={() => setActiveTab('video')} className={`text-left px-6 py-4 rounded-md font-bold text-xs uppercase tracking-wider transition-all border-l-4 ${activeTab === 'video' ? 'bg-white border-brand-900 shadow-sm text-brand-900' : 'border-transparent text-graphite-900/60 hover:bg-white/50'}`}>Gerar Evidência</button>
            
            <div className="mt-auto pt-8 flex items-center gap-4 px-4 border-t border-gray-200 mt-8">
               <img src={user.photoURL || ''} alt="Foto" className="w-10 h-10 rounded-full border border-gray-200" referrerPolicy="no-referrer" />
               <div className="flex-1 min-w-0">
                 <p className="text-[11px] font-bold text-brand-900 truncate uppercase">{user.displayName}</p>
                 <button onClick={() => auth.signOut()} className="text-[9px] text-[#004580] font-black uppercase hover:underline">Sair</button>
               </div>
            </div>
          </div>
          
          {/* Main Area */}
          <div className="flex-1 bg-white rounded-lg p-6 md:p-10 shadow-sm border border-gray-200 min-h-[600px] relative">
             <div className="absolute top-8 right-10 flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-success-gov animate-pulse"></div>
                 <span className="text-[9px] uppercase font-bold text-gray-400 tracking-[0.15em]">Operacional • Certificação Ativa</span>
             </div>
             
             {activeTab === 'chat' && <ChatTab user={user} />}
             {activeTab === 'image' && <ImageTab user={user} />}
             {activeTab === 'video' && <VideoTab user={user} />}
          </div>
       </div>
    </section>
  );
}

// Components will live beneath here
function ChatTab({ user }: { user: FirebaseUser }) {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isHighThinking, setIsHighThinking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const currentInput = input;
    setMessages(prev => [...prev, { role: 'user', content: currentInput }]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error('API Key missing');
      
      const ai = new GoogleGenAI({ apiKey });
      const modelName = isHighThinking ? 'gemini-3.1-pro-preview' : 'gemini-3.1-flash-lite-preview';
      const config = isHighThinking 
        ? { 
            thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
            systemInstruction: `Você é o Consultor Estratégico da Jus Digital, especialista em desburocratização global.
Seu foco principal é auxiliar ${user.displayName} com CERTIFICADO DIGITAL e CERTIDÕES.

DIRETRIZES:
- Slogan: "Sincronizamos a burocracia brasileira com a agilidade do seu tempo".
- Certificados: Emitimos Via Home Office (Remoto) ou Presencial com o Mateus.
- Cartório: Transcrições, certidões de ônus digital, apostilamento de haia.
- Conversão: Leve o cliente ao agendamento de 'Organização de Portfólio' ou para falar com o Mateus.`
          }
        : {
            systemInstruction: `Você é o assistente ágil da Jus Digital. Foco: Certificado Digital (Mateus) e Certidões.`
          };

      const response = await ai.models.generateContent({
        model: modelName,
        contents: [...messages, { role: 'user', content: currentInput }].map(m => ({
           role: m.role === 'assistant' ? 'model' : 'user',
           parts: [{ text: m.content }]
        })),
        config
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.text || '' }]);
    } catch (e: any) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: `Erro: ${e.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full pt-6">
       <div className="flex items-center justify-between mb-8">
         <div>
           <h4 className="text-2xl font-serif text-brand-900 font-medium">Consultoria Legal</h4>
           <p className="text-graphite-900/60 text-sm">IA treinada em base avançada (Modo {isHighThinking ? 'Pro' : 'Rápido'})</p>
         </div>
         <label className="flex items-center cursor-pointer gap-3 bg-brand-900/5 p-2 rounded-xl">
           <span className="text-xs font-bold text-brand-900 uppercase tracking-wide">Alta Complexidade</span>
           <div className="relative">
             <input type="checkbox" className="sr-only" checked={isHighThinking} onChange={() => setIsHighThinking(!isHighThinking)} />
             <div className={`block w-10 h-6 rounded-full transition-colors ${isHighThinking ? 'bg-brand-900' : 'bg-gray-300'}`}></div>
             <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isHighThinking ? 'translate-x-4' : ''}`}></div>
           </div>
         </label>
       </div>

       <div ref={scrollRef} className="flex-1 overflow-y-auto mb-6 pr-4 space-y-6 scrollbar-thin">
          {messages.length === 0 && (
             <div className="max-w-md mx-auto py-10">
                <div className="bg-brand-900/5 border border-brand-900/10 rounded-3xl p-8 text-center text-brand-900">
                   <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-900 shadow-xl shadow-brand-900/10">
                     <LucideIcons.Fingerprint size={32} />
                   </div>
                   <h5 className="text-xl font-serif font-bold mb-3">Assistência Jus Digital</h5>
                   <p className="text-sm opacity-70 mb-6 font-sans">Sincronizamos a burocracia brasileira com a agilidade do seu tempo. Como podemos ajudar?</p>
                   <div className="flex flex-wrap gap-2 justify-center">
                      {['Certificado Digital', 'Busca de Certidões', 'Internacional'].map(label => (
                        <button key={label} onClick={() => setInput(label)} className="px-4 py-2 bg-white border border-brand-900/10 rounded-full text-[11px] font-bold hover:border-brand-900 transition-all font-sans">{label}</button>
                      ))}
                   </div>
                </div>
             </div>
          )}
          {messages.map((m, i) => (
             <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${m.role === 'user' ? 'bg-brand-900 text-white rounded-br-none' : 'bg-gray-100 text-brand-900 rounded-bl-none'}`}>
                   {m.content.split('\n').map((l, i) => <React.Fragment key={i}>{l}<br/></React.Fragment>)}
                </div>
             </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
               <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-none flex gap-2 items-center">
                  <div className="w-2 h-2 bg-brand-900 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-brand-900 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-brand-900 rounded-full animate-bounce delay-150"></div>
               </div>
             </div>
          )}
       </div>

       <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Digite sua dúvida ou caso para análise..."
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 pr-16 resize-none focus:outline-none focus:border-brand-900 focus:ring-1 focus:ring-brand-900 text-sm h-[100px]"
          />
          <button 
           onClick={handleSend}
           disabled={isLoading || !input.trim()}
           className="absolute right-4 bottom-4 w-10 h-10 bg-brand-900 text-accent-500 rounded-xl flex items-center justify-center hover:bg-brand-800 disabled:opacity-50"
          >
            <LucideIcons.Send size={18} />
          </button>
       </div>
    </div>
  );
}
// In ImageTab, we manage a local cache for blobs
function ImageTab({ user }: { user: FirebaseUser }) {
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [localCache, setLocalCache] = useState<Record<string, string>>({});

  useEffect(() => {
    const q = query(collection(db, 'media'), where('userId', '==', user.uid), where('type', '==', 'image'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as any));
      setImages(data);
      
      // Try to load local blobs for images that don't have mediaUrl in DB
      data.forEach(async (img: any) => {
        if (!img.mediaUrl && img.hasLocalData) {
           const cached = await getBlob(img.id);
           if (cached) {
             setLocalCache(prev => ({ ...prev, [img.id]: cached }));
           }
        }
      });
    }, (error) => {
       try { handleFirestoreError(error, OperationType.GET, 'media'); } catch(e) {}
    });
    return () => unsubscribe();
  }, [user.uid]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setStatus('Iniciando geração de imagem...');
    
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error('API Key padrão não encontrada no ambiente.');
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] }
      });
      
      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
         if (part.inlineData) {
            imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            break;
         }
      }

      if (imageUrl) {
         // 1MB Safe: If it's too large, store locally and only save metadata to Firestore
         const isTooLarge = imageUrl.length > 800000; // ~0.8MB threshold
         
         const docRef = await addDoc(collection(db, 'media'), {
           userId: user.uid,
           type: 'image',
           prompt,
           mediaUrl: isTooLarge ? null : imageUrl, // Only store if small
           hasLocalData: isTooLarge,
           status: 'completed',
           createdAt: new Date().toISOString()
         });

         if (isTooLarge) {
            await storeBlob(docRef.id, imageUrl);
            setLocalCache(prev => ({ ...prev, [docRef.id]: imageUrl }));
         }
         
         setStatus('');
      } else {
         setStatus('Não foi possível gerar a imagem.');
      }
    } catch (e: any) {
      console.error(e);
      setStatus(`Erro: ${e.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full pt-6">
       <div className="mb-8">
         <h4 className="text-2xl font-serif text-brand-900 font-medium mb-1">Gerador de Imagens Profissionais</h4>
         <p className="text-graphite-900/60 text-sm">Alta resolução com persistência inteligente contra limites de nuvem.</p>
       </div>

       <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
          <label className="block text-sm font-bold text-brand-900 mb-2">Descreva a Imagem</label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={isGenerating}
            placeholder="Ex: Um contrato de luxo com selo dourado sobre uma mesa de carvalho antigo..."
            className="w-full bg-white border border-gray-200 rounded-xl p-4 resize-none focus:outline-none focus:border-brand-900 text-sm h-[100px] mb-4 disabled:opacity-50"
          />
          <div className="flex items-center gap-6">
             <div>
                <label className="block text-xs font-bold text-brand-900 mb-2">Resolução (Simulada)</label>
                <div className="flex gap-2">
                   {['1K', '2K', '4K'].map((s: any) => (
                      <button key={s} onClick={() => setSize(s)} disabled={isGenerating} className={`px-4 py-2 text-xs font-bold rounded-lg border ${size === s ? 'border-brand-900 bg-brand-900 text-white' : 'border-gray-200 bg-white text-gray-500'}`}>{s}</button>
                   ))}
                </div>
             </div>
             <button 
               onClick={handleGenerate} 
               disabled={isGenerating || !prompt.trim()}
               className="ml-auto bg-brand-900 text-accent-500 px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-800 disabled:opacity-50 mt-5"
             >
               {isGenerating ? 'Gerando...' : 'Gerar Imagem'}
             </button>
          </div>
          {status && <div className="mt-4 p-3 bg-brand-900/5 text-brand-900 text-xs font-mono rounded-lg border border-brand-900/10"><LucideIcons.Loader className="inline-block animate-spin mr-2" size={14}/>{status}</div>}
       </div>

       <div>
          <h5 className="font-bold text-brand-900 mb-4 border-b pb-2">Seu Acervo</h5>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
             {images.length === 0 ? <p className="text-gray-400 text-sm col-span-full">Nenhuma imagem gerada ainda.</p> : 
              images.map((img) => {
                const displayUrl = img.mediaUrl || localCache[img.id];
                return (
                  <div key={img.id} className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                     {displayUrl ? (
                       <img src={displayUrl} alt={img.prompt} className="w-full h-full object-cover" />
                     ) : (
                       <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                          {img.hasLocalData && !localCache[img.id] ? (
                             <div className="text-graphite-900/40 text-[10px]">Imagem em cache local não disponível</div>
                          ) : (
                             <>
                               <LucideIcons.RefreshCw size={24} className="mb-2 animate-spin text-accent-500"/>
                               <span className="text-brand-900 text-[10px] font-bold">Carregando...</span>
                             </>
                          )}
                       </div>
                     )}
                     {img.hasLocalData && (
                        <div className="absolute top-2 right-2 bg-brand-900/80 text-white text-[8px] px-2 py-1 rounded-full backdrop-blur-sm">
                           HD Local
                        </div>
                     )}
                  </div>
                );
              })
             }
          </div>
       </div>
    </div>
  );
}
function VideoTab({ user }: { user: FirebaseUser }) {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'media'), where('userId', '==', user.uid), where('type', '==', 'video'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setVideos(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (error) => {
       try { handleFirestoreError(error, OperationType.GET, 'media'); } catch(e) {}
    });
    return () => unsubscribe();
  }, [user.uid]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    
    setIsGenerating(true);
    setStatus('Iniciando geração de vídeo...');
    
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error('API Key padrão não encontrada no ambiente.');
      const ai = new GoogleGenAI({ apiKey });

      let operation = await ai.models.generateVideos({
         model: 'veo-3.1-lite-generate-preview',
         prompt,
         config: {
           numberOfVideos: 1,
           resolution: '1080p',
           aspectRatio
         }
      });
      
      // Save placeholder in DB
      const docRef = await addDoc(collection(db, 'media'), {
         userId: user.uid,
         type: 'video',
         prompt,
         status: 'processing',
         createdAt: new Date().toISOString()
      });

      setStatus('Aguardando servidor de renderização (isso pode levar alguns minutos)...');
      while (!operation.done) {
         await new Promise(r => setTimeout(r, 10000));
         operation = await ai.operations.getVideosOperation({ operation });
         setStatus(`Processando... ${new Date().toLocaleTimeString()}`);
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
         const videoResponse = await fetch(downloadLink, {
            headers: { 'x-goog-api-key': apiKey }
         });
         const blob = await videoResponse.blob();
         const objectUrl = URL.createObjectURL(blob);
         // Simulate completed update in DB
         throw new Error(`Vídeo renderizado. URL Oculta para iframe: ${objectUrl.slice(0,10)}... (Requer Storage)`);
      }
      
    } catch (e: any) {
      console.error(e);
      setStatus(`Erro: ${e.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full pt-6">
       <div className="mb-8">
         <h4 className="text-2xl font-serif text-brand-900 font-medium mb-1">Gerador de Evidências em Vídeo</h4>
         <p className="text-graphite-900/60 text-sm">Tecnologia Veo 3 para simulações e audiências.</p>
       </div>

       <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
          <label className="block text-sm font-bold text-brand-900 mb-2">Descreva a Cena</label>
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={isGenerating}
            placeholder="Ex: Câmera de segurança gravando a rua em frente ao cartório à noite..."
            className="w-full bg-white border border-gray-200 rounded-xl p-4 resize-none focus:outline-none focus:border-brand-900 text-sm h-[100px] mb-4 disabled:opacity-50"
          />
          <div className="flex items-center gap-6">
             <div>
                <label className="block text-xs font-bold text-brand-900 mb-2">Formato (Aspect Ratio)</label>
                <div className="flex gap-2">
                   <button onClick={() => setAspectRatio('16:9')} disabled={isGenerating} className={`px-4 py-2 text-xs font-bold rounded-lg border ${aspectRatio === '16:9' ? 'border-brand-900 bg-brand-900 text-white' : 'border-gray-200 bg-white text-gray-500'}`}>16:9 (Paisagem)</button>
                   <button onClick={() => setAspectRatio('9:16')} disabled={isGenerating} className={`px-4 py-2 text-xs font-bold rounded-lg border ${aspectRatio === '9:16' ? 'border-brand-900 bg-brand-900 text-white' : 'border-gray-200 bg-white text-gray-500'}`}>9:16 (Vertical)</button>
                </div>
             </div>
             <button 
               onClick={handleGenerate} 
               disabled={isGenerating || !prompt.trim()}
               className="ml-auto bg-brand-900 text-accent-500 px-8 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-brand-800 disabled:opacity-50 mt-5"
             >
               {isGenerating ? 'Gerando...' : 'Renderizar Vídeo'}
             </button>
          </div>
          {status && <div className="mt-4 p-3 bg-brand-900/5 text-brand-900 text-xs font-mono rounded-lg border border-brand-900/10"><LucideIcons.Loader className="inline-block animate-spin mr-2" size={14}/>{status}</div>}
       </div>

       <div>
          <h5 className="font-bold text-brand-900 mb-4 border-b pb-2">Seu Acervo</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {videos.length === 0 ? <p className="text-gray-400 text-sm col-span-full">Nenhum vídeo gerado ainda.</p> : 
              videos.map((vid) => (
                <div key={vid.id} className="relative aspect-video bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center p-4 text-center">
                   {vid.status === 'processing' ? (
                     <div className="text-brand-900 text-xs font-bold flex flex-col items-center"><LucideIcons.RefreshCw size={24} className="mb-2 animate-spin text-accent-500"/>Processando...</div>
                   ) : (
                     <LucideIcons.Video size={32} className="text-gray-300" />
                   )}
                </div>
              ))
             }
          </div>
       </div>
    </div>
  );
}

