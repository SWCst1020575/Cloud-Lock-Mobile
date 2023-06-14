import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    useColorScheme,
    View,
    Pressable,
    StyleSheet,
    Modal
} from 'react-native';
import { Text } from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Input } from 'react-native-elements';
import 'react-native-gesture-handler';
// import { Auth } from 'aws-amplify';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
export type RootStackParamList = {
    login: {} | undefined
};
function Register(): JSX.Element {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const popAction = StackActions.pop(1);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalSuccessVisible, setSuccessModalVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [modalMsg, setModalMsg] = useState("");
    const timeout = (ms: number) => new Promise((resolve, reject) => { setTimeout(() => { resolve(ms) }, ms) });
    async function signUp() {
        let errMsg: string = "";
        let isError: boolean = false;
        if (email == "") {
            errMsg = "Email can't be empty.";
            isError = true;
        }
        else if (password == "" || passwordConfirm == "") {
            errMsg = "Password can't be empty.";
            isError = true;
        }
        else if (password != passwordConfirm) {
            errMsg = "Passwords are not same.";
            isError = true;
        }
        if (isError) {
            setModalMsg(errMsg);
            setModalVisible(true);
            await timeout(2500);
            setModalVisible(false);
            return;
        }

        auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                setSuccessModalVisible(true);
                setModalMsg("User account created.");
                setTimeout(() => {
                    setSuccessModalVisible(false);
                    navigation.dispatch(popAction);
                }, 2000);

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                setModalMsg(error.code);
                setModalVisible(true);
                setTimeout(() => { setModalVisible(false) }, 2000);
            });


    }

    return (
        <View style={styles.container}>
            <View style={styles.stack}>
                <Input placeholder='Email' onChangeText={value => setEmail(value)} />
                <Input placeholder="Password" secureTextEntry={true} onChangeText={value => setPassword(value)} />
                <Input placeholder="Confirm password" secureTextEntry={true} onChangeText={value => setPasswordConfirm(value)} />
                <Pressable
                    android_ripple={{ color: 'rgba(255, 255, 255, 0.4)' }}
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? 'rgba(0, 0, 0, 0.8)' : 'black',
                        }, styles.button]}
                    onPress={() => signUp()}
                >
                    <Text style={styles.text}>Sign Up</Text>
                </Pressable>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalMsg}</Text>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalSuccessVisible}
                onRequestClose={() => {
                    setSuccessModalVisible(!modalSuccessVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalSuccessView}>
                        <Text style={styles.modalText}>{modalMsg}</Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


export default Register;

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
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
        marginBottom: 8,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'rgb(253, 219, 219)',
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalSuccessView: {
        margin: 20,
        backgroundColor: 'rgb(75 ,181, 67)',
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingVertical: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 20,
        textAlign: 'center',
    },
});