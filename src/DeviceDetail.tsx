import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    useColorScheme,
    View,
    StyleSheet,
    TextInput
} from 'react-native';
import { Text, TouchableHighlight } from 'react-native';
import {
    Colors
} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler'
import { ListItem, LinearProgress, Button, Dialog } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign'
import Picker from '@ouroboros/react-native-picker';
interface pickerProps {
    text: string
}
function PickerDisplay(props: pickerProps) {
    return (
        <View style={styles.picker}>
            <Text style={{ flex: 4, fontSize: 16, }}>{props.text}</Text>
            <Icon style={{ flex: 1 }} name={'down'} size={20} />
        </View>
    );
}
export default function DeviceDetail(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const [isGenerateKeyOpen, setGenerateKeyOpen] = useState(false);
    const [picker, setPicker] = useState('minute');
    const [durationTime, setDuration] = useState('');
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <View>
            {/* <LinearProgress color='primary' /> */}
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title style={styles.text}>Device name:</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title style={styles.text}>Device authority:</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title style={styles.text}>Key status:</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <ListItem>
                <ListItem.Content>
                    <Button
                        title={'Generate key'}
                        buttonStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 1)',
                            borderRadius: 10,
                        }}
                        titleStyle={{ fontSize: 18 }}
                        containerStyle={{
                            paddingHorizontal: 40,
                            height: 45,
                            width: "100%",
                            marginVertical: 10,
                        }}
                        onPress={() => setGenerateKeyOpen(true)}
                    />
                </ListItem.Content>
            </ListItem>

            <Dialog overlayStyle={{ borderRadius: 5 }} isVisible={isGenerateKeyOpen}>
                <Dialog.Title title="Generate key" />
                <Text style={{ fontSize: 16 }}>Duration</Text>

                <View style={{ width: "100%", flexDirection: 'row' }}>
                    <TextInput
                        placeholder='time'
                        keyboardType="numeric"
                        style={styles.input}
                        onChangeText={setDuration}
                        value={durationTime}
                    />
                    <Picker
                        component={PickerDisplay}
                        onChanged={setPicker}
                        options={[
                            { value: 'second', text: 'second' },
                            { value: 'minute', text: 'minute' },
                            { value: 'hour', text: 'hour' },
                            { value: 'day', text: 'day' }
                        ]}
                        value={picker}
                    />
                </View>

                <View style={{ marginHorizontal: 10, width: "100%", justifyContent: "flex-end", flexDirection: 'row', alignItems: "center" }}>
                    <Dialog.Button style={{ flex: 1 }} title="cancel" onPress={() => setGenerateKeyOpen(false)} />
                    <Dialog.Button style={{ flex: 1 }} title="generate" onPress={() => setGenerateKeyOpen(false)} />
                </View>
            </Dialog>
        </View>
    );
}


const styles = StyleSheet.create({
    text: {
        fontSize: 18,
    },
    input: {
        width: "30%",
        borderColor: "gray",
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        padding: 5,
        fontSize: 16,
    },
    picker: {
        width: 120,
        borderWidth: 1,
        borderColor: '#a7a7a7',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginHorizontal: 20,
        justifyContent: "center",
        flexDirection: 'row'
    },
});