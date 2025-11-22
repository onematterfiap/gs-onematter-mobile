import { FaqItemProps } from "@/types/help/helpTypes";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const FaqItem = ({ question, answer }: FaqItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <View className="border-b border-neutral-200 bg-white">
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)} className="flex-row items-center justify-between p-4 active:opacity-80" activeOpacity={0.8}>
                <Text className="flex-1 text-base font-semibold text-neutral-800 pr-4">{question}</Text>
                <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={20} color="#71717a" />
            </TouchableOpacity>
            {isOpen && (
                <View className="p-4 pt-0">
                    <Text className="text-base text-neutral-600">{answer}</Text>
                </View>
            )}
        </View>
    );
};
