import { useEffect, useState } from 'react';
import CartFooter from '../CartFooter';
import CartHeader from '../CartHeader';
import Product from '../Product';
import data from "../../data";

const Cart = () => {
  const [cart, setCart] = useState(data);
  const [total, setTotal] = useState({
    price: cart.reduce((prev, cur) => prev + cur.priceTotal, 0),
    count: cart.reduce((prev, cur) => prev + cur.count, 0)
  });

  useEffect(() => {
    setTotal({
      price: cart.reduce((prev, cur) => prev + cur.priceTotal, 0),
      count: cart.reduce((prev, cur) => prev + cur.count, 0)
    });
  }, [cart]);

  const deleteProduct = (id) => {
    setCart(cart.filter((product) => product.id !== id));
  };

  const increase = (id) => {
    setCart(cart.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          count: product.count + 1,
          priceTotal: (product.count + 1) * product.price,
        };
      }
      return product;
    }))
  }

  const decrease = (id) => {
    setCart(cart.map((product) => {
      if (product.id === id) {
        const newCount = product.count - 1 > 1 ? product.count - 1 : 1;

        return {
          ...product,
          count: newCount,
          priceTotal: newCount * product.price,
        };
      }
      return product;
    }))
  }

  const changeValue = (id, value) => {
    setCart(cart.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          count: value,
          priceTotal: value * product.price,
        };
      }
      return product;
    }))
  }

  const products = cart.map((product) => {
    return (
      <Product
        product={product}
        deleteProduct={deleteProduct}
        increase={increase}
        decrease={decrease}
        changeValue={changeValue}
        key={product.id}
      />
    )
  });

  return (
    <section className="cart">
      <CartHeader />
      {products}
      <CartFooter total={total} />
    </section>
  );
}

export default Cart;