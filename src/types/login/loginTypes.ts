import * as z from "zod";

// Schema de validação do formulário de login
export const loginSchema = z.object({
    email: z.string().email("Informe um e-mail válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

// Tipo inferido a partir do schema para os dados do formulário
export type LoginFormData = z.infer<typeof loginSchema>;

// Tipo para os usuários como são armazenados no AsyncStorage
export type StoredUser = {
    email: string;
    password?: string;
};

// Depois eu penso em como usar uma interface só para os dois, agora por praticidade vai essa aqui pra usar na HOME
export default interface UserData {
    id: number;
    nomeCompleto: string;
    email: string;
    cpf: string;
    dataNascimento: string;
}
