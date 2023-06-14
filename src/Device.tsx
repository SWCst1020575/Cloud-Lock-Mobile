import React, { useEffect, useState } from 'react';
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
import { ListItem, LinearProgress, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
export type RootStackParamList = {
    DeviceDetail: {} | undefined,
};
interface DeviceProp {
    route: { params: { userID: string } };
}
export default function Device(props: DeviceProp): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(false);
    const [pi_id, setPiID] = useState("");
    const [isDeviceExist, setIsDeviceExist] = useState(false);
    useEffect(() => {
        const url = "https://1zk561r8c4.execute-api.us-east-1.amazonaws.com/api/user/device";
        setLoading(true);
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": props.route.params.userID
            })
        })
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json)
                if (json.statusCode == 200) {
                    setIsDeviceExist(true)
                    setPiID(json.pi_id)
                }
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);
    const showDeviceList = () => {
        if (isDeviceExist)
            return (
                <View>
                    <ListItem
                        Component={TouchableHighlight}
                        containerStyle={{}}
                        disabledStyle={{ opacity: 0.5 }}
                        onPress={() => navigation.navigate('DeviceDetail', { "pi_id": pi_id, "userID": props.route.params.userID })}
                        pad={20}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={styles.titleText}>Device name</ListItem.Title>
                            <ListItem.Subtitle style={styles.subtitleText}>{pi_id}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                    <Divider width={1} />
                </View>);
        return (
            <View>
                <ListItem
                    containerStyle={{}}
                    disabledStyle={{ opacity: 0.5 }}
                    pad={20}
                >
                    <Text>No device</Text>
                </ListItem>
                <Divider width={1} />
            </View>
        );
    }
    return (
        <View>
            {/* <LinearProgress color='primary' /> */}
            {showDeviceList()}
            {/* <ListItem
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
            </ListItem> */}

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