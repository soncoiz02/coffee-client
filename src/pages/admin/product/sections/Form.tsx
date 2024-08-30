import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Grid, MenuItem } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import RHFProvider from '../../../../components/RHF/RHFProvider'
import RHFSelect from '../../../../components/RHF/RHFSelect'
import RHFTextField from '../../../../components/RHF/RHFTextField'
import { BaseProductType } from '../../../../types/product'
import PriceSection from './PriceSection'
import UploadImg from './UploadImg'

const categoryOpts = [
    {
        label: 'Cà phê',
        id: "1"
    },
    {
        label: 'Trà hoa quả',
        id: "2"
    },
    {
        label: 'Sữa chua',
        id: "3"
    }
]

export interface DataType extends BaseProductType {
    selectPrice: 0 | 1
    singlePrice?: number
}

const initialData: DataType = {
    name: "",
    img: "",
    category: "",
    selectPrice: 0,
    singlePrice: 0,
    status: true,
}

const formSchema = yup.object().shape<any>({
    name: yup.string().trim().required('Vui lòng nhập tên sản phẩm'),
    category: yup.string().required('Vui lòng chọn danh mục'),
    img: yup.string().trim(),
    selectPrice: yup.number(),
    singlePrice: yup.number().typeError('Nhập giá sản phẩm').when('selectPrice', (selectPrice, schema) => {
        if (selectPrice[0] === 0) {
            return schema.positive('Nhập giá lớn hơn 0')
                .required('Nhập giá sản phẩm')
        }
        return schema
    }),
    status: yup.boolean(),
})

const Form = () => {
    const [additionalValue, setAdditionalValue] = useState<any>({
        price: null,
        ingredient: null
    })

    const methods = useForm({
        defaultValues: initialData,
        resolver: yupResolver(formSchema)
    })

    const { handleSubmit } = methods

    const onSubmit = (values: any) => {
        console.log(values);
    }

    return (
        <Box sx={{ padding: '18px 0' }}>
            <RHFProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <RHFTextField
                            name='name'
                            label='Tên sản phẩm'
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <RHFSelect name='category' label='Danh mục'>
                            {categoryOpts.map(item => (
                                <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                            ))}
                        </RHFSelect>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <PriceSection methods={methods} additionalValue={additionalValue} setAdditionalValue={setAdditionalValue} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <UploadImg />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' variant='contained'>Lưu</Button>
                    </Grid>
                </Grid>
            </RHFProvider>
        </Box>
    )
}

export default Form