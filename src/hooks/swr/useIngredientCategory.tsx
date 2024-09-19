import useSWR from 'swr'
import { IngredientServices } from '../../services/ingredient/ingredientServices'
import useQueryParams from '../useQueryParams'

const useIngredientCategory = (...options: any) => {
    const { data, error, isLoading } = useSWR(["/get-list", ...options], ([url, ...arg]) => IngredientServices.getIngredientCategories(url, ...arg))
    const { getOrderNumberByPage } = useQueryParams()
    return {
        data: {
            dataSource: data?.data.map((item, index: number) => ({
                no: getOrderNumberByPage(index + 1),
                id: item._id,
                ...item
            })),
            rowCount: data?.meta?.total || 0,
            valueOptions: data?.data.map((item) => ({
                value: item._id,
                label: item.name
            }))
        },
        isLoading,
        error: error,
    }
}

export default useIngredientCategory