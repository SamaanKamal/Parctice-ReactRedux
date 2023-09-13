import { configureStore } from "@reduxjs/toolkit";
import cart from './cart-slice';
import ui from './ui-slice';

const store = configureStore({
    reducer:{
        cart:cart.reducer,
        ui:ui.reducer
    }
});

export default store;
