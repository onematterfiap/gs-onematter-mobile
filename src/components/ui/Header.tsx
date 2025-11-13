import headerTypes from "@/types/ui/headerTypes";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header = ({ title, onPressRight, rightIconName = "user", iconSize = 24, iconColor = "#ea580c", pageIconName, style }: headerTypes) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            // Ajusta o padding superior para a Área Segura
            style={[{ paddingTop: insets.top }, style]}
            // Usa min-h-[64px] para altura mínima e padding vertical para espaçamento
            className="flex flex-row items-center justify-between min-h-[64px] px-4 border-b border-neutral-200 bg-white shadow-sm"
        >
            {/* 💡 Lado Esquerdo: Ícone da Página e Título (Dominante) */}
            <View className="flex-row items-center flex-1 py-3">
                {/* Ícone da Página: Tamanho ajustado (24px) para melhor balanço com o texto */}
                {pageIconName && <Feather name={pageIconName} size={24} color={iconColor} style={{ marginRight: 10 }} />}

                {/* Título da Tela: Fonte 20px (xl) para se encaixar melhor ao lado do ícone */}
                <Text className="text-xl font-bold text-neutral-800" numberOfLines={1}>
                    {title}
                </Text>
            </View>

            {/* 💡 Lado Direito: Ícone de Ação (Perfil) - Condicional e Compacto */}
            <View className="items-center justify-center ml-2">
                {onPressRight && (
                    <TouchableOpacity
                        onPress={onPressRight}
                        activeOpacity={0.7}
                        className="p-2 rounded-full" // Área de toque compacta
                    >
                        <Feather name={rightIconName} size={iconSize} color={iconColor} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default Header;
