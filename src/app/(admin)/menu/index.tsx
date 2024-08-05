import { ScrollView, StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import products from "@/assets/data/products"
import { useColorScheme } from '@/src/components/useColorScheme';
import ProductList from "@/src/components/ProductList";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProductList } from '@/src/api';

export default function MenuScreen() {
  const colorScheme = useColorScheme(); // using this hook, we can know if the phone is set to dark or light mode (the app theme is influenced by the phone them, go to the main_layout.tsx to change this)
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
