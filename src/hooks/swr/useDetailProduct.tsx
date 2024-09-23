import React from 'react'
import useSWR from 'swr'
import { ProductServices } from '../../services/product/productServices'

const useDetailProduct = (productCode: string, ...options: any) => {
    const { data, error, isLoading } = useSWR([`/get-by-code/${productCode}`, ...options], ([url, ...arg]) => ProductServices.getByCode(url, ...arg))
    return {
        data,
        isLoading,
        error: error
    }
}

export default useDetailProduct