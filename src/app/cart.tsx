import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform, FlatList, Alert, BackHandler } from 'react-native'
import React, { useEffect } from 'react';
import CartListItem from '../components/CartListItem';
import Button from '../components/Button';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import Colors from '../constants/Colors';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearCart, selectCart } from '../features/cart/cartSlice';
import { useInsertOrder } from '../api/orders';
import { useInsertOrderItems } from '../api/order-items';
import { Tables } from '../types';
import { initializePaymentSheet, openPaymentSheet } from '../lib/stripe';


// this file renders the cart screen (shows the details of the current order [this screen is for the user only])

const CartScreen = () => {

  // const { items, total, checkoutWithCard, checkoutCash } = useCart(); // it uses context instead of props to avoid something called "props drilling"
  const { items, total } = useAppSelector(selectCart);
  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();

  const dispatch = useAppDispatch();

  const saveOrderItems = (order: Tables<'orders'>) => {
    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }))    
    insertOrderItems(orderItems, {
      onSuccess() {
        dispatch(clearCart());
        router.push(`/(user)/orders/`);
    }});
  }

  const checkoutWithCard = async () => {
    const initialized = await initializePaymentSheet(Math.round(total * 100));
    if (!initialized) {
        Alert.alert("Error", "Failed to initialize payment sheet");
        return;
    }
    const payed = await openPaymentSheet();
    if (!payed) {
        return;
    }
    insertOrder({
        total,
        user_id: ""
    }, { onSuccess: saveOrderItems });
  };

  const handleCashCheckout = () => {
    console.log("checkoutCash action triggered");

    insertOrder(
      {
        total,
        user_id: '', // Add correct user_id logic here
      },
      {
        onSuccess: (order) => {
          console.log("Order successfully created", order);
          saveOrderItems(order);
        },
      }
    );
  };

  useEffect(() => {
    const backAction = () => {
        router.back();
        return true;
    };

    const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
    );

    return () => backHandler.remove();
  }, []);

  const confirmPaymentType = () => {
    Alert.alert("Checkout", "Specify Payment Method", [
      {
        text: 'Cancel',
        style: 'destructive',
        onPress: () => console.log('Cancelled'),
      },
      {
        text: 'Cash',
        onPress: handleCashCheckout,
      },
      {
        text: 'Card',
        onPress: checkoutWithCard,
      },
    ]);
  };
  

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
      <>
        <Text style={{fontSize: 20, fontWeight: '500', marginTop: 10}}>
            Total Price: {''}
            <Text style={{color: Colors.light.tint}}>
                ${total}
            </Text>
        </Text>
      </>
      <Button text="Checkout" onPress={confirmPaymentType} buttonColor='green' />
      <Button text="Menu" onPress={() => router.push('/(user)/menu')} />
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