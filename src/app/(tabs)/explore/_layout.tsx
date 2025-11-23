import { Stack } from "expo-router";
export default function ExploreNestedLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#f4f4f5",
                },
                headerShadowVisible: false,
                headerTintColor: "#71717a",
                headerTitleStyle: {
                    fontWeight: "600",
                    color: "#3f3f46",
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="[id]" options={{ title: "Detalhes da Vaga" }} />
        </Stack>
    );
}
