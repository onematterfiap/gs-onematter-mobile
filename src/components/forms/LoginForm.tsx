import { handleLogin } from "@/services/authService";
import { LoginFormProps } from "@/types/login/loginFormTypes";
import { LoginFormData, loginSchema } from "@/types/login/loginTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { ControlledInput } from "../ui/ControlledInput";
import { useAuth } from "@/context/AuthContext";

const LoginForm = ({ router }: LoginFormProps) => {
    const { login } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(loginSchema),
    });

    const onLoginSubmit = async (data: LoginFormData) => {
        const user = await handleLogin(data);
        if (user) {
            login(user);
            router.replace("/(tabs)/home");
        } else {
            Alert.alert("Erro de Login", "Usuário ou senha inválidos");
        }
    };

    return (
        <View className="w-full">
            <ControlledInput control={control} name="email" label="" placeholder="Email" placeholderTextColor="#71717a" keyboardType="email-address" autoCapitalize="none" error={errors.email} />

            <View className="h-4" />

            <ControlledInput control={control} name="password" label="" placeholder="Senha" placeholderTextColor="#71717a" secureTextEntry error={errors.password} />

            <TouchableOpacity onPress={handleSubmit(onLoginSubmit)} activeOpacity={0.7} className="items-center py-4 mt-8 rounded-xl bg-onematter-700 shadow-md">
                <Text className="text-lg font-bold text-white">ENTRAR</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginForm;
