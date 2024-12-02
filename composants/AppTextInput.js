import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { EvilIcons } from '@expo/vector-icons';

function AppTextInput({ style, text, secureTextEntry, onChangeText, autoCapitalize, autoCorrect }) { // Ajouter la prop secureTextEntry
    return (
        <View style={[styles.container, style]}>

            <TextInput
                style={styles.input}
                placeholder={text}
                placeholderTextColor={"rgba(255, 255, 255, 0.75)"}
                color={"white"}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "80%",
        padding: 5,
        marginVertical: 5,
        backgroundColor: "#121215",
        borderRadius: 5,
    },
    icon: {
        fontSize: 25,
        marginHorizontal: 10,
        color: "white"
    },
    input: {
        flex: 1, // Pour étirer le champ de saisie pour remplir l'espace disponible
        //fontSize: 30,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    },
});

export default AppTextInput;