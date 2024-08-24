import { Checkbox, FormControlLabel, FormControlLabelProps } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

interface IProps {
    name: string;
}

export type RHFSelectProps = IProps & FormControlLabelProps;

const RHFCheckBox = ({ name, ...other }: RHFSelectProps) => {
    const { control } = useFormContext()
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, ...field } }) => (
                <FormControlLabel
                    {...other}
                    control={<Checkbox onChange={onChange} value={value} {...field} />}
                />
            )}
        />
    )
}

export default RHFCheckBox