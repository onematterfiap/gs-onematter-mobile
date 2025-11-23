import { useAuth } from "@/context/AuthContext";
import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserData } from "@/types/auth/authTypes";
import { calculateAge, getInitials, maskCPF } from "@/util/auxiliarFunctions";
import ProfileInfoItem from "@/components/profile/ProfileInfoItem";
import { useState } from "react";
import EditProfileForm from "@/components/profile/EditProfileForm";

const Profile = () => {
    const { user, logout } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    const fullUser: Partial<UserData> = user || {};

    const userName = fullUser.nome || "Candidato";
    const userEmail = fullUser.email || "N/A";
    const initials = getInitials(userName);

    const maskedCpf = fullUser.cpf ? maskCPF(fullUser.cpf) : "N/A";
    const userRole = fullUser.role === "ADMIN" ? "Admin / Recrutador" : "Candidato";
    const dataNascimento = fullUser.dataNascimento || "N/A";
    const idade = fullUser.dataNascimento ? calculateAge(dataNascimento) : "N/A";
    const genero = fullUser.genero || "Não informado";
    const telefone = fullUser.telefone || "Não informado";

    // Exibição das Skills em uma string separada por vírgula
    const userSkills = fullUser.skills?.map((s) => s.nome).join(", ") || "Nenhuma skill adicionada.";

    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <ScrollView className="flex-1 px-4">
                <View className="bg-white p-6 items-center shadow-md border-b border-neutral-300 mb-6 rounded-xl mt-4">
                    {/* Avatar e Infos Principais */}
                    <View className="items-center justify-center w-24 h-24 rounded-full bg-onematter-700 mb-3">
                        <Text className="text-4xl font-bold text-white">{initials}</Text>
                    </View>

                    <Text className="text-xl font-extrabold text-neutral-800">{userName}</Text>
                    <Text className="text-base text-neutral-500">{userEmail}</Text>

                    {/* Botão de Edição */}
                    <TouchableOpacity className="mt-4 px-4 py-2 border border-onematter-700 rounded-full active:bg-onematter-100" onPress={() => setIsEditing(true)}>
                        <Text className="text-sm font-semibold text-onematter-700">Editar Perfil</Text>
                    </TouchableOpacity>
                </View>

                {/* Detalhes da conta */}
                <View className="mb-6 bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200">
                    <Text className="text-sm font-bold text-neutral-500 uppercase px-4 pt-4 pb-2">Detalhes da Conta</Text>

                    <ProfileInfoItem label="Nome de Usuário" value={userName} iconName="tag" />
                    <ProfileInfoItem label="E-mail de Acesso" value={userEmail} iconName="mail" />
                    <ProfileInfoItem label="Tipo de Perfil" value={userRole} iconName="user-check" />
                    <ProfileInfoItem label="Status da Conta" value="Ativo" iconName="check-circle" isLast={true} />
                </View>

                {/* Informações pessoais */}
                <View className="mb-6 bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200">
                    <Text className="text-sm font-bold text-neutral-500 uppercase px-4 pt-4 pb-2">Informações Pessoais</Text>

                    <ProfileInfoItem label="CPF" value={maskedCpf} iconName="credit-card" />
                    <ProfileInfoItem label="Telefone" value={telefone} iconName="phone" />
                    <ProfileInfoItem label="Gênero" value={genero} iconName="users" />
                    <ProfileInfoItem label="Data de Nasc." value={dataNascimento} iconName="calendar" />
                    <ProfileInfoItem label="Idade" value={idade} iconName="info" isLast={true} />
                </View>

                {/* Skills do Usuário */}
                <View className="mb-6 bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200">
                    <Text className="text-sm font-bold text-neutral-500 uppercase px-4 pt-4 pb-2">Skills Cadastradas</Text>

                    <ProfileInfoItem label="Skills" value={userSkills} iconName="code" isLast={true} />
                </View>

                {/* Botão de logout */}
                <View className="mb-8">
                    <TouchableOpacity onPress={logout} activeOpacity={0.7} className="w-56 self-center flex-row items-center justify-center py-2 rounded-xl bg-onematter-700 shadow-md">
                        <Feather name="log-out" size={20} color="#fff" style={{ marginRight: 8 }} />
                        <Text className="text-lg font-bold text-white">Sair da conta</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Modal de Edição */}
            <Modal animationType="slide" transparent={true} visible={isEditing} onRequestClose={() => setIsEditing(false)}>
                {/* O Modal aparece na parte inferior, ocupando a parte de baixo da tela */}
                <View className="flex-1 justify-end bg-black/50">
                    <EditProfileForm onClose={() => setIsEditing(false)} />
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Profile;
