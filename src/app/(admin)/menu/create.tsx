import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import Button from '@/src/components/Button';

const CreateProductScreen = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const [error, setError] = useState('')

    const resetFields = () => {
        // Save in database (later)
        setName('');
        setPrice('');
    }
    const validateInput = () => {
        if(!name) {
            setError('Name is Required')
        }
    }
    const onCreate = () => {resetFields()}
    return (
        <View style={styles.container}>
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
})