import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Tables } from "../types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../api/orders";
import { router } from "expo-router";
import { useInsertOrderItems } from "../api/order-items";
import { initializePaymentSheet, openPaymentSheet } from "../lib/stripe";


type CartType = {
  items: CartItem[];
  addItem: (product: Tables<'products'>, size: CartItem['size']) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkoutWithCard: () => void;
  checkoutCash: () => void;
}

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkoutWithCard: () => {},
  checkoutCash: () => {}
});

const CartProvider = ({ children }: PropsWithChildren) => {

  const [items, setItems] = useState<CartItem[]>([]);
  const {mutate: insertOrder} = useInsertOrder();
  const {mutate: insertOrderItems} = useInsertOrderItems();

  const addItem = (product: Tables<'products'>, size: CartItem['size']) => {
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

  const total = parseFloat(items.reduce((totalPrice, item) => {return totalPrice + (item.product.price*item.quantity)}, 0).toFixed(3));

  const clearCart = () => {
    setItems([]);
  }

  const checkoutWithCard = async () => {
    await initializePaymentSheet(Math.floor(total*100));
    const payed = await openPaymentSheet();
    if (!payed) {
      return;
    }
    insertOrder({
      total,
      user_id: ""
    }, {onSuccess: saveOrderItems})
  };

  const checkoutCash = () => {
    insertOrder({
      total,
      user_id: ""
    }, {onSuccess: saveOrderItems})
  }
  
  const saveOrderItems = (order: Tables<'orders'>) => {

    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }))    
    insertOrderItems(orderItems, {
      onSuccess() {
        clearCart();
        router.push(`/(user)/orders/`);

    }});
  }

  return (
    <CartContext.Provider value={{items: items, addItem: addItem, updateQuantity: updateQuantity, total: total, checkoutWithCard: checkoutWithCard, checkoutCash: checkoutCash}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;
export const useCart = () => useContext(CartContext); // This method is used so we don't need to import both CartContext and createContext everytime we need them.