import { configureStore } from "@reduxjs/toolkit"
import { mainApi } from "./mainApi.js"
import { userSlice } from "../Authentication/AuthSlice/userSlice.js"
import { cartSlice } from "../Authentication/AuthSlice/cartSlice.js"

export const store = configureStore({
    reducer: {
        [mainApi.reducerPath]:mainApi.reducer,
        [userSlice.name]:userSlice.reducer,
        [cartSlice.name]:cartSlice.reducer, //reducer join garesi sabai detail store le paucha ani sabia thau ma provide gardincha (state ra actions haru)
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(mainApi.middleware)
        
})