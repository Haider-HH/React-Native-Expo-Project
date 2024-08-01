import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";


type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: CartItem['size']) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
}

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {}
});

const CartProvider = ({ children }: PropsWithChildren) => {

  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem['size']) => {
    // if already in cart, increment the quantity of the product
    const prod = items.find(item => item.product === product && item.size === size);
    if (prod) {
      updateQuantity(prod.id, 1);
      return;
    }
    const newCartItem: CartItem = {
      id: randomUUID(), // generate the id
      product,
      product_id: product.id,
      size,
      quantity: 1
    }
    setItems([newCartItem, ...items]);
  }
  // Update the quantity
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items.map(item => item.id !== itemId ? item : {...item, quantity: item.quantity+amount}).filter((item) => item.quantity > 0);
    setItems(updatedItems)
  }

  return (
    <CartContext.Provider value={{items: items, addItem: addItem, updateQuantity: updateQuantity}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;
export const useCart = () => useContext(CartContext); // This method is used so we don't need to import both CartContext and createContext everytime we need them.