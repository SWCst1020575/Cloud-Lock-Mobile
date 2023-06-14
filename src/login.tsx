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
import { Input } from 'react-native-elements';
import Register from './Register';
import Icon from 'react-native-vector-icons/AntDesign'
export type RootStackParamList = {
    Register: {} | undefined,
    Home: {} | undefined
};
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

export default function Login(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <View style={styles.container}>
            <View style={styles.stack}>
                <Input placeholder='Email' />
                <Input placeholder="Password" secureTextEntry={true} />
                <Pressable
                    android_ripple={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgba(0, 0, 0, 0.8)' : 'black',
                        }, styles.button]}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })}
                >
                    <Text style={styles.text}>Login</Text>
                </Pressable>
                <Pressable
                    android_ripple={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgba(0, 0, 0, 0.8)' : 'black',
                        }, styles.button]}
                    onPress={() => navigation.navigate('Register', {})}
                >
                    <Text style={styles.text}>Register</Text>
                </Pressable>
                <View style={{ justifyContent: 'center', flexDirection: "row" }}>
                    <Text style={{ marginVertical: 5, fontSize: 16, color: "rgba(0, 0, 0, 0.6)" }}>------------------OAuth------------------</Text>
                </View>
                <Pressable
                    android_ripple={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgba(0, 0, 0, 0.8)' : 'black',
                        }, styles.button]}
                    onPress={() => console.log("google")}
                >
                    <Icon name={'google'} size={20} color={'#FFF'} />
                </Pressable>
                <Pressable
                    android_ripple={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgba(0, 0, 0, 0.8)' : 'black',
                        }, styles.button]}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })}
                >
                    <Text style={styles.text}>Skip(for test)</Text>
                </Pressable>
            </View>

        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 36
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        marginVertical: 8
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