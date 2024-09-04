export interface BaseCategory {
    _id: string
    name: string
    code: string
}

export interface ResponstGetListCate {
    status: string
    data: BaseCategory[]
}