import React from 'react'
import useSWR from 'swr'
import { ProductServices } from '../../services/product/productServices'

const useProductFilterValueOptions = (...options: any) => {
    const { data, error, isLoading } = useSWR(["/filter-value-options", ...options], ([url, ...arg]) => ProductServices.getFilterValueOptions(url, ...arg))
    return {
        data: data?.data,
        isLoading,
        error: error,
    }
}

export default useProductFilterValueOptions