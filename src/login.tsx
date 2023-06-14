import React, { useEffect, useState } from 'react';
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
import { GoogleSignin } from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
// import { Amplify, Auth } from 'aws-amplify';
// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);
GoogleSignin.configure({
    webClientId: '',
});
export default function Login(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [user, setUser] = useState();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [initializing, setInitializing] = useState(true);
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    function onAuthStateChanged(user: any) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        console.log(user);
        return subscriber; // unsubscribe on unmount
    }, []);
    const signIn = () => {
        auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <View style={styles.container}>
            <View style={styles.stack}>
                <Input placeholder='Email' onChangeText={value => setEmail(value)} />
                <Input placeholder="Password" secureTextEntry={true} onChangeText={value => setPassword(value)} />
                <Pressable
                    android_ripple={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgba(0, 0, 0, 0.8)' : 'black',
                        }, styles.button]}
                    onPress={signIn}
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
                    onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}

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