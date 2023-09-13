import './App.css';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {
  const toggleUi = useSelector((state)=>{
    return state.ui.toggleUi;
  });
  return (
    <Layout>
    {toggleUi&&<Cart />}
    <Products />
  </Layout>
  );
}

export default App;
