import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./feature/loadingSlice";
import ingredientSlice from "./feature/ingredientSlice";
// ...
const store = configureStore({
    reducer: {
        loading: loadingReducer,
        ingredient: ingredientSlice
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;