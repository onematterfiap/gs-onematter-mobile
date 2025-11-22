import React from "react";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface StatCardProps {
    title: string;
    value: string;
    iconName: React.ComponentProps<typeof Feather>["name"];
}

export const StatCard = ({ title, value, iconName }: StatCardProps) => {
    const valueColor = value === "AGUARDANDO TESTE" ? "text-orange-500" : "text-onematter-700";

    return (
        <View className="bg-white rounded-xl p-4 shadow-sm w-full mb-3 border border-neutral-200">
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <Feather name={iconName} size={20} style={{ marginRight: 10 }} color="#71717a" />
                    <Text className="text-base font-semibold text-neutral-600">{title}</Text>
                </View>
                <Text className={`text-xl font-bold ${valueColor}`}>{value}</Text>
            </View>
        </View>
    );
};
