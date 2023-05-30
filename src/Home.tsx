import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Pressable,
  useColorScheme,
  View,
  StyleSheet
} from 'react-native';
import { Text } from 'react-native';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
export type RootStackParamList = {
  Register: {} | undefined,
  Device: {} | undefined;
};
export default function Home(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  return (
    <View style={styles.container}>
      <View style={styles.stack}>
        <Pressable
          android_ripple={{ color: 'rgba(255, 255, 255, 0.4)' }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgba(0, 0, 0, 0.8)' : 'black',
            }, styles.button]}
          onPress={() => navigation.navigate('Register', {})}
        >
          <Text style={styles.text}>Register device</Text>
        </Pressable>
      </View>
      <View style={styles.stack}>
        <Pressable
          android_ripple={{ color: 'rgba(255, 255, 255, 0.4)' }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? 'rgba(0, 0, 0, 0.8)' : 'black',
            }, styles.button]}
          onPress={() => navigation.navigate('Device', {})}
        >
          <Text style={styles.text}>Device list</Text>
        </Pressable>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 40
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',

  },
  stack: {
    margin: 15
  }
});