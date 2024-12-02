import React from "react";
import {Text, StyleSheet, Platform} from "react-native";

function AppText ({ children, color = "white", fontSize = 26, fontWeight = "normal", marginTop =5 , style}) {
    return <Text style={[styles.text, {color:color}, {fontSize: fontSize}, {fontWeight: fontWeight},  {marginTop: marginTop}, style]}>{children}</Text>
}
const styles = StyleSheet.create({
    text:{
        textAlign: "center",
        fontFamily: Platform.OS === 'android' ? "sans-serif" : "Avenir",
    }
})
export default AppText;
