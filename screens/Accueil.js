import React from "react";
import {Text, View, StyleSheet,Alert, TouchableOpacity, Image} from "react-native";
import AppText from "../composants/AppText";
import AppButton from "../composants/AppButton";
import Ecran from "../composants/Ecran";
import Separator from "../composants/Separator"
import {useNavigation} from "@react-navigation/native";
function Accueil () {
    const navigation = useNavigation();
    const handleScanner = () => {
        navigation.navigate('Scanner');
    };
    const handleHistoric = () => {
        navigation.navigate('Historique');
    };
    return (
        <Ecran titreNavBar={"MediConnect"}>
            <View style={styles.scanContainer}>
                <Image style={styles.imageScanner} source={require('../assets/dessinScanner.png')}></Image>
                <AppButton style={styles.scanButton} color={"#252062"} onPress={handleScanner}>Scanner un QR Code</AppButton>
            </View>

            <AppText marginTop={8} fontSize={20} fontWeight={"bold"}> Ou </AppText>
            <AppButton style={styles.CIPbutton} color={"black"} onPress={ () => Alert.prompt("Code CIP", "Saisissez un codeCIP", text =>console.log(text)) }>Saisir un code CIP </AppButton>

            <Separator style={styles.separator}></Separator>

            <View style={styles.containerHistoric}>
                <AppText style={styles.titreHistorique}>Carnet</AppText>
                <TouchableOpacity onPress={handleHistoric}>
                    <View style={styles.historicButton}>
                        <View style={styles.textContainer}>
                            <AppText style={styles.titreBouton} fontSize={17} fontWeight={"bold"}>Historique</AppText>
                            <AppText style={styles.description} fontSize={15}>Consultez vos{"\n"}médicaments ajoutés.</AppText>
                        </View>
                        <Image style={styles.historicImage} source={require('../assets/historicImage.png')}></Image>
                    </View>
                </TouchableOpacity>
                {/*<HistoricCard style={styles.HistoricCard} children={"3333333333333333"} children2={"22-02-2024"}/>*/}
            </View>
        </Ecran>
    );
}
const styles = StyleSheet.create ({
    scanContainer:{
        //backgroundColor: "red",
        marginTop: 0,
        width: "100%",
        alignItems: "center"
    },
    imageScanner:{
        height: 165,
        width: 165
    },
    scanButton:{
        width: 350,
        height: 60,
        borderRadius: 10,
        color: "#252062",
        marginTop: 20

    },
    CIPbutton:{
        marginVertical: 10,
        borderRadius: 7,
        backgroundColor: "#BEF67A",
        color: "black"
    },
    containerHistoric:{
        marginTop: 10,
        width: "90%",
    },
    titreHistorique: {
        textAlign: "left",
        fontSize: 27,
        fontWeight: "bold",
    },
    description:{
        marginLeft: 15,
        textAlign: "left"
    },
    historicButton:{
        width: 350,
        height: 110,
        borderRadius: 10,
        marginTop: 5,
        flexDirection: "row",
        alignContent: "space-between",
        //alignItems:"center",
        //alignItems: "left",
        backgroundColor: "#36454F"
    },
    textContainer:{
        flex: 1,
        alignItems: "left"
    },
    titreBouton:{
        marginTop: 25,
        //marginBottom: 10,
        marginLeft: 15,
    },
    historicImage:{
        marginRight: 10,
        width:110,
        height:110,
    },
    separator:{
        height: 6,
        marginTop: 13
    },
})
export default Accueil