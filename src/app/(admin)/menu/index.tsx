import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import ProductList from "@/src/components/ProductList";
import { useProductList } from '@/src/api';

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

// const styles = StyleSheet.create({
//   container: {
//     borderRadius: 30, 
//     backgroundColor: 'white',
//     overflow: 'hidden',
//     padding: 10,
//   },
// });
