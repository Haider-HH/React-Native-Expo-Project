import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack } from 'expo-router';
import Colors from '@/src/constants/Colors';
import Button from '@/src/components/Button';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
            <View style={styles.container}>
                <Stack.Screen options={{title: 'Sign up'}}/>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    placeholder='example@gmail.com'
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor={'#BDBDBD'}
                />
                <Text style={styles.label}>Password</Text>
                <View>
                    <TextInput 
                        placeholder='H#ODh1jn42@##$'
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor={'#BDBDBD'}
                        secureTextEntry
                    />
                </View>
                <Button 
                    text= 'Create account'
                    onPress={() => router.push('/')}
                />
                <Link href="/sign-in" style={styles.creatAccount}>Sign in</Link>
            </View>
    )
}

export default SignUp;

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
        borderWidth: 1.5
    },
    creatAccount: {
        alignSelf: 'center', 
        color: Colors.light.tint, 
        fontWeight: 'bold', 
        marginVertical: 10,
    },
})