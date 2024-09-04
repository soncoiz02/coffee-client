import { ResGetIngredient } from "../../types/ingredient";
import { BaseApi } from "../baseApi";

const IngredientApiIns = new BaseApi('/ingredient')

const URLS = {
    getList: '/get-list'
}

export const IngredientServices = {
    getListIngredients: (...options: any) => {
        return IngredientApiIns.get<ResGetIngredient>(URLS.getList, ...options)
    }
}