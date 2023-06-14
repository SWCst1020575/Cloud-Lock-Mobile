import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

import 'react-native-gesture-handler';
// import { Auth } from 'aws-amplify';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
export type RootStackParamList = {
    login: {} | undefined
};

import QRCode from 'react-native-qrcode-svg'
function RegisterDevice(): JSX.Element {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [user, setUser] = useState({ email: "t" });
    const [initializing, setInitializing] = useState(true);
    function onAuthStateChanged(user: any) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <View style={styles.container}>
            <QRCode size={300}
                value={user.email}
            />
        </View>
    );
}


export default RegisterDevice;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});