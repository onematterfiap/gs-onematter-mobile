import { fetchVagasService, VagaFrontend } from "@/services/jobService";
import { candidatarAVagaApi } from "@/api/applicationApi";
import { Feather } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import JobCard from "@/components/jobs/jobCard";

const Explore = () => {
    const [vagas, setVagas] = useState<VagaFrontend[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadVagas = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchVagasService(0, 10);
            setVagas(data.content);
        } catch (e: any) {
            console.error("Erro ao carregar vagas:", e);
            setError("Não foi possível carregar as vagas.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadVagas();
    }, []);

    // Lógica de Candidatura com tratamento de erro de duplicação (409)
    const handleCandidatar = useCallback(async (idVaga: number) => {
        // OBS: Adicionar um estado de isSubmitting é recomendado para desabilitar o botão aqui!
        try {
            await candidatarAVagaApi(idVaga);
            Alert.alert("Sucesso", "Candidatura realizada com sucesso! Acompanhe o status na aba 'Candidaturas'.");
        } catch (e: any) {
            let errorMessage = "Ocorreu um erro ao candidatar-se.";
            if (axios.isAxiosError(e) && e.response?.status === 409) {
                errorMessage = "Você já está candidatado a esta vaga.";
            } else if (axios.isAxiosError(e) && e.response?.status === 401) {
                errorMessage = "Sua sessão expirou. Faça login novamente.";
            }
            Alert.alert("Erro", errorMessage);
        }
    }, []);

    if (isLoading) {
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
                <TouchableOpacity onPress={loadVagas} className="mt-4 px-4 py-2 bg-onematter-700 rounded-lg">
                    <Text className="text-white font-semibold">Tentar Novamente</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <View className="flex-1 px-4">
                <Text className="text-xl font-bold text-neutral-800 my-4">Vagas em Destaque ({vagas.length})</Text>

                <FlatList
                    data={vagas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <JobCard vaga={item} onCandidatar={handleCandidatar} />}
                    ListEmptyComponent={() => (
                        <View className="p-8 items-center bg-white rounded-xl shadow-sm border border-neutral-200">
                            <Feather name="frown" size={32} color="#71717a" />
                            <Text className="mt-2 text-neutral-600">Nenhuma vaga ativa encontrada.</Text>
                        </View>
                    )}
                    contentContainerStyle={{ paddingBottom: 16 }}
                    onRefresh={loadVagas}
                    refreshing={isLoading}
                />
            </View>
        </SafeAreaView>
    );
};
export default Explore;
