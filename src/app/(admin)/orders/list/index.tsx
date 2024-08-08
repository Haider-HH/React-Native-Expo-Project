import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import React, { useEffect } from "react";
import OrderListItem from "@/src/components/OrderListItem"
import { Stack } from 'expo-router';
import { useAdminOrderList } from '@/src/api/orders';
import { supabase } from '@/src/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useInsertOrderSub } from '@/src/api/orders/subscriptions';

export default function OrderScreen() {
  // Logging to ensure hooks are called correctly

  const {data: orders, isLoading, error} = useAdminOrderList({archived: false});
  
  useInsertOrderSub();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return (
      <>
        <Text>Failed to fetch data</Text>
        <Text>{error.message}</Text>
      </>
    );
  }

  return (
    <View>
      <Stack.Screen options={{headerShown: true, title: "Active"}} />
      <FlatList 
        data={orders}
        renderItem={({item}) => <OrderListItem order={item} />}
        contentContainerStyle={{gap: 10, padding: 10}} // For row styling
      />
    </View>
  );
}
