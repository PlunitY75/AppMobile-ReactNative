import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login'); // Remplacez 'LoginPage' par le nom de votre composant de page de connexion
        }, 2000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../assets/Mediconnect-removebg-preview.png")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#1B1B1F"
    },

    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
    },
});

export default SplashScreen;