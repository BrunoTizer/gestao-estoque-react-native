import { SaidaEstoque, NewSaidaEstoque } from "@/src/types/saidas";
import { apiClient } from "./apiClient";

export async function getSaidas() {
  const response = await apiClient.get<SaidaEstoque[]>("/saida-estoque");
  return response.data;
}

export async function getSaidaById(id: string) {
  const response = await apiClient.get<SaidaEstoque>(`/saida-estoque/${id}`);
  return response.data;
}

export async function postSaida(params: NewSaidaEstoque) {
  const response = await apiClient.post<SaidaEstoque>("/saida-estoque", params);
  return response.data;
}
