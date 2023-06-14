import React, { useState, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
    useColorScheme,
    View,
    StyleSheet,
    TextInput,
    Modal
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
interface DetaileProp {
    route: { params: { pi_id: string, userID: string } };
}
import QRCode from 'react-native-qrcode-svg'
export default function DeviceDetail(props: DetaileProp): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const [isGenerateKeyOpen, setGenerateKeyOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalSuccessVisible, setSuccessModalVisible] = useState(false);
    const [picker, setPicker] = useState('minute');
    const [durationTime, setDuration] = useState('');
    const [key, setKey] = useState('');
    const [keyStatus, setKeyStatus] = useState('Not exist');
    const timeout = (ms: number) => new Promise((resolve, reject) => { setTimeout(() => { resolve(ms) }, ms) });
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const generate = () => {
        if (durationTime == '')
            return;
        let duration: number;
        try {
            duration = parseInt(durationTime);

        }
        catch (e) {
            return;
        }
        if (picker == "minute")
            duration *= 60;
        else if (picker == "hour")
            duration *= 3600;
        else if (picker == "day")
            duration *= 86400;
        const url = "https://1zk561r8c4.execute-api.us-east-1.amazonaws.com/api/user/generate";
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": "Su",
                "generate_person_id": "Su",
                "pi_id": deviceID,
                "duration": duration
            })
        }).then((resp) => resp.json())
            .then((json) => {
                console.log("jjj ", json);
                setKey(json.key);
                if (json.statusCode != 200) {
                    setModalMsg("Generate error!");
                    setModalVisible(true);
                    setTimeout(() => {
                        setModalVisible(false);
                    }, 2000);
                }
                else {
                    setModalMsg("Generate success!");
                    setSuccessModalVisible(true);
                    setTimeout(() => {
                        setSuccessModalVisible(false);
                    }, 2000);
                }
            })
            .catch((error) => console.log(error));
        //finally();
    }
    const showQrcode = () => {
        if (key != '')
            return (
            <QRCode size={200}
                value={key}
            />);
        return null;
    }
    const showGenerateButton=()=>{
        
    }
    const deviceID = props.route.params.pi_id;
    const userID = props.route.params.userID;
    useEffect(() => {
        const url = "https://1zk561r8c4.execute-api.us-east-1.amazonaws.com/api/user/key";
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": userID,
                "pi_id": deviceID,
            })
        }).then((resp) => resp.json())
            .then((json) => {
                console.log("jjj ", json);
                if (json != null){
                    setKey(json.key)
                    setKeyStatus("Exist")
                }
                //setKey(json.key);
            })
            .catch((error) => console.error(error));
        //.finally();
    }, []);

    return (
        <View>
            {/* <LinearProgress color='primary' /> */}
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title style={styles.text}>Device ID: {deviceID}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            {/* <ListItem>
                <ListItem.Content>
                    <ListItem.Title style={styles.text}>Device authority: </ListItem.Title>
                </ListItem.Content>
            </ListItem> */}
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title style={styles.text}>Key status: {keyStatus}</ListItem.Title>
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
            <ListItem>
                <ListItem.Content>
                    <Button
                        title={'Grant permission'}
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
            <ListItem style={{alignItems:'center'}}>
                {showQrcode()}
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
                    <Dialog.Button style={{ flex: 1 }} title="generate" onPress={() => { setGenerateKeyOpen(false); generate(); }} />
                </View>
            </Dialog>
            <Dialog overlayStyle={{ borderRadius: 5 }} isVisible={isGenerateKeyOpen}>
                <Dialog.Title title="Auth" />
                <Text style={{ fontSize: 16 }}></Text>

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
                    <Dialog.Button style={{ flex: 1 }} title="generate" onPress={() => { setGenerateKeyOpen(false); generate(); }} />
                </View>
            </Dialog>
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
    }, centeredView: {
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