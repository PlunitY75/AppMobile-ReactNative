 import React from 'react';
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading = () => {
    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#ffff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'center',
        //padding: 10,
    },
});
const textLoading = () => {
    <Text>Loading...</Text>
}
export default Loading;
