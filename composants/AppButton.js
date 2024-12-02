import React from "react";
import {View, TextInput, StyleSheet, Platform, TouchableOpacity, Text} from "react-native";
import AppText from "./AppText";

function appButton( {style, children, color, onPress } ) {
    return (
        <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
            <View>
                <AppText style={styles.textButton} color={color}>{children}</AppText>
            </View>
        </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#6495ED",
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 20,
       textAlign: "center",
        justifyContent: "center",
    },
    textButton:{
        marginTop: 0,
        fontSize: 16,
        fontWeight: 600,
    }
});
export default appButton;