import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isShow: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isShow = true
        },
        hideLoading: (state) => {
            state.isShow = false
        }
    }
})

export const { showLoading, hideLoading } = loadingSlice.actions

export default loadingSlice.reducer