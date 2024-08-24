import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import React, { useEffect } from "react";
import OrderListItem from "@/src/components/OrderListItem"
import { router, Stack } from 'expo-router';
import { useAdminOrderList } from '@/src/api/orders';
import { supabase } from '@/src/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { useInsertOrderSub } from '@/src/api/orders/subscriptions';
import { Entypo } from '@expo/vector-icons';
import Button from '@/src/components/Button';

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
      { 
      orders!.length > 0 ? 
      <>
        <Stack.Screen options={{headerShown: true, title: `Active (${orders?.length})`}} />
        <FlatList 
          data={orders}
          renderItem={({item}) => <OrderListItem order={item} />}
          contentContainerStyle={{gap: 10, padding: 10}} // For row styling
        />
      </>
      :
      <>
        <Stack.Screen options={{headerShown: true, title: `Active (${orders?.length})`}} />
        <View style={{width: '100%', justifyContent: 'center', alignItems: "center"}}>
          <Entypo 
          name="circle-with-cross"
          size={120}
          color='black'
          style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '50%'}}
          />
          <Text style={{marginRight: 'auto', marginLeft: 'auto', marginTop: 10, fontSize: 20, fontWeight: 'bold'}}>There Are No Active Orders</Text>
        </View>
      </> 
      }
    </View>
    
  );
}
