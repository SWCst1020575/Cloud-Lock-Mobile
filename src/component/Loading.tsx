import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';


export default function Loading() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.indicatorWrapper}>
                <ActivityIndicator color="#408ee0" size="large" />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)"
    },
    item: {
        backgroundColor: '#888',
        padding: 12,
        marginBottom: 12,
        marginLeft: 8,
        marginRight: 8,
    },
    itemText: {
        color: '#fff',
        fontSize: 24,
    },
    indicatorWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicatorText: {
        fontSize: 18,
        marginTop: 12,
    },
});
