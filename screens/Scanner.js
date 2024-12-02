import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';
import Ecran from '../composants/Ecran';
import MedicamentData from '../medicament.json';
import FlashButton from "../composants/FlashButton";
import { collection, addDoc, serverTimestamp, doc } from 'firebase/firestore';
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Pas encore scanné');
    const [medicamentFound, setMedicamentFound] = useState(false);
    const [medicamentNom, setMedicamentNom] = useState('');
    const [flashOn, setFlashOn] = useState(false);
    const [userID, setUserID] = useState(null)
    const auth = FIREBASE_AUTH;
    const cameraRef = useRef(null); // Ref pour accéder à la caméra

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');

            // Obtenez l'ID de l'utilisateur actuellement authentifié
            const currentUser = auth.currentUser;
            if (currentUser) {
                setUserID(currentUser.uid);
            }
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        const foundMedicament = MedicamentData.find(item => item.CIP13 === data);
        setScanned(true);
        setText(data);
        if (foundMedicament) {
            setMedicamentFound(true);
            setMedicamentNom(foundMedicament['NOM COURT']);
            alert(`Type: ${type}\nData: ${data}\nNom: ${foundMedicament['NOM COURT']}`);

            try {
                if (userID) {
                    console.log("id utilisateur : " + userID)
                    const userInfoCollectionRef = collection(FIREBASE_DB, 'userInfo');
                    const userDocRef = doc(userInfoCollectionRef, userID);

                    await addDoc(collection(userDocRef, 'historique_medicaments'), {
                        nom: foundMedicament['NOM COURT'],
                        dateAjout: serverTimestamp(),
                    });
                    console.log("Document added to historique_medicaments collection");
                }
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        } else {
            setMedicamentFound(false);
            setMedicamentNom('');
            alert('Ce médicament n\'est pas dans la base de données');
        }
    };

    const toggleFlash = () => {
        setFlashOn(!flashOn);
    };

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Demande d'autorisation d'utiliser la caméra</Text>
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>Pas accès à la caméra</Text>
                <Button title={'Autoriser à utiliser la caméra'} onPress={() => askForCameraPermission()} />
            </View>
        );
    }

    return (
        <Ecran titreNavBar={"Scanner"}>
            <View style={styles.container}>
                <View style={styles.barcodebox}>
                    <Camera
                        ref={cameraRef}
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        autoFocus={Camera.Constants.AutoFocus.on} // Ajout de l'option autofocus
                        style={{ height: 400, width: 400 }}
                        type={Camera.Constants.Type.back}
                        flashMode={flashOn ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
                    />
                </View>
                <Text style={styles.maintext}>{text}</Text>
                <FlashButton style={styles.flash} onFlashToggle={toggleFlash} flashOn={flashOn} />
                {scanned && (
                    <Button title={'Scanner'} onPress={() => setScanned(false)} color={"skyblue"} />
                )}
            </View>
        </Ecran>
    );
}

const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "15%"
    },
    maintext: {
        fontSize: 16,
        margin: 20,
        color: "white"
    },
    barcodebox: {
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
    },
    flash: {
        marginBottom: 20,
    }
});
