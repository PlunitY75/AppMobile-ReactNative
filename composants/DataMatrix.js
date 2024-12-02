import React from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import AppText from "./AppText";
import { AntDesign } from '@expo/vector-icons';

function DataMatrix (){
    return(
        <TouchableOpacity>
            <View style={styles.container}>
                <AppText style={styles.texte} fontSize={10} color={"white"} fontWeight={"bold"} marginTop={0}>DataMatrix</AppText>
                <View style={styles.containerLogo}>
                    <AntDesign name="qrcode" size={20} color="black" />
                </View>

            </View>
        </TouchableOpacity>
)
}

const styles = StyleSheet.create ({
    container: {
        flexDirection:"row",
        alignItems: "center",
        height: 40,
        width: 100,
        borderRadius:10,
        backgroundColor: "dodgerblue",
        shadowColor: "black",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.55,
        shadowRadius: 1,
    },
    texte:{
        marginLeft: 9,
        marginRight: 5
    },
    containerLogo:{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        height:24,
        width:24,
        overflow: "hidden"
    }
})
export default DataMatrix;