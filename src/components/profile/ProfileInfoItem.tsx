import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";
const ProfileInfoItem = ({ label, value, iconName, isLast }: { label: string; value: string | undefined; iconName: React.ComponentProps<typeof Feather>["name"]; isLast?: boolean }) => (
    <View className={`flex-column items-start justify-between py-3 px-4 ${isLast ? "" : "border-b border-neutral-200"}`}>
        <View className="flex-row items-center">
            <Feather name={iconName} size={20} color="#71717a" />
            <Text className="ml-3 text-base text-neutral-600">{label}</Text>
        </View>
        <Text className="ml-8 text-base font-semibold text-neutral-800">{value || "Não informado"}</Text>
    </View>
);
export default ProfileInfoItem;
