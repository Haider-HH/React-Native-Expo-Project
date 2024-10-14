import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Tables } from "../../types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "../../api/orders";
import { router } from "expo-router";
import { useInsertOrderItems } from "../../api/order-items";
import { initializePaymentSheet, openPaymentSheet } from "../../lib/stripe";
import { Alert } from "react-native";
import { createAppAsyncThunk } from "@/src/redux/withTypes";
import { AppDispatch, AppThunk, RootState } from "@/src/redux/store";

// checkoutWithCard: () => void;
// checkoutCash: () => void;
// addItem: (product: Tables<'products'>, size: CartItem['size']) => void;
// updateQuantity: (itemId: string, amount: -1 | 1) => void;

type CartType = {
    items: CartItem[];
    total: number;
}

const initialState: CartType = {
    items: [],
    total: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            const prod = state.items.find(item => item.product.id === newItem.product.id && item.size === newItem.size);

            if (prod) {
                prod.quantity += 1;
            }
            else {
                state.items.push(newItem);
            }
            state.total = calculateTotal(state.items);

        },
        updateQuantity: (state, action: PayloadAction<{ itemId: string, amount: -1 | 1 }>) => {
            const { itemId, amount } = action.payload;
            state.items = state.items
                .map(item => item.id !== itemId ? item : {...item, quantity: item.quantity+amount})
                .filter((item) => item.quantity > 0);
            state.total = calculateTotal(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
    },
    extraReducers: (builder) => {

    }
});

const calculateTotal = (items: CartItem[]) => { // helper function used in the reducers
    return parseFloat(items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(3));
};

export const addItemWithUUID = createAppAsyncThunk(
    'cart/addItemWithUUID',
    async ({ product, size }: { product: Tables<'products'>; size: CartItem['size'] }, { dispatch }) => {
        const newItem: CartItem = {
          id: randomUUID(), // Generate UUID here
          product,
          product_id: product.id,
          size,
          quantity: 1,
        };
    
        dispatch(addItem(newItem));
    }
);





export const { addItem, updateQuantity, clearCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart
export default cartSlice.reducer;