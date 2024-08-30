export interface ProductPriceType {
    size: string
    price: number
}

export interface ProductIngredient {
    ingredient: string
    quantity: number
}

export interface BaseProductType {
    name: string
    img: string
    status: boolean
    category: string
}

export interface ProductType extends BaseProductType {
    priceBySize?: ProductPriceType[]
    singlePrice?: number
    ingredient: ProductIngredient[]
}