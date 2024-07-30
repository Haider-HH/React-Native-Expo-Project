import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform } from 'react-native'
import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../providers/cartProvider';

const CartScreen = () => {
  const cartContext = useContext(CartContext)

  if (!cartContext){
    return;
  } //handles the case of the cartContext being undefined

  const { items } = cartContext

  return (
    <View>
      <Text>Cart items length: {items.length}</Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}


export default CartScreen