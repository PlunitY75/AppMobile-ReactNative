import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, Platform, ActivityIndicator } from "react-native";
import Screen from "../composants/Screen";
import AppTextInput from "../composants/AppTextInput";
import AppButton from "../composants/AppButton";
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import { setDoc, doc } from 'firebase/firestore';

function SignIn() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const auth = FIREBASE_AUTH;

    const navigation = useNavigation();

    const signUp = async () => {
        setLoading(true);

        try {
            // Créer l'utilisateur avec l'email et le mot de passe
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const userID = response.user.uid; // Obtenir l'ID de l'utilisateur

            // Créer un document dans la collection "userInfo" avec l'ID de l'utilisateur
            await setDoc(doc(FIREBASE_DB, 'userInfo', userID), {
                email: email,
                nom: nom,
                prenom: prenom,
            });

            // Créer la sous-collection "historique_medicaments" dans ce document
            await setDoc(doc(FIREBASE_DB, 'userInfo', userID, 'historique_medicaments', 'placeholder_document'), {});

            alert('Inscription réussie');
            navigation.navigate("Accueil");
        } catch (error) {
            console.error(error);
            alert("L'inscription a échoué\n\nDétails : " + error.message);
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
                    fontFamily: Platform.OS === 'android' ? "Roboto" : "Avenir",
                    fontSize : 30,
                    marginBottom : 15,
                    color : "#ffffff",
                    fontWeight: 'bold', // Mettre en gras
                }}
            >Inscris toi !</Text>

            <AppTextInput
                style={[styles.ATI, {width: '100%', marginBottom: 10}]}
                autoCapitalize="sentences"
                autoCorrect={false}
                text="Nom"
                onChangeText={(text) => setNom(text)}
                placeholder="Nom"
            />

            <AppTextInput
                style={[styles.ATI, {width: '100%', marginBottom: 10}]}
                autoCapitalize="sentences"
                autoCorrect={false}
                text="Prénom"
                placeholder="Prénom"
                onChangeText={(text) => setPrenom(text)}
            />

            <AppTextInput
                style={[styles.ATI, {width: '100%', marginBottom: 10}]}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                value={email}
                text="Email"
                textContentType="emailAddress"
                onChangeText={(text) => setEmail(text)}
            />

            <AppTextInput
                style={[styles.ATI, {width: '100%'}]}
                autoCapitalize="none"
                autoCorrect={false}
                text={"Mot de passe"}
                value="password"
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
            />

            {loading ? (
                <ActivityIndicator size="large" color="dodgerblue" style={{marginTop:10}}/>
            ) : (
                <AppButton style={[styles.scanButton, {marginTop: 20}]} color={"#252062"} onPress={signUp}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#fff' }}>S'inscrire</Text>
                </AppButton>
            )}
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
});

export default SignIn;
