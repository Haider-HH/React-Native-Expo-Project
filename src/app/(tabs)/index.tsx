import { ScrollView, StyleSheet, View } from 'react-native';
import products from "@/assets/data/products"
import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import ProductList from "@/src/components/ProductList"

export default function MenuScreen() {
  const colorScheme = useColorScheme(); // using this hook, we can know if the phone is set to dark or light mode (the app theme is influenced by the phone them, go to the main_layout.tsx to change this)
  return (
    <ScrollView>
      <View style={styles.container}>
        {products.map((product) => {
          return (
            <ProductList 
            title={product.name}
            price={product.price}
            image={product.image}
            containerStyling={styles.container}
            imageStyling={styles.prodImage}
            titleStyling={styles.prodName}
            priceStyling={styles.priceName}
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
  prodImage: {
    width: '100%',
    aspectRatio: 1, // we use this to specify the height of the object depending on its width, we can give it floating point number too
  },
  prodName: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  priceName: {
    color: Colors.light.tint,
    fontWeight: 'bold'
  },
});
