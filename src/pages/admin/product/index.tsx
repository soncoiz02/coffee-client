import { Stack, styled, Typography } from '@mui/material'
import ShadowBox from '../../../components/ShadowBox'
import ProductGridInfo from './sections/ProductGridInfo'
import FilterForm, { FilterField } from '../../../components/FilterForm'
import * as yup from 'yup'
import { useEffect, useState } from 'react'
import useProductFilterValueOptions from '../../../hooks/swr/useProductFilterValueOptions'

export const Wrapper = styled(Stack)({
    padding: '24px'
})

const filterFields: FilterField = {
    fields: [
        {
            fieldName: 'name',
            label: 'Tên sản phẩm',
            gridCol: {
                xs: 12,
                md: 4
            },
            type: 'text',
        },
        {
            fieldName: 'category',
            label: 'Danh mục',
            gridCol: {
                xs: 6,
                md: 4
            },
            type: 'select',
            valueOptions: []
        },
        {
            fieldName: 'status',
            label: 'Trạng thái',
            gridCol: {
                xs: 6,
                md: 4
            },
            type: 'select',
            valueOptions: [
                {
                    label: "Hoạt động",
                    value: true
                },
                {
                    label: "Đóng",
                    value: false
                }
            ]
        },
        {
            fieldName: 'ingredient',
            label: 'Nguyên liệu',
            gridCol: {
                xs: 12,
                md: 6
            },
            type: 'multi-select',
            valueOptions: []
        },
        {
            fieldName: 'priceStart',
            label: 'Giá đầu',
            gridCol: {
                xs: 6,
                md: 3
            },
            type: 'number',
        },
        {
            fieldName: 'priceEnd',
            label: 'Giá cuối',
            gridCol: {
                xs: 6,
                md: 3
            },
            type: 'number',
        },
    ],
    defaultValues: {
        name: "",
        category: "",
        status: true,
        ingredient: [],
        priceStart: 0,
        priceEnd: 0
    },
    validateSchema: yup.object().shape({
        name: yup.string(),
        category: yup.string(),
        status: yup.boolean(),
        priceStart: yup.number().transform((value) => value ? value : 0).typeError("Nhập giá là số").test("lessThan", "Giá đầu phải nhỏ hơn giá cuối", function (value) {
            if (!value) return true
            if (+this.parent.priceEnd < +value) return false
            else return true
        }),
        priceEnd: yup.number().transform((value) => value ? value : 0).typeError("Nhập giá là số").test("greaterThan", "Giá cuối phải lớn hơn giá đầu", function (value) {
            if (!value) return true
            if (+this.parent.priceStart > +value) return false
            else return true
        })
    })
}

const ProductPage = () => {
    const [filterFieldData, setFilterFieldData] = useState<FilterField>(filterFields)
    const { data, isLoading } = useProductFilterValueOptions()
    useEffect(() => {
        if (data) {
            const updateField = filterFields.fields.map(item => {
                if (item.fieldName === 'category') {
                    const valueOptions = data?.categories.map(p => ({ label: p.name, value: p.code }))
                    item.valueOptions.unshift({
                        label: "Tất cả",
                        value: ""
                    })
                    return {
                        ...item,
                        valueOptions: valueOptions
                    }
                }
                if (item.fieldName === 'ingredient') {
                    const valueOptions = data?.ingredients.map(p => ({ label: p.name, value: p.code }))
                    item.valueOptions.unshift({
                        label: "Tất cả",
                        value: ""
                    })
                    return {
                        ...item,
                        valueOptions: valueOptions
                    }
                }
                return {
                    ...item
                }
            })
            setFilterFieldData({
                ...filterFieldData,
                fields: updateField
            })
        }
    }, [isLoading])

    return (
        <ShadowBox sx={{ borderRadius: '20px' }}>
            <Wrapper gap={2}>
                <Typography variant='h2'>Danh sách sản phẩm</Typography>
                <FilterForm filterFields={filterFieldData} />
                <ProductGridInfo />
            </Wrapper>
        </ShadowBox>
    )
}

export default ProductPage