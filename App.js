import React from 'react';

import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importez vos écrans ici
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from './screens/LoginScreen';
import SignIn from "./screens/SignIn";
import Profil from "./screens/Profil";
import Scanner from "./screens/Scanner";
import Accueil from "./screens/Accueil";
import Historic from "./screens/Historic";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

const Stack = createStackNavigator();


export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" headerMode="false">
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="Accueil" component={Accueil} />
                <Stack.Screen name="Historique" component={Historic} />
                <Stack.Screen name="Scanner" component={Scanner} />
                <Stack.Screen name="Profil" component={Profil} />
            </Stack.Navigator>
        </NavigationContainer>

    );
}

