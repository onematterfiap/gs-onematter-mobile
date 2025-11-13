import { Router } from "expo-router";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("E-mail inválido."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export const registerSchema = z.object({
    nome: z.string().min(1, "O nome é obrigatório."),
    email: z.string().email("E-mail inválido."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

// Tipos de Dados dos Formulários
export type LoginFormData = z.infer<typeof loginSchema>;
// O FormData no front-end usa 'password', mas a API usa 'senha'.
// Usaremos LoginFormData para o payload da API, onde 'password' será mapeado para 'senha'.
export type CadastroFormData = z.infer<typeof registerSchema>;

// --- Tipos de Contexto e UI ---

// Dados do Usuário (Baseado na resposta do /usuarios/me, sem links HATEOAS)
export interface UserData {
    id: number;
    nomeCompleto: string;
    email: string;
    cpf?: string;
    dataNascimento?: string;
}

// Props para o Formulário de Login/Cadastro (baseado nos seus snippets)
export interface LoginFormProps {
    router: Router;
}
export interface SignupFormProps {
    router: Router;
}
