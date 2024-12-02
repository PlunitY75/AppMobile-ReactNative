import React from "react";
import {Text, View, StyleSheet, Platform, TouchableOpacity, SafeAreaView} from "react-native";
import {Entypo, FontAwesome, MaterialIcons} from "@expo/vector-icons";
import Constants from "expo-constants";
import { AntDesign } from '@expo/vector-icons';
import AppText from "./AppText";
import Separator from "../composants/Separator"
import {useNavigation} from "@react-navigation/native";
export default function NavBarBot(){

    const navigation = useNavigation(); // Utiliser useNavigation pour accéder à la fonction de navigation
    const handleScanner = () => {
        navigation.navigate('Scanner');
    };
    const handleHistoric = () => {
        navigation.navigate('Historique');
    };
    const handleAccueil = () => {
        navigation.navigate('Accueil');
    };

    return (
        <View style={styles.container}>
            <Separator style={styles.separator}/>
            <View style={styles.NavBarBot}>

                <TouchableOpacity onPress={handleHistoric}>
                    <View style={styles.iconeContainer}>
                        <FontAwesome name="history" style={styles.icones} />
                        <AppText style={styles.textIcones}>Historique</AppText>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleScanner}>
                    <View style={styles.iconeContainer}>
                        <AntDesign name="qrcode" style={styles.icones} />
                        <AppText style={styles.textIcones}>DataMatrix</AppText>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleAccueil}>
                    <View style={styles.iconeContainer}>
                        <Entypo name="home" style={styles.icones} />
                        <AppText style={styles.textIcones}>Accueil</AppText>
                    </View>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    separator:{
        backgroundColor:"grey",
        //marginBottom: 10
    },
    container:{
        //flex:1,
        position: "absolute",
        bottom:0,
        width: "100%",
        //alignContent:"stretch",
        //alignItems: "center"
        //backgroundColor:"red",
    },
    NavBarBot: {
        //marginTop: 10,
        height: 70,
        flexDirection: "row",
        justifyContent: "space-evenly",
        //backgroundColor:"red",
        alignItems: "center",
        marginBottom: 15
    },
    iconeContainer:{
        alignItems: "center",
    },
    icones:{
        color: "grey",
        fontSize: 25
    },
    textIcones:{
        fontSize: 12,
        color:"grey",
        fontWeight:"500"
    },
})


