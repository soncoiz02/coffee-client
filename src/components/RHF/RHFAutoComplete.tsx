import { Autocomplete, AutocompleteProps, TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface IProps {
    name: string;
    options: any
}

export type RHFAutoCompleteProps = IProps & TextFieldProps & AutocompleteProps<any, any, any, any>

export const RHFAutoComplete = ({ name, options, ...other }: RHFAutoCompleteProps) => {
    const { control } = useFormContext()
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, ref, onChange, ...field }, fieldState: { error } }) => (
                <Autocomplete
                    {...other}
                    value={value || null}
                    onChange={(_, data) => onChange(data)}
                    options={options}
                    getOptionLabel={(option: any) => option.label || ''}
                    isOptionEqualToValue={(option: any, value: any) => option.id === value.id}
                    disablePortal
                    renderInput={(params) => (
                        <TextField
                            error={!!error}
                            helperText={error?.message}
                            label={other.label}
                            {...params}
                            {...field}
                            inputRef={ref}
                            fullWidth
                        />
                    )}
                />
            )}
        />
    )
}