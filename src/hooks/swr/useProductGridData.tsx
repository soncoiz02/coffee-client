import useSWR from 'swr'
import { ProductServices } from '../../services/product/productServices'

const useProductGridData = (...options: any) => {
    const { data, error, isLoading } = useSWR("/get-grid-data", (url: string) => ProductServices.getGridData(url, ...options))

    return {
        data: {
            dataSource: data?.data.map((item: any, index: number) => ({ ...item, id: item._id, category: item.category.name, no: index + 1 })),
            rowCount: data?.meta.total
        },
        isLoading,
        error: error
    }
}

export default useProductGridData