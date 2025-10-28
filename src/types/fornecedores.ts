export interface Fornecedor {
  id: string;
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  ativo: boolean;
}

export interface NewFornecedor {
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  ativo: boolean;
}
