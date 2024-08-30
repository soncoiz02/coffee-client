import { TextField, TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat } from 'react-number-format';
interface IProps {
    name: string;
}

export type RHFTextFieldProps = IProps & TextFieldProps;

export default function RHFTextFieldPrice({ name, ...other }: RHFTextFieldProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <NumericFormat
                    {...field}
                    thousandSeparator
                    onValueChange={(values) => field.onChange(values.value)}
                    fullWidth
                    customInput={(props: any) =>
                        <TextField error={!!error}
                            helperText={error?.message}
                            {...other}
                            {...props}
                        />}
                />
            )}
        />
    );
}