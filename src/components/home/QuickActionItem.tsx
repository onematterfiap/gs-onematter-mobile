import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

interface QuickActionItemProps {
    title: string;
    iconName: React.ComponentProps<typeof Feather>["name"];
    targetScreen: string;
}

export const QuickActionItem = ({ title, iconName, targetScreen }: QuickActionItemProps) => (
    <TouchableOpacity className="w-[48%] bg-white rounded-xl p-6 items-center justify-center mb-4 shadow-sm border border-neutral-200 active:bg-neutral-100" activeOpacity={0.8} onPress={() => router.push(targetScreen as any)}>
        <Feather name={iconName} size={36} color="#3f3f46" className="mb-3" />
        <Text className="text-base font-semibold text-neutral-800 text-center">{title}</Text>
    </TouchableOpacity>
);
