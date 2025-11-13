import LoginForm from "@/components/forms/LoginForm";
import { useRouter } from "expo-router";
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";

const IndexScreen = () => {
    const router = useRouter();

    const handleSignUp = () => {
        router.push("/signup");
    };

    return (
        <View className="flex-1 bg-neutral-100">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1 items-center justify-center px-6 pb-12">
                <Image source={require("../../../assets/images/onem-logo.png")} className="w-32 h-32 rounded-3xl mb-8 border-2 border-onematter-700" />

                {/* Título  */}
                <Text className="mb-2 text-2xl font-bold text-neutral-800">Acesse sua conta</Text>

                {/* Descrição */}
                <Text className="mb-8 text-base text-neutral-500">Utilize suas credenciais para continuar.</Text>

                <View className="w-full max-w-sm">
                    <LoginForm router={router} />
                </View>

                {/* Link de Cadastro */}
                <View className="flex-row mt-12">
                    <Text className="text-neutral-500">Não tem uma conta?</Text>
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text className="ml-1 font-bold text-onematter-700">Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default IndexScreen;
