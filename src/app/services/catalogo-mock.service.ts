import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Produto } from '../models/produto.model';
import { Product } from '../chat/models/chat.models';

@Injectable({
  providedIn: 'root'
})
export class CatalogoMockService {

  private produtos: Produto[] = [
    {
      id: 1,
      nome: 'Protetor Solar Facial FPS 60 Sem Óleo 50g',
      marca: 'Pague Menos',
      produtoProprio: true,
      categoria: 'Skincare',
      preco: 34.90,
      imagemUrl: 'https://paguemenos.vteximg.com.br/arquivos/ids/900847/1---principia-skincare-protetor-solar-facial-ps-01-filtros-uv-niacinamida-1.jpg',
      classificacaoVenda: 'LIVRE',
      descricao: 'O Protetor Solar Facial FPS 60 Sem Óleo Pague Menos oferece alta proteção dermatológica contra raios UVA e UVB. Sua fórmula com toque seco e controle de oleosidade é ideal para uso diário, prevenindo queimaduras solares e o fotoenvelhecimento precoce.',
      estoque: 60,
      slug: 'protetor-solar-facial-fps-60',
      dosagem: '50g',
      backendId: '144292'
    },
    {
      id: 2,
      nome: 'Dipirona Monoidratada 500mg 10 Comprimidos',
      marca: 'Pague Menos',
      produtoProprio: true,
      categoria: 'Medicamentos',
      preco: 5.50,
      imagemUrl: 'https://paguemenos.vteximg.com.br/arquivos/ids/1145859/7896004703398_0.png',
      classificacaoVenda: 'LIVRE',
      descricao: 'A Dipirona Monoidratada 500mg Pague Menos é indicada como analgésico e antitérmico para o alívio rápido de dores de cabeça, febre e dores no corpo em geral.',
      estoque: 150,
      slug: 'dipirona-monoidratada-500mg-10-comprimidos',
      dosagem: '500mg',
      backendId: '18537'
    },
    {
      id: 3,
      nome: 'Amoxicilina 500mg 21 Cápsulas',
      marca: 'Medley',
      produtoProprio: false,
      categoria: 'Antibióticos',
      preco: 28.90,
      imagemUrl: 'https://paguemenos.vteximg.com.br/arquivos/ids/1092897/TARJA-VERMELHA-RETENCAO.jpg',
      classificacaoVenda: 'EXIGE_RECEITA',
      descricao: 'A Amoxicilina 500mg é um antibiótico eficaz indicado para o tratamento de infecções bacterianas. Medicamento sob retenção de receita na entrega ou retirada.',
      estoque: 40,
      slug: 'amoxicilina-500mg-21-capsulas',
      dosagem: '500mg',
      backendId: '37697'
    },
    {
      id: 4,
      nome: 'Hidratante Facial Dauf Vitamina C 50g',
      marca: 'Dauf',
      produtoProprio: true,
      categoria: 'Skincare',
      preco: 27.99,
      imagemUrl: 'https://paguemenos.vteximg.com.br/arquivos/ids/643532/hidratante-facial-dauf-vitamina-c-50g-principal.jpg',
      classificacaoVenda: 'LIVRE',
      descricao: 'O Hidratante Facial Dauf Vitamina C combina ação antioxidante e vitaminas C, E e A, auxiliando na uniformização da textura e luminosidade saudável da pele.',
      estoque: 55,
      slug: 'hidratante-facial-dauf-vitamina-c',
      dosagem: '50g',
      backendId: '52295'
    },
    {
      id: 5,
      nome: 'Shampoo Anticaspa Head & Shoulders Anticoceira 400ml',
      marca: 'Head & Shoulders',
      produtoProprio: false,
      categoria: 'Cabelos',
      preco: 28.99,
      imagemUrl: 'https://paguemenos.vteximg.com.br/arquivos/ids/1233004/7506195142042_1.jpg',
      classificacaoVenda: 'LIVRE',
      descricao: 'Shampoo anticaspa enriquecido com eucalipto que limpa profundamente e proporciona alívio imediato da coceira, deixando os fios até 100% livres de caspa.',
      estoque: 80,
      slug: 'shampoo-anticaspa-head-shoulders',
      dosagem: '400ml',
      backendId: '35356'
    },
    {
      id: 6,
      nome: 'Máscara Pantene Pro-V Hidratação Intensiva 270ml',
      marca: 'Pantene',
      produtoProprio: false,
      categoria: 'Cabelos',
      preco: 24.99,
      imagemUrl: 'https://paguemenos.vteximg.com.br/arquivos/ids/909053/7500435142229_1.jpg',
      classificacaoVenda: 'LIVRE',
      descricao: 'Tratamento intensivo enriquecido com tecnologia Pro-V da Pantene para restaurar a umidade natural dos cabelos ressecados, combatendo o frizz com brilho prolongado.',
      estoque: 65,
      slug: 'mascara-pantene-pro-v',
      dosagem: '270ml',
      backendId: '54934'
    },
    {
      id: 7,
      nome: 'Gel de Limpeza Facial Principia GL-02 Suave 350g',
      marca: 'Principia',
      produtoProprio: false,
      categoria: 'Skincare',
      preco: 48.99,
      imagemUrl: 'https://paguemenos.vteximg.com.br/arquivos/ids/925707/gel-de-limpeza-principia-gl-02-350g-principal.png',
      classificacaoVenda: 'LIVRE',
      descricao: 'Gel de Limpeza GL-02 suave com Glicerina, Pantenol e Alantoína. Higieniza profundamente removendo oleosidade sem agredir a barreira cutânea.',
      estoque: 90,
      slug: 'gel-de-limpeza-principia-gl-02',
      dosagem: '350g',
      backendId: '148774'
    },
    {
      id: 8,
      nome: 'Sérum Principia NC-10 Niacinamida 10% + Zinco 1% 30ml',
      marca: 'Principia',
      produtoProprio: false,
      categoria: 'Skincare',
      preco: 58.99,
      imagemUrl: 'https://paguemenos.vteximg.com.br/arquivos/ids/911167/0602883706309.jpg',
      classificacaoVenda: 'LIVRE',
      descricao: 'Sérum facial de alta performance formulado para controle de oleosidade excessiva, redução de poros dilatados e uniformização do tom da pele.',
      estoque: 75,
      slug: 'serum-principia-nc-10',
      dosagem: '30ml',
      backendId: '144395'
    },
    {
      id: 9,
      nome: 'Gel Hidratante Principia Skincare GH-01 50g',
      marca: 'Principia',
      produtoProprio: false,
      categoria: 'Skincare',
      preco: 53.99,
      imagemUrl: 'https://paguemenos.vteximg.com.br/arquivos/ids/1130421/0070341368725_1.png',
      classificacaoVenda: 'LIVRE',
      descricao: 'Gel Hidratante facial com 1% de Ácidos Hialurônicos e 5% de Glicerina. Textura leve e rápida absorção promovendo hidratação intensa e viço.',
      estoque: 70,
      slug: 'gel-hidratante-principia-gh-01',
      dosagem: '50g',
      backendId: '171123'
    },
    {
      id: 10,
      nome: 'Água Micelar Dauf Sem Álcool 115ml',
      marca: 'Dauf',
      produtoProprio: true,
      categoria: 'Higiene e Beleza',
      preco: 24.99,
      imagemUrl: 'https://paguemenos.vteximg.com.br/arquivos/ids/644438/agua-micelar-dauf-clean-solut-115ml-principal.jpg',
      classificacaoVenda: 'LIVRE',
      descricao: 'Água Micelar Dauf 7 em 1 com D-Pantenol. Limpa, demaquila, purifica, reequilibra e suaviza a pele sem necessidade de enxágue.',
      estoque: 100,
      slug: 'agua-micelar-dauf-sem-alcool',
      dosagem: '115ml',
      backendId: '53984'
    },
    // Vitrine destaques e kits para rota interna sem redirecionamento externo
    {
      id: 'rexona-xtracool',
      nome: 'Rexona Men Xtracool + Impacto 150ml, 2 unidades',
      marca: 'REXONA',
      produtoProprio: false,
      categoria: 'Higiene Pessoal',
      preco: 24.49,
      imagemUrl: 'https://paguemenos.vtexassets.com/arquivos/ids/1175306/7891150108288_0.jpg',
      classificacaoVenda: 'LIVRE',
      descricao: 'Kit econômico com 2 unidades do desodorante antitranspirante Rexona Men Xtracool + Impacto 150ml spray, garantindo até 72 horas de proteção.',
      estoque: 110,
      slug: 'kit-desodorante-antitranspirante-aerossol-rexona-men-xtracool-mais-impacto-150ml-spray-edicao-limitada-fifa',
      dosagem: '2x 150ml',
      backendId: '17536'
    },
    {
      id: 'nutridrink-protein',
      nome: 'Nutridrink Protein Senior Café com Leite 750g',
      marca: 'NUTRIDRINK',
      produtoProprio: false,
      categoria: 'Nutrição',
      preco: 151.99,
      imagemUrl: 'https://paguemenos.vtexassets.com/arquivos/ids/991253/7891025121480_1.jpg',
      classificacaoVenda: 'LIVRE',
      descricao: 'Suplemento nutricional em pó sabor café com leite desenvolvido para adultos 50+, com proteínas de alta qualidade, cálcio e vitamina D.',
      estoque: 30,
      slug: 'nutridrink-protein-senior-po-cafe-com-leite-750g',
      dosagem: '750g',
      backendId: '60534'
    },
    {
      id: 'aptanutri-3-kit',
      nome: 'Aptanutri Premium 3 800g, kit com 3 unidades',
      marca: 'APTANUTRI',
      produtoProprio: false,
      categoria: 'Nutrição Infantil',
      preco: 165.22,
      imagemUrl: 'https://paguemenos.vtexassets.com/arquivos/ids/1143794/Kit-Aptanutri-Premium-3-formula-Infantil-1-a-3-anos-800g-3-Unidades.png',
      classificacaoVenda: 'LIVRE',
      descricao: 'Fórmula infantil de seguimento para crianças de 1 a 3 anos. Kit promocional com 3 latas de 800g com prebióticos e ácidos graxos essenciais.',
      estoque: 40,
      slug: 'kit-aptanutri-premium-3-formula-infantil-1-a-3-anos-800g-3-unidades',
      dosagem: '3x 800g',
      backendId: '38065'
    },
    {
      id: 'aptanutri-profutura',
      nome: 'Aptanutri Profutura 3 800g + Fortini Plus 400g',
      marca: 'APTANUTRI',
      produtoProprio: false,
      categoria: 'Nutrição Infantil',
      preco: 143.98,
      imagemUrl: 'https://paguemenos.vtexassets.com/arquivos/ids/1143934/Kit-Aptanutri-Profutura-3-800g-e-Suplemento-Infantil-Fortini-Plus-Sem-Sabor-400g.png',
      classificacaoVenda: 'LIVRE',
      descricao: 'Combo especial Aptanutri Profutura 3 800g acompanhado de Suplemento Infantil Fortini Plus Sem Sabor 400g para suporte nutricional avançado.',
      estoque: 25,
      slug: 'kit-aptanutri-profutura-3-800g---suplemento-infantil-fortini-plus-sem-sabor-400g',
      dosagem: '800g + 400g',
      backendId: '57226'
    }
  ];

  listarDestaques(): Observable<Produto[]> {
    // Retorna os produtos do catálogo para a vitrine
    return of(this.produtos.slice(0, 10));
  }

  obterPorId(id: number | string): Observable<Produto | undefined> {
    const termo = String(id).trim().toLowerCase();
    const encontrado = this.produtos.find((p) => {
      if (String(p.id).toLowerCase() === termo) return true;
      if (p.slug && p.slug.toLowerCase() === termo) return true;
      if (p.backendId && p.backendId.toLowerCase() === termo) return true;
      if (p.slug && termo.includes(p.slug.toLowerCase())) return true;
      return false;
    });
    return of(encontrado);
  }

  toChatProduct(p: Produto): Product {
    return {
      id: p.backendId ?? String(p.id),
      name: p.nome,
      brand: p.marca,
      price: Math.round(p.preco * 100),
      image: p.imagemUrl,
      description: p.descricao ?? p.nome,
      category: p.categoria,
      stock: p.estoque ?? 50,
      medication: p.categoria.toLowerCase().includes('medicamento') || p.categoria.toLowerCase().includes('antibiótico'),
      dosage: p.dosagem ?? '',
      requiresPrescription: p.classificacaoVenda === 'EXIGE_RECEITA'
    };
  }
}
