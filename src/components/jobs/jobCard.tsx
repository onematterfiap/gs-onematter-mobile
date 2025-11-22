import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { JobCardProps } from "@/types/job/jobTypes";

const JobCard = React.memo(({ vaga, onCandidatar }: JobCardProps) => {
    return (
        <View className="bg-white rounded-xl p-5 mb-4 shadow-xl border border-gray-100">
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

            <TouchableOpacity onPress={() => onCandidatar(vaga.id)} className="flex-row items-center justify-center px-4 py-2 bg-onematter-700 rounded-xl shadow-md active:bg-onematter-800 transition-colors duration-150">
                <Feather name="send" size={16} color="#fff" />
                <Text className="text-base font-bold text-white ml-2">Candidatar-se Agora</Text>
            </TouchableOpacity>
        </View>
    );
});

export default JobCard;
