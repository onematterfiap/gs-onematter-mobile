import { useAuth } from "@/context/AuthContext";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

// Isso aqui é temporário
const HomeCard = ({ title, value, iconName }: { title: string; value: string; iconName: React.ComponentProps<typeof Feather>["name"] }) => {
    return (
        <View className="bg-white rounded-xl p-4 shadow-md w-full mb-4 border border-neutral-200">
            <View className="flex-row items-center mb-2">
                {/* Ícone Feather */}
                <Feather name={iconName} size={28} style={{ marginRight: 12 }} color="#ea580c" />
                {/* Título do Card */}
                <Text className="text-lg font-semibold text-neutral-800">{title}</Text>
            </View>
            {/* Valor principal em destaque */}
            <Text className="text-3xl font-bold text-onematter-600 mt-2">{value}</Text>
        </View>
    );
};

const Home = () => {
    // Acesso ao contexto para obter o usuário e a função de logout
    const { user, logout } = useAuth();

    const userName = user?.nomeCompleto?.split(" ")[0] || "Usuário";

    // --- FUNÇÃO DE LOGOUT ---
    const handleLogout = () => {
        // 💡 Simplificado: Apenas chama a função do contexto
        logout();
    };

    return (
        <View className="flex-1 bg-neutral-100">
            <ScrollView contentContainerStyle={{ padding: 24 }}>
                {/* --- 1. Cabeçalho Principal (Welcome) --- */}
                <View className="mb-8">
                    <Text className="text-base text-neutral-500">Bem-vindo(a) de volta,</Text>
                    {/* Exibe o nome dinamicamente */}
                    <Text className="text-3xl font-extrabold text-onematter-700 mt-1">{userName} OneMatter!</Text>
                </View>

                {/* --- 2. Cards de Estatísticas/Destaque --- */}
                <View className="mb-8">
                    <HomeCard title="Vagas Ativas" value="5 Vagas" iconName="briefcase" />
                    <HomeCard title="Candidaturas" value="3 Enviadas" iconName="send" />
                </View>

                {/* --- 3. BOTÃO DE LOGOUT (CTA PRINCIPAL) --- */}
                <TouchableOpacity
                    onPress={handleLogout} // <- Conecta a função de logout
                    activeOpacity={0.7}
                    className="items-center py-4 rounded-xl bg-onematter-700 shadow-lg mb-8"
                >
                    <Text className="text-lg font-bold text-white">SAIR DO APLICATIVO</Text>
                </TouchableOpacity>

                {/* --- 4. Seção de Navegação Rápida --- */}
                <Text className="text-xl font-bold text-neutral-800 mb-4">Acesso Rápido</Text>
                <View className="flex-row justify-between flex-wrap">
                    <AcessoRapidoItem title="Meu Perfil" iconName="user" targetScreen="/profile" />
                    <AcessoRapidoItem title="Config." iconName="settings" targetScreen="/settings" />
                    <AcessoRapidoItem title="Suporte" iconName="help-circle" targetScreen="/help" />
                </View>
            </ScrollView>
        </View>
    );
};

// Componente para Acesso Rápido
const AcessoRapidoItem = ({ title, iconName, targetScreen }: { title: string; iconName: React.ComponentProps<typeof Feather>["name"]; targetScreen: string }) => (
    <TouchableOpacity className="w-[30%] bg-white rounded-lg p-3 items-center justify-center mb-4 border border-neutral-300" activeOpacity={0.8} onPress={() => router.push("/_sitemap")}>
        <Feather name={iconName} size={28} color="#3f3f46" className="mb-1" />
        <Text className="text-sm font-medium text-neutral-700 text-center">{title}</Text>
    </TouchableOpacity>
);

export default Home;
