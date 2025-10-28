import { Produto, NewProduto } from "@/src/types/produtos";
import { apiClient } from "./apiClient";

export async function getProdutos() {
  const response = await apiClient.get<Produto[]>("/produtos");
  return response.data;
}

export async function getProdutoById(id: string) {
  const response = await apiClient.get<Produto>(`/produtos/${id}`);
  return response.data;
}

export async function postProduto(params: NewProduto) {
  const response = await apiClient.post<Produto>("/produtos", params);
  return response.data;
}

export async function putProduto(id: string, params: NewProduto) {
  const response = await apiClient.put<Produto>(`/produtos/${id}`, params);
  return response.data;
}

export async function deleteProduto(id: string) {
  await apiClient.delete(`/produtos/${id}`);
}
