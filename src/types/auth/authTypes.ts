import { Router } from "expo-router";
import { z } from "zod";

// Zod para validações
export const loginSchema = z.object({
    email: z.string().email("E-mail inválido."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

// Campos adicionais para o DTO de cadastro
export const registerSchema = z.object({
    nome: z.string().min(1, "O nome é obrigatório."),
    email: z.string().email("E-mail inválido."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    cpf: z.string().min(14, "O CPF deve ter 11 dígitos.").max(14, "O CPF deve ter 11 dígitos."),
    dataNascimento: z.string().min(10, "Data inválida.").max(10, "Data inválida."),
    genero: z.enum(["MASCULINO", "FEMININO", "OUTRO"], {
        message: "O gênero é obrigatório.",
    }),
    telefone: z.string().max(15, "Telefone muito longo.").optional(),
});

// Tipos de Dados dos Formulários
export type LoginFormData = z.infer<typeof loginSchema>;
export type CadastroFormData = z.infer<typeof registerSchema>;

// Tipos de Contexto e UI

// Interface para as Skills e Formacoes detalhadas (baseado no UsuarioPerfilCompletoDto.java)
export interface SkillDetalheDto {
    id: number;
    nome: string;
    categoria: string;
}

export interface FormacaoDetalheDto {
    id: number;
    nomeFormacao: string;
    instituicao: string;
    dataInicio: string;
    dataFim: string | null;
}

export interface StatusCandidaturaDetalheDto {
    statusDescricao: string;
    dataAtualizacao: string;
}

export interface CandidaturaDetalheDto {
    id: number;
    idVaga: number;
    descricaoVaga: string;
    nomeEmpresa: string;
    dataCandidatura: string;
    statusHistorico: StatusCandidaturaDetalheDto[];
}

// Dados do Usuário
export interface UserData {
    id: number;
    nome: string; // Campo nome da API
    email: string;
    role: "ADMIN" | "USER";
    cpf: string;
    dataNascimento: string; // Data formatada como DD/MM/AAAA (para uso no front-end)
    genero: "MASCULINO" | "FEMININO" | "OUTRO";
    telefone: string;
    dataCriacao: string;

    // Relações
    skills: SkillDetalheDto[];
    formacoes: FormacaoDetalheDto[];
    candidaturas: CandidaturaDetalheDto[];
}

// Props para o Formulário de Login/Cadastro
export interface LoginFormProps {
    router: Router;
}
export interface SignupFormProps {
    router: Router;
}
