import { ControlledInput } from "@/components/ui/ControlledInput";
import { useAuth } from "@/context/AuthContext";
import { handleRegister } from "@/services/authService";
import { CadastroFormData, registerSchema, SignupFormProps } from "@/types/auth/authTypes"; // 💡 Mantenha a tipagem correta
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

const SignupForm = ({ router }: SignupFormProps) => {
    const { login } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CadastroFormData>({
        defaultValues: { nome: "", email: "", password: "" },
        resolver: zodResolver(registerSchema),
    });

    const onRegisterSubmit = async (data: CadastroFormData) => {
        const user = await handleRegister(data);

        if (user) {
            // Atualiza o contexto global
            login(user);
            // Redireciona para a rota principal
            router.replace("/(tabs)/home");
        }
    };

    return (
        <View className="w-full">
            {/* Nome completo */}
            <ControlledInput control={control} name="nome" label="" placeholder="Nome Completo" placeholderTextColor="#71717a" error={errors.nome} />

            <View className="h-4" />

            {/* E-mail*/}
            <ControlledInput control={control} name="email" label="" placeholder="Email" placeholderTextColor="#71717a" keyboardType="email-address" autoCapitalize="none" error={errors.email} />

            <View className="h-4" />

            {/* Senha */}
            <ControlledInput control={control} name="password" label="" placeholder="Senha" placeholderTextColor="#71717a" secureTextEntry error={errors.password} />

            {/* Botão de Cadastro */}
            <TouchableOpacity onPress={handleSubmit(onRegisterSubmit)} activeOpacity={0.7} className="items-center py-4 mt-8 rounded-xl bg-onematter-700 shadow-lg">
                <Text className="text-lg font-bold text-white">CRIAR CONTA</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignupForm;
