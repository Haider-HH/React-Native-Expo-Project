import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import React from "react";
import OrderListItem from "@/src/components/OrderListItem"
import { Stack } from 'expo-router';
import { useAdminOrderList } from '@/src/api/orders';

export default function OrderScreen() {

  const {data: orders, isLoading, error} = useAdminOrderList({archived: false});

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
      <Stack.Screen options={{headerShown: true, title: "Active"}} />
      <FlatList 
        data={orders}
        renderItem={({item}) => <OrderListItem order={item} />}
        contentContainerStyle={{gap: 10, padding: 10}} //for row styling
      />
    </View>
  );
}