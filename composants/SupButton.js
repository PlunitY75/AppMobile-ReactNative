import React from "react";
import { StyleSheet, Platform, TouchableWithoutFeedback, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function SupButton ({ onPress }) {
    return (
        <TouchableWithoutFeedback onPress={ onPress }>
            <View style={styles.container}>
                <MaterialCommunityIcons name={"trash-can"} size={35} color={"white"}/>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: "tomato",
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
