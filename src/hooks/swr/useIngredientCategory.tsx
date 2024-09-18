import React from 'react'
import useSWR from 'swr'
import { IngredientServices } from '../../services/ingredient/ingredientServices'

const useIngredientCategory = (...options: any) => {
    const { data, error, isLoading } = useSWR(["/get-list", ...options], ([url, ...arg]) => IngredientServices.getIngredientCategories(url, ...arg))

    return {
        data: {
            dataSource: data?.data.map((item, index: number) => ({
                no: index + 1,
                id: item._id,
                ...item
            })),
            rowCount: data?.meta?.total || 0,
            valueOptions: data?.data
        },
        isLoading,
        error: error,
    }
}

export default useIngredientCategory