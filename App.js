import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './Components/LoadingScreen';
import LoginScreen from './Components/Login';
import Dashboard from './Components/Dashboard';
import AddProduct from './Components/AddProduct'
import AddPrice from './Components/AddPrice';
import ProcessOrders from './Components/ProcessOrders'
import Products from './Components/pages/Products'
import Chat from './Components/pages/Chat'
import Orders from './Components/pages/Orders';
import Profile from './Components/pages/Profile';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="Add Product" component={AddProduct} options={{ headerShown: true, headerTitleAlign: 'center', }} />
        <Stack.Screen name="Add Price" component={AddPrice} options={{ headerShown: true, headerTitleAlign: 'center', }} />
        <Stack.Screen name="Receive & Process Orders" component={ProcessOrders} options={{ headerShown: true, headerTitleAlign: 'center', }} />

        {/* pages */}
        <Stack.Screen name="Orders" component={Orders} options={{ headerShown: true, headerTitleAlign: 'center', }} />
        <Stack.Screen name="Products List" component={Products} options={{ headerShown: true, headerTitleAlign: 'center', }} />
        <Stack.Screen name="Chat" component={Chat} options={{ headerShown: true, headerTitleAlign: 'center', }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true, headerTitleAlign: 'center', }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
