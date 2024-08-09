import { View, Text, ActivityIndicator, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '@/src/providers/AuthProvider'
import { useGetProfileData } from '@/src/api/profiles'
import { supabase } from '@/src/lib/supabase'
import { Entypo } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'

const profile = () => {
    const { session } = useAuth();
    const id = session?.user.id;
    const {data: userData, error, isLoading} = useGetProfileData(id!);
    
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
        <Text style={{marginBottom: 15}}>Sign Out</Text>
        <Pressable onPress={async () => await supabase.auth.signOut()}>
            {({pressed}) => (
            <Entypo 
            name='log-out'
            size={25}
            color={Colors.light.tint}
            style={{opacity: pressed ? 0.5 : 1}}
            />
            )}
        </Pressable>
    </View>
    )
}

export default profile