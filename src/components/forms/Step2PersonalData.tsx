import { ControlledInput } from "@/components/ui/ControlledInput";
import { formatCPF, formatDataNascimento, formatTelefone } from "@/util/auxiliarFunctions";
import { Picker } from "@react-native-picker/picker";
import { Control, FieldErrors, UseFormSetValue } from "react-hook-form";
import { Text, View } from "react-native";
import React from "react";
import { SignUpFormData } from "@/types/signup/signupFormTypes";

interface Step2Props {
    control: Control<SignUpFormData>;
    errors: FieldErrors<SignUpFormData>;
    generoSelecionado: SignUpFormData["genero"] | undefined;
    setGeneroSelecionado: React.Dispatch<React.SetStateAction<SignUpFormData["genero"] | undefined>>;
    setValue: UseFormSetValue<SignUpFormData>;
}

export const Step2PersonalData = ({ control, errors, generoSelecionado, setGeneroSelecionado, setValue }: Step2Props) => (
    <View className="w-full">
        {/* CPF com máscara */}
        <ControlledInput control={control} name="cpf" label="CPF" placeholder="000.000.000-00" placeholderTextColor="#a1a1aa" keyboardType="numeric" maxLength={14} formatValue={formatCPF} error={errors.cpf} />
        <View className="h-4" />

        {/* Data de nascimento com máscara */}
        <ControlledInput control={control} name="dataNascimento" label="Data de Nascimento" placeholder="DD/MM/AAAA" placeholderTextColor="#a1a1aa" keyboardType="numeric" maxLength={10} formatValue={formatDataNascimento} error={errors.dataNascimento} />
        <View className="h-4" />

        {/* Telefone opcional com máscara */}
        <ControlledInput control={control} name="telefone" label="Telefone (Opcional)" placeholder="(99) 99999-9999" placeholderTextColor="#a1a1aa" keyboardType="phone-pad" maxLength={15} formatValue={formatTelefone} error={errors.telefone} />
        <View className="h-4" />

        <Text className="mb-1 text-base font-semibold text-neutral-700">Gênero</Text>

        {/* Picker: atualiza estado local e valor do form */}
        <View className={`bg-[#FAF9F6] border ${errors.genero ? "border-onematter-700" : "border-neutral-300"} rounded-lg p-0`}>
            <Picker
                selectedValue={generoSelecionado}
                onValueChange={(itemValue) => {
                    setGeneroSelecionado(itemValue as SignUpFormData["genero"]);
                    setValue("genero", itemValue as SignUpFormData["genero"], { shouldValidate: true });
                }}
                style={{ color: generoSelecionado ? "#27272a" : "#a1a1aa" }}
            >
                <Picker.Item label="Selecione o Gênero" value={undefined} enabled={false} />
                <Picker.Item label="Masculino" value="MASCULINO" />
                <Picker.Item label="Feminino" value="FEMININO" />
                <Picker.Item label="Outro" value="OUTRO" />
            </Picker>
        </View>

        {/* Erro de validação */}
        {errors.genero && <Text className="mt-1 text-sm text-onematter-700">{errors.genero.message}</Text>}
    </View>
);
