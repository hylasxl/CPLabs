import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import LoginScreen from "./src/screens/Login";
import RegisterScreen from './src/screens/Register';
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import AddProductScreen from './src/screens/AddProduct';
import EditProductScreen from './src/screens/EditProduct';
import CartScreen from './src/screens/Cart';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'Settings') {
                    iconName = 'settings';
                } else if (route.name === 'Cart') {
                    iconName = 'cart'
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6a51ae',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
        })}
    >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name='Cart' component={CartScreen}/>
        <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
);

export default function App() {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    

    const handleLogin = (navigation) => {
        setIsLoggedIn(true);
        navigation.reset({
            index: 0,
            routes: [{ name: 'HomeTabs' }],
        });
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='LoginScreen'>
                <Stack.Screen name="HomeTabs" component={TabNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                <Stack.Screen name="LoginScreen" options={{ headerShown: false }}>
                    {(props) => <LoginScreen {...props} onLogin={() => handleLogin(props.navigation)} />}
                </Stack.Screen>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{}} />
                <Stack.Screen name="AddProduct" component={AddProductScreen} options={{headerTitle: "Add Product"}} />
                <Stack.Screen name="EditProduct" component={EditProductScreen} options={{}} />
                <Stack.Screen name="Cart" component={CartScreen} options={{}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
