import { ScrollView, StyleSheet, View } from 'react-native';
import products from "@/assets/data/products"
import { useColorScheme } from '@/src/components/useColorScheme';
import ProductList from "@/src/components/ProductList"

export default function MenuScreen() {
  const colorScheme = useColorScheme(); // using this hook, we can know if the phone is set to dark or light mode (the app theme is influenced by the phone them, go to the main_layout.tsx to change this)
  return (
    <ScrollView>
      <View style={styles.container}>
        {products.map((product, keyId) => {
          return (
            <ProductList 
              key={keyId}
              product={product}
            />
          )
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30, 
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 10,
  },
});
