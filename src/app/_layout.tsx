import { AuthProvider, useAuth } from "../context/AuthContext";
import { Stack, useSegments, useRouter, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar as RNStatusBar } from "react-native";
import "../../global.css";
import UserData from "@/types/login/loginTypes";

// Mantém o splash screen visível até o React assumir
SplashScreen.preventAutoHideAsync();

/**
 * Hook de proteção de rota: implementa a lógica de redirecionamento obrigatório.
 */
function useProtectedRoute(user: Partial<UserData> | null, isReady: boolean) {
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!isReady) return;

        const isAuthenticated = !!user;
        const inAuthGroup = segments[0] === "(auth)";

        if (
            // 1. Não autenticado E não está na área pública, força o redirect para login
            !isAuthenticated &&
            !inAuthGroup
        ) {
            router.replace("/(auth)");
        } else if (
            // 2. Autenticado E está na área pública, força o redirect para home
            isAuthenticated &&
            inAuthGroup
        ) {
            router.replace("/(tabs)/home");
        }
    }, [user, segments, isReady]);
}

function RootLayoutNav() {
    const { user, isReady } = useAuth();

    // CHAMA O HOOK DE PROTEÇÃO DE ROTA
    useProtectedRoute(user, isReady);

    // Enquanto o AuthContext não estiver pronto, não renderiza a Stack
    if (!isReady) {
        return null;
    }

    // Esconde o splash screen apenas após a checagem inicial e o AuthContext estar pronto
    SplashScreen.hideAsync();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* O roteamento condicional está sendo gerenciado pelo useProtectedRoute */}
            {/* Rotas Públicas */}
            <Stack.Screen name="(auth)" />
            {/* Rotas Protegidas (Tabs) */}
            <Stack.Screen name="(tabs)" />
            {/* Rota de NotFound (opcional) */}
            <Stack.Screen name="+not-found" options={{ title: "Oops!" }} />
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <SafeAreaProvider>
                <RNStatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />
                <RootLayoutNav />
            </SafeAreaProvider>
        </AuthProvider>
    );
}
