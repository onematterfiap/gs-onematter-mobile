import { authenticateUserApi, fetchUserDetailsApi, registerUserApi } from "@/api/authApi";
import { LoginFormData, UserData } from "@/types/auth/authTypes";
import { ErroPadraoDto, UsuarioPerfilCompletoDto } from "@/types/auth/dtos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
import { formatDataNascimento } from "@/util/auxiliarFunctions";
import { SignUpFormData } from "@/types/signup/signupFormTypes";

const USER_TOKEN_KEY = "@userToken";
const CURRENT_USER_KEY = "@currentUser";

export async function removeTokenAndUser(): Promise<void> {
    await AsyncStorage.removeItem(USER_TOKEN_KEY);
    await AsyncStorage.removeItem(CURRENT_USER_KEY);
}
const mapApiUserToFrontend = (apiUser: UsuarioPerfilCompletoDto): Partial<UserData> => {
    let formattedDataNascimento = "";
    if (apiUser.dataNascimento) {
        const dateObj = new Date(apiUser.dataNascimento);
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
    };
};

export async function handleLogin(data: LoginFormData): Promise<Partial<UserData> | null> {
    try {
        const tokenDto = await authenticateUserApi(data);
        if (tokenDto.token) {
            await AsyncStorage.setItem(USER_TOKEN_KEY, tokenDto.token);
            const apiUser = await fetchUserDetailsApi();
            const userDetails = mapApiUserToFrontend(apiUser);
            await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userDetails));
            return userDetails;
        }
        return null;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            Alert.alert("Erro", "Credenciais inválidas.");
            return null;
        }
        Alert.alert("Erro", "Falha no login.");
        return null;
    }
}

export async function handleRegister(data: SignUpFormData): Promise<Partial<UserData> | null> {
    try {
        // Cria usuário
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
        if (axios.isAxiosError(error)) {
            const errorData = error.response?.data as ErroPadraoDto;
            if (error.response?.status === 409) {
                Alert.alert("Atenção", errorData.message || "Usuário já cadastrado.");
                return null;
            }
        }
        console.error(error);
        Alert.alert("Erro", "Não foi possível concluir o cadastro.");
        return null;
    }
}

export async function checkTokenAndLoadUser(): Promise<Partial<UserData> | null> {
    try {
        const token = await AsyncStorage.getItem(USER_TOKEN_KEY);
        if (!token) return null;
        const apiUser = await fetchUserDetailsApi();
        return mapApiUserToFrontend(apiUser);
    } catch (e) {
        await removeTokenAndUser();
        return null;
    }
}
