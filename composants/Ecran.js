import React from "react";
import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import Constants from "expo-constants";
import NavBarTop from "./NavBarTop";
import NavBarBot from "./NavBarBot";

export default function Screen({ children, style, titreNavBar}){
    return(
            <View style={[styles.screen, style]}>
                <NavBarTop children={titreNavBar}/>
                {children}
                <NavBarBot/>
            </View>
    );
}

const styles = StyleSheet.create({
    screen:{
        backgroundColor:"#1B1B1F",
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 85,
        flex:1,
        flexDirection: "column",
        alignItems: "center",
    },
})

