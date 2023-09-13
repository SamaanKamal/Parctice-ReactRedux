import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

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

export const sendCartData= (cart) =>{
    return async (dispatch) =>  {
        dispatch(uiActions.showNotification({status:'pending', title:'Sending...', message:'Sending cart data!'}));
        const SendRequest = async()=>{
            const response =await fetch("https://reactredux-829fa-default-rtdb.firebaseio.com/cart.json",{method:'PUT',body:JSON.stringify(cart)});
            if(!response.ok)
            {
              throw new Error("Sending cart data failed!");
            }
        };
        try{
            await SendRequest();
            dispatch(uiActions.showNotification({status:'success', title:'success!', message:'sent cart data Successfully!'}));
        }
        catch(error){
            dispatch(uiActions.showNotification({status:'error', title:'Erorr!', message:'Sending cart data failed'})); 
        }

    }
};


export const cartActions = cartSlice.actions;
export default cartSlice.reducer;