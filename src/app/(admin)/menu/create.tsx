import { View, Text, StyleSheet, TextInput, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import Button from '@/src/components/Button';
import { defaultImage } from '@/src/components/ProductList';
import Colors from '@/src/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { Stack } from 'expo-router';

const CreateProductScreen = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [error, setError] = useState('');
    const [image, setImage] = useState<string | null>(null);

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
        setImage('');
        setName('');
        setPrice('');
    }
    const validateInput = () => {
        setError('')
        if(!name) {
            setError('Name is Required')
            return false;
        }
        if(!price) {
            setError("Price is Required")
            return false;
        }
        if(isNaN(parseFloat(price))) {
            setError('Price is not a number')
            return false;
        }
        return true;

    }
    const onCreate = () => {
        if(!validateInput()) {
            return;
        }
        // submit to the database
        resetFields()
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: 'Create Product'}}/>
            <Image 
                source={{uri: image || defaultImage}}
                style={styles.imageStyling}
            />
            <View style={[{flexDirection: 'row', alignSelf: 'center'}]}>
                <Text onPress={pickImage} style={styles.imageSelection}>Select Image</Text>
                <Pressable onPress={() => setImage('')}>
                    {({ pressed }) => (
                    <FontAwesome
                        name="trash"
                        size={25}
                        color={Colors.light.tint}
                        style={{ marginTop: 5, opacity: pressed ? 0.5 : 1, position: 'absolute', marginLeft: 50 }}
                    />
                    )}
                </Pressable>
            </View>
            <Text style={styles.label}>Name</Text>
            <TextInput 
                placeholder='name'
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholderTextColor={'gainsboro'}
            />
            <Text style={styles.label}>Price ($)</Text>
            <TextInput 
                placeholder='9.99'
                style={styles.input}
                keyboardType='numeric'
                value={price}
                onChangeText={setPrice}
                placeholderTextColor={'gainsboro'}
            />
            <Text style={{color: 'red'}}>{'\t' + error}</Text>
            <Button 
                text="Create"
                onPress={onCreate}
            />

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
    imageStyling: {width: '50%', 
        aspectRatio: 1, 
        alignSelf: 'center',
    }
})