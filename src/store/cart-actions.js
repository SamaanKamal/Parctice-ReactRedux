import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData= () =>{
    return async (dispatch) =>  {
        const fetchData = async()=>{
            const response =await fetch("https://reactredux-829fa-default-rtdb.firebaseio.com/cart.json");
            if(!response.ok)
            {
              throw new Error("Loading cart data failed!");
            }
            const data = await response.json();
            return data;
        };
        try{
            const cartData =await fetchData();
            dispatch(cartActions.replaceCart({items:cartData.items || [], totalQuantity:cartData.totalQuantity}));
        }
        catch(error){
            dispatch(uiActions.showNotification({status:'error', title:'Erorr!', message:'Loading cart data failed'})); 
        }

    }
};

export const sendCartData= (cart) =>{
    return async (dispatch) =>  {
        dispatch(uiActions.showNotification({status:'pending', title:'Sending...', message:'Sending cart data!'}));
        const sendRequest = async()=>{
            const response =await fetch("https://reactredux-829fa-default-rtdb.firebaseio.com/cart.json",{method:'PUT',body:JSON.stringify({items:cart.items,totalQuantity:cart.totalQuantity})});
            if(!response.ok)
            {
              throw new Error("Sending cart data failed!");
            }
        };
        try{
            await sendRequest();
            dispatch(uiActions.showNotification({status:'success', title:'success!', message:'sent cart data Successfully!'}));
        }
        catch(error){
            dispatch(uiActions.showNotification({status:'error', title:'Erorr!', message:'Sending cart data failed'})); 
        }

    }
};
