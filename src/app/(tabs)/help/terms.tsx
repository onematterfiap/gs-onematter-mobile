import { ContentSection } from "@/components/help/ContentSection";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TermsOfUse = () => {
    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <ScrollView className="flex-1 px-4 py-4">
                <Text className="text-2xl font-bold text-neutral-800 mb-6">Termos de Uso do One Matter</Text>

                {/* Seção 1 */}
                <ContentSection title="1. Aceitação dos Termos" content="Ao acessar e usar o One Matter, você concorda em cumprir e estar vinculado(a) por estes Termos de Uso. Se você não concordar com qualquer parte dos termos, não use nossa plataforma." />

                {/* Seção 2 */}
                <ContentSection title="2. Uso do Serviço" content="Nossa plataforma destina-se a conectar candidatos e empresas em um processo de recrutamento justo e transparente. O uso indevido, incluindo o envio de informações falsas ou a automação de candidaturas, resultará na exclusão imediata da conta." />

                {/* Seção 3 */}
                <ContentSection title="3. Direitos de Propriedade Intelectual" content="Todo o conteúdo, logotipo e design da plataforma One Matter são de propriedade exclusiva da FIAP GS 2025 e protegidos por leis de direitos autorais." />

                {/* Seção 4 */}
                <ContentSection title="4. Limitação de Responsabilidade" content="O One Matter atua apenas como intermediário. Não garantimos a contratação e não nos responsabilizamos por quaisquer disputas entre usuários e empresas." />

                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default TermsOfUse;
