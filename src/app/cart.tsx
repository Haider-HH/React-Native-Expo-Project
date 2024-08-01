import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform, FlatList } from 'react-native'
import React from 'react';
import { useCart } from '../providers/cartProvider';
import CartListItem from '../components/CartListItem';

const CartScreen = () => {

  const { items } = useCart(); 

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <FlatList 
        data={items}
        renderItem={({ item }) => {
          return(
            <View>
              <CartListItem cartItem={item} />
              <View style={{borderBottomColor: 'black', borderBottomWidth: 0.5}} />
            </View>
          )
        }}
        contentContainerStyle={{padding: 10, gap: 10}}
      />
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}


export default CartScreen