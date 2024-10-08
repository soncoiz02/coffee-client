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

export interface ResPostIngredient {
    status: string
    message: string
}

export interface IngredientDataSource extends Omit<BaseIngredient, "_id"> {
    no: number
    id: number | string
    category: string
    isEdit: boolean
}

export interface ResGetIngredientCategories {
    status: string
    data: BaseCategory[]
    meta: {
        total: number
    }
}

export interface IngredientGridData extends BaseIngredient {
    category: BaseCategory
}

export interface ResIngredientGridData {
    status: string
    data: IngredientGridData[]
    meta: {
        total: number
    }
}

export interface BaseIngredientDiary {
    _id: string
    content: string
    user: string
    createdAt: string
}

export interface ResGetIngredientDiary {
    status: string
    meta: {
        total: number
    }
    data: BaseIngredientDiary[]
}

export interface IngredienDiarytDataSource extends BaseIngredientDiary {
    id: string
    no: number
}

export interface UpdateQuantityData {
    currentQuantity: number
    additionalQuantity: number
    type: string
}

export interface ResExistByCode {
    exist: boolean
    message?: string
}