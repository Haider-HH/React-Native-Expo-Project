import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { defaultImage } from '@/src/components/ProductList';
import { FontAwesome } from '@expo/vector-icons';
import { Link, router, Stack } from 'expo-router';
import Colors from '@/src/constants/Colors';
import Button from '@/src/components/Button';
import Entypo from '@expo/vector-icons/Entypo';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const validateInput = () => {
        if (!email) {
            setError('Email is required')
            return false;
        }
        if (!password) {
            setError('Password is required')
            return false;
        }
        if (password.length > 0 && password.length < 8) {
            setError('Password should be atleast 8 characters long')
            return false;
        }
        return true;
    }
    
    const onSubmit = () => {
        if (!validateInput) {
            return;
        }
        else {
            router.push('/(user)')
        }
    }

    return (
            <View style={styles.container}>
                <Stack.Screen options={{title: 'Sign in'}}/>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    placeholder='Enter Email...'
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor={'#BDBDBD'}
                    keyboardType='email-address'
                />
                <Text style={styles.label}>Password</Text>
                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                        placeholder='Enter Password...'
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor={'#BDBDBD'}
                        secureTextEntry = {!showPassword}
                        maxLength={48}
                    />
                    <Pressable onPress={() => setShowPassword((prevState) => !prevState)} style={{ position: 'absolute', marginTop: 20, right: 10 }}>
                        {({ pressed }) => (
                        <Entypo
                            name={showPassword ? 'eye' : 'eye-with-line'}
                            size={20}
                            style={{ opacity: pressed ? 0.5 : 1}}
                        />
                        )}
                    </Pressable>
                </View>
                <Text style={{color: 'red'}}>{'\t' + error}</Text>
                <Button 
                    text= 'Sign in'
                    onPress={onSubmit}
                />
                <Link href="/sign-up" style={styles.creatAccount}>Create an account</Link>
            </View>
    )
}

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
    },
    label: {
        color: 'gray',
        fontSize: 16
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5, 
        marginBottom: 20,
        borderColor: '#9E9E9E',
        borderWidth: 1.5,
        width: '100%'
    },
    creatAccount: {
        alignSelf: 'center', 
        color: Colors.light.tint, 
        fontWeight: 'bold', 
        marginVertical: 10,
    },
})