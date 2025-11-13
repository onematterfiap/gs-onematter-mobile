import { Control, FieldError, FieldValues, Path } from "react-hook-form";
import { TextInputProps } from "react-native";

type inputControllerProps<T extends FieldValues> = TextInputProps & {
    control: Control<T>;
    name: Path<T>;
    label: string;
    error?: FieldError;
    formatValue?: (value: string) => string;
};

export default inputControllerProps;
