import { Autocomplete, Checkbox, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, Dispatch, useRef, useState } from 'react'
import RHFTextField from '../../../../components/RHF/RHFTextField';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import Timeline from '@mui/lab/Timeline';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import { UseFormReturn } from 'react-hook-form';
import * as yup from 'yup'


const sizeOpts = [
    {
        id: '1',
        name: 'Size S',
        code: 'priceS'
    },
    {
        id: '2',
        name: 'Size M',
        code: 'priceM'
    },
    {
        id: '3',
        name: 'Size L',
        code: 'priceL'
    }
]

type PropsTypes = {
    methods: UseFormReturn
    additionalValue: any
    setAdditionalValue: Dispatch<any>
}

const PriceSection = ({ methods, additionalValue, setAdditionalValue }: PropsTypes) => {
    const [listSize, setListSize] = useState<{ id: string; name: string; code: string }[]>([])
    const [selectPrice, setSelectPrice] = useState(0)


    const { clearErrors, setValue, formState: { isSubmitted } } = methods

    const disablePriceField = (type: string) => {
        // const selectPrice = +watch('selectPrice') || 0
        if (type === 'single') {
            if (selectPrice === 1)
                return true
            else
                return false

        }
        else if (type === 'size') {
            if (selectPrice === 0)
                return true
            else
                return false
        }
        return false
    }

    const handleChangeSelectPrice = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt((e.target as HTMLInputElement).value)
        setValue('selectPrice', value)
        setSelectPrice(value)

        if (value === 0) {
            const fieldList = ['sizeSPrice', 'sizeMPrice', 'sizeLPrice']
            fieldList.forEach((field: string) => {
                clearErrors(field)
                setValue(field, 0)
            })
            setListSize([])
            setAdditionalValue({
                ...additionalValue,
                price: null
            })
        }
        else if (value === 1) {
            clearErrors('singlePrice')
            setValue('singlePrice', 0)
        }

    }

    const handleChangeSize = (event: any, values: any) => {
        setListSize(values);
        values.forEach((value: any) => {
            setAdditionalValue({
                ...additionalValue,
                price: {
                    [value]: null
                }
            })
        })
    }

    const getErrorSelectPrice = () => {
        if (isSubmitted && selectPrice === 1) {
            if (listSize.length === 0)
                return {
                    isError: true,
                    message: 'Vui lòng chọn size'
                }
        }
        return {
            isError: false,
            message: ''
        }
    }

    const setPriceBySizeValue = (e: ChangeEvent<HTMLInputElement>, code: string) => {
        const value = e.target.value
        setAdditionalValue({
            ...additionalValue,
            price: {
                ...additionalValue.price,
                [code]: value
            }
        })
    }

    const validPriceBySize = () => {

    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Stack gap={1}>
                    <Typography variant='h4'>Giá sản phẩm</Typography>
                    <FormControl>
                        <RadioGroup
                            row
                            value={selectPrice}
                            onChange={handleChangeSelectPrice}
                        >
                            <FormControlLabel value={0} control={<Radio />} label="Giá đơn" />
                            <FormControlLabel value={1} control={<Radio />} label="Giá theo size" />
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <RHFTextField
                            type='number'
                            name='singlePrice'
                            label='Giá đơn'
                            placeholder='Giá sản phẩm'
                            inputProps={{ inputMode: 'numeric' }}
                            disabled={disablePriceField('single')}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    options={sizeOpts}
                                    disableCloseOnSelect
                                    value={listSize}
                                    disabled={disablePriceField('size')}
                                    getOptionLabel={(option) => option.name}
                                    onChange={handleChangeSize}
                                    limitTags={2}
                                    renderOption={(props, option, { selected }) => {
                                        const { key, ...optionProps } = props;
                                        return (
                                            <li key={option.id} {...optionProps}>
                                                <Checkbox
                                                    style={{ marginRight: 8 }}
                                                    checked={selected}
                                                />
                                                {option.name}
                                            </li>
                                        );
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Chọn size"
                                            error={getErrorSelectPrice().isError}
                                            helperText={getErrorSelectPrice().message}
                                        />
                                    )}
                                />
                            </Grid>
                            {
                                listSize.length > 0 &&
                                <Grid item xs={12}>
                                    <Timeline
                                        sx={{
                                            [`& .${timelineItemClasses.root}:before`]: {
                                                flex: 0,
                                                padding: 0,
                                            },
                                        }}
                                    >
                                        {
                                            listSize.map((size, index) => (
                                                <TimelineItem key={size.id}>
                                                    <TimelineSeparator>
                                                        <TimelineDot />
                                                        <TimelineConnector />
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                        <TextField
                                                            type='number'
                                                            value={additionalValue?.price[size.code]}
                                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPriceBySizeValue(e, size.code)}
                                                            label={size.name} />
                                                    </TimelineContent>
                                                </TimelineItem>
                                            ))
                                        }
                                    </Timeline>
                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PriceSection