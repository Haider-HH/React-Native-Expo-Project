import { View } from 'react-native';
import React, {useEffect} from 'react';
import Button from '../components/Button';
import { Link, Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import { useFocusEffect } from '@react-navigation/native';

const index = () => {
  useFocusEffect(
    React.useCallback(() => {
      // Reset the navigation bar color to its default color
      NavigationBar.setBackgroundColorAsync('white');
    }, [])
  );
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
    </View>
  );
};

export default index;