import React from 'react';
import type { PropsWithChildren } from 'react';
import {
    useColorScheme,
    View,
    StyleSheet
} from 'react-native';
import { Text, TouchableHighlight } from 'react-native';
import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler'
import { ListItem, LinearProgress,Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
export type RootStackParamList = {
    DeviceDetail: {} | undefined,
};
export default function Device(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    

    return (
        <View>
            {/* <LinearProgress color='primary' /> */}
            <ListItem
                Component={TouchableHighlight}
                containerStyle={{}}
                disabledStyle={{ opacity: 0.5 }}
                onPress={() => navigation.navigate('DeviceDetail', {})}
                pad={20}
            >
                <ListItem.Content>
                    <ListItem.Title style={styles.titleText}>Device name</ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitleText}>device id</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            <Divider width={1} />
            <ListItem
                Component={TouchableHighlight}
                containerStyle={{}}
                disabledStyle={{ opacity: 0.5 }}
                onPress={() => navigation.navigate('DeviceDetail', {})}
                pad={20}
            >
                <ListItem.Content>
                    <ListItem.Title style={styles.titleText}>Device name2</ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitleText}>device id2</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>

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
    listItem: {
        borderRadius: 10,
        elevation: 3,
    },
    titleText: {
        fontSize: 18,
    },
    subtitleText: {
        fontSize: 16,
    },
    stack: {
        margin: 15
    }
});