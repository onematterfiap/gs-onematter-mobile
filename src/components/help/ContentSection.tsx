import { ContentSectionProps } from "@/types/help/helpTypes";
import { Text, View } from "react-native";

export const ContentSection = ({ title, content }: ContentSectionProps) => {
    return (
        <View className="bg-white rounded-lg p-5 mb-4 shadow-sm border border-neutral-200">
            {/* Título */}
            <Text className="text-lg font-bold text-neutral-700 mb-2">{title}</Text>

            {/* Conteúdo */}
            <Text className="text-base text-neutral-600 leading-snug">{content}</Text>
        </View>
    );
};
