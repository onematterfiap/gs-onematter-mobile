import { Router } from "expo-router";
import z from "zod";

export const registerSchema = z.object({
    nome: z.string().min(1, "O nome é obrigatório."),
    email: z.string().email("E-mail inválido."),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
    cpf: z.string().min(14, "CPF inválido.").max(14, "CPF inválido."), // Espera formato com máscara
    dataNascimento: z.string().min(10, "Data inválida.").max(10, "Data inválida."),
    genero: z.enum(["MASCULINO", "FEMININO", "OUTRO"], {
        message: "Selecione um gênero.",
    }),
    telefone: z.string().max(15, "Telefone muito longo.").optional(),

    // Array de números
    selectedSkills: z.array(z.number()).optional(),
});

export type SignUpFormData = z.infer<typeof registerSchema>;

export interface StepConfigType {
    [key: number]: {
        fields: Array<keyof SignUpFormData>;
        label: string;
    };
}

export interface SignupFormProps {
    router: Router;
}
