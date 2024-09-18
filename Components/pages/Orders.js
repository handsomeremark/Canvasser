import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavigationBar from '../BottomNavigationBar';

const Orders = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Orders Screen</Text>
            <BottomNavigationBar  />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Orders;
