import { authenticateUserApi, fetchUserDetailsApi, registerUserApi } from "@/api/authApi";
import { CadastroFormData, LoginFormData, UserData } from "@/types/auth/authTypes";
import { ErroPadraoDto, UsuarioPerfilCompletoDto } from "@/types/auth/dtos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { formatDataNascimento } from "@/util/auxiliarFunctions";

// Chaves de AsyncStorage
const USER_TOKEN_KEY = "@userToken";
const CURRENT_USER_KEY = "@currentUser";

/**
 * Remove o token e os dados do usuário do AsyncStorage.
 */
export async function removeTokenAndUser(): Promise<void> {
    await AsyncStorage.removeItem(USER_TOKEN_KEY);
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
}

// Helper para mapear o DTO completo da API para a interface UserData do Front-end.
const mapApiUserToFrontend = (apiUser: UsuarioPerfilCompletoDto): Partial<UserData> => {
    // Converte a data de nascimento do formato Instant (ISO String) para DD/MM/AAAA para exibição
    let formattedDataNascimento = "";
    if (apiUser.dataNascimento) {
        const dateObj = new Date(apiUser.dataNascimento);
        // Usamos getUTC* para garantir que a data seja interpretada corretamente
        const day = String(dateObj.getUTCDate()).padStart(2, "0");
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
        const year = dateObj.getUTCFullYear();
        formattedDataNascimento = formatDataNascimento(`${day}${month}${year}`);
    }

    return {
        id: apiUser.id,
        nome: apiUser.nome,
        email: apiUser.email,
        role: apiUser.role,
        cpf: apiUser.cpf,
        dataNascimento: formattedDataNascimento,
        genero: apiUser.genero,
        telefone: apiUser.telefone,
        dataCriacao: apiUser.dataCriacao,
        skills: apiUser.skills,
        formacoes: apiUser.formacoes,
        candidaturas: apiUser.candidaturas,
    };
};

/**
 * Tenta realizar o login e armazena token e dados do usuário.
 */
export async function handleLogin(data: LoginFormData): Promise<Partial<UserData> | null> {
    try {
        const tokenDto = await authenticateUserApi(data);

        if (tokenDto.token) {
            await AsyncStorage.setItem(USER_TOKEN_KEY, tokenDto.token);

            // Busca detalhes completos do usuário usando o token recém-salvo
            const apiUser = await fetchUserDetailsApi();

            const userDetails = mapApiUserToFrontend(apiUser);

            await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userDetails));
            return userDetails;
        }

        return null;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            Alert.alert("Erro de Login", "E-mail ou senha inválidos. Tente novamente.");
            return null;
        }
        console.error("Erro desconhecido no login:", error);
        Alert.alert("Erro", "Ocorreu um erro ao tentar fazer login.");
        return null;
    }
}

/**
 * Tenta realizar o cadastro e, se for bem-sucedido, faz o login automático.
 */
export async function handleRegister(data: CadastroFormData): Promise<Partial<UserData> | null> {
    try {
        // 1. Chama a API de cadastro
        const apiUser = await registerUserApi(data); // Retorna o perfil completo

        // 2. Faz login para obter o token
        const loginData: LoginFormData = { email: data.email, password: data.password };
        const tokenDto = await authenticateUserApi(loginData);

        if (tokenDto.token) {
            // 3. Salva o token e os detalhes do usuário (usando a resposta do registro/token)
            await AsyncStorage.setItem(USER_TOKEN_KEY, tokenDto.token);
            const userDetails = mapApiUserToFrontend(apiUser);
            await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userDetails));
            return userDetails;
        }

        return null;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorData = error.response?.data as ErroPadraoDto;
            if (error.response?.status === 409) {
                Alert.alert("Erro de Cadastro", errorData.message || "Usuário já existe ou CPF inválido.");
                return null;
            }
        }
        console.error("Erro no cadastro:", error);
        Alert.alert("Erro", "Ocorreu um erro ao tentar criar a conta.");
        return null;
    }
}

/**
 * Verifica se há um token válido e carrega os dados do usuário no app.
 */
export async function checkTokenAndLoadUser(): Promise<Partial<UserData> | null> {
    try {
        const token = await AsyncStorage.getItem(USER_TOKEN_KEY);

        if (!token) {
            return null;
        }

        // Tenta buscar detalhes do usuário (validação de token implícita)
        const apiUser = await fetchUserDetailsApi();

        const userDetails = mapApiUserToFrontend(apiUser);

        // Atualiza o cache local com os dados mais recentes
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userDetails));

        return userDetails;
    } catch (e) {
        console.error("Token inválido ou expirado. Forçando logout.", e);
        await removeTokenAndUser(); // Garante que o token sujo seja removido
        return null;
    }
}
