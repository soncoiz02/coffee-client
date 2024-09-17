import React from 'react'
import useSWR from 'swr'
import { IngredientServices } from '../../services/ingredient/ingredientServices'

const useIngredientGridData = (...options: any) => {
    const { data, error, isLoading, mutate } = useSWR(["/get-grid-data", ...options], ([url, ...arg]) => IngredientServices.getIngredientGridData(url, ...arg))

    return {
        data: {
            dataSource: data?.data.map((item, index: number) => ({
                no: index + 1,
                id: item._id,
                category: item.category.name,
                name: item.name,
                unit: item.unit,
                quantity: item.quantity,
                status: item.status,
                isEdit: false,
                code: item.code,
            })),
            rowCount: data?.meta.total
        },
        isLoading,
        error: error,
        mutate
    }
}

export default useIngredientGridData