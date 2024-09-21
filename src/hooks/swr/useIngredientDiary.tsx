import useSWR from 'swr'
import { IngredientServices } from '../../services/ingredient/ingredientServices'
import useQueryParams from '../useQueryParams'

const useIngredientDiary = (...options: any) => {
    const { data, error, isLoading } = useSWR(["/get-diary", ...options], ([url, ...arg]) => IngredientServices.getIngredientDiary(url, ...arg))
    const { getOrderNumberByPage } = useQueryParams()
    return {
        data: {
            dataSource: data?.data ? data.data.map((item, index: number) => ({
                no: getOrderNumberByPage(index + 1),
                id: item._id,
                ...item
            })) : [],
            rowCount: data?.meta.total
        },
        isLoading,
        error: error,
    }
}

export default useIngredientDiary