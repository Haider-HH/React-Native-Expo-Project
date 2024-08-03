import { View, FlatList } from 'react-native';
import orders from "@/assets/data/orders"
import React from "react";
import OrderListItem from "@/src/components/OrderListItem"
import { Stack } from 'expo-router';

export default function OrderScreen() {
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