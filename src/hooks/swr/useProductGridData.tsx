import useSWR from 'swr'
import { ProductServices } from '../../services/product/productServices'

const useProductGridData = (...options: any) => {
    const { data, error, isLoading } = useSWR("/get-grid-data", () => ProductServices.getGridData(...options))

    return {
        data: data?.data.map((item: any) => ({ ...item, id: item._id, category: item.category.name })),
        isLoading,
        isError: error
    }
}

export default useProductGridData