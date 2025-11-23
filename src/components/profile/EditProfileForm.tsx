import { useState, useEffect, useMemo } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { EditProfileFormData, EditProfileFormProps, UsuarioUpdatePayload } from "@/types/auth/dtos";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/services/authService";
import { SkillDto } from "@/types/skill/skillTypes";
import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { fetchAllSkillsApi } from "@/api/skillApi";
import { ControlledInput } from "../ui/ControlledInput";

const EditProfileForm = ({ onClose }: EditProfileFormProps) => {
    const { user, updateUser } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [availableSkills, setAvailableSkills] = useState<SkillDto[]>([]);
    const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]);
    const [isSkillsLoading, setIsSkillsLoading] = useState(true);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<EditProfileFormData>({
        defaultValues: {
            nome: user?.nome || "",
            genero: (user?.genero as "MASCULINO" | "FEMININO" | "OUTRO") || "OUTRO",
            telefone: user?.telefone || "",
        },
    });

    // Efeito para carregar skills usando sua API
    useEffect(() => {
        const loadSkills = async () => {
            try {
                const skills = await fetchAllSkillsApi();
                setAvailableSkills(skills);

                const currentIds = user?.skills?.map((s) => s.id) || [];
                setSelectedSkillIds(currentIds);
            } catch (error) {
                console.error("Erro ao carregar skills:", error);
                Alert.alert("Erro", "Não foi possível carregar as skills disponíveis.");
            } finally {
                setIsSkillsLoading(false);
            }
        };

        loadSkills();
    }, [user?.skills]);

    // Handler para seleção de skills (simulando o checkbox)
    const handleSkillToggle = (skillId: number) => {
        setSelectedSkillIds((prev) => {
            if (prev.includes(skillId)) {
                return prev.filter((id) => id !== skillId);
            } else {
                return [...prev, skillId];
            }
        });
    };

    const onSubmit = async (data: EditProfileFormData) => {
        // Validação dos campos obrigatórios do usuário logado
        if (!user || isSkillsLoading || !user.cpf || !user.dataNascimento) {
            Alert.alert("Erro de Dados", "Dados de usuário incompletos. Não é possível atualizar.");
            return;
        }
        setIsLoading(true);

        const payload: UsuarioUpdatePayload = {
            nome: data.nome,
            genero: data.genero,
            telefone: data.telefone,
            skills: selectedSkillIds,
            cpf: user.cpf,
            dataNascimento: user.dataNascimento,
        };

        try {
            await updateProfile(payload);
            await updateUser();

            Alert.alert("Sucesso", "Perfil e skills atualizados com sucesso!");
            onClose();
        } catch (error: any) {
            console.error("Erro na atualização:", error.response?.data || error.message);
            const errorMessage = error.response?.data?.message || error.message || "Erro desconhecido.";
            Alert.alert("Erro", "Falha ao atualizar o perfil. Detalhes: " + errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Renderização da Lista de Skills usando Feather icon para o checkbox
    const SkillsList = useMemo(() => {
        if (isSkillsLoading) {
            return <Text className="text-neutral-500">Carregando skills...</Text>;
        }
        if (availableSkills.length === 0) {
            return <Text className="text-neutral-500">Nenhuma skill disponível.</Text>;
        }

        return (
            <View className="mb-4 p-4 border border-neutral-200 rounded-lg">
                <Text className="text-sm font-bold text-neutral-600 mb-2">Skills Disponíveis (Selecione as que possuir)</Text>
                {availableSkills.map((skill) => {
                    const isSelected = selectedSkillIds.includes(skill.id);
                    return (
                        <TouchableOpacity key={skill.id} className="flex-row items-center py-2" onPress={() => handleSkillToggle(skill.id)} disabled={isLoading}>
                            {/* Simulação do Checkbox com Feather Icon */}
                            <View className={`w-5 h-5 rounded border-2 mr-3 justify-center items-center ${isSelected ? "bg-onematter-700 border-onematter-700" : "bg-white border-neutral-400"}`}>{isSelected && <Feather name="check" size={16} color="white" />}</View>
                            <Text className="text-base text-neutral-700">
                                {skill.nome} ({skill.categoria})
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }, [availableSkills, selectedSkillIds, isSkillsLoading, isLoading]);

    return (
        <View className="flex-1 bg-white rounded-t-xl">
            {/* Cabeçalho do Modal */}
            <View className="flex-row items-center justify-between p-4 border-b border-neutral-200">
                <Text className="text-xl font-bold text-neutral-800">Editar Perfil</Text>
                <TouchableOpacity onPress={onClose} className="p-2">
                    <Feather name="x" size={24} color="#525252" />
                </TouchableOpacity>
            </View>

            <ScrollView className="p-4 flex-1">
                <Text className="text-lg font-semibold mb-4 text-neutral-700">Informações Básicas</Text>

                {/* Nome */}
                <ControlledInput control={control} name="nome" label="Nome Completo" placeholder="Seu nome" keyboardType="default" />

                {/* Telefone */}
                <ControlledInput control={control} name="telefone" label="Telefone" placeholder="(DDD) 9xxxx-xxxx" keyboardType="numeric" />

                {/* Gênero */}
                <View className="mb-4">
                    <Text className="text-sm font-medium text-neutral-600 mb-1">Gênero</Text>
                    <View className="border border-neutral-300 rounded-lg bg-neutral-50 h-12 justify-center">
                        <Controller
                            control={control}
                            name="genero"
                            rules={{ required: "Gênero é obrigatório." }}
                            render={({ field: { onChange, value } }) => (
                                <Picker selectedValue={value} onValueChange={onChange} style={{ height: 50, width: "100%" }}>
                                    <Picker.Item label="Masculino" value="MASCULINO" />
                                    <Picker.Item label="Feminino" value="FEMININO" />
                                    <Picker.Item label="Outro" value="OUTRO" />
                                </Picker>
                            )}
                        />
                    </View>
                    {errors.genero && <Text className="text-red-500 text-xs mt-1">{errors.genero.message}</Text>}
                </View>

                <Text className="text-lg font-semibold mt-4 mb-2 text-neutral-700">Minhas Skills</Text>
                {SkillsList}

                <View className="h-8" />
            </ScrollView>

            {/* Botão de Ação */}
            <View className="p-4 border-t border-neutral-200">
                <TouchableOpacity onPress={handleSubmit(onSubmit)} disabled={isLoading || isSkillsLoading} className={`flex-row items-center justify-center py-3 rounded-xl shadow-md ${isLoading || isSkillsLoading ? "bg-onematter-400" : "bg-onematter-700"}`}>
                    {isLoading ? <Text className="text-lg font-bold text-white">Atualizando...</Text> : <Text className="text-lg font-bold text-white">Salvar Alterações</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditProfileForm;
