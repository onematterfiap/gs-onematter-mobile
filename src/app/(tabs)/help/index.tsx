import { LinkItem } from "@/components/help/LinkItem";
import { LinkSection } from "@/components/help/LinkSection";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HelpIndex = () => {
    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <ScrollView className="flex-1 px-4">
                {/* Cabeçalho de Conteúdo */}
                <View className="mb-6 mt-4">
                    <Text className="text-2xl font-bold text-neutral-800">Central de Ajuda</Text>
                    <Text className="text-base text-neutral-500 mt-1">Encontre respostas rápidas e canais de contato.</Text>
                </View>

                {/* Seção 1: Links Rápidos do App */}
                <LinkSection title="Acesso Rápido">
                    <LinkItem title="Ver Meu Perfil" iconName="user" targetScreen="/(tabs)/profile" />
                    <LinkItem title="Buscar Novas Vagas" iconName="briefcase" targetScreen="/(tabs)/explore" />
                    <LinkItem title="Minhas Candidaturas" iconName="archive" targetScreen="/(tabs)/applications" isLast />
                </LinkSection>

                {/* Seção 2: Suporte e Dúvidas */}
                <LinkSection title="Suporte e Dúvidas">
                    <LinkItem title="Canais de comunicação" iconName="phone-call" targetScreen="/(tabs)/help/contact" />
                    <LinkItem title="Perguntas Frequentes (FAQ)" iconName="message-square" targetScreen="/(tabs)/help/faq" />
                    <LinkItem title="Relatar um Problema / Erro" iconName="alert-triangle" targetScreen="/(tabs)/help/report" />
                </LinkSection>

                {/* Seção 3: Informações Legais */}
                <LinkSection title="Informações Legais">
                    <LinkItem title="Termos de Uso" iconName="file-text" targetScreen="/(tabs)/help/terms" />
                    <LinkItem title="Política de Privacidade" iconName="lock" targetScreen="/(tabs)/help/privacy" isLast />
                </LinkSection>

                <View className="mb-8" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default HelpIndex;
