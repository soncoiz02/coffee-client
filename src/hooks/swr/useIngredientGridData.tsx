import useSWR from 'swr'
import { IngredientServices } from '../../services/ingredient/ingredientServices'
import useQueryParams from '../useQueryParams'

const useIngredientGridData = (...options: any) => {
    const { data, error, isLoading, mutate } = useSWR(["/get-grid-data", ...options], ([url, ...arg]) => IngredientServices.getIngredientGridData(url, ...arg))
    const { getOrderNumberByPage } = useQueryParams()
    return {
        data: {
            dataSource: data?.data.map((item, index: number) => ({
                no: getOrderNumberByPage(index + 1),
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