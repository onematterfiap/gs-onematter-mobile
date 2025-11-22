import { ContentSection } from "@/components/help/ContentSection";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacyPolicy = () => {
    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <ScrollView className="flex-1 px-4 py-4">
                {/* Seção 1 */}
                <ContentSection title="1. Coleta de Informações" content="Coletamos informações pessoais como nome, e-mail, CPF, data de nascimento, gênero e telefone no momento do cadastro. Estas informações são essenciais para a sua identificação e para a validação da unicidade do seu perfil." />

                {/* Seção 2 */}
                <ContentSection title="2. Uso de Dados" content="Seus dados são utilizados exclusivamente para fins de recrutamento, match de vagas e comunicação entre você e as empresas para as quais você se candidata. Nós não vendemos suas informações a terceiros." />

                {/* Seção 3 */}
                <ContentSection title="3. Segurança" content="Utilizamos criptografia BCrypt para armazenar sua senha de forma segura. Todos os dados são tratados como confidenciais." />

                {/* Seção 4 */}
                <ContentSection title="4. Seus Direitos" content="Você tem o direito de acessar, corrigir ou solicitar a exclusão da sua conta a qualquer momento." />

                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default PrivacyPolicy;
