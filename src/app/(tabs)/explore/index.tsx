import { fetchVagasService, VagaFrontend } from "@/services/jobService";
import { fetchMinhasCandidaturasService } from "@/services/jobService";
import { Feather } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";
import JobCard from "@/components/jobs/jobCard";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

const ExploreIndex = () => {
    const [vagas, setVagas] = useState<VagaFrontend[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadVagas = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Busca todas as vagas ativas
            const allVagasData = await fetchVagasService(0, 50);
            const allVagas = allVagasData.content;

            // Busca as candidaturas do usuário (também aumentando o limite)
            const candidaturasData = await fetchMinhasCandidaturasService(0, 50);
            const candidaturas = candidaturasData.content;

            // Cria um Set de IDs de vagas aplicadas para busca rápida
            const appliedVagaIds = new Set(candidaturas.map((app) => app.idVaga));

            // Filtra a lista principal para incluir APENAS vagas não aplicadas
            // Depois eu faço um endpoint no Java ou modifico o que já existe pra fazer isso
            const filteredVagas = allVagas.filter((vaga) => !appliedVagaIds.has(vaga.id));

            setVagas(filteredVagas);
        } catch (e: any) {
            console.error("Erro ao carregar vagas:", e);
            setError("Não foi possível carregar as vagas.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // useFocusEffect pra recarregar as vagas sempre que a tela for focada
    useFocusEffect(
        useCallback(() => {
            loadVagas();
        }, [loadVagas])
    );

    const handleJobPress = (idVaga: number) => {
        router.push({ pathname: "/(tabs)/explore/[id]", params: { id: idVaga } });
    };

    if (isLoading && vagas.length === 0) {
        return (
            <View className="flex-1 items-center justify-center bg-neutral-100">
                <ActivityIndicator size="large" color="#ea580c" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center bg-neutral-100 p-4">
                <Text className="text-lg text-onematter-700 text-center">{error}</Text>
                <TouchableOpacity onPress={loadVagas} className="mt-4 px-4 py-2 bg-onematter-700 rounded-lg">
                    <Text className="text-white font-semibold">Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-neutral-100">
            <View className="flex-1 px-4">
                <Text className="text-xl font-bold text-neutral-800 my-4">Vagas em Destaque ({vagas.length})</Text>

                <FlatList
                    data={vagas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <JobCard vaga={item} onPress={handleJobPress} />}
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
        </View>
    );
};
export default ExploreIndex;
