
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
    description: 'Oferecemos atendimento Home Office ou Presencial com agenda marcada para você obter seu e-CPF e e-CNPJ com segurança e comodidade.',
    icon: 'ShieldCheck',
    category: 'digital'
  },
  {
    id: 'transcricao',
    title: 'Transcrição de Documentos',
    description: 'Promovemos a desburocratização real na regularização de registros estrangeiros no Brasil com total agilidade.',
    icon: 'FileText',
    category: 'cartorial'
  },
  {
    id: 'certidoes',
    title: 'Busca de Certidões',
    description: 'Agilização e desburocratização real na obtenção de certidões de nascimento, casamento e óbito.',
    icon: 'Search',
    category: 'cartorial'
  },
  {
    id: 'internacionalizacao',
    title: 'Internacionalização',
    description: 'Apoio documental para brasileiros no exterior e estrangeiros, unindo confiança jurídica e velocidade digital.',
    icon: 'Globe',
    category: 'international'
  },
  {
    id: 'sistema-notas',
    title: 'Sistema de Emissão de Notas',
    description: 'Solução inovadora que supre uma demanda crescente do mercado corporativo, não atendida pelos sistemas tradicionais.',
    icon: 'BarChart3',
    category: 'digital'
  }
];
