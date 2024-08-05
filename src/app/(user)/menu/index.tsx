import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import ProductList from "@/src/components/ProductList";
import { supabase } from '@/src/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/src/types';
import { useProductList } from '@/src/api';
// this file renders the available products to the user (renders every product as a ProductList.tsx component)

// the FlatList component allows us to render a list of items both horizontally and vertically

export default function MenuScreen() {

  const { data: products, error, isLoading } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch products :(</Text>
  }

  return (
    <View>
      <FlatList 
        data={products}
        renderItem={({item}) => <ProductList product={item} />}
        numColumns={2}
        contentContainerStyle={{gap: 10, padding: 10}} //for row styling
        columnWrapperStyle={{gap: 10}} //for column styling
      />
    </View>
  );
}
