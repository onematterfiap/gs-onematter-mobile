import { useAuth } from "@/context/AuthContext";
import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserData from "@/types/login/loginTypes";
import { getInitials, maskCPF } from "@/util/auxiliarFunctions";
import ProfileInfoItem from "@/components/profile/ProfileInfoItem";

const Profile = () => {
    // Acesso aos dados do usuário e função de logout
    const { user, logout } = useAuth();

    const fullUser: Partial<UserData> = user || {};

    const userName = fullUser.nomeCompleto || "Candidato";
    const userEmail = fullUser.email || "N/A";
    const initials = getInitials(userName);
    const maskedCpf = fullUser.cpf ? maskCPF(fullUser.cpf) : "N/A";

    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <ScrollView className="flex-1 px-4">
                <View className="bg-white p-6 items-center shadow-md border-b border-neutral-300 mb-6 rounded-xl mt-4">
                    {/* Avatar com iniciais */}
                    <View className="items-center justify-center w-24 h-24 rounded-full bg-onematter-700 mb-3">
                        <Text className="text-4xl font-bold text-white">{initials}</Text>
                    </View>

                    <Text className="text-xl font-extrabold text-neutral-800">{userName}</Text>
                    <Text className="text-base text-neutral-500">{userEmail}</Text>

                    {/* Botão de Edição - Mantido para consistência */}
                    <TouchableOpacity className="mt-4 px-4 py-2 border border-onematter-700 rounded-full active:bg-onematter-100">
                        <Text className="text-sm font-semibold text-onematter-700">Editar Perfil</Text>
                    </TouchableOpacity>
                </View>

                {/* Detalhes da conta */}
                <View className="mb-6 bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200">
                    <Text className="text-sm font-bold text-neutral-500 uppercase px-4 pt-4 pb-2">Detalhes da Conta</Text>

                    {/* Itens do Card */}
                    <ProfileInfoItem label="Nome de Usuário" value={userName} iconName="tag" />
                    <ProfileInfoItem label="E-mail de Acesso" value={userEmail} iconName="mail" />

                    {/* Último item sem borda para finalizar o card */}
                    <ProfileInfoItem label="Status da Conta" value="Ativo" iconName="check-circle" isLast={true} />
                </View>

                {/* Informações pessoais -- Ainda não adicionei CPF no usuário da API, então por enquanto vai ter essa verificação */}
                {fullUser.cpf && (
                    <View className="mb-6 bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200">
                        <Text className="text-sm font-bold text-neutral-500 uppercase px-4 pt-4 pb-2">Informações Pessoais</Text>

                        {/* Último item do card de informações pessoais */}
                        <ProfileInfoItem label="CPF" value={maskedCpf} iconName="credit-card" isLast={true} />
                    </View>
                )}

                {/* Botão de logout */}
                <View className="mb-8">
                    <TouchableOpacity onPress={logout} activeOpacity={0.7} className="w-56 self-center flex-row items-center justify-center py-2 rounded-xl bg-onematter-700 shadow-md">
                        <Feather name="log-out" size={20} color="#fff" style={{ marginRight: 8 }} />
                        <Text className="text-lg font-bold text-white">Sair da conta</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;
