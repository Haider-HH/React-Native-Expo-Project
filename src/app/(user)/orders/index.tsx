import { ScrollView, StyleSheet, View, FlatList } from 'react-native';
import orders from "@/assets/data/orders"
import { useColorScheme } from '@/src/components/useColorScheme';
import ProductList from "@/src/components/ProductList";
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";
import OrderListItem from "@/src/components/OrderListItem"
import { Stack } from 'expo-router';

export default function OrderScreen() {
  const colorScheme = useColorScheme(); // using this hook, we can know if the phone is set to dark or light mode (the app theme is influenced by the phone them, go to the main_layout.tsx to change this)
  return (
    <View>
      <Stack.Screen options={{headerShown: false}} />
      <FlatList 
        data={orders}
        renderItem={({item, index}) => <OrderListItem order={item} index={orders.length - 1 - index} />}
        contentContainerStyle={{gap: 10, padding: 10}} //for row styling
      />
    </View>
  );
}