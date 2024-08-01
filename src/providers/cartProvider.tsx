import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
}

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {}
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem['size']) => {
    // if already in cart, increment the quantity of the product
    const newCartItem: CartItem ={
      id: '1', // generate the id
      product,
      product_id: product.id,
      size,
      quantity: 1
    }
    setItems([newCartItem, ...items]);
  }
  
  // Update the quantity

  return (
    <CartContext.Provider value={{items: items, addItem: addItem}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;
export const useCart = () => useContext(CartContext); // This method is used so we don't need to import both CartContext and createContext everytime we need them.