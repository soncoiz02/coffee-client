import { FormControl, InputLabel, Select, SelectProps, TextField, TextFieldProps } from '@mui/material'
import React, { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface IProps {
    name: string;
    children: ReactNode
}

export type RHFSelectProps = IProps & TextFieldProps;

const RHFSelect = ({ name, children, ...other }: RHFSelectProps) => {
    const { control } = useFormContext()
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    select
                    {...field}
                    {...other}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                >
                    {children}
                </TextField>
            )}
        />
    )
}

export default RHFSelect