import { View, Text, StyleSheet, TextInput, Pressable, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router';
import Colors from '@/src/constants/Colors';
import Button from '@/src/components/Button';
import { Entypo } from '@expo/vector-icons';
import { supabase } from '@/src/lib/supabase';




const SignUp = () => {
    const [form, setForm] = useState({email: '', password: '', username: '', phone_number: '', full_name: ''});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // this function connects the backend with the frontend.
    const signUpWithEmail = async () => {
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email: form.email,
            password: form.password
        });

        if (error) {
            Alert.alert("Error", error.message)
            setLoading(false)
            return;
        }
        if (data.user) {
            const {error: updateError} = await supabase.from('profiles').upsert({
                id: data.user.id,
                username: form.username,
                full_name: form.full_name,
                phone_number: form.phone_number,
            })
            if (updateError) {
                Alert.alert("Error", updateError.message);
                setLoading(false);
                return;
            };
            Alert.alert('Success', "Account Created Successfully");
        }
        setLoading(false);
    }

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
                <ScrollView>
                <Stack.Screen options={{title: 'Sign up'}}/>
                <Text style={styles.label}>Username</Text>
                <TextInput 
                    placeholder='A Unique Username'
                    style={styles.input}
                    value={form.username}
                    onChangeText={(e) => setForm({...form, username: e})}
                    placeholderTextColor={'#BDBDBD'}
                />
                <Text style={styles.label}>Full Name</Text>
                <TextInput 
                    placeholder='Your Full Name'
                    style={styles.input}
                    value={form.full_name}
                    onChangeText={(e) => setForm({...form, full_name: e})}
                    placeholderTextColor={'#BDBDBD'}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput 
                    placeholder='example@gmail.com'
                    style={styles.input}
                    value={form.email}
                    onChangeText={(e) => setForm({...form, email: e})}
                    placeholderTextColor={'#BDBDBD'}
                    keyboardType='email-address'
                />
                <Text style={styles.label}>Phone Number</Text>
                <TextInput 
                    placeholder='+964xxxxxxxxxx'
                    style={styles.input}
                    value={form.phone_number}
                    onChangeText={(e) => setForm({...form, phone_number: e})}
                    placeholderTextColor={'#BDBDBD'}
                    keyboardType='phone-pad'
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


                <Button 
                    text= {!loading? 'Create account' : 'Creating account...'}
                    onPress={signUpWithEmail}
                    disabled={loading}
                />
                <Link href="/sign-in" style={styles.creatAccount}>Sign in</Link>
                </ScrollView>
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