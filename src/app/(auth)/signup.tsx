import SignupForm from "@/components/forms/SignUpForm";
import { useRouter } from "expo-router";
import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} className="flex-1">
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingVertical: 40, paddingHorizontal: 24 }}>
                    <Image source={require("../../../assets/images/onem-logo.png")} className="w-24 h-24 rounded-2xl mb-6 border-4 border-onematter-700 self-center" />

                    <Text className="mb-2 text-2xl font-bold text-neutral-800 text-center">Crie sua conta</Text>
                    <Text className="mb-8 text-base text-neutral-500 text-center">Junte-se ao One Matter hoje!</Text>

                    {/* Container do Formulário */}
                    <SignupForm router={router} />

                    <View className="flex-row mt-12 self-center">
                        <Text className="text-neutral-500">Já tem uma conta?</Text>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text className="ml-1 font-bold text-onematter-700">Faça Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Signup;
