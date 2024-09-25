import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Checkbox, Grid, MenuItem, Skeleton, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import useQueryParams from '../hooks/useQueryParams'
import RHFProvider from './RHF/RHFProvider'
import RHFSelect from './RHF/RHFSelect'
import RHFTextField from './RHF/RHFTextField'
import { RHFAutoComplete } from './RHF/RHFAutoComplete'
import { useEffect } from 'react'
import queryString from 'query-string'

export type FieldData = {
    fieldName: string
    label: string
    gridCol: {
        xs: number
        md: number
        lg?: number
    }
    type: "text" | "number" | "select" | "date" | "multi-select"
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
    const { queryParams, setQueryParams, setDefaultPaginationParams } = useQueryParams()
    const textFieldType = ["text", "number"]
    const methods = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(validateSchema)
    })

    const { handleSubmit, reset } = methods

    const onSubmit = (values: any) => {
        const queryValues: any = Object.keys(values).filter(p => !!values[p]).reduce((res, key) => Object.assign(res, { [key]: values[key] }), {})
        let deleteKey: any = []
        Object.keys(queryValues).forEach(key => {
            if (Array.isArray(queryValues[key])) {
                queryValues[key].forEach((item, index) => {
                    queryValues[`${key}[${index}]`] = item.value || item.code || ""
                })
                deleteKey.push(key)
            }
        })
        deleteKey.forEach((key: any) => delete queryValues[key])
        setQueryParams(queryValues)
    }

    const handleRemoveFilter = () => {
        setDefaultPaginationParams()
        reset({
            ...defaultValues
        })
    }

    useEffect(() => {
        handleFillFilterValue()
    }, [])

    const handleFillFilterValue = () => {
        const params = queryString.parse(queryParams.toString(), { arrayFormat: 'index' })
        const arrayParams: any = []
        Object.keys(params).forEach(key => {
            if (Array.isArray(params[key])) {
                arrayParams.push(key)
            }
        })
        fields.forEach(field => {
            if (arrayParams.includes(field.fieldName)) {
                params[field.fieldName] = field.valueOptions.filter((p: any) => params[field.fieldName]?.includes(p.value))
            }
        })
        reset({
            ...params
        })
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
                                />
                            }
                            {
                                field.type === "date" &&
                                <RHFTextField
                                    name={field.fieldName}
                                    label={field.label}
                                    InputProps={{
                                        ...(field.mask && {
                                            inputComponent: field.mask
                                        })
                                    }}
                                />
                            }
                            {
                                field.type === "select" &&
                                <>
                                    {
                                        field.valueOptions ?
                                            <RHFSelect name={field.fieldName} label={field.label}>
                                                {
                                                    field.valueOptions.map((item: any, index: number) =>
                                                        <MenuItem key={`${field.fieldName}-${index}`} value={item.value}>{item.label}</MenuItem>
                                                    )
                                                }
                                            </RHFSelect>
                                            : <Skeleton sx={{
                                                width: '100%',
                                                height: '100%'
                                            }} variant='rounded' />
                                    }
                                </>
                            }
                            {
                                field.type === "multi-select" &&
                                <>
                                    {
                                        field.valueOptions ?
                                            <RHFAutoComplete
                                                name={field.fieldName}
                                                options={field.valueOptions}
                                                label={field.label}
                                                multiple
                                                disableCloseOnSelect
                                                isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
                                                renderOption={(props: any, option: any, { selected }: any) => {
                                                    const { key, ...optionProps } = props;
                                                    return (
                                                        <li key={key} {...optionProps}>
                                                            <Checkbox
                                                                style={{ marginRight: 8 }}
                                                                checked={selected}
                                                            />
                                                            {option.label}
                                                        </li>
                                                    );
                                                }}
                                            />
                                            : <Skeleton sx={{
                                                width: '100%',
                                                height: '100%'
                                            }} variant='rounded' />
                                    }
                                </>
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