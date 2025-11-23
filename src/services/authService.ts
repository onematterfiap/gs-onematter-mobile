import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticateUserApi, fetchUserDetailsApi, registerUserApi, updateUserApi } from "@/api/authApi";
import { UserData } from "@/types/auth/authTypes";
import { ErroPadraoDto, UsuarioPerfilCompletoDto, UsuarioUpdatePayload } from "@/types/auth/dtos";
import { LoginFormData } from "@/types/login/loginTypes";
import { SignUpFormData } from "@/types/signup/signupFormTypes";
import { formatDataNascimento } from "@/util/auxiliarFunctions";
import { Alert } from "react-native";
import axios from "axios";

const USER_TOKEN_KEY = "@userToken";
const CURRENT_USER_KEY = "@currentUser";

// Função auxiliar para remover tokens do AsyncStorage
export async function removeTokenAndUser(): Promise<void> {
    await AsyncStorage.removeItem(USER_TOKEN_KEY);
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
}

// Adaptação do DTO da API (ISO Date) para o formato do Frontend (DD/MM/AAAA)
const mapApiUserToFrontend = (apiUser: UsuarioPerfilCompletoDto): UserData => {
    let formattedDataNascimento = "";
    if (apiUser.dataNascimento) {
        const dateObj = new Date(apiUser.dataNascimento);
        const day = String(dateObj.getUTCDate()).padStart(2, "0");
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
        const year = dateObj.getUTCFullYear();

        // Sua função formatDataNascimento espera DDMMYYYY sem barras
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
        candidaturas: apiUser.candidaturas,
    } as UserData;
};

export async function handleLogin(data: LoginFormData): Promise<UserData | null> {
    try {
        const tokenDto = await authenticateUserApi(data);

        if (tokenDto.token) {
            await AsyncStorage.setItem(USER_TOKEN_KEY, tokenDto.token);

            // Busca detalhes do usuário e mapeia para o formato do frontend
            const apiUser = await fetchUserDetailsApi();
            const userDetails = mapApiUserToFrontend(apiUser);
            await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userDetails));
            return userDetails;
        }
        return null;
    } catch (error) {
        // Tratamento de erro 401 para credenciais inválidas
        if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 403)) {
            // O 403/401 é o que o Spring Security retorna para "Credenciais Inválidas"
            Alert.alert("Erro de Login", "Credenciais inválidas. Verifique seu e-mail e senha.");
            return null;
        }
        console.error("Erro no Login:", error);
        Alert.alert("Erro", "Falha no login. Tente novamente ou verifique sua conexão.");
        return null;
    }
}

export async function handleRegister(data: SignUpFormData): Promise<UserData | null> {
    try {
        // Cria o usuário
        const apiUser = await registerUserApi(data);

        // Faz login automático para pegar o token
        const loginData: LoginFormData = { email: data.email, password: data.password };
        const tokenDto = await authenticateUserApi(loginData);

        if (tokenDto.token) {
            await AsyncStorage.setItem(USER_TOKEN_KEY, tokenDto.token);
            const userDetails = mapApiUserToFrontend(apiUser);
            await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userDetails));
            return userDetails;
        }
        return null;
    } catch (error) {
        // Tratamento de erro 409 (Conflito - Já cadastrado)
        if (axios.isAxiosError(error)) {
            const errorData = error.response?.data as ErroPadraoDto;
            if (error.response?.status === 409) {
                Alert.alert("Atenção", errorData.message || "Usuário já cadastrado (E-mail ou CPF).");
                return null;
            }
        }
        console.error("Erro no Cadastro:", error);
        Alert.alert("Erro", "Não foi possível concluir o cadastro.");
        return null;
    }
}

// Atualiza o perfil e o estado local
export async function updateProfile(payload: UsuarioUpdatePayload): Promise<UserData | null> {
    try {
        const updatedUserDto = await updateUserApi(payload);
        const userData = mapApiUserToFrontend(updatedUserDto);
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
        return userData;
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        Alert.alert("Erro", "Falha ao salvar alterações. Tente novamente.");
        return null;
    }
}

export async function checkTokenAndLoadUser(): Promise<UserData | null> {
    try {
        const token = await AsyncStorage.getItem(USER_TOKEN_KEY);
        if (!token) return null;

        // Se o token existe, tentamos buscar o perfil (isso valida o token implicitamente)
        const apiUser = await fetchUserDetailsApi();
        const userDetails = mapApiUserToFrontend(apiUser);
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userDetails));
        return userDetails;
    } catch (e) {
        console.error("Erro ao verificar token:", e);
        await removeTokenAndUser(); // Remove o token se a busca falhar (token inválido/expirado)
        return null;
    }
}

// Função para recarregar dados do usuário
export async function refreshUserDetails(): Promise<UserData | null> {
    try {
        const userDto = await fetchUserDetailsApi();
        const userDetails = mapApiUserToFrontend(userDto);
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userDetails));
        return userDetails;
    } catch (e) {
        console.error("Erro ao recarregar detalhes do usuário:", e);
        // O interceptor já trata a remoção do token se for erro 401/403
        return null;
    }
}
