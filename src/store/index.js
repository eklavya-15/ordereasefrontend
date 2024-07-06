import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./CartSlice";
import UserReducer from "./userslice";

const store = configureStore({

    reducer: {
        cart: CartReducer,
        user: UserReducer,
    }

});

export default store;