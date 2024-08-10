import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import React from "react";
import OrderListItem from "@/src/components/OrderListItem"
import { router, Stack } from 'expo-router';
import { useUserOrderList } from '@/src/api/orders';
import { Entypo } from '@expo/vector-icons';
import Button from '@/src/components/Button';

// this file renders a list of orders (as a OrderListItem component) that belong to the user 
// If you are reading this before implementing the backend, then you should know that this file renders hard coded data from a file called (orders.ts)

export default function OrderScreen() {

  const {data: orders, error, isLoading} = useUserOrderList();

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return (
      <>
        <Text>Failed to fetch data</Text>
        <Text>{error.message}</Text>
      </>
    )
  }

  return (
    <View>
      <Stack.Screen options={{headerShown: true, title: "Orders"}} />
      {
      orders!.length > 0 ? 
      <FlatList 
        data={orders}
        renderItem={({item}) => <OrderListItem order={item} />}
        contentContainerStyle={{gap: 10, padding: 10}} //for row styling
      />
      :
      <View>
        <Entypo 
        name="circle-with-cross"
        size={120}
        color='black'
        style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '50%'}}
        />
        <Text style={{marginRight: 'auto', marginLeft: 'auto', marginTop: 10, fontSize: 20, fontWeight: 'bold'}}>You haven't ordered anything yet 🙁</Text>
        <Button 
          text='Back To Menu'
          onPress={() => router.push('/(user)/menu/')}  
        />
      </View>
      }
    </View>
  );
}