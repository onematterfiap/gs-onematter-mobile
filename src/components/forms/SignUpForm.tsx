// enviar_mobile/src/components/forms/SignUpForm.tsx

import { ControlledInput } from "@/components/ui/ControlledInput";
import { useAuth } from "@/context/AuthContext";
import { handleRegister } from "@/services/authService";
import { CadastroFormData, registerSchema, SignupFormProps } from "@/types/auth/authTypes";
import { formatCPF, formatDataNascimento, formatTelefone } from "@/util/auxiliarFunctions"; // Importa as funções de formatação
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const SignupForm = ({ router }: SignupFormProps) => {
    const { login } = useAuth();
    const [generoSelecionado, setGeneroSelecionado] = useState<CadastroFormData["genero"] | undefined>(undefined);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CadastroFormData>({
        defaultValues: {
            nome: "",
            email: "",
            password: "",
            cpf: "",
            dataNascimento: "",
            genero: undefined,
            telefone: "",
        },
        resolver: zodResolver(registerSchema),
    });

    const onRegisterSubmit = async (data: CadastroFormData) => {
        const user = await handleRegister(data);

        if (user) {
            login(user);
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
            <View className="h-4" />

            {/* CPF */}
            <ControlledInput control={control} name="cpf" label="" placeholder="CPF (apenas números)" placeholderTextColor="#71717a" keyboardType="numeric" maxLength={14} formatValue={formatCPF} error={errors.cpf} />
            <View className="h-4" />

            {/* Data de Nascimento */}
            <ControlledInput control={control} name="dataNascimento" label="" placeholder="Data de Nascimento (DD/MM/AAAA)" placeholderTextColor="#71717a" keyboardType="numeric" maxLength={10} formatValue={formatDataNascimento} error={errors.dataNascimento} />
            <View className="h-4" />

            {/* Telefone */}
            <ControlledInput control={control} name="telefone" label="" placeholder="Telefone (opcional)" placeholderTextColor="#71717a" keyboardType="phone-pad" maxLength={15} formatValue={formatTelefone} error={errors.telefone} />
            <View className="h-4" />

            {/* Gênero (Picker para enum) */}
            <View className={`bg-[#FAF9F6] border ${errors.genero ? "border-onematter-700" : "border-neutral-300"} rounded-lg p-0`}>
                <Picker
                    selectedValue={generoSelecionado}
                    onValueChange={(itemValue) => {
                        setGeneroSelecionado(itemValue as CadastroFormData["genero"]);
                        setValue("genero", itemValue as CadastroFormData["genero"], { shouldValidate: true });
                    }}
                    style={{ color: generoSelecionado ? "#27272a" : "#71717a" }}
                >
                    <Picker.Item label="Selecione o Gênero" value={undefined} enabled={false} />
                    <Picker.Item label="Masculino" value="MASCULINO" />
                    <Picker.Item label="Feminino" value="FEMININO" />
                    <Picker.Item label="Outro" value="OUTRO" />
                </Picker>
            </View>
            {errors.genero && <Text className="mt-1 text-sm text-onematter-700">{errors.genero.message}</Text>}

            <View className="h-4" />

            {/* Botão de Cadastro */}
            <TouchableOpacity onPress={handleSubmit(onRegisterSubmit)} activeOpacity={0.7} className="items-center py-4 mt-8 rounded-xl bg-onematter-700 shadow-lg">
                <Text className="text-lg font-bold text-white">CRIAR CONTA</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignupForm;
