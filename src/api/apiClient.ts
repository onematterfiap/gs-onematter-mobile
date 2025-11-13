import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// URL base da API (8080 + /api)
// Se estiver testando no Android Emulator, mude 'localhost' para '10.0.2.2'
const BASE_URL = "http://192.168.15.13:8080/api";

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor de Requisição: Injeta o token JWT (Bearer) do AsyncStorage.
apiClient.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("@userToken");

    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Interceptor de Resposta: Trata erros de autenticação (401/403) removendo o token local.
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.error("Token expirado ou inválido. Removendo token local.");
            await AsyncStorage.removeItem("@userToken");
            await AsyncStorage.removeItem("@currentUser");
        }
        return Promise.reject(error);
    }
);
