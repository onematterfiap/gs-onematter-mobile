// src/services/authService.ts

import { authenticateUserApi, fetchUserDetailsApi, registerUserApi } from "@/api/authApi";
import { CadastroFormData, LoginFormData, UserData } from "@/types/auth/authTypes";
import { ErroPadraoDto } from "@/types/auth/dtos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

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

/**
 * Tenta realizar o login e armazena token e dados do usuário.
 */
export async function handleLogin(data: LoginFormData): Promise<Partial<UserData> | null> {
    try {
        // 1. Chamar a API para autenticar e obter o token
        const tokenDto = await authenticateUserApi(data);

        if (tokenDto.token) {
            // 2. SALVAR O TOKEN NO ASYNCSTORAGE
            await AsyncStorage.setItem(USER_TOKEN_KEY, tokenDto.token);

            // 3. Buscar detalhes do usuário usando o token recém-salvo
            const apiUser = await fetchUserDetailsApi();

            // 4. Mapear e Salvar os dados do usuário
            const userDetails: Partial<UserData> = {
                id: apiUser.id,
                nomeCompleto: apiUser.nome,
                email: apiUser.email,
                // Incluir outros campos relevantes aqui
            };

            await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userDetails));
            return userDetails;
        }

        return null;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            Alert.alert("Erro de Login", "E-mail ou senha inválidos. Tente novamente.");
            return null;
        }
        // Trata outros erros de comunicação
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
        await registerUserApi(data);

        // 2. Se o cadastro for um sucesso (HTTP 201), tenta fazer login automaticamente
        const loginData: LoginFormData = {
            email: data.email,
            password: data.password,
        };

        return await handleLogin(loginData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorData = error.response?.data as ErroPadraoDto;
            if (error.response?.status === 409) {
                // Conflito de Dados/Regra de Negócio
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

        // Tenta buscar detalhes do usuário usando a camada API (validação de token implícita)
        const apiUser = await fetchUserDetailsApi();

        // Mapeia a resposta da API para o formato do app
        const userDetails: Partial<UserData> = {
            id: apiUser.id,
            nomeCompleto: apiUser.nome,
            email: apiUser.email,
            // ...
        };

        // Atualiza o cache local com os dados mais recentes
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userDetails));

        return userDetails;
    } catch (e) {
        // Se a requisição falhar (e.g., 401 do interceptor)
        console.error("Token inválido ou expirado. Forçando logout.", e);
        await removeTokenAndUser(); // Garante que o token sujo seja removido
        return null;
    }
}
