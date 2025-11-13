import inputControllerProps from "@/types/ui/controlledInputTypes";
import { Controller, FieldValues } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

export function ControlledInput<T extends FieldValues>({ control, name, label, error, formatValue, ...rest }: inputControllerProps<T>) {
    return (
        <View>
            <Text className="mb-1 text-base font-semibold text-medix-700">{label}</Text>

            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => {
                    const handleChange = (text: string) => {
                        const formattedValue = formatValue ? formatValue(text) : text;
                        onChange(formattedValue);
                    };

                    return <TextInput className={`bg-[#FAF9F6] border ${error ? "border-medix-error" : "border-medix-300"} rounded-lg p-3 text-base text-medix-900`} onBlur={onBlur} onChangeText={handleChange} value={value} {...rest} />;
                }}
            />

            {error && <Text className="mt-1 text-sm text-medix-error">{error.message}</Text>}
        </View>
    );
}
