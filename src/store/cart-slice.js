import { createSlice } from "@reduxjs/toolkit";

const intialCartState = {items: [],totalQuantity:0,changed:false};

const cartSlice = createSlice({
    name:'cart',
    initialState:intialCartState,
    reducers:{
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        },
        addItemToCart(state,action){
            const returnedItem = action.payload;
            const isExistingItem = state.items.find((item) =>{
                return item.id === returnedItem.id
            });
            state.totalQuantity++;
            state.changed =true;
            if(isExistingItem)
            {
                isExistingItem.quantity++;
                isExistingItem.totalPrice =isExistingItem.totalPrice + returnedItem.price;
            }
            else
            {
                state.items.push({id:returnedItem.id, name:returnedItem.title, price:returnedItem.price, quantity:1 ,totalPrice: returnedItem.price} );
            }
        },
        removeItemFromCart(state,action){
            const id = action.payload;
            const isExistingItem = state.items.find((item) =>{
                return item.id === id;
            });
            state.totalQuantity--;
            state.changed =true;
            if(isExistingItem.quantity === 1)
            {
                state.items = state.items.filter((item)=>{
                    return item.id !== id;
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
export default cartSlice;