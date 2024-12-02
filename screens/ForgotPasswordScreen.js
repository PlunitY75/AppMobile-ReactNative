import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Platform, TouchableOpacity } from "react-native";
import Screen from "../composants/Screen";
import AppTextInput from "../composants/AppTextInput";
import AppButton from "../composants/AppButton";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { sendPasswordResetEmail } from 'firebase/auth';

function ForgotPasswordScreen() {
    const [email, setEmail] = useState("");
    const auth = FIREBASE_AUTH;

    const handleResetPassword = async () => {
        console.log('Mot de passe oublié ?');
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Un email de réinitialisation du mot de passe a été envoyé à votre adresse email.');
        } catch (error) {
            console.log(error);
            alert("Échec de l'envoi. Veuillez saisir une email.");
        }
    };

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
                    fontWeight: "bold",
                }}
            >Mot de passe oublié ?</Text>

            <AppTextInput
                style={[styles.ATI, { width: '100%', marginBottom: 10 }]}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="Email"
                text={"Saisis ton adresse mail"}
                value={email}
                textContentType="emailAddress"
                onChangeText={text => setEmail(text)} // Ajout de onChangeText pour mettre à jour l'état de l'email
            />

            <AppButton style={styles.scanButton} color={"#252062"} onPress={handleResetPassword}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff' }}>Réinitialiser le mot de passe</Text>
            </AppButton>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: "#1B1B1F",
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
        backgroundColor: "#36454F",
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 18,
        color: '#ffffff',
    },
});

export default ForgotPasswordScreen;
