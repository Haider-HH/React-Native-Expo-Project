import { View, Text, StyleSheet, TextInput, Image, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import Button from '@/src/components/Button';
import { defaultImage } from '@/src/components/ProductList';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import products from '@/assets/data/products';
import { Product } from '@/src/types';

const CreateProductScreen = () => {    
    const { id } = useLocalSearchParams();
    const product = products.find((p: Product) => p.id.toString() === id) // find the specific product to use its details as default values in the update page
    const isUpdating = !!id; //if id is defined, then we are updating the product and not creating it
    const [name, setName] = useState(!isUpdating? "" : product?.name);
    const [price, setPrice] = useState(!isUpdating? "" : product?.price.toString());
    const [error, setError] = useState('');
    const [image, setImage] = useState<string>(!isUpdating? defaultImage : product?.image || defaultImage); // if we have a product

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            aspect: [4, 4],
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    };

    const resetFields = () => {
        // Save in database (later)
        setImage(defaultImage);
        setName('');
        setPrice('');
    }

    const showNoImageAlert = () => {
        return new Promise((resolve) => {
            Alert.alert("Notice", "The product has no image", [
                {
                    text: 'cancel',
                    onPress: () => {
                        setError("Please Upload a Product Image");
                        resolve(false);
                    }
                },
                {
                    text: 'ignore',
                    onPress: () => resolve(true),
                }
            ]);
        });
    }

    const validateInput = async () => {
        setError('');
        if (image === defaultImage) {
            const proceed = await showNoImageAlert();
            if (!proceed) return false;
        }
        if (!name) {
            setError('Name is Required');
            return false;
        }
        if (!price) {
            setError("Price is Required");
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setError('Price is not a number');
            return false;
        }
        return true;
    }

    const onCreate = () => {
        // submit to the database
        resetFields();
    }

    const onUpdate = () => {
        // submit to the database
        resetFields();
    }

    const onSubmit = async () => {
        const isValid = await validateInput();
        if (!isValid) return;

        if (isUpdating) {
            onUpdate();
        } else {
            onCreate();
        }
    }
    const onDelete = () => {
        console.warn('Deleted')
    }

    const confirmDelete = () => {
        Alert.alert("Confirm", "Do you want to delete this product?", [
            {
                text: 'cancel',
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: onDelete,
            }
        ])
    } //this function is called when we want to delete the product (as admins), and it asks for confirmation to avoid accidental delete
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: !isUpdating? 'Create Product' : 'Update Product'}}/>
            <Image 
                source={{uri: image}}
                style={styles.imageStyling}
            />
            <View style={[{flexDirection: 'row', alignSelf: 'center'}]}>
                <Text onPress={pickImage} style={styles.imageSelection}>Select Image</Text>
                <Pressable onPress={() => {
                    setImage(defaultImage)
                    setName('')
                    setPrice('')
                    }}>
                    {({ pressed }) => (
                    <FontAwesome
                        name="trash"
                        size={25}
                        color={Colors.light.tint}
                        style={{ marginTop: 5, opacity: pressed ? 0.5 : 1, position: 'absolute', marginLeft: 50 }}
                    />
                    )}
                </Pressable>
                {isUpdating && <Pressable onPress={() => {
                    setImage(product?.image || defaultImage)
                    setName(product?.name)
                    setPrice(product?.price.toString())
                    }}>
                    {({ pressed }) => (
                    <FontAwesome
                        name="undo"
                        size={25}
                        color={Colors.light.tint}
                        style={{ marginTop: 5, opacity: pressed ? 0.5 : 1, position: 'absolute', marginLeft: 80}}
                    />
                    )}
                </Pressable>}
            </View>
            <Text style={styles.label}>Name</Text>
            <TextInput 
                placeholder={!isUpdating ? 'name' : product?.name}
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholderTextColor={'#BDBDBD'}
            />
            <Text style={styles.label}>Price ($)</Text>
            <TextInput 
                placeholder={!isUpdating ? '9.99' : product?.price.toString()}
                style={styles.input}
                keyboardType='numeric'
                value={price}
                onChangeText={setPrice}
                placeholderTextColor={'#BDBDBD'}
            />
            <Text style={{color: 'red'}}>{'\t' + error}</Text>
            <Button 
                text={ !isUpdating? "Create" : "Update"}
                onPress={onSubmit}
            />
            {isUpdating && (
                <Button 
                    text= 'Delete'
                    onPress={confirmDelete}
                    buttonColor='#D32F2F'
                />
            )}

        </View>
    )
}

export default CreateProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5, 
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        fontSize: 16
    },
    imageSelection: {
        alignSelf: 'center', 
        color: Colors.light.tint, 
        fontWeight: 'bold', 
        marginVertical: 10,
    },
    imageStyling: {
        width: '50%', 
        aspectRatio: 1, 
        alignSelf: 'center',
    }
})