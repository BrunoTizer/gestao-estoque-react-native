import { Marca, NewMarca } from "@/src/types/marcas";
import { apiClient } from "./apiClient";

export async function getMarcas() {
  const response = await apiClient.get<Marca[]>("/marcas");
  return response.data;
}

export async function getMarcaById(id: string) {
  const response = await apiClient.get<Marca>(`/marcas/${id}`);
  return response.data;
}

export async function postMarca(params: NewMarca) {
  const response = await apiClient.post<Marca>("/marcas", params);
  return response.data;
}

export async function putMarca(id: string, params: NewMarca) {
  const response = await apiClient.put<Marca>(`/marcas/${id}`, params);
  return response.data;
}

export async function deleteMarca(id: string) {
  await apiClient.delete(`/marcas/${id}`);
}
