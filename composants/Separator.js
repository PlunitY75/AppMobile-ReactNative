import React from "react";
import {View, StyleSheet} from "react-native";


export default function NavBarBot( {style}){
    return (
        <View style={[styles.separator, style]}></View>
    );
}

const styles = StyleSheet.create({
    separator:{
        backgroundColor: "#121215",
        width: "100%",
        height: 0.25,
        marginTop: 0
    },
})