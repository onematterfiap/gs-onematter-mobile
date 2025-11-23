import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { cancelarCandidaturaService } from "@/services/jobService";
import { ApplicationCardProps } from "@/types/job/jobTypes";
import { formatStatusText } from "@/util/auxiliarFunctions";

const ApplicationCard = React.memo(({ candidatura, onCancel }: ApplicationCardProps) => {
    const [isCancelling, setIsCancelling] = useState(false);

    const handleCancel = () => {
        Alert.alert("Cancelar Candidatura", "Tem certeza que deseja cancelar esta candidatura? Esta ação é um 'soft delete' na API, que cancelará sua participação.", [
            { text: "Não", style: "cancel" },
            {
                text: "Sim, Cancelar",
                onPress: async () => {
                    setIsCancelling(true);
                    try {
                        await cancelarCandidaturaService(candidatura.id);
                        Alert.alert("Sucesso", "Candidatura cancelada com sucesso.");
                        onCancel(candidatura.id);
                    } catch (e: any) {
                        console.error("Erro ao cancelar:", e);
                        let errorMessage = "Não foi possível cancelar a candidatura.";
                        if (axios.isAxiosError(e) && e.response?.status === 403) {
                            errorMessage = "Acesso negado. A candidatura não pertence ao seu usuário ou a sessão expirou.";
                        } else if (axios.isAxiosError(e) && e.response?.status === 404) {
                            errorMessage = "Candidatura não encontrada ou já cancelada/inativa.";
                        }
                        Alert.alert("Erro", errorMessage);
                    } finally {
                        setIsCancelling(false);
                    }
                },
                style: "destructive",
            },
        ]);
    };

    return (
        <View className="bg-white rounded-xl p-5 mb-4 shadow-lg border border-neutral-100/80">
            <Text className="text-xl font-extrabold text-neutral-800 mb-1">{candidatura.descVaga}</Text>
            <View className="flex-row items-center mb-2">
                <Feather name="briefcase" size={16} color="#4b5563" />
                <Text className="text-base text-neutral-600 ml-2">{candidatura.nomeEmpresa}</Text>
            </View>
            <Text className="text-sm text-neutral-500 mb-4">Candidatado em: {candidatura.dataCandidaturaFormatada}</Text>

            <View className="flex-row justify-between items-center border-t border-neutral-300 pt-3">
                <Text className="text-sm font-semibold text-onematter-700">
                    Status: <Text className="font-normal text-neutral-700">{formatStatusText("CANDIDATURA_REALIZADA")}</Text>
                </Text>

                <TouchableOpacity onPress={handleCancel} disabled={isCancelling} className="flex-row items-center px-4 py-2 bg-red-600 rounded-lg shadow-md active:bg-red-700 disabled:bg-neutral-400">
                    {isCancelling ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <>
                            <Feather name="x-circle" size={16} color="#fff" />
                            <Text className="text-sm font-semibold text-white ml-2">Cancelar</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
});

export default ApplicationCard;
