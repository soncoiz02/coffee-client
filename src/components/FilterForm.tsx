import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Grid, MenuItem, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import useQueryParams from '../hooks/useQueryParams'
import RHFProvider from './RHF/RHFProvider'
import RHFSelect from './RHF/RHFSelect'
import RHFTextField from './RHF/RHFTextField'

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
    mask?: any
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
    const { setQueryParams, setDefaultPaginationParams } = useQueryParams()
    const textFieldType = ["text", "number"]
    const methods = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(validateSchema)
    })

    const { handleSubmit, reset } = methods

    const onSubmit = (values: any) => {
        const queryValues = Object.keys(values).filter(p => !!values[p]).reduce((res, key) => Object.assign(res, { [key]: values[key] }), {})
        setQueryParams(queryValues)
    }

    const handleRemoveFilter = () => {
        reset()
        setDefaultPaginationParams()
    }

    return (
        <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                {
                    fields.map((field, index: number) => (
                        <Grid item {...field.gridCol} key={index}>
                            {
                                textFieldType.includes(field.type) &&
                                <RHFTextField
                                    name={field.fieldName}
                                    label={field.label}
                                    type={field.type}
                                    InputProps={{
                                        ...(field.mask && {
                                            inputComponent: field.mask
                                        })
                                    }}
                                />
                            }
                            {
                                field.type === "select" &&
                                <RHFSelect name={field.fieldName} label={field.label}>
                                    {
                                        field.valueOptions &&
                                        field.valueOptions.map((item: any, index: number) =>
                                            <MenuItem key={`${field.fieldName}-${index}`} value={item.value}>{item.label}</MenuItem>
                                        )
                                    }
                                </RHFSelect>
                            }
                        </Grid>
                    ))
                }
                <Grid item xs={12}>
                    <Stack direction='row' justifyContent='flex-end' gap={2}>
                        <Button color="error" size="small" variant='outlined' onClick={() => handleRemoveFilter()}>Xóa lọc</Button>
                        <Button sx={{ borderRadius: '4px' }} type="submit" size="small" variant='contained'>Tìm kiếm</Button>
                    </Stack>
                </Grid>
            </Grid>
        </RHFProvider>
    )
}

export default FilterForm