import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { JobCardProps } from "@/types/job/jobTypes";

// Componente JobCard agora recebe onPress para navegação
const JobCard = React.memo(({ vaga, onPress }: JobCardProps) => {
    return (
        // O card inteiro agora é um botão de navegação
        <TouchableOpacity onPress={() => onPress(vaga.id)} className="bg-white rounded-xl p-5 mb-4 shadow-xl border border-gray-100 active:bg-neutral-50" activeOpacity={0.8}>
            <Text className="text-xl font-extrabold text-neutral-800 mb-1 leading-tight" numberOfLines={2}>
                {vaga.descricao}
            </Text>

            <View className="space-y-1.5 mt-2 mb-4">
                <View className="flex-row items-center">
                    <Feather name="briefcase" size={16} color="#4b5563" />
                    <Text className="text-base font-semibold text-neutral-700 ml-2">{vaga.nomeEmpresa}</Text>
                </View>

                <View className="flex-row items-center">
                    <Feather name="clock" size={14} color="#4b5563" />
                    <Text className="text-sm text-neutral-500 ml-2">Publicado em: {vaga.dataCriacaoFormatada}</Text>
                </View>
            </View>

            <View className="h-[1px] bg-neutral-100 mb-4" />

            {/* Nova Ação Visual de Navegação */}
            <View className="flex-row items-center justify-end">
                <Text className="text-sm font-bold text-onematter-700 mr-2">Ver Detalhes</Text>
                <Feather name="arrow-right" size={16} color="#ea580c" />
            </View>
        </TouchableOpacity>
    );
});

export default JobCard;
