import { fetchVagaDetalhesService, VagaDetalhesFrontend } from "@/services/jobService";
import { candidatarAVagaApi } from "@/api/applicationApi";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

const JobDetails = () => {
    // Obtém o ID da vaga da URL (expo-router dynamic route)
    const { id } = useLocalSearchParams();
    // Converte para número, se for uma string válida
    const idVaga = typeof id === "string" ? parseInt(id, 10) : undefined;

    const [vaga, setVaga] = useState<VagaDetalhesFrontend | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Função de carregamento dos detalhes da vaga
    const loadVaga = useCallback(async () => {
        if (!idVaga) {
            setError("ID da vaga inválido.");
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            // Busca os detalhes usando o serviço
            const data = await fetchVagaDetalhesService(idVaga);
            setVaga(data);
        } catch (e: any) {
            console.error("Erro ao carregar detalhes da vaga:", e);
            setError("Não foi possível carregar os detalhes da vaga.");
        } finally {
            setIsLoading(false);
        }
    }, [idVaga]);

    useEffect(() => {
        loadVaga();
    }, [loadVaga]);

    // Lógica de Candidatura (movida da tela explore.tsx)
    const handleCandidatar = useCallback(async () => {
        if (!idVaga) return;

        setIsSubmitting(true);
        try {
            await candidatarAVagaApi(idVaga);
            Alert.alert("Sucesso", "Candidatura realizada com sucesso! Acompanhe o status na aba 'Candidaturas'.");
        } catch (e: any) {
            let errorMessage = "Ocorreu um erro ao candidatar-se.";
            if (axios.isAxiosError(e) && e.response?.status === 409) {
                // Erro de Conflito de Dados (já cadastrado)
                errorMessage = "Você já está candidatado a esta vaga.";
            } else if (axios.isAxiosError(e) && e.response?.status === 401) {
                // Erro de Autorização
                errorMessage = "Sua sessão expirou. Faça login novamente.";
            }
            Alert.alert("Erro", errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }, [idVaga]);

    if (isLoading) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-neutral-100">
                <ActivityIndicator size="large" color="#ea580c" />
            </SafeAreaView>
        );
    }

    if (error || !vaga) {
        return (
            <SafeAreaView className="flex-1 items-center justify-center bg-neutral-100 p-4">
                <Text className="text-lg text-onematter-700 text-center">{error || "Detalhes não disponíveis."}</Text>
                <TouchableOpacity onPress={loadVaga} className="mt-4 px-4 py-2 bg-onematter-700 rounded-lg">
                    <Text className="text-white font-semibold">Tentar Novamente</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    // Verifica se há skills para renderizar
    const hasSkills = vaga.skills && vaga.skills.length > 0;

    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <ScrollView className="flex-1 px-4 py-4">
                {/* Cabeçalho de Detalhes da Vaga */}
                <View className="bg-white rounded-xl p-5 mb-4 shadow-lg border border-neutral-100/80">
                    <Text className="text-2xl font-extrabold text-neutral-800 mb-2 leading-tight">{vaga.descricao}</Text>

                    {/* Informações básicas */}
                    <View className="flex-row items-center mb-1">
                        <Feather name="briefcase" size={16} color="#4b5563" />
                        <Text className="text-base text-neutral-600 ml-2 font-semibold">{vaga.nomeEmpresa}</Text>
                    </View>

                    <View className="flex-row items-center">
                        <Feather name="clock" size={14} color="#4b5563" />
                        <Text className="text-sm text-neutral-500 ml-2">Publicado em: {vaga.dataCriacaoFormatada}</Text>
                    </View>
                </View>

                {/* Seção de Skills/Requisitos */}
                <View className="mb-6">
                    <Text className="text-xl font-bold text-neutral-800 mb-3">Requisitos e Habilidades</Text>

                    <View className="flex-row flex-wrap gap-2">
                        {hasSkills ? (
                            vaga.skills.map((skill) => (
                                <View key={skill.id} className="px-3 py-1 bg-onematter-100 rounded-full border border-onematter-300">
                                    <Text className="text-sm font-medium text-onematter-700">{skill.nome}</Text>
                                </View>
                            ))
                        ) : (
                            <Text className="text-neutral-500 italic">Nenhuma habilidade listada.</Text>
                        )}
                    </View>
                </View>

                <View className="h-4" />

                {/* Botão de Candidatura */}
                <TouchableOpacity onPress={handleCandidatar} disabled={isSubmitting} className={`flex-row items-center justify-center px-4 py-3 bg-onematter-700 rounded-xl shadow-md ${isSubmitting ? "opacity-70" : "active:bg-onematter-800"}`}>
                    {isSubmitting ? (
                        <ActivityIndicator color="#fff" size="small" />
                    ) : (
                        <>
                            <Feather name="send" size={18} color="#fff" />
                            <Text className="text-lg font-bold text-white ml-2">Candidatar-se à Vaga</Text>
                        </>
                    )}
                </TouchableOpacity>

                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
};
export default JobDetails;
