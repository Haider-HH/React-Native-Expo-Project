import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect, Stack } from 'expo-router';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

// This file renders the home screen (the screen that renders at the start of the application)

const Index = () => {
  const { session, loading, isAdmin } = useAuth();
  
  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  if (!isAdmin) {
    return <Redirect href={'/(user)'}/>
  } // the user can't go to the index page and switch to an admin

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
};

export default Index;
