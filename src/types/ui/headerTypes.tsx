import { Feather } from "@expo/vector-icons";
import { StyleProp, ViewStyle } from "react-native";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

export default interface headerTypes {
    // Toda página deve ter um título, obrigatoriamente
    title: string;

    // 💡 NOVO: Ícone específico para o lado esquerdo do header
    pageIconName: FeatherIconName;

    // Funções para o botão de ação da direita
    onPressRight?: () => void;
    rightIconName?: FeatherIconName;

    // Padrão do tamanho de ícone é 24
    iconSize?: 24 | 32 | 48;
    // Padrão da cor de ícone é '#ea580c' (onematter-700).
    iconColor?: string;
    style?: StyleProp<ViewStyle>;
}
