// Resposta do POST /auth/login
export interface TokenDto {
    token: string;
    refreshToken: string;
    tipo: string;
}

// Resposta do POST /auth/register e GET /usuarios/me
export interface UsuarioResponseHateoas {
    id: number;
    nome: string;
    email: string;
    role: "ADMIN" | "USER";
    dataCriacao: string;
}

// DTO de erro padrão da API
export interface ErroPadraoDto {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}
