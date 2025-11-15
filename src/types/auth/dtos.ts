import { CandidaturaDetalheDto, FormacaoDetalheDto, SkillDetalheDto } from "./authTypes";

// Resposta do POST /auth/login
export interface TokenDto {
    token: string;
    refreshToken: string;
    tipo: string;
}

// Resposta do GET /usuarios/me e POST /auth/register
export interface UsuarioPerfilCompletoDto {
    id: number;
    nome: string;
    email: string;
    role: "ADMIN" | "USER";
    cpf: string;
    dataNascimento: string;
    genero: "MASCULINO" | "FEMININO" | "OUTRO";
    telefone: string;
    dataCriacao: string;

    skills: SkillDetalheDto[];
    formacoes: FormacaoDetalheDto[];
    candidaturas: CandidaturaDetalheDto[];
}

// DTO de erro padrão da API
export interface ErroPadraoDto {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}
