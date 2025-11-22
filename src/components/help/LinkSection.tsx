import { LinkSectionProps } from "@/types/help/helpTypes";
import { Text, View } from "react-native";

export const LinkSection = ({ title, children }: LinkSectionProps) => {
    return (
        <View className="mb-6 bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200">
            <Text className="text-sm font-bold text-neutral-500 uppercase px-4 pt-4 pb-2">{title}</Text>
            {children}
        </View>
    );
};
