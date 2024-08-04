import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform, FlatList, Alert } from 'react-native'
import React from 'react';
import { useCart } from '../providers/cartProvider';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';


// this file renders the cart screen (shows the details of the current order [this screen is for the user only])

const CartScreen = () => {

  const { items, total } = useCart(); // it uses context instead of props to avoid something called "props drilling"

  return (
    <View style={{backgroundColor: 'white', flex: 1, padding: 10}}>
      { items.length > 0 ? 
      <>
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
          contentContainerStyle={{gap: 10}}
        />
        <Text style={{fontSize: 20, fontWeight: '500', marginTop: 10}}>
          Total Price: ${total}
        </Text>
        <Button text="Checkout" onPress={() => Alert.alert('Checkout', "Order Completed Successfully :)")}/>
      </> 
      : 
      <View>
        <Entypo 
          name="circle-with-cross"
          size={120}
          color='black'
          style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '50%'}}
        />
        <Text style={{marginRight: 'auto', marginLeft: 'auto', marginTop: 10, fontSize: 20, fontWeight: 'bold'}}>The Cart is Empty</Text>
        <Button 
          text='Back To Menu'
          onPress={() => router.push('/(user)/menu/')}  
        />
      </View>
      }

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}


export default CartScreen