import { QuickActionItem } from "@/components/home/QuickActionItem";
import { StatCard } from "@/components/home/StatCard";
import { useAuth } from "@/context/AuthContext";
import { getNextStepStatus } from "@/util/auxiliarFunctions";
import React from "react";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
    const { user } = useAuth();
    const userName = user?.nome?.split(" ")[0] || "Candidato";

    // O estado de carregamento agora só depende do objeto 'user'
    const isLoadingData = !user;

    const activeCandidatures = user?.candidaturas ? user.candidaturas.length : 0;
    const nextStepStatus = getNextStepStatus(user?.candidaturas);

    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <ScrollView contentContainerStyle={{ paddingVertical: 16 }} className="flex-1 px-4">
                <View className="mb-8 mt-2">
                    <Text className="text-base text-neutral-500">Olá e bem-vindo(a),</Text>
                    <Text className="text-3xl font-extrabold text-neutral-800 mt-1">{userName}!</Text>
                </View>

                <Text className="text-xl font-bold text-neutral-800 mb-4">Seu Painel</Text>

                {isLoadingData ? (
                    <View className="h-32 items-center justify-center bg-white rounded-xl shadow-sm border border-neutral-200">
                        <ActivityIndicator size="large" color="#ea580c" />
                        <Text className="text-neutral-500 mt-2">Carregando dados...</Text>
                    </View>
                ) : (
                    <View className="mb-8">
                        {/* Minhas Candidaturas Ativas */}
                        <StatCard title="Minhas Candidaturas Ativas" value={activeCandidatures?.toString()} iconName="send" />

                        {/* Próxima Etapa de Teste */}
                        <StatCard title="Próxima Etapa" value={nextStepStatus} iconName="calendar" />
                    </View>
                )}

                <Text className="text-xl font-bold text-neutral-800 mb-4">Ações Rápidas</Text>
                <View className="flex-row justify-between flex-wrap mb-8">
                    {/* AÇÃO 1: BUSCAR VAGAS */}
                    <QuickActionItem title="Buscar Novas Vagas Abertas" iconName="search" targetScreen="/explore" />

                    {/* AÇÃO 2: ACOMPANHAR CANDIDATURAS */}
                    <QuickActionItem title="Acompanhar Candidaturas" iconName="archive" targetScreen="/applications" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
