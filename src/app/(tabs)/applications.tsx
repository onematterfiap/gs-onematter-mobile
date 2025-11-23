import { Feather } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import ApplicationCard from "@/components/applications/applicationCard";
import { Application } from "@/types/job/jobTypes";
import { useFocusEffect } from "@react-navigation/native";
import { fetchMinhasCandidaturasService } from "@/services/jobService";

const Applications = () => {
    const [candidaturas, setCandidaturas] = useState<Application[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalElements, setTotalElements] = useState(0);

    const loadCandidaturas = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchMinhasCandidaturasService(0, 10);
            setCandidaturas(data.content);
            setTotalElements(data.page.totalElements);
        } catch (e: any) {
            console.error("Erro ao carregar candidaturas:", e);
            if (axios.isAxiosError(e) && e.response?.status === 403) {
                setError("Acesso negado. Certifique-se de estar logado como Candidato.");
            } else {
                setError("Não foi possível carregar suas candidaturas.");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    // useFocusEffect pra recarregar as candidaturas quando a tela é focada
    useFocusEffect(
        useCallback(() => {
            loadCandidaturas();
            // Retorno opcional, sem limpeza necessária neste caso
            return () => {};
        }, [loadCandidaturas])
    );

    // Função para recarregar a lista após um cancelamento bem-sucedido
    const handleCancelSuccess = () => {
        loadCandidaturas();
    };

    if (isLoading && candidaturas.length === 0) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-neutral-100">
                <ActivityIndicator size="large" color="#ea580c" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-neutral-100 p-4">
                <Text className="text-lg text-onematter-700 text-center">{error}</Text>
                <TouchableOpacity onPress={loadCandidaturas} className="mt-4 px-4 py-2 bg-onematter-700 rounded-lg">
                    <Text className="text-white font-semibold">Tentar Novamente</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <View className="flex-1 px-4">
                <Text className="text-xl font-bold text-neutral-800 my-4">Candidaturas Ativas ({totalElements})</Text>

                <FlatList
                    data={candidaturas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <ApplicationCard candidatura={item} onCancel={handleCancelSuccess} />}
                    ListEmptyComponent={() => (
                        <View className="p-8 items-center bg-white rounded-xl shadow-sm border border-neutral-200">
                            <Feather name="inbox" size={32} color="#71717a" />
                            <Text className="mt-2 text-neutral-600 text-center">Você ainda não se candidatou a nenhuma vaga.</Text>
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    // Adiciona Recarga (Pull to refresh)
                    onRefresh={loadCandidaturas}
                    refreshing={isLoading}
                />
            </View>
        </SafeAreaView>
    );
};
export default Applications;
