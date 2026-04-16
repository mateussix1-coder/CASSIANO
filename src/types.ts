
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'digital' | 'cartorial' | 'international';
}

export type MessageRole = 'user' | 'assistant';

export interface Message {
  role: MessageRole;
  content: string;
}

export const SERVICES: Service[] = [
  {
    id: 'certificacao-digital',
    title: 'Certificação Digital',
    description: 'Como franqueados oficiais, trazemos o que há de mais seguro em identidade digital. Atendimento flexível: Você escolhe entre a conveniência do Home Office ou a exclusividade do atendimento presencial com agenda marcada.',
    icon: 'ShieldCheck',
    category: 'digital'
  },
  {
    id: 'cartorio-transcricao',
    title: 'Cartório e Transcrições',
    description: 'Acesso direto aos registros para transcrições, buscas de certidões e regularizações rápidas. Essencial para brasileiros no exterior e estrangeiros chegando ao Brasil que precisam de segurança jurídica imediata.',
    icon: 'FileText',
    category: 'cartorial'
  },
  {
    id: 'sistema-notas',
    title: 'Escalabilidade de Inovação',
    description: 'Implementamos um sistema inovador de emissão de notas para suprir uma demanda reprimida que os sistemas tradicionais não alcançam. Uma solução nova para um mercado que exige eficiência.',
    icon: 'BarChart3',
    category: 'digital'
  }
];
