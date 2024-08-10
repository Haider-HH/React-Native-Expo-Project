import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect, Stack } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

const Index = () => {
  const { session, loading, profile, isAdmin } = useAuth();
  
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
        <Button text="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    );
  }

  return null; // Return null as a fallback if something unexpected happens
};

export default Index;
