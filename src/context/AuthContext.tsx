import { checkTokenAndLoadUser, removeTokenAndUser } from "@/services/authService";
import UserData from "@/types/login/loginTypes";
import { router } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
    user: Partial<UserData>;
    logout: () => void;
    login: (userData: Partial<UserData>) => void;
    isReady: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const initialUser: Partial<UserData> = { nomeCompleto: "Candidato", email: "" };
    const [user, setUser] = useState<Partial<UserData>>(initialUser);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDetails = await checkTokenAndLoadUser();
                if (userDetails) {
                    setUser(userDetails);
                }
            } finally {
                setIsReady(true);
            }
        };
        fetchUserData();
    }, []);

    const login = (userData: Partial<UserData>) => {
        setUser(userData);
    };

    const logout = () => {
        removeTokenAndUser().then(() => {
            // Atraso de leve pra suavizar a transição de layout
            setTimeout(() => {
                setUser(initialUser);
                router.replace("/(auth)"); // Volta para a tela de autenticação
            }, 50);
        });
    };

    return <AuthContext.Provider value={{ user, logout, login, isReady }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth precisa ser usado dentro de um AuthProvider");
    }
    return context;
};
