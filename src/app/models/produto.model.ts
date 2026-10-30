export type ClassificacaoVenda = 'LIVRE' | 'EXIGE_RECEITA' | 'CONTROLADO';

export interface Produto {
  id: number | string;
  nome: string;
  marca: string;
  produtoProprio: boolean;
  categoria: string;
  preco: number;
  imagemUrl: string;
  classificacaoVenda: ClassificacaoVenda;
  descricao?: string;
  estoque?: number;
  slug?: string;
  dosagem?: string;
  backendId?: string;
}
