import { Typography } from '@mui/material'
import ShadowBox from '../../../../../components/ShadowBox'
import { Wrapper } from '../../../product'
import DiaryInfoGrid from './DiaryInfoGrid'
import FilterForm, { FilterField } from '../../../../../components/FilterForm'

import * as yup from 'yup'
import { TextMaskCustomDate } from '../../../../../components/TextMaskCustom'
import { formatDate, isValidDate } from '../../../../../utils/time'

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
            type: "date",
            mask: TextMaskCustomDate
        }
    ],
    defaultValues: {
        user: "",
        createdAt: formatDate(new Date(), "dd/MM/yyyy")
    },
    validateSchema: yup.object().shape({
        user: yup.string(),
        createdAt: yup.string().test("validDate", "Sai định dạng thời gian", (value) => {
            if (!value) return true
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