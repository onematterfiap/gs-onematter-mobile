import SignupForm from "@/components/forms/SignUpForm";
import { useRouter } from "expo-router";
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";

const Signup = () => {
    const router = useRouter();

    return (
        <View className="flex-1 bg-neutral-100">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1 items-center justify-center px-6 pb-12">
                <Image source={require("../../../assets/images/onem-logo.png")} className="w-32 h-32 rounded-3xl mb-8 border-4 border-onematter-700" />

                {/* Título Principal */}
                <Text className="mb-2 text-2xl font-bold text-neutral-800">Crie sua conta</Text>
                <Text className="mb-8 text-base text-neutral-500">Comece a usar o OneMatter hoje!</Text>

                {/* Container para o Formulário */}
                <View className="w-full max-w-sm">
                    <SignupForm router={router} />
                </View>

                {/* Link para Login */}
                <View className="flex-row mt-12">
                    <Text className="text-neutral-500">Já tem uma conta?</Text>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text className="ml-1 font-bold text-onematter-700">Faça Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
export default Signup;
