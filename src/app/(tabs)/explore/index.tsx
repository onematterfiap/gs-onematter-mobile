import { fetchVagasService, VagaFrontend } from "@/services/jobService";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, Alert } from "react-native";
import JobCard from "@/components/jobs/jobCard";
import { router } from "expo-router";

const ExploreIndex = () => {
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

    const handleJobPress = (idVaga: number) => {
        // Usa o objeto de navegação para rotas dinâmicas, o que resolve o erro de tipagem
        router.push({ pathname: "/(tabs)/explore/[id]", params: { id: idVaga } });
    };

    if (isLoading && vagas.length === 0) {
        // Garante que a tela de loading só aparece no início
        return (
            // Usando View em vez de SafeAreaView
            <View className="flex-1 items-center justify-center bg-neutral-100">
                <ActivityIndicator size="large" color="#ea580c" />
            </View>
        );
    }

    if (error) {
        return (
            // Usando View em vez de SafeAreaView
            <View className="flex-1 items-center justify-center bg-neutral-100 p-4">
                <Text className="text-lg text-onematter-700 text-center">{error}</Text>
                <TouchableOpacity onPress={loadVagas} className="mt-4 px-4 py-2 bg-onematter-700 rounded-lg">
                    <Text className="text-white font-semibold">Tentar Novamente</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        // Substituindo SafeAreaView por View e garantindo flex-1
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
