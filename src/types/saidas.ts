export interface SaidaEstoque {
  id: string;
  produto: {
    id: string;
    nomeProduto: string;
  };
  quantidade: number;
  dataSaida: string;
}

export interface NewSaidaEstoque {
  produto: {
    id: string;
  };
  quantidade: number;
}
