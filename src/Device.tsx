import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    useColorScheme,
    View,
} from 'react-native';
import { Text } from 'react-native';
import {
    Colors,
} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler'


export default function Device(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <View>
            <Text>Device page</Text>
        </View>
    );
}



