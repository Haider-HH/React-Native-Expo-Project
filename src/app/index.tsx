import { ActivityIndicator, Alert, View } from 'react-native';
import React, { useState } from 'react';
import Button from '../components/Button';
import { Link, Redirect, Stack } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

const Index = () => {
  const { session, loading, profile, isAdmin } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut= async () => {
    setIsSigningOut(true);

    if (profile?.id) {
      await supabase.from('profiles').update({expo_push_token: null}).eq('id', profile.id)
    } // reset the expo push token so when the user signs out (or signs in from a different account, the push token is updated for him/her)

    const {error} = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error Signing Out", error.message);
    }
    setIsSigningOut(false);
  }
  
  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  // If session exists but profile is still null, show a loading indicator
  if (session && !profile) {
    return <ActivityIndicator />;
  }

  // Once the profile is loaded, redirect based on user role
  if (profile && !isAdmin) {
    return <Redirect href={'/(user)'} />;
  }


  if (profile && isAdmin) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <Stack.Screen options={{ title: 'Home' }} />
        <Link href="/(user)" asChild>
          <Button text="User" />
        </Link>
        <Link href="/(admin)" asChild>
          <Button text="Admin" />
        </Link>
        <Button text={!isSigningOut ? "Sign Out" : "Signing Out..."} onPress={handleSignOut} disabled={isSigningOut} />
      </View>
    );
  }

  return null; // Return null as a fallback if something unexpected happens
};

export default Index;
