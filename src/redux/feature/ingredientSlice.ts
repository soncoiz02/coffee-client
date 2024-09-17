import { createSlice } from "@reduxjs/toolkit"
import { deepCopy } from "../../utils/deepCopy"

const initialState = {
    updateQuantity: {
        id: '',
        type: '',
        unit: '',
        quantity: 0,
        name: ''
    },
    gridDataSource: [
        {
            no: 0,
            id: "",
            category: "",
            name: "",
            unit: "",
            quantity: 0,
            status: true,
            isEdit: false,
            code: "",
        }
    ]
}

const ingredientSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setUpdateQuantity: (state, action) => {
            state.updateQuantity = { ...action.payload }
        },
        setGridDataSource: (state, action) => {
            state.gridDataSource = action.payload
        },
        updateGridQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const currentGridDataSource = deepCopy(state.gridDataSource)
            state.gridDataSource = currentGridDataSource.map((item: any) => ({
                ...item,
                ...(item.id === id && {
                    quantity
                })
            }))
        }
    }
})

export const { setUpdateQuantity, setGridDataSource, updateGridQuantity } = ingredientSlice.actions

export default ingredientSlice.reducer