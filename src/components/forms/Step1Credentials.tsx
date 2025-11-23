import { ControlledInput } from "@/components/ui/ControlledInput";
import { SignUpFormData } from "@/types/signup/signupFormTypes";
import { Control, FieldErrors } from "react-hook-form";
import { View } from "react-native";

interface Step1Props {
    control: Control<SignUpFormData>;
    errors: FieldErrors<SignUpFormData>;
}

export const Step1Credentials = ({ control, errors }: Step1Props) => (
    <View className="w-full flex-col gap-y-5">
        {/* Nome completo */}
        <ControlledInput control={control} name="nome" label="Nome Completo" placeholder="Digite seu nome completo" placeholderTextColor="#a1a1aa" error={errors.nome} />

        {/* E-mail */}
        <ControlledInput control={control} name="email" label="E-mail" placeholder="exemplo@email.com" placeholderTextColor="#a1a1aa" keyboardType="email-address" autoCapitalize="none" error={errors.email} />

        {/* Senha */}
        <ControlledInput control={control} name="password" label="Senha" placeholder="Mínimo de 6 caracteres" placeholderTextColor="#a1a1aa" secureTextEntry error={errors.password} />
    </View>
);
