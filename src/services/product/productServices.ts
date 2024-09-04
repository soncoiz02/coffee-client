import { ProductType, ResGetListSize } from "../../types/product";
import { BaseApi } from "../baseApi";

const ProductApiIns = new BaseApi('/product')

const URLS = {
    create: "/create-product",
    getSize: "/get-list-size"
}

type CreateProductRes = {
    status: string
    message: string
}

export const ProductServices = {
    createProduct: (data: ProductType, ...options: any) => {
        return ProductApiIns.post<CreateProductRes>(URLS.create, {
            data,
            ...options
        })
    },
    getListSize: (...options: any) => {
        return ProductApiIns.get<ResGetListSize>(URLS.getSize, ...options)
    }
}
