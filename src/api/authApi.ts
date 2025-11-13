import { CadastroFormData, LoginFormData } from "@/types/auth/authTypes";
import { TokenDto, UsuarioResponseHateoas } from "@/types/auth/dtos";
import { apiClient } from "./apiClient";

/**
 * Endpoint: POST /auth/login
 * Realiza a autenticação e retorna o DTO de token.
 */
export async function authenticateUserApi(data: LoginFormData): Promise<TokenDto> {
    const payload = {
        email: data.email,
        senha: data.password,
    };
    const response = await apiClient.post<TokenDto>("/auth/login", payload);
    return response.data;
}

/**
 * Endpoint: POST /auth/register
 * Cadastra um novo usuário.
 */
export async function registerUserApi(data: CadastroFormData): Promise<UsuarioResponseHateoas> {
    const payload = {
        nome: data.nome,
        email: data.email,
        senha: data.password,
    };
    const response = await apiClient.post<UsuarioResponseHateoas>("/auth/register", payload);
    return response.data;
}

/**
 * Endpoint: GET /usuarios/me
 * Busca os dados do usuário logado usando o token JWT injetado pelo interceptor.
 */
export async function fetchUserDetailsApi(): Promise<UsuarioResponseHateoas> {
    const response = await apiClient.get<UsuarioResponseHateoas>("/usuarios/me");
    return response.data;
}
