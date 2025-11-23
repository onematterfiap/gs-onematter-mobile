import { TokenDto, UsuarioPerfilCompletoDto } from "@/types/auth/dtos";
import { apiClient } from "./apiClient";
import { SignUpFormData } from "@/types/signup/signupFormTypes";
import { LoginFormData } from "@/types/login/loginTypes";

export async function authenticateUserApi(data: LoginFormData): Promise<TokenDto> {
    const payload = {
        email: data.email,
        senha: data.password,
    };
    const response = await apiClient.post<TokenDto>("/auth/login", payload);
    return response.data;
}

export async function registerUserApi(data: SignUpFormData): Promise<UsuarioPerfilCompletoDto> {
    // Converte Data "DD/MM/AAAA" para ISO Date
    const [day, month, year] = data.dataNascimento.split("/").map(Number);
    const birthDateISO = new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toISOString();

    const finalPayload = {
        nome: data.nome,
        email: data.email,
        senha: data.password,
        cpf: data.cpf.replace(/\D/g, ""), // Remove pontuação
        dataNascimento: birthDateISO,
        genero: data.genero,
        telefone: data.telefone?.replace(/\D/g, "") || null,
        skills: data.selectedSkills || [], // <--- Envia a lista de IDs aqui
    };

    const response = await apiClient.post<UsuarioPerfilCompletoDto>("/auth/register", finalPayload);
    return response.data;
}

export async function fetchUserDetailsApi(): Promise<UsuarioPerfilCompletoDto> {
    const response = await apiClient.get<UsuarioPerfilCompletoDto>("/usuarios/me");
    return response.data;
}
