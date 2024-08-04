import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect, Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../providers/AuthProvider';
import { supabase } from '../lib/supabase';

// This file renders the home screen (the screen that renders at the start of the application)

const index = () => {
  const { session, loading } = useAuth();
  console.log(loading);
  console.log(session)
  if (loading) {
    return <ActivityIndicator />
  }
  if(!session) {
    return <Redirect href={'/sign-in'} />
  }

  useFocusEffect(
    React.useCallback(() => {
      // Reset the navigation bar color to its default color
      NavigationBar.setBackgroundColorAsync('white');
    }, [])
  ); // When used (useEffect), it didn't work properly
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Stack.Screen options={{title: "Home"}}/>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Link href={'/sign-in'} asChild>
          <Button text="Sign In" />
        </Link>
        <Link href={'/sign-up'} asChild>
          <Button text="Sign Up" />
        </Link>
      </View>
      <Button 
        text={session ? 'Sign Out' : 'Signed Out'} 
        onPress={() => supabase.auth.signOut()}
      />
    </View>
  );
};

export default index;