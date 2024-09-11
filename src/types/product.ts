import { BaseCategory } from "./category"
import { BaseIngredient } from "./ingredient"

export interface ProductPriceType {
    size: string
    price: number
    _id?: string
}

export interface ProductIngredient {
    ingredient: string
    quantity: number
}

export interface BaseProductType {
    _id: string
    name: string
    img: string
    status: boolean
    category: string
    code?: string
}

export interface ProductType extends BaseProductType {
    priceBySize?: ProductPriceType[]
    singlePrice?: number
    ingredient: ProductIngredient[]
}

export interface BaseProductSize {
    _id: string
    name: string
    code: string
}

export interface ResGetListSize {
    status: string
    data: BaseProductSize[]
}

export interface ExpandIngredient extends Omit<ProductIngredient, "ingredient"> {
    ingredient: BaseIngredient
    quantity: number
}

export interface ResProductIngredient {
    priceType: string
    data: ExpandIngredient[]
}

export interface ProductGridData extends Omit<BaseProductType, "category"> {
    priceBySize: ProductPriceType[]
    singlePrice: number
    ingredient: ResProductIngredient[]
    id: string
    category: string
    no: number
}

export interface GridData extends Omit<BaseProductType, "category"> {
    priceBySize: ProductPriceType[]
    singlePrice: number
    ingredient: ResProductIngredient[]
    category: BaseCategory
}

export interface ResGetGridData {
    status: string
    data: GridData[]
    meta: {
        total: number
    }
}