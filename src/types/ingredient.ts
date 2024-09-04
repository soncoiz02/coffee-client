import { BaseCategory } from "./category"

export interface BaseIngredient {
    _id: string
    name: string
    quantity: number
    unit: string
    status: boolean
    code: string
}

export interface ListIngredient extends BaseIngredient {
    category: BaseCategory
}

export interface IngredientWithCategory extends BaseIngredient {
    category: BaseCategory
}

export interface ResGetIngredient {
    status: string
    data: IngredientWithCategory[]
}