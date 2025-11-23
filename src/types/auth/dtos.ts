import { ApplicationCardProps } from "../job/jobTypes";
import { SkillDto } from "../skill/skillTypes";

export interface TokenDto {
    token: string;
    refreshToken: string;
    tipo: string;
}

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
    skills: SkillDto[];
    candidaturas: ApplicationCardProps[];
}

export interface UsuarioUpdatePayload {
    nome: string;
    email?: string;
    senha?: string;
    cpf: string;
    dataNascimento: string;
    genero: "MASCULINO" | "FEMININO" | "OUTRO";
    telefone: string | null;
    skills: number[];
}

export interface ErroPadraoDto {
    timestamp: string;
    status: number;
    error: string;
    message: string;
    path: string;
}

export interface EditProfileFormData {
    nome: string;
    genero: "MASCULINO" | "FEMININO" | "OUTRO";
    telefone: string;
}

export interface EditProfileFormProps {
    onClose: () => void;
}
