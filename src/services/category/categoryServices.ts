import { ResponstGetListCate } from "../../types/category";
import { BaseApi } from "../baseApi";

const CategoryApiIns = new BaseApi('/category')

const URLS = {
    getList: '/get-list'
}

export const CategoryServices = {
    getList: (...options: any) => {
        return CategoryApiIns.get<ResponstGetListCate>(URLS.getList, ...options)
    }
}