import { Text, TouchableOpacity, View, Linking } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ContactLinkItemProps } from "@/types/help/helpTypes";

export const ContactLinkItem = ({ title, value, iconName, linkUri }: ContactLinkItemProps) => {
    const handlePress = () => {
        Linking.openURL(linkUri).catch((err) => console.error("Erro ao abrir link:", err));
    };

    return (
        <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 border-b border-neutral-200 active:opacity-80" onPress={handlePress} activeOpacity={0.8}>
            <View className="flex-row items-center">
                <Feather name={iconName} size={20} color="#ea580c" style={{ marginRight: 15 }} />
                <View>
                    <Text className="text-sm font-medium text-neutral-500">{title}</Text>
                    <Text className="text-base font-semibold text-neutral-800 mt-0.5">{value}</Text>
                </View>
            </View>
            <Feather name="arrow-up-right" size={18} color="#a1a1aa" />
        </TouchableOpacity>
    );
};
