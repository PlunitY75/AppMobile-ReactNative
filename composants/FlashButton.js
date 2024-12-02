import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FlashButton({ style, onFlashToggle }) {
    const [flashOn, setFlashOn] = useState(false);

    const toggleFlash = () => {
        setFlashOn(previousState => !previousState);
        if (onFlashToggle) {
            onFlashToggle(!flashOn); // Appeler la fonction onFlashToggle si elle est définie
        }
    }

    return (
        <TouchableWithoutFeedback onPress={toggleFlash}>
            <View style={[styles.container, style]}>
                {flashOn ? <MaterialCommunityIcons name="flashlight" size={50} color="white"/> : <MaterialCommunityIcons name="flashlight-off" size={50} color="black" />}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 75,
        height: 75,
        backgroundColor: "grey",
        borderRadius: 20,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center"
    },
});
