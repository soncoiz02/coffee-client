import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IProps {
    name: string;
}

export type RHFTextFieldProps = IProps & TextFieldProps;

export default function RHFTextField({ name, ...other }: RHFTextFieldProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                    {...other}
                />
            )}
        />
    );
}