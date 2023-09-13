import './App.css';
import React,{ useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const cart = useSelector((state)=>{
    return state.cart;
  });

  const toggleUi = useSelector((state)=>{
    return state.ui.toggleUi;
  });

  const notification = useSelector((state)=>{
    return state.ui.notification;
  });

  const dispatch = useDispatch();
  useEffect(()=>{
    const sendCartData = async()=>{
      dispatch(uiActions.showNotification({status:'pending', title:'Sending...', message:'Sending cart data!'}));
      const response =await fetch("https://reactredux-829fa-default-rtdb.firebaseio.com/cart.json",{method:'PUT',body:JSON.stringify(cart)});
      if(!response.ok)
      {
        throw new Error("Sending cart data failed!");
      }
      dispatch(uiActions.showNotification({status:'success', title:'success!', message:'sent cart data Successfully!'}));
    }
    
    if (isInitial) {
      isInitial = false;
      return;
    }
    
    sendCartData().catch((error) =>{
      dispatch(uiActions.showNotification({status:'error', title:'Erorr!', message:'Sending cart data failed'}));
    });

  },[cart,dispatch]);

  return (
    <React.Fragment>
      {notification&&<Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
      {toggleUi&&<Cart />}
      <Products />
      </Layout>

    </React.Fragment>
  );
}

export default App;
