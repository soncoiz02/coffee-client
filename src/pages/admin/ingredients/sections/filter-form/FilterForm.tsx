import { Button, Grid, MenuItem, Stack } from '@mui/material'
import React from 'react'
import RHFTextField from '../../../../../components/RHF/RHFTextField'
import RHFProvider from '../../../../../components/RHF/RHFProvider'
import { useForm } from 'react-hook-form'
import RHFSelect from '../../../../../components/RHF/RHFSelect'
import { yupResolver } from '@hookform/resolvers/yup'

export type FieldData = {
    fieldName: string
    label: string
    gridCol: {
        xs: number
        md: number
        lg?: number
    }
    type: "text" | "number" | "select"
    valueOptions?: any
}

export type FilterField = {
    fields: FieldData[],
    defaultValues: any,
    validateSchema: any
}

type PropsType = {
    filterFields: FilterField
}

const FilterForm = ({ filterFields: { defaultValues, fields, validateSchema } }: PropsType) => {
    const textFieldType = ["text", "number"]
    const methods = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(validateSchema)
    })

    const { handleSubmit } = methods

    const onSubmit = (values: any) => {
        console.log(values);

    }

    return (
        <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                {
                    fields.map((field, index: number) => (
                        <Grid item {...field.gridCol} key={index}>
                            {
                                textFieldType.includes(field.type) &&
                                <RHFTextField name={field.fieldName} label={field.label} type={field.type} />
                            }
                            {
                                field.type === "select" &&
                                <RHFSelect name={field.fieldName} label={field.label}>
                                    <MenuItem>asdas</MenuItem>
                                    <MenuItem>dsadas</MenuItem>
                                </RHFSelect>
                            }
                        </Grid>
                    ))
                }
                <Grid item xs={12}>
                    <Stack direction='row' justifyContent='flex-end'>
                        <Button size="small" variant='contained'>Tìm kiếm</Button>
                    </Stack>
                </Grid>
            </Grid>
        </RHFProvider>
    )
}

export default FilterForm