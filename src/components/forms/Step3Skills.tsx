import { fetchAllSkillsApi } from "@/api/skillApi";
import { SignUpFormData } from "@/types/signup/signupFormTypes";
import { SkillDto } from "@/types/skill/skillTypes";
import { Feather } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Step3Props {
    control: Control<SignUpFormData>;
    setValue: UseFormSetValue<SignUpFormData>;
}

export const Step3Skills = ({ control, setValue }: Step3Props) => {
    // Lista carregada da API
    const [availableSkills, setAvailableSkills] = useState<SkillDto[]>([]);
    const [loading, setLoading] = useState(true);

    // Observa skills selecionadas
    const selectedSkills = useWatch({
        control,
        name: "selectedSkills",
        defaultValue: [],
    });

    // Busca skills ao montar
    useEffect(() => {
        const loadSkills = async () => {
            try {
                const skills = await fetchAllSkillsApi();
                setAvailableSkills(skills);
            } catch (err) {
                console.log("Erro ao carregar skills", err);
            } finally {
                setLoading(false);
            }
        };
        loadSkills();
    }, []);

    // Agrupa por categoria
    const groupedSkills = useMemo(() => {
        const groups: Record<string, SkillDto[]> = {};
        availableSkills.forEach((skill) => {
            const category = skill.categoria || "Geral";
            if (!groups[category]) groups[category] = [];
            groups[category].push(skill);
        });
        return groups;
    }, [availableSkills]);

    // Alterna seleção
    const toggleSkill = (skillId: number) => {
        const current = selectedSkills || [];
        if (current.includes(skillId)) {
            setValue(
                "selectedSkills",
                current.filter((id) => id !== skillId)
            );
        } else {
            setValue("selectedSkills", [...current, skillId]);
        }
    };

    if (loading) {
        return (
            <View className="py-8 items-center">
                <ActivityIndicator size="small" color="#ea580c" />
                <Text className="text-neutral-500 mt-2">Carregando competências...</Text>
            </View>
        );
    }

    return (
        <View className="w-full flex-1">
            <Text className="text-lg font-bold text-neutral-800 mb-1">Suas Habilidades</Text>
            <Text className="text-base text-neutral-500 mb-4">Selecione o que você domina.</Text>

            <ScrollView className="max-h-96" nestedScrollEnabled showsVerticalScrollIndicator={false}>
                {Object.keys(groupedSkills).length === 0 ? (
                    <Text className="text-neutral-400 italic mt-4">Nenhuma skill encontrada.</Text>
                ) : (
                    Object.entries(groupedSkills).map(([category, skills]) => (
                        <View key={category} className="mb-6">
                            {/* Cabeçalho da categoria */}
                            <Text className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-3 border-b border-neutral-200 pb-1">{category}</Text>

                            <View className="flex-row flex-wrap gap-2">
                                {skills.map((skill) => {
                                    const isSelected = selectedSkills?.includes(skill.id);
                                    return (
                                        <TouchableOpacity key={skill.id} onPress={() => toggleSkill(skill.id)} activeOpacity={0.7} className={`px-4 py-2 rounded-full border shadow-sm ${isSelected ? "bg-onematter-700 border-onematter-700" : "bg-white border-neutral-300"}`}>
                                            <View className="flex-row items-center">
                                                {isSelected && <Feather name="check" size={14} color="white" style={{ marginRight: 4 }} />}

                                                <Text className={`text-sm font-medium ${isSelected ? "text-white" : "text-neutral-600"}`}>{skill.nome}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
};
