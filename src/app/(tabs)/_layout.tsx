import Header from "@/components/ui/Header";
import { Tabs, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

// Definição do tipo FeatherIconName
type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

// Função que renderiza o componente header customizado
const CustomHeaderRenderer = (props: any) => {
    const router = useRouter();

    // Lê o título e a propriedade customizada 'pageIconName'
    const title = props.options?.title || "EquiHire";
    // Pega o nome do ícone definido nas options
    const pageIconName = props.options?.pageIconName as FeatherIconName;

    return (
        <Header
            title={title}
            pageIconName={pageIconName}
            iconColor="#ea580c"
            // Esse botão aqui vai ficar sempre mandando pra página de ajuda, talvez eu remova
            onPressRight={() => router.push("/(tabs)/help")}
            rightIconName="help-circle"
        />
    );
};

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#ea580c",
                tabBarInactiveTintColor: "#71717a",
            }}
        >
            <Tabs.Screen
                name="help"
                options={
                    {
                        title: "Suporte",
                        tabBarIcon: ({ color }: { color: string }) => <Feather name="help-circle" color={color} size={24} />,
                        headerShown: true,
                        header: CustomHeaderRenderer,
                        pageIconName: "help-circle",
                    } as any
                }
            />
            <Tabs.Screen
                name="profile"
                options={
                    {
                        title: "Meu Perfil",
                        tabBarIcon: ({ color }: { color: string }) => <Feather name="user" color={color} size={24} />,
                        headerShown: true,
                        header: CustomHeaderRenderer,
                        pageIconName: "user",
                    } as any
                }
            />

            <Tabs.Screen
                name="home"
                options={
                    {
                        title: "One Matter",
                        tabBarIcon: ({ color }: { color: string }) => <Feather name="home" color={color} size={24} />,
                        headerShown: true,
                        header: CustomHeaderRenderer,
                        pageIconName: "home",
                    } as any
                }
            />
            <Tabs.Screen
                name="explore"
                options={
                    {
                        title: "Buscar Vagas",
                        tabBarIcon: ({ color }: { color: string }) => <Feather name="briefcase" color={color} size={24} />,
                        headerShown: true,
                        header: CustomHeaderRenderer,
                        pageIconName: "briefcase",
                    } as any // Esse any é pra parar de apitar alerta no pageIconName, depois tenho que resolver
                }
            />
            <Tabs.Screen
                name="applications"
                options={
                    {
                        title: "Candidaturas",
                        tabBarIcon: ({ color }: { color: string }) => <Feather name="archive" color={color} size={24} />,
                        headerShown: true,
                        header: CustomHeaderRenderer,
                        pageIconName: "archive",
                    } as any
                }
            />
        </Tabs>
    );
}
