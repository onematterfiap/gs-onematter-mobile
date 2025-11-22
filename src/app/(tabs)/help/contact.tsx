import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ContactLinkItem } from "@/components/help/ContactLinkItem";
import { ContentSection } from "@/components/help/ContentSection";

const ContactIndex = () => {
    const contactEmail = "suporte@onematter.com";
    const contactPhone = "(11) 4002-8922";
    const officeHours = "Segunda a Sexta, das 9h às 18h";
    const officeAddress = "Avenida Paulista, 1106, Cerqueira César, São Paulo - SP, 01310-100";

    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <ScrollView className="flex-1 px-4 py-4">
                <View className="mb-6">
                    <Text className="text-xl font-bold text-neutral-800">Canais de Atendimento</Text>
                    <Text className="text-base text-neutral-500 mt-1">Fale diretamente com nossa equipe de suporte.</Text>
                </View>

                {/* Seção de Links de Contato */}
                <View className="mb-8 bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200">
                    {/* E-mail (mailto) */}
                    <ContactLinkItem title="E-mail de Suporte" value={contactEmail} iconName="mail" linkUri={`mailto:${contactEmail}`} />

                    {/* Telefone (callto) */}
                    <ContactLinkItem
                        title="Telefone para Atendimento"
                        value={contactPhone}
                        iconName="phone"
                        linkUri={`tel:${contactPhone.replace(/[^0-9]/g, "")}`} // Remove caracteres não numéricos
                    />
                </View>

                {/* Detalhes Adicionais */}
                <ContentSection title="Horário de Funcionamento" content={officeHours} />

                <ContentSection title="Endereço" content={officeAddress} />

                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ContactIndex;
