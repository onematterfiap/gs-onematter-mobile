import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#ea580c",
                tabBarInactiveTintColor: "#71717a",
            }}
        >
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Vagas",
                    tabBarIcon: ({ color }) => <Feather name="briefcase" color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="tests"
                options={{
                    title: "Meus Testes",
                    tabBarIcon: ({ color }) => <Feather name="archive" color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    title: "Início",
                    tabBarIcon: ({ color }) => <Feather name="home" color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color }) => <Feather name="user" color={color} size={24} />,
                }}
            />
            <Tabs.Screen
                name="help"
                options={{
                    title: "Ajuda",
                    tabBarIcon: ({ color }) => <Feather name="help-circle" color={color} size={24} />,
                }}
            />
        </Tabs>
    );
}
