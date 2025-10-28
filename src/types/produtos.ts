export interface Produto {
  id: string;
  codigoProduto: string;
  nomeProduto: string;
  fornecedorNome: string;
  marcaNome: string;
  quantidadeAtual: number;
  dataUltimaAtualizacao: string;
  ativo: boolean;
}

export interface NewProduto {
  codigoProduto: string;
  nomeProduto: string;
  fornecedor: {
    id: string;
  };
  marca: {
    id: string;
  };
  quantidadeAtual: number;
  ativo: boolean;
}
