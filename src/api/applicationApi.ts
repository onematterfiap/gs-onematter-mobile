import { ApplicationResponseDto, jobResponseDto, PageResponse } from "@/types/job/jobTypes";
import { apiClient } from "./apiClient";

/**
 * Endpoint: GET /vagas
 * Lista todas as vagas ativas (deleted=0).
 */
export async function fetchVagasApi(page: number = 0, size: number = 10): Promise<PageResponse<jobResponseDto>> {
    const response = await apiClient.get<PageResponse<jobResponseDto>>(`/vagas?deleted=0&page=${page}&size=${size}`);
    return response.data;
}

/**
 * Endpoint: GET /vagas/{id}
 */
export async function fetchVagaByIdApi(id: number): Promise<jobResponseDto> {
    const response = await apiClient.get<jobResponseDto>(`/vagas/${id}`);
    return response.data;
}

/**
 * Endpoint: POST /vagas/{idVaga}/candidatar
 */
export async function candidatarAVagaApi(idVaga: number): Promise<ApplicationResponseDto> {
    const response = await apiClient.post<ApplicationResponseDto>(`/vagas/${idVaga}/candidatar`, {});
    return response.data;
}

/**
 * Endpoint: GET /candidato/me/candidaturas
 */
export async function fetchMinhasCandidaturasApi(page: number = 0, size: number = 10): Promise<PageResponse<ApplicationResponseDto>> {
    const response = await apiClient.get<PageResponse<ApplicationResponseDto>>(`/candidato/me/candidaturas?page=${page}&size=${size}`);
    return response.data;
}

/**
 * Endpoint: DELETE /candidato/me/candidaturas/{idCandidatura}
 */
export async function cancelarCandidaturaApi(idCandidatura: number): Promise<void> {
    await apiClient.delete(`/candidato/me/candidaturas/${idCandidatura}`);
}
