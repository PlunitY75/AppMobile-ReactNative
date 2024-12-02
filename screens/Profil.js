import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native";
import Ecran from "../composants/Ecran";
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from "../composants/AppText";
import { collection, doc, getDoc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";

export default function Profil() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const currentUser = FIREBASE_AUTH.currentUser;
                if (currentUser) {
                    const docRef = doc(collection(FIREBASE_DB, 'userInfo'), currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUser(docSnap.data());
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <Ecran titreNavBar={"Profil"}>
            <View style={styles.container}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.topSelection}>
                        <TouchableOpacity onPress={pickImage}>
                            <View style={styles.propicArea}>
                                {image && <Image source={{ uri: image }} style={styles.image} />}
                            </View>
                        </TouchableOpacity>
                        {user && (
                            <AppText style={styles.name}>
                                {user.nom} {user.prenom}
                            </AppText>
                        )}
                        {user && (
                            <TouchableOpacity>
                                <View style={styles.buttonSection}>
                                    <View style={styles.buttonArea}>
                                        <View style={styles.iconArea}>
                                            <MaterialCommunityIcons name="account" size={24} color="white" />
                                        </View>
                                        <AppText style={styles.email}>
                                            {user.email ? user.email : ''}
                                        </AppText>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>

                    {user ?
                        (
                        <TouchableOpacity onPress={() => {
                        FIREBASE_AUTH.signOut().then(r => navigation.navigate('Login'));
                        }}>
                        <View style={styles.buttonSection}>
                            <View style={styles.buttonArea}>
                                <View style={styles.iconArea}>
                                    <MaterialCommunityIcons name="logout" size={24} color="white" />
                                </View>
                                <AppText style={styles.buttonNames}>Se déconnecter</AppText>
                            </View>
                        </View>
                    </TouchableOpacity>)
                        : <TouchableOpacity onPress={() =>  navigation.navigate('Login')}>
                            <View style={styles.buttonSection}>
                                <View style={styles.buttonArea}>
                                    <View style={styles.iconArea}>
                                        <MaterialCommunityIcons name="logout" size={24} color="white" />
                                    </View>
                                    <AppText style={styles.buttonNames}>Se connecter</AppText>
                                </View>
                            </View>
                        </TouchableOpacity>
                    }
                </SafeAreaView>
            </View>
        </Ecran>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    topSelection: {
        height: 300,
        justifyContent: "center",
        alignItems: "center",
    },
    propicArea: {
        height: 170,
        width: 170,
        borderRadius: 85,
        backgroundColor: "#d3d3d3",
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 85,
    },
    name: {
        marginTop: 15,
        fontSize: 25,
        fontWeight: "bold",
    },
    email: {
        fontSize: 18,
        marginTop: 5,
    },
    buttonArea: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconArea: {
        marginRight: 18,
    },
    buttonNames: {
        fontSize: 18,
    },
    buttonSection:{

    }
});
