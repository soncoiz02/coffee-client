import React from 'react'
import useSWR from 'swr'
import { IngredientServices } from '../../services/ingredient/ingredientServices'

const useIngredientDiary = (...options: any) => {
    const { data, error, isLoading } = useSWR(["/get-diary", ...options], ([url, ...arg]) => IngredientServices.getIngredientDiary(url, ...arg))

    return {
        data: {
            dataSource: data?.data.map((item, index: number) => ({
                no: index + 1,
                id: item._id,
                ...item
            })),
            rowCount: data?.meta.total
        },
        isLoading,
        error: error,
    }
}

export default useIngredientDiary