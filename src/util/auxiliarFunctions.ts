// Funções de formatação de texto (máscaras)
export const formatCPF = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
    if (cleaned.length <= 9) return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
};

export const formatDataNascimento = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
};

export const formatTelefone = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    if (cleaned.length < 3) return `(${cleaned}`;

    // Identifica se é celular (11 dígitos) ou fixo (10 dígitos)
    const isCelular = cleaned.length > 10;

    if (isCelular) {
        return cleaned
            .replace(/(\d{2})/, "($1) ")
            .replace(/(\d{5})/, "$1-")
            .slice(0, 15);
    } else {
        return cleaned
            .replace(/(\d{2})/, "($1) ")
            .replace(/(\d{4})/, "$1-")
            .slice(0, 14);
    }
};

// Função para extrair as iniciais do nome
export const getInitials = (name: string) => {
    if (!name) return "?";
    const names = name.split(" ");
    const firstInitial = names[0]?.[0] || "";
    const lastInitial = names.length > 1 ? names[names.length - 1]?.[0] : "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
};

// Função para calcular a idade a partir da data de nascimento no formato DD/MM/AAAA
export const calculateAge = (birthDate: string) => {
    if (!birthDate || !/^\d{2}\/\d{2}\/\d{4}$/.test(birthDate)) return "";
    const today = new Date();
    const [day, month, year] = birthDate.split("/").map(Number);
    const birthDateObj = new Date(year, month - 1, day);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return `${age} anos`;
};

// Função para esconder o CPF e exibir apenas o final
export const maskCPF = (cpf: string) => {
    if (!cpf) return "";
    // Remove tudo que não for dígito (para lidar com inputs formatados ou não)
    const cleaned = cpf.replace(/\D/g, "");

    if (cleaned.length < 11) {
        // Se não for um CPF completo, retorna o limpo
        return cleaned;
    }

    // Mascara os 9 primeiros dígitos e mantém a formatação
    const maskedPart = "***.***.***-";
    const lastTwo = cleaned.substring(9, 11);

    return maskedPart + lastTwo;
};
