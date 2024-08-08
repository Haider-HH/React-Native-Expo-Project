import { useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native';
import ProductList from "@/src/components/ProductList";
import { useProductList } from '@/src/api/products';

export default function MenuScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: products, error, isLoading, refetch } = useProductList();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch(); // refetch data
    setRefreshing(false);
  };

  if (isLoading && !refreshing) {
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
