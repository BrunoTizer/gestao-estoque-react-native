import { Fornecedor, NewFornecedor } from "@/src/types/fornecedores";
import { apiClient } from "./apiClient";

export async function getFornecedores() {
  const response = await apiClient.get<Fornecedor[]>("/fornecedores");
  return response.data;
}

export async function getFornecedorById(id: string) {
  const response = await apiClient.get<Fornecedor>(`/fornecedores/${id}`);
  return response.data;
}

export async function postFornecedor(params: NewFornecedor) {
  const response = await apiClient.post<Fornecedor>("/fornecedores", params);
  return response.data;
}

export async function putFornecedor(id: string, params: NewFornecedor) {
  const response = await apiClient.put<Fornecedor>(
    `/fornecedores/${id}`,
    params
  );
  return response.data;
}

export async function deleteFornecedor(id: string) {
  await apiClient.delete(`/fornecedores/${id}`);
}
