import { CadastroFormData, LoginFormData } from "@/types/auth/authTypes";
import { TokenDto, UsuarioPerfilCompletoDto } from "@/types/auth/dtos";
import { apiClient } from "./apiClient";

/**
 * Endpoint: POST /auth/login
 * Realiza a autenticação e retorna o DTO de token.
 */
export async function authenticateUserApi(data: LoginFormData): Promise<TokenDto> {
    const payload = {
        email: data.email,
        senha: data.password, // Mapeia 'password' do front para 'senha' da API
    };
    const response = await apiClient.post<TokenDto>("/auth/login", payload);
    return response.data;
}

/**
 * Endpoint: POST /auth/register
 * Cadastra um novo usuário com todos os campos obrigatórios.
 */
export async function registerUserApi(data: CadastroFormData): Promise<UsuarioPerfilCompletoDto> {
    // Converte a data de nascimento de DD/MM/AAAA para ISO String (Instant) esperado pela API.
    const [day, month, year] = data.dataNascimento.split("/").map(Number);
    // Cria um objeto Date no fuso horário local e converte para ISO string (Instant)
    const birthDateISO = new Date(year, month - 1, day, 12, 0, 0).toISOString();

    const finalPayload = {
        nome: data.nome,
        email: data.email,
        senha: data.password,
        cpf: data.cpf.replace(/\D/g, ""), // Limpa o CPF (API espera apenas dígitos)
        dataNascimento: birthDateISO,
        genero: data.genero,
        telefone: data.telefone?.replace(/\D/g, "") || null, // Limpa o telefone
    };

    const response = await apiClient.post<UsuarioPerfilCompletoDto>("/auth/register", finalPayload);
    return response.data;
}

/**
 * Endpoint: GET /usuarios/me
 * Busca os dados do usuário logado usando o token JWT injetado pelo interceptor.
 */
export async function fetchUserDetailsApi(): Promise<UsuarioPerfilCompletoDto> {
    const response = await apiClient.get<UsuarioPerfilCompletoDto>("/usuarios/me");
    return response.data;
}
