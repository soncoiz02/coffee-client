import useSWR from 'swr'
import { ProductServices } from '../../services/product/productServices'
import useQueryParams from '../useQueryParams'

const useProductGridData = (...options: any) => {
    const { data, error, isLoading } = useSWR(["/get-grid-data", ...options], ([url, ...arg]) => ProductServices.getGridData(url, ...arg))
    const { getOrderNumberByPage } = useQueryParams()
    return {
        data: {
            dataSource: data?.data.map((item: any, index: number) => ({
                ...item,
                id: item._id,
                category: item.category.name,
                no: getOrderNumberByPage(index + 1)
            })),
            rowCount: data?.meta.total
        },
        isLoading,
        error: error
    }
}

export default useProductGridData