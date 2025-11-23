import { QuickActionItem } from "@/components/home/QuickActionItem";
import { StatCard } from "@/components/home/StatCard";
import { useAuth } from "@/context/AuthContext";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
    const { user } = useAuth();

    // Se o usuário for null (logout) não renderize NADA
    // Isso evita que o NativeWind tente acessar o contexto de navegação que já foi destruído
    if (!user) return null;

    const userName = user.nome?.split(" ")[0] || "Candidato";
    const activeCandidatures = user.candidaturas ? user.candidaturas.length : 0;

    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <ScrollView contentContainerStyle={{ paddingVertical: 16 }} className="flex-1 px-4">
                <View className="mb-8 mt-2">
                    <Text className="text-base text-neutral-500">Olá e bem-vindo(a),</Text>
                    <Text className="text-3xl font-extrabold text-neutral-800 mt-1">{userName}!</Text>
                </View>

                <Text className="text-xl font-bold text-neutral-800 mb-4">Seu Painel</Text>

                <View className="mb-8">
                    <StatCard title="Minhas Candidaturas Ativas" value={activeCandidatures.toString()} iconName="send" />
                </View>

                <Text className="text-xl font-bold text-neutral-800 mb-4">Ações Rápidas</Text>
                <View className="flex-row justify-between flex-wrap mb-8">
                    <QuickActionItem title="Buscar Novas Vagas Abertas" iconName="search" targetScreen="/explore" />
                    <QuickActionItem title="Acompanhar Candidaturas" iconName="briefcase" targetScreen="/explore" />
                    <QuickActionItem title="Ver meu perfil" iconName="user" targetScreen="/profile" />
                    <QuickActionItem title="Reportar Erro" iconName="alert-triangle" targetScreen="/help/report" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
