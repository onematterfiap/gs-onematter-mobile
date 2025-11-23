import { checkTokenAndLoadUser, removeTokenAndUser, refreshUserDetails } from "@/services/authService";
import { UserData } from "@/types/auth/authTypes";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type AuthContextType = {
    user: Partial<UserData> | null;
    logout: () => void;
    login: (userData: Partial<UserData>) => void;
    isReady: boolean;
    updateUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Partial<UserData> | null>(null);
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
            setUser(null);
        });
    };

    // Implementação da função de atualização
    const updateUser = async () => {
        const updatedUser = await refreshUserDetails();
        if (updatedUser) {
            setUser(updatedUser);
        }
    };

    // Inclui updateUser no valor do contexto
    return <AuthContext.Provider value={{ user, logout, login, isReady, updateUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth precisa ser usado dentro de um AuthProvider");
    }
    return context;
};
