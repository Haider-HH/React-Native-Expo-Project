import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack } from 'expo-router';
import Colors from '@/src/constants/Colors';
import Button from '@/src/components/Button';
import { Entypo } from '@expo/vector-icons';
import { supabase } from '@/src/lib/supabase';

const SignUp = () => {
    const [form, setForm] = useState({email: '', password: ''});
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // this function connects the backend with the frontend.
    const signUpWithEmail = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: form.email,
            password: form.password
        });

        if (error) {
            Alert.alert("Error", error.message)
        }
        setLoading(false);
    }
    // the validateInput and onSubmit has no use for now (4/8/2024)
    // const validateInput = () => {
    //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //     if (!form.email) {
    //         setError('Email is required')
    //         return false;
    //     }
    //     if (!emailPattern.test(form.email)) {
    //         setError('Invalid email address');
    //         return false;
    //     }
    //     if (!form.password) {
    //         setError('Password is required')
    //         return false;
    //     }
    //     if (form.password.length > 0 && form.password.length < 8) {
    //         setError('Password should be atleast 8 characters long')
    //         return false;
    //     }
    //     return true;
    // }
    
    // const onSubmit = () => {
    //     if (!validateInput()) {
    //         return;
    //     }
    //     else {
    //         setForm({email: '', password: ''})
    //         setError('')
    //         router.push('/(user)')
    //     }
    // };

    const handlePasswordChange = (text: string) => {
        // Filter out characters with ASCII values outside the range 32 to 126
        const filteredText = text.split('').filter(char => {
          const asciiValue = char.charCodeAt(0);
          return asciiValue >= 32 && asciiValue <= 126;
        }).join('');
    
        setForm({ ...form, password: filteredText });
      };

    return (
            <View style={styles.container}>
                <Stack.Screen options={{title: 'Sign up'}}/>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    placeholder='example@gmail.com'
                    style={styles.input}
                    value={form.email}
                    onChangeText={(e) => setForm({...form, email: e})}
                    placeholderTextColor={'#BDBDBD'}
                    keyboardType='email-address'
                />
                <Text style={styles.label}>Password</Text>
                <View>
                    <TextInput 
                        placeholder='H#ODh1jn42@##$'
                        style={styles.input}
                        value={form.password}
                        onChangeText={handlePasswordChange}
                        placeholderTextColor={'#BDBDBD'}
                        secureTextEntry = {!showPassword}
                        maxLength={48}
                    />
                    <Pressable onPress={() => setShowPassword((prevState) => !prevState)} style={{ position: 'absolute', marginTop: 20, right: 10 }}>
                        {({ pressed }) => (
                        <Entypo
                            name={showPassword ? 'eye' : 'eye-with-line'}
                            size={20}
                            style={{ opacity: pressed ? 0.5 : 1 }}
                        />
                        )}
                    </Pressable>
                </View>
                <Text style={{color: 'red'}}>{'\t' + error}</Text>
                <Button 
                    text= {!loading? 'Create account' : 'Creating account...'}
                    onPress={signUpWithEmail}
                    disabled={loading}
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