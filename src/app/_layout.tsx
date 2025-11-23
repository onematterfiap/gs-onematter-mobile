import { AuthProvider, useAuth } from "../context/AuthContext";
import { Stack, useSegments, useRouter, SplashScreen, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar as RNStatusBar } from "react-native";
import "../../global.css";
import { UserData } from "@/types/auth/authTypes";

SplashScreen.preventAutoHideAsync();

function useProtectedRoute(user: Partial<UserData> | null, isReady: boolean) {
    const segments = useSegments();
    const router = useRouter();
    const navigationState = useRootNavigationState();

    useEffect(() => {
        if (!isReady || !navigationState?.key) return;

        const inAuthGroup = segments[0] === "(auth)";
        const isAuthenticated = !!user;

        if (!isAuthenticated && !inAuthGroup) {
            router.replace("/(auth)");
        } else if (isAuthenticated && inAuthGroup) {
            router.replace("/(tabs)/home");
        }
    }, [user, segments, isReady, navigationState?.key]);
}

function RootLayoutNav() {
    const { user, isReady } = useAuth();

    useProtectedRoute(user, isReady);

    if (!isReady) return null;

    SplashScreen.hideAsync();

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
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
