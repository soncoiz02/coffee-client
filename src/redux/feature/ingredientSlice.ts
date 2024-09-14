import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    updateQuantity: {
        id: '',
        type: ''
    }
}

const ingredientSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setUpdateQuantity: (state, action) => {
            state.updateQuantity = { ...action.payload }
        }
    }
})

export const { setUpdateQuantity } = ingredientSlice.actions

export default ingredientSlice.reducer