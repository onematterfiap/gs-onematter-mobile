import { AuthProvider, useAuth } from "@/context/AuthContext"; // 💡 NOVO CONTEXTO
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar as RNStatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";

SplashScreen.preventAutoHideAsync();

function InitialLayout() {
    const { user, isReady } = useAuth();

    if (!isReady) {
        return null;
    }

    SplashScreen.hideAsync();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            {user.email ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="(auth)" />}
        </Stack>
    );
}

const RootLayout = () => {
    return (
        <AuthProvider>
            <SafeAreaProvider>
                <RNStatusBar barStyle="dark-content" backgroundColor="#FAF9F6" />
                <InitialLayout />
            </SafeAreaProvider>
        </AuthProvider>
    );
};

export default RootLayout;
