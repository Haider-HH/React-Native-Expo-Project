import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import React from "react";
import OrderListItem from "@/src/components/OrderListItem"
import { Stack } from 'expo-router';
import { useUserOrderList } from '@/src/api/orders';

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
      <FlatList 
        data={orders}
        renderItem={({item}) => <OrderListItem order={item} />}
        contentContainerStyle={{gap: 10, padding: 10}} //for row styling
      />
    </View>
  );
}