import { VagaFrontend } from "@/services/jobService";

export interface Application {
    id: number;
    idVaga: number;
    descVaga: string;
    nomeEmpresa: string;
    dataCandidaturaFormatada: string;
}

export interface ApplicationCardProps {
    candidatura: Application;
    onCancel: (id: number) => void;
}

// Base DTOs
export interface jobResponseDto {
    id: number;
    descricao: string;
    idEmpresa: number;
    nomeEmpresa: string;
    idRecrutador: number;
    nomeRecrutador: string;
    dataCriacao: string;
    deleted: number;
}

// CandidaturaResponseDto.java
export interface ApplicationResponseDto {
    idCandidatura: number;
    dataCandidatura: string;
    idCandidato: number;
    nomeCandidato: string;
    idVaga: number;
    descVaga: string;
    nomeEmpresa: string;
}

// Resposta da API paginada (Genérica)
export interface PageResponse<T> {
    page: any;
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
}

export interface JobCardProps {
    vaga: VagaFrontend;
    onCandidatar: (id: number) => void;
}
