import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Platform, TouchableOpacity, ActivityIndicator } from "react-native";
import Screen from "../composants/Screen";
import AppTextInput from "../composants/AppTextInput";
import AppButton from "../composants/AppButton";
import { useNavigation } from '@react-navigation/native'; // Importer useNavigation depuis react-navigation/native
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import ErrorMessage from "../composants/ErrorMessage";
function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation(); // Utiliser useNavigation pour accéder à la fonction de navigation

    const handleForgotPassword = () => {
        // Naviguer vers la page "Mot de passe oublié"
        navigation.navigate('ForgotPassword');
    };
    const handleSignUp = () => {
        // Naviguer vers la page "S'inscrire"
        navigation.navigate('SignIn');
    };
    const handleContinueWithoutLogin = () => {
        // Naviguer vers la page "Accueil"
        navigation.navigate('Accueil');
    };

    const signIn = async () => {
        setLoading(true);
        console.log(email);
        console.log(password)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
            navigation.navigate('Accueil')
        } catch (error) {
            alert("Identifiant ou mot de passe incorrect \n\nDétails : " + error)
        } finally {
            setLoading(false);
        }
    }
    return (
        <Screen style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/Mediconnect-removebg-preview.png")} />
            </View>

            <Text
                style={{
                    fontFamily: Platform.OS === 'android' ? "sans-serif" : "Avenir",
                    fontSize: 30,
                    marginBottom: 15,
                    color: "#ffffff",
                    fontWeight:"bold",
                }}
            >Connecte toi !</Text>
            <AppTextInput
                style={[styles.ATI, {width: '100%', marginBottom: 10}]} // Modifier le style pour prendre toute la largeur et ajouter un espace en bas
                autoCapitalize="none"
                autoCorrect={false}
                text={"Email"}
                textContentType="emailAddress"
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <AppTextInput
                style={[styles.ATI, {width: '100%'}]} // Modifier le style pour prendre toute la largeur
                autoCapitalize="none"
                autoCorrect={false}
                text={"Password"}
                secureTextEntry
                onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
                <Text
                    style={{
                        color: "#ffffff",
                        fontWeight: 'bold',
                        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
                        textAlign: 'right',
                        marginBottom: 20,
                        marginTop:18,
                    }}
                >Mot de passe oublié ?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword} onPress={handleContinueWithoutLogin}>
                <Text
                    style={{
                        color: "#ffffff",
                        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
                        textAlign: 'center',
                        marginBottom: 50,
                        marginTop: 20,
                    }}
                >Continuer sans vous connecter</Text>
            </TouchableOpacity>

            {loading ? (
                    <ActivityIndicator size="large" color="dodgerblue" /> ):
                (
            <AppButton style={styles.scanButton} color={"#252062"} onPress={signIn}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff' }}>Se connecter</Text>
            </AppButton>)}

            <TouchableOpacity style={styles.forgotPassword} onPress={handleSignUp}>
                <Text
                    style={{
                        color: "#ffffff",
                        fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
                        textAlign: 'center',
                        marginBottom: 20,
                        marginTop: 80,
                    }}
                >Vous êtes nouveau ? S’inscrire </Text>
            </TouchableOpacity>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor:"#1B1B1F",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
    },
    ATI: {
        backgroundColor : "#36454F",
        width: '100%', // Prendre toute la largeur
        borderRadius: 10, // Ajouter des coins arrondis
        paddingHorizontal: 20, // Ajouter un padding horizontal
        paddingVertical: 15, // Ajouter un padding vertical
        fontSize: 18, // Ajuster la taille de la police
        color: '#ffffff', // Changer la couleur du texte
    },
    forgotPassword: {
        // Vous pouvez ajouter des styles ici si nécessaire
    },
});

export default LoginScreen;
