import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react';
import { useCart } from '../providers/cartProvider';

const CartScreen = () => {

  const { items } = useCart(); 

  return (
    <View>
      <FlatList 
        data={items}
        renderItem={() => {}}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}


export default CartScreen