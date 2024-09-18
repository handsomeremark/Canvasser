import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

const BottomNavigationBar = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    if (isKeyboardVisible) {
        return null;
    }

    return (
        <View style={styles.navigationBar}>
            {/* Dashboard Icon */}
            <TouchableOpacity
                onPress={() => navigation.navigate('Dashboard')}
                style={[styles.navItem, route.name === 'Dashboard' && styles.activeNavItem]}>
                <AntDesign name="appstore1" size={24} color={route.name === 'Dashboard' ? '#00b050' : '#888888'} />
                <Text style={[styles.navText, route.name === 'Dashboard' && styles.activeNavText]}>Dashboard</Text>
            </TouchableOpacity>

            {/* Order Icon */}
            <TouchableOpacity
                onPress={() => navigation.navigate('Orders')}
                style={[styles.navItem, route.name === 'Orders' && styles.activeNavItem]}>
                <MaterialCommunityIcons name="clipboard-list-outline" size={24} color={route.name === 'Orders' ? '#00b050' : '#888888'} />
                <Text style={[styles.navText, route.name === 'Orders' && styles.activeNavText]}>Orders</Text>
            </TouchableOpacity>

            {/* Product Icon */}
            <TouchableOpacity
                onPress={() => navigation.navigate('Products List')}
                style={[styles.navItem, route.name === 'Products List' && styles.activeNavItem]}>
                <MaterialCommunityIcons name="cube-outline" size={24} color={route.name === 'Products List' ? '#00b050' : '#888888'} />
                <Text style={[styles.navText, route.name === 'Products List' && styles.activeNavText]}>Products</Text>
            </TouchableOpacity>

            {/* Chat Icon */}
            <TouchableOpacity
                onPress={() => navigation.navigate('Chat')}
                style={[styles.navItem, route.name === 'Chat' && styles.activeNavItem]}>
                <MaterialIcons name="chat" size={24} color={route.name === 'Chat' ? '#00b050' : '#888888'} />
                <Text style={[styles.navText, route.name === 'Chat' && styles.activeNavText]}>Chat</Text>
            </TouchableOpacity>

            {/* Profile Icon */}
            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={[styles.navItem, route.name === 'Profile' && styles.activeNavItem]}>
                <FontAwesome5 name="user-alt" size={22} color={route.name === 'Profile' ? '#00b050' : '#888888'} />
                <Text style={[styles.navText, route.name === 'Profile' && styles.activeNavText]}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navigationBar: {
        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#DBD7D7',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#888888',
        marginTop: 4,
    },
    activeNavText: {
        color: '#00b050',
        fontWeight: 'bold',
    },
    activeNavItem: {
        borderColor: '#00b050',
    },
});

export default BottomNavigationBar;
