import React, { createContext, useState, ReactNode, useContext } from "react";
import { CartItem } from "../types";

interface CartContextType {
  items: CartItem[];
  onAddItem: (item: CartItem) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const onAddItem = (item: CartItem) => {
    setItems([...items, item]);
  };

  return (
    <CartContext.Provider value={{ items, onAddItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
