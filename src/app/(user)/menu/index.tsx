import { View, FlatList } from 'react-native';
import products from "@/assets/data/products"
import ProductList from "@/src/components/ProductList";

// this file renders the available products to the user (renders every product as a ProductList.tsx component)

// the FlatList component allows us to render a list of items both horizontally and vertically

export default function MenuScreen() {
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
