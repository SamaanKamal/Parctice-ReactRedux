import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {uiActions} from '../../store/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartItemsNumber = useSelector((state)=>{
    return state.cart.totalQuantity;
  });

  const toggleMyCartHandler =() =>{
    dispatch(uiActions.switchUi());
  };
  return (
    <button className={classes.button} onClick={toggleMyCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartItemsNumber}</span>
    </button>
  );
};

export default CartButton;
