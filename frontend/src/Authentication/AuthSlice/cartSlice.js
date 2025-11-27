import { createSlice } from "@reduxjs/toolkit";
import { getCartsFromLocal, setCartsToLocal } from "../Local/local";

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState: { //initial value that is fetched from db
        carts: getCartsFromLocal(),
    },
    reducers: {
        setCart: (state, action) => {

            //for more than 1 same product
            //checks whether or not added to card previously
            const isExist = state.carts.find(item => item.id === action.payload.id);
            if (isExist) {
                state.carts = state.carts.map((cart) => {
                    return cart.id === action.payload.id ? action.payload : cart;
                })
                setCartsToLocal(state.carts);
            } else {

                state.carts = [...state.carts, action.payload]; //'...' le garda paila ko info sangai pachi add gareko info join huncha
                setCartsToLocal(state.carts);
            }
        },
        removeCart: (state, action) => {
            state.carts = state.carts.filter(item => item.id !== action.payload.id);
            setCartsToLocal(state.carts);
        },
        clearCart: (state) => {
            state.carts = []
            setCartsToLocal(state.carts);
        }
    }

})
export const { setCart, removeCart, clearCart } = cartSlice.actions;