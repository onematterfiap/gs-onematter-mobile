import { Stack, useRouter } from "expo-router";

export default function AuthLayout() {
    const router = useRouter();

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="signup"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
