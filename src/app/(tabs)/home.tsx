import { useAuth } from "@/context/AuthContext";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- Componente Reutilizável: Card de Estatísticas Minimalista ---
const HomeCard = ({ title, value, iconName }: { title: string; value: string; iconName: React.ComponentProps<typeof Feather>["name"] }) => {
    return (
        // Card compacto e arredondado, utilizando o estilo coeso do projeto
        <View className="bg-white rounded-xl p-4 shadow-sm w-full mb-3 border border-neutral-200">
            <View className="flex-row items-center justify-between">
                {/* Lado Esquerdo: Título e Ícone */}
                <View className="flex-row items-center">
                    <Feather name={iconName} size={20} style={{ marginRight: 10 }} color="#71717a" />
                    <Text className="text-base font-semibold text-neutral-600">{title}</Text>
                </View>

                {/* Lado Direito: Valor em Destaque */}
                <Text className="text-xl font-bold text-onematter-700">{value}</Text>
            </View>
        </View>
    );
};

// --- Componente Reutilizável: Item de Ação Principal (Card Arredondado) ---
const AcaoPrincipalItem = ({ title, iconName, targetScreen }: { title: string; iconName: React.ComponentProps<typeof Feather>["name"]; targetScreen: string }) => (
    <TouchableOpacity
        // Card de Ação: Ocupa 48% da largura para duas colunas. Foco no ícone centralizado.
        className="w-[48%] bg-white rounded-xl p-6 items-center justify-center mb-4 shadow-sm border border-neutral-200 active:bg-neutral-100"
        activeOpacity={0.8}
        onPress={() => router.push(targetScreen as any)}
    >
        <Feather name={iconName} size={36} color="#3f3f46" className="mb-3" />
        <Text className="text-base font-semibold text-neutral-800 text-center">{title}</Text>
    </TouchableOpacity>
);

const Home = () => {
    const { user, logout } = useAuth();
    const userName = user?.nome?.split(" ")[0] || "Candidato";

    const handleLogout = () => {
        logout();
    };

    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <ScrollView contentContainerStyle={{ paddingVertical: 16 }} className="flex-1 px-4">
                {/* Cabeçalho de boas vindas */}
                <View className="mb-8 mt-2">
                    <Text className="text-base text-neutral-500">Olá e bem-vindo(a),</Text>
                    <Text className="text-3xl font-extrabold text-neutral-800 mt-1">{userName}!</Text>
                </View>

                {/* Informações gerais */}
                <Text className="text-xl font-bold text-neutral-800 mb-4">Seu Painel</Text>
                <View className="mb-8">
                    <HomeCard title="Vagas em Aberto no Pool" value="12" iconName="briefcase" />
                    <HomeCard title="Candidaturas Ativas" value="3" iconName="send" />
                    <HomeCard title="Próxima Etapa de Teste" value="Nenhum" iconName="calendar" />
                </View>

                {/* --- 3. SEÇÃO DE AÇÕES PRINCIPAIS (2 Colunas) --- */}
                <Text className="text-xl font-bold text-neutral-800 mb-4">Ações Rápidas</Text>
                <View className="flex-row justify-between flex-wrap mb-8">
                    {/* AÇÃO 1: BUSCAR VAGAS */}
                    <AcaoPrincipalItem title="Buscar Novas Vagas Abertas" iconName="search" targetScreen="/explore" />

                    {/* AÇÃO 2: VER TESTES/CANDIDATURAS */}
                    <AcaoPrincipalItem title="Acompanhar Candidaturas" iconName="archive" targetScreen="/tests" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
