import { FormControl, FormControlLabel, FormHelperText, FormLabel, FormLabelProps, Radio, RadioGroup, RadioGroupProps } from '@mui/material'
import React, { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type PropsType = {
    name: string
    label?: string
    options: any
}

type RHFRadioType = PropsType & RadioGroupProps

export const RHFRadio = ({ name, label, options, ...other }: RHFRadioType) => {
    const { control } = useFormContext()
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <FormControl component='fieldset'>
                    {
                        label &&
                        <FormLabel component="legend">{label}</FormLabel>
                    }
                    <RadioGroup value={value} onChange={onChange} {...other}>
                        {options.map((item: any) => (<FormControlLabel sx={{ flex: 1 }} key={item.value} value={item.value} control={<Radio />} label={item.label} />))}
                    </RadioGroup>
                    {
                        !!error &&
                        <FormHelperText>{error?.message}</FormHelperText>
                    }
                </FormControl>
            )}
        />
    )
}