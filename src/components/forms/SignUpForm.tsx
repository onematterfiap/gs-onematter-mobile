import { useAuth } from "@/context/AuthContext";
import { handleRegister } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Step1Credentials } from "./Step1Credentials";
import { Step2PersonalData } from "./Step2PersonalData";
import { Step3Skills } from "./Step3Skills";
import { registerSchema, SignUpFormData, SignupFormProps, StepConfigType } from "@/types/signup/signupFormTypes";

const SignupForm = ({ router }: SignupFormProps) => {
    const { login } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [generoSelecionado, setGeneroSelecionado] = useState<SignUpFormData["genero"] | undefined>(undefined);

    const {
        control,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors },
    } = useForm<SignUpFormData>({
        defaultValues: {
            nome: "",
            email: "",
            password: "",
            cpf: "",
            dataNascimento: "",
            telefone: "",
            genero: undefined,
            selectedSkills: [],
        },
        resolver: zodResolver(registerSchema),
    });

    // Configuração das etapas com tipagem explícita
    const stepConfig: StepConfigType = {
        1: { fields: ["nome", "email", "password"], label: "Credenciais" },
        2: { fields: ["cpf", "dataNascimento", "genero", "telefone"], label: "Dados Pessoais" },
        3: { fields: [], label: "Habilidades" },
    };

    const handleNextStep = async () => {
        const fieldsToValidate = stepConfig[currentStep].fields;
        // O trigger aceita um nome de campo ou array de nomes. A tipagem garante que está correto.
        const isValid = await trigger(fieldsToValidate);
        if (isValid) setCurrentStep((prev) => prev + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const onRegisterSubmit = async (data: SignUpFormData) => {
        setIsSubmitting(true);
        try {
            const user = await handleRegister(data);
            if (user) {
                login(user);
                setTimeout(() => router.replace("/(tabs)/home"), 100);
            }
        } catch (e) {
            // Erros já tratados no service
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <Step1Credentials control={control} errors={errors} />;
            case 2:
                return <Step2PersonalData control={control} errors={errors} generoSelecionado={generoSelecionado} setGeneroSelecionado={setGeneroSelecionado} setValue={setValue} />;
            case 3:
                return <Step3Skills control={control} setValue={setValue} />;
            default:
                return null;
        }
    };

    return (
        <View className="w-full">
            {/* Cabeçalho de Progresso Melhorado */}
            <View className="mb-8">
                <View className="flex-row justify-between items-end mb-3">
                    <View>
                        <Text className="text-xs font-bold text-onematter-700 uppercase tracking-widest mb-1">Passo {currentStep} de 3</Text>
                        <Text className="text-xl font-bold text-neutral-800">{stepConfig[currentStep].label}</Text>
                    </View>
                    <Text className="text-neutral-400 text-sm font-medium">{Math.round((currentStep / 3) * 100)}%</Text>
                </View>

                {/* Barra de Progresso Contínua */}
                <View className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden flex-row">
                    {[1, 2, 3].map((step) => (
                        <View key={step} className={`h-full flex-1 ${step <= currentStep ? "bg-onematter-700" : "bg-transparent"} ${step < 3 ? "border-r border-white/20" : ""}`} />
                    ))}
                </View>
            </View>

            {/* Conteúdo */}
            <View className="min-h-[280px]">{renderStepContent()}</View>

            <View className="h-8" />

            {/* Botões Reduzidos (py-3.5 text-base) e Estilizados */}
            <View className="flex-row justify-between gap-4">
                {currentStep > 1 ? (
                    <TouchableOpacity onPress={handlePrevStep} disabled={isSubmitting} className="flex-1 items-center justify-center py-3.5 rounded-xl border border-neutral-300 bg-white active:bg-neutral-50">
                        <Text className="text-base font-semibold text-neutral-600">Voltar</Text>
                    </TouchableOpacity>
                ) : (
                    <View className="flex-1" />
                )}

                {currentStep < 3 ? (
                    <TouchableOpacity onPress={handleNextStep} className="flex-1 items-center justify-center py-3.5 rounded-xl bg-onematter-700 shadow-sm active:bg-onematter-800">
                        <Text className="text-base font-bold text-white">Próximo</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity onPress={handleSubmit(onRegisterSubmit)} disabled={isSubmitting} className={`flex-1 items-center justify-center py-3.5 rounded-xl bg-onematter-700 shadow-sm active:bg-onematter-800 ${isSubmitting ? "opacity-70" : ""}`}>
                        {isSubmitting ? <ActivityIndicator color="#fff" size="small" /> : <Text className="text-base font-bold text-white">Criar Conta</Text>}
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default SignupForm;
