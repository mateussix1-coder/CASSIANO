
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

export const SECONDARY_SERVICES: Service[] = [
  {
    id: 'traducoes',
    title: 'Tradução Juramentada',
    description: 'Traduções com validade legal em múltiplos idiomas, garantindo que seus documentos sejam aceitos em qualquer jurisdição internacional.',
    icon: 'Languages',
    category: 'international'
  },
  {
    id: 'apostilamento',
    title: 'Apostilamento de Haia',
    description: 'Validação internacional rápida de documentos públicos brasileiros para uso no exterior, em conformidade com a Convenção da Apostila da Haia.',
    icon: 'Globe',
    category: 'international'
  },
  {
    id: 'assessoria-expatriados',
    title: 'Assessoria para Expatriados',
    description: 'Regularização documental completa para estrangeiros no Brasil ou brasileiros no exterior, simplificando processos imigratórios e fiscais.',
    icon: 'Passport',
    category: 'international'
  }
];
