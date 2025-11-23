import { z } from "zod";

// --- Schemas de Validação (Zod) ---

export const loginSchema = z.object({
    email: z.string().email("E-mail inválido."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Dados do Usuário (Sessão)
export interface UserData {
    id: number;
    nome: string;
    email: string;
    role: "ADMIN" | "USER";
    cpf: string;
    dataNascimento: string;
    genero: "MASCULINO" | "FEMININO" | "OUTRO";
    telefone: string;
    dataCriacao: string;
    skills?: any[];
    candidaturas?: any[];
}
