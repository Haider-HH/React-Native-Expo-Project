import { View, Text, ActivityIndicator, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@/src/providers/AuthProvider'
import { useGetProfileData } from '@/src/api/profiles'
import { supabase } from '@/src/lib/supabase'
import { Entypo } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { fetchSession, selectAuth } from '@/src/features/auth/authSlice'

const profile = () => {
    // const { session } = useAuth();
    const { session } = useAppSelector(selectAuth);
    const id = session?.user.id;
    const {data: userData, error, isLoading} = useGetProfileData(id!);

    const [isSigningOut, setIsSigningOut] = useState(false);
    const dispatch = useAppDispatch();

    const handleSignOut= async () => {
      setIsSigningOut(true);
  
      if (userData?.id) {
        await supabase.from('profiles').update({expo_push_token: null}).eq('id', userData.id)
      } // reset the expo push token so when the user signs out (or signs in from a different account, the push token is updated for him/her)
  
      const {error} = await supabase.auth.signOut();
      if (error) {
        Alert.alert("Error Signing Out", error.message);
      }
      dispatch(fetchSession());
      setIsSigningOut(false);
    }
    
    if (isLoading) {
        return <ActivityIndicator />
    };

    if (error) {
        return (
            <>
                <Text>Failed to fetch user data</Text>
                <Text>{error.message}</Text>
            </>
        )
    }

    return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{marginBottom: 25}}>Welcome {userData?.username} 😊</Text>
        <Pressable onPress={handleSignOut}>
            {({pressed}) => (
            <Entypo 
            name='log-out'
            size={25}
            color={Colors.light.tint}
            style={{opacity: pressed ? 0.5 : 1}}
            />
            )}
        </Pressable>
        {isSigningOut && <Text style={{marginTop: 10, color: Colors.light.tint, fontSize: 16}}>Signing Out...</Text>}
    </View>
    )
}

export default profile