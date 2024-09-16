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
    getIngredientGridData: (...options: any) => {
        return IngredientApiIns.get<ResIngredientGridData>(URLS.getGridData, ...options)
    },
    createIngredients: (data: Omit<BaseIngredient, "_id">[], ...options: any) => {
        return IngredientApiIns.post<ResPostIngredient>(URLS.create, data, ...options)
    },
    getIngredientCategories: (...options: any) => {
        return IngredientCategoryApiIns.get<ResGetIngredientCategories>(URLS.getList, ...options)
    },
    getIngredientDiary: (...options: any) => {
        return IngredientApiIns.get<ResGetIngredientDiary>(URLS.getDiary, ...options)
    },
    updateIngredientQuantity: (id: string, data: UpdateQuantityData, ...options: any) => {
        return IngredientApiIns.put<ResPostIngredient>(`${URLS.addQuantity}/${id}`, data, ...options)
    }
}