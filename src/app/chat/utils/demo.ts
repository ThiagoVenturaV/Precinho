import { ChatEvent, ChatRequest, Product } from '../models/chat.models';

const products: Product[] = [
  {
    id: 'principia',
    name: 'Kit Principia limpeza solar GL-02 + PS-01',
    brand: 'Principia',
    price: 7838,
    image: 'assets/products/153418.jpg',
    description: 'Limpeza facial e proteção solar. Uso externo, conforme a embalagem.',
    category: 'Proteção solar',
  },
  {
    id: 'coco',
    name: 'Água de coco Kero Coco 330 ml',
    brand: 'Kero Coco',
    price: 849,
    image: 'assets/products/113848.png',
    description: 'Uma opção prática de hidratação para levar com você.',
    category: 'Hidratação',
  },
  {
    id: 'hs',
    name: 'Shampoo Head & Shoulders eucalipto 400 ml',
    brand: 'Head & Shoulders',
    price: 2999,
    image: 'assets/products/35356.jpg',
    description: 'Shampoo anticaspa de uso externo. Siga as instruções da embalagem.',
    category: 'Cabelo',
  },
  {
    id: 'pantene',
    name: 'Máscara Pantene hidratação intensiva 270 ml',
    brand: 'Pantene',
    price: 2999,
    image: 'assets/products/54934.jpg',
    description: 'Cuidado capilar de uso externo. Evite contato com os olhos.',
    category: 'Cabelo',
  },
];

function delay(signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    signal.throwIfAborted();
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException('Cancelado', 'AbortError'));
    };
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', abort);
      resolve();
    }, 35);
    signal.addEventListener('abort', abort, { once: true });
  });
}

export async function* demoStream(
  request: ChatRequest,
  signal: AbortSignal,
): AsyncGenerator<ChatEvent> {
  yield { type: 'session', conversationId: request.conversationId ?? crypto.randomUUID() };
  const text = request.message
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const clinical =
    /garganta|dor\b|febre|sintoma|alergia|gravida|gestante|crianca|remedio|medicamento|falta de ar/.test(
      text,
    );
  if (clinical) {
    const answer =
      'Antes de escolher um produto, é importante conversar com um **farmacêutico** sobre seus sintomas, alergias e outros medicamentos.\n\nSe houver falta de ar, dificuldade para engolir ou piora importante, procure atendimento de saúde. Em caso de emergência, ligue **192**.\n\nNão vou indicar medicamentos nesta demonstração. Posso ajudar a organizar itens de higiene e cuidado para a sua rotina ou viagem.';
    for (const word of answer.match(/\S+\s*/g) ?? []) {
      await delay(signal);
      yield { type: 'delta', text: word };
    }
    yield {
      type: 'suggestions',
      suggestions: ['Montar um kit de higiene para viagem', 'Ver cuidados para o cabelo'],
    };
  } else {
    yield {
      type: 'tool-start',
      id: 'catalog-demo',
      label: 'Consultando o catálogo de demonstração',
    };
    await delay(signal);
    const hair = /cabelo|rotina|casa|higiene|shampoo/.test(text);
    const selected = hair ? products.slice(2) : products.slice(0, 2);
    yield { type: 'tool-end', id: 'catalog-demo', status: 'completed' };
    const answer = hair
      ? 'Separei duas opções para o cuidado com os cabelos. Confira os detalhes de cada item e adicione ao seu kit apenas o que fizer sentido para você.\n\n**Os preços são ilustrativos**, com base no catálogo do protótipo.'
      : 'Vamos deixar sua nécessaire pronta. Separei uma opção de limpeza e proteção solar, além de hidratação para o caminho.\n\nVocê pode ajustar as quantidades no seu kit. **Os preços são ilustrativos**, com base no catálogo do protótipo.';
    for (const word of answer.match(/\S+\s*/g) ?? []) {
      await delay(signal);
      yield { type: 'delta', text: word };
    }
    yield { type: 'products', products: selected };
    yield {
      type: 'suggestions',
      suggestions: hair ? ['Ver proteção solar para viagem'] : ['Ver cuidados para o cabelo'],
    };
  }
  yield { type: 'done' };
}
