import { BaseIngredient, ResGetIngredient, ResGetIngredientCategories, ResGetIngredientDiary, ResIngredientGridData, ResPostIngredient, UpdateQuantityData } from "../../types/ingredient";
import { BaseApi } from "../baseApi";

const IngredientApiIns = new BaseApi('/ingredient')
const IngredientCategoryApiIns = new BaseApi('/ingre-category')

const URLS = {
    getList: '/get-list',
    create: '/create-ingredient',
    getGridData: '/get-grid-data',
    getDiary: '/get-diary',
    addQuantity: '/update-quantity'
}

export const IngredientServices = {
    getListIngredients: (...options: any) => {
        return IngredientApiIns.get<ResGetIngredient>(URLS.getList, ...options)
    },
    getIngredientGridData: (url: string, ...options: any) => {
        return IngredientApiIns.get<ResIngredientGridData>(url, ...options)
    },
    createIngredients: (data: Omit<BaseIngredient, "_id">[], ...options: any) => {
        return IngredientApiIns.post<ResPostIngredient>(URLS.create, data, ...options)
    },
    getIngredientCategories: (url: string, ...options: any) => {
        return IngredientCategoryApiIns.get<ResGetIngredientCategories>(url, ...options)
    },
    getIngredientDiary: (url: string, ...options: any) => {
        return IngredientApiIns.get<ResGetIngredientDiary>(url, ...options)
    },
    updateIngredientQuantity: (id: string, data: UpdateQuantityData, ...options: any) => {
        return IngredientApiIns.put<ResPostIngredient>(`${URLS.addQuantity}/${id}`, data, ...options)
    }
}