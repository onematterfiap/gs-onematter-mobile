import { ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ReportProblem = () => {
    const handleSendReport = () => {
        Alert.alert("Relatório Enviado", "Obrigado! Sua solicitação foi registrada com sucesso e será analisada pela nossa equipe.");

        // Depois eu vou chamar a API aqui, só vou ler nos requisitos se precisa de tanta feature assim
        // Não vou usar o zod aqui pra fazer o form por isso
    };

    const inputBaseClass = "bg-white border border-neutral-300 rounded-xl p-4 text-base text-neutral-900";
    const placeholderColor = "#a1a1aa";

    return (
        <SafeAreaView className="flex-1 bg-neutral-100">
            <ScrollView className="flex-1 px-4 py-4">
                {/* Introdução */}
                <Text className="text-2xl font-bold text-neutral-800 mb-2">Envie seu Relatório</Text>
                <Text className="text-base text-neutral-500 mb-8">Descreva o problema ou a sugestão com o máximo de detalhes possível.</Text>

                {/* Campo E-mail */}
                <Text className="mb-2 text-base font-semibold text-neutral-800">Seu E-mail (Opcional)</Text>
                <TextInput className={`${inputBaseClass} mb-6`} placeholder="exemplo@email.com" placeholderTextColor={placeholderColor} keyboardType="email-address" />

                {/* Campo Título */}
                <Text className="mb-2 text-base font-semibold text-neutral-800">Título do Problema</Text>
                <TextInput className={`${inputBaseClass} mb-6`} placeholder="Ex: Não consigo me candidatar à vaga X" placeholderTextColor={placeholderColor} />

                {/* Campo Descrição Detalhada */}
                <Text className="mb-2 text-base font-semibold text-neutral-800">Descrição Detalhada</Text>
                <TextInput className={`${inputBaseClass} mb-8`} placeholder="Descreva o que aconteceu, quando e como reproduzir o erro." placeholderTextColor={placeholderColor} multiline numberOfLines={6} style={{ height: 120, textAlignVertical: "top" }} />

                {/* Botão de Envio */}
                <TouchableOpacity onPress={handleSendReport} className="items-center py-4 rounded-xl bg-onematter-700 shadow-md active:bg-onematter-800">
                    <Text className="text-lg font-bold text-white">ENVIAR RELATÓRIO</Text>
                </TouchableOpacity>

                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ReportProblem;
