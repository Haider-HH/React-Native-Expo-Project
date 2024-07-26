import { Image, StyleSheet, Text, View } from 'react-native';
import products from "@/assets/data/products"
import EditScreenInfo from '@/src/components/EditScreenInfo';
import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';


export default function TabOneScreen() {
  const colorScheme = useColorScheme(); // using this hook, we can know if the phone is set to dark or light mode (the app theme is influenced by the phone them, go to the main_layout.tsx to change this)
  return (
    <View style={styles.container}>
      <Image 
        source={{uri: products[0].image}}
        style={styles.prodImage}
      />
      <Text style={[styles.prodName]}>
        {products[0].name}
      </Text>
      <Text style={[styles.priceName]}>${products[1].price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30, 
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 10
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
