import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FaqItem } from "@/components/help/FaqItem";

const Faq = () => {
    // Mockup de dados, não vou criar um diretório /data porque esse é o único lugar onde eu uso isso
    const faqData = [
        {
            q: "O que é o One Matter?",
            a: "O One Matter é uma plataforma de conexão entre candidatos e vagas focada em transparência e match justo baseado em habilidades técnicas e soft skills.",
        },
        {
            q: "Como minha candidatura é avaliada?",
            a: "As candidaturas passam por testes técnicos e avaliações de soft skills, garantindo que o match seja feito de forma imparcial e focada no potencial.",
        },
        {
            q: "Como atualizo meu CPF ou e-mail?",
            a: "Para alteração de dados sensíveis como CPF ou e-mail, por favor, utilize o formulário 'Relatar um Problema' e nossa equipe de suporte fará a verificação necessária.",
        },
        {
            q: "Posso cancelar uma candidatura?",
            a: "Sim. Você pode cancelar qualquer candidatura ativa na tela 'Candidaturas' (ícone de arquivo) a qualquer momento.",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <ScrollView className="flex-1">
                <View className="px-4 py-4">
                    <Text className="text-xl font-bold text-neutral-800 mb-4">Dúvidas Comuns</Text>

                    <View className="rounded-xl overflow-hidden shadow-sm border border-neutral-200">
                        {faqData.map((item, index) => (
                            <FaqItem key={index} question={item.q} answer={item.a} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default Faq;
