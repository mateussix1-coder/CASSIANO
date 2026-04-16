
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
    description: 'Emissão rápida de e-CPF e e-CNPJ. Atendimento presencial agendado ou via Home Office/Remoto.',
    icon: 'ShieldCheck',
    category: 'digital'
  },
  {
    id: 'transcricao',
    title: 'Transcrição de Documentos',
    description: 'Regularização de registros estrangeiros no Brasil com agilidade jurídica.',
    icon: 'FileText',
    category: 'cartorial'
  },
  {
    id: 'certidoes',
    title: 'Busca de Certidões',
    description: 'Obtencão de certidões de nascimento, casamento e óbito em todo o território nacional.',
    icon: 'Search',
    category: 'cartorial'
  },
  {
    id: 'internacionalizacao',
    title: 'Internacionalização',
    description: 'Apoio documental para brasileiros no exterior e estrangeiros vindo para o Brasil.',
    icon: 'Globe',
    category: 'international'
  },
  {
    id: 'sistema-notas',
    title: 'Emissão de Notas',
    description: 'Novo sistema focado em resolver gargalos de mercado para empresas modernas.',
    icon: 'BarChart3',
    category: 'digital'
  }
];
