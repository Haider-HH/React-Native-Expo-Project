import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { CartItem } from '../types';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useCart } from '../providers/cartProvider';
import { defaultImage } from './ProductList';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import RemoteImage from './RemoteImage';

type CartListItemProps = {
    cartItem: CartItem;
}

const CartListItem = ({ cartItem }: CartListItemProps) => {
    const { updateQuantity } = useCart();
    return (
        <View style={styles.container}>
            <RemoteImage 
                path={cartItem.product.image}
                fallback={defaultImage}
                style={styles.image}
                resizeMode='contain'
            />
            <View style={{flex: 1}}>
                <Text style={styles.title}>
                    {cartItem.product.name}
                </Text>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.price}>
                        ${cartItem.product.price.toFixed(2)}
                    </Text>
                    <Text>
                        Size: {cartItem.size}
                    </Text>
                </View>
            </View>
            <View style={styles.quantitySelector}>
                {cartItem.quantity == 1 ? (
                  <EvilIcons 
                    name="trash"
                    size={22}
                    color='black'
                    style={{paddingBottom: 3}}
                    onPress={() => updateQuantity(cartItem.id, -1)}
                  />
                )
                :
                (
                  <FontAwesome
                    onPress={() => updateQuantity(cartItem.id, -1)}
                    name="minus"
                    color="black"
                    size={15}
                    style={{ padding: 5 }}
                  />
                )
                }
                <Text style={styles.quantity}>{cartItem.quantity}</Text>
                <FontAwesome
                onPress={() => updateQuantity(cartItem.id, 1)}
                name="plus"
                size={15}
                color="black"
                style={{ padding: 5 }}
                />
            </View>
        </View>
    )
}

export default CartListItem;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 5,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 75,
      aspectRatio: 1,
      alignSelf: 'center',
      marginRight: 10,
    },
    title: {
      fontWeight: '500',
      fontSize: 16,
      marginBottom: 5,
    },
    subtitleContainer: {
      flexDirection: 'row',
      gap: 5,
    },
    quantitySelector: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      marginVertical: 10,
    },
    quantity: {
      fontWeight: '500',
      fontSize: 18,
    },
    price: {
      color: Colors.light.tint,
      fontWeight: 'bold',
    },
  });