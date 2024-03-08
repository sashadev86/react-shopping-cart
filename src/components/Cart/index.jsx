import { useState } from 'react';
import CartFooter from '../CartFooter';
import CartHeader from '../CartHeader';
import Product from '../Product';
import data from "../../data";

const Cart = () => {
  const [cart, setCart] = useState(data);

  const deleteProduct = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const products = cart.map((product) => {
    return <Product product={product} deleteProduct={deleteProduct} key={product.id} />;
  });

  return ( 
    <section className="cart">
      <CartHeader />
      {products}
      <CartFooter />
    </section>
   );
}
 
export default Cart;