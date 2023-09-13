import { createSlice } from "@reduxjs/toolkit";

const intialCartState = {items: [],totalQuantity:0};

const cartSlice = createSlice({
    name:'cart',
    initialState:intialCartState,
    reducers:{
        addItemToCart(state,action){
            const returnedItem = action.payload;
            const isExistingItem = state.items.find((item) =>{
                return item.itemId === returnedItem.id
            });
            state.totalQuantity++;
            if(isExistingItem)
            {
                isExistingItem.quantity++;
                isExistingItem.totalPrice =isExistingItem.totalPrice + returnedItem.price;
            }
            else
            {
                state.items.push({itemId:returnedItem.id, name:returnedItem.title, price:returnedItem.price, quantity:1 ,totalPrice: returnedItem.price} );
            }
        },
        removeItemFromCart(state,action){
            const id = action.payload;
            const isExistingItem = state.items.find((item) =>{
                return item.itemId === id;
            });
            state.totalQuantity--;
            if(isExistingItem.quantity === 1)
            {
                state.items = state.items.filter((item)=>{
                    return item.itemId !== id;
                });
            }
            else
            {
                isExistingItem.quantity--;
                isExistingItem.totalPrice = isExistingItem.totalPrice - isExistingItem.price;
            } 
        },
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;