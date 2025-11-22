import { Stack } from "expo-router";

export default function HelpNestedLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#f5f5f5",
                },
                headerShadowVisible: false,
                headerTintColor: "#71717a",
                headerTitleStyle: {
                    fontWeight: "600",
                    color: "#3f3f46",
                },
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />

            <Stack.Screen name="faq" options={{ title: "Perguntas Frequentes" }} />
            <Stack.Screen name="report" options={{ title: "Relatar um Problema" }} />
            <Stack.Screen name="terms" options={{ title: "Termos de Uso" }} />
            <Stack.Screen name="privacy" options={{ title: "Política de Privacidade" }} />
            <Stack.Screen name="contact" options={{ title: "Canais de comunicação" }} />
        </Stack>
    );
}
