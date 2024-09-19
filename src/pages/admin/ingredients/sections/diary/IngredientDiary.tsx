import { Typography } from '@mui/material'
import ShadowBox from '../../../../../components/ShadowBox'
import { Wrapper } from '../../../product'
import DiaryInfoGrid from './DiaryInfoGrid'
import FilterForm, { FilterField } from '../../../../../components/FilterForm'

import * as yup from 'yup'
import { TextMaskCustomDate } from '../../../../../components/TextMaskCustom'
import { isValidDate } from '../../../../../utils/time'

const filterFields: FilterField = {
    fields: [
        {
            fieldName: 'user',
            label: "Người thực hiện",
            gridCol: {
                xs: 6,
                md: 6
            },
            type: "text"
        },
        {
            fieldName: 'createdAt',
            label: "Thời gian",
            gridCol: {
                xs: 6,
                md: 6
            },
            type: "text",
            mask: TextMaskCustomDate
        }
    ],
    defaultValues: {
        user: "",
        createdAt: ""
    },
    validateSchema: yup.object().shape({
        user: yup.string(),
        createdAt: yup.string().test("validDate", "Sai định dạng thời gian", (value) => {
            if (!value) return false
            return isValidDate(value)
        })
    })
}

const IngredientDiary = () => {
    return (
        <ShadowBox sx={{ borderRadius: "20px" }}>
            <Wrapper gap={2}>
                <Typography variant='h2'>Nhật ký</Typography>
                <FilterForm filterFields={filterFields} />
                <DiaryInfoGrid />
            </Wrapper>
        </ShadowBox>
    )
}

export default IngredientDiary