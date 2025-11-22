import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { LinkItemProps } from "@/types/help/helpTypes";

export const LinkItem = ({ title, iconName, targetScreen, isLast = false }: LinkItemProps) => {
    // Definindo a borda condicionalmente
    const borderClass = isLast ? "border-none" : "border-b border-neutral-200";

    const iconColor = "#ea580c";

    return (
        <TouchableOpacity
            className={`flex-row items-center justify-between bg-white p-4 ${borderClass} active:opacity-80`} // Efeito de toque uniforme e suave
            onPress={() => router.push(targetScreen as any)}
            activeOpacity={0.8}
        >
            <View className="flex-row items-center">
                <Feather name={iconName} size={20} color={iconColor} style={{ marginRight: 15 }} />
                <Text className="text-base font-semibold text-neutral-800">{title}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#a1a1aa" />
        </TouchableOpacity>
    );
};
