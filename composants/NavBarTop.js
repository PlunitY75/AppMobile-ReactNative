import React from "react";
import {Text, View, StyleSheet, Platform, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from "./AppText";
import {useNavigation} from "@react-navigation/native";
function NavBarTop ({ children }) {

    const navigation = useNavigation(); // Utiliser useNavigation pour accéder à la fonction de navigation
    const handleScanner = () => {
        // Naviguer vers la page "Mot de passe oublié"
        navigation.navigate('Scanner');
    };

    return (
          <View style={styles.NavBarTop}>
              <AppText fontWeight={"bold"} fontSize={30} style={styles.titre}>
                  {children}
              </AppText>
              <View style={styles.boutonContainer}>
                  <TouchableOpacity style={styles.boutonProfile} onPress={ () => navigation.navigate('Profil')}>
                      <MaterialCommunityIcons name="account" size={25} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.boutonScan} onPress={handleScanner}>
                      <Ionicons name="scan" size={18} color="white" />
                  </TouchableOpacity>
              </View>
          </View>
    );
}
const styles = StyleSheet.create({
    NavBarTop: {
        width: "100%",
        height: 50,
        backgroundColor: "#1B1B1F",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titre:{
      marginLeft: 15
    },
    boutonContainer: {
        flexDirection:"row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15
        //top: Platform.OS === 'android' ? 22 : 45,
    },
    boutonProfile:{
        marginRight: 10
    },
    boutonScan:{
        backgroundColor: "#6495ED",
        height: 30,
        width: 30,
        borderRadius: 20,
        //marginHorizontal: 5,
        justifyContent: "center",
        alignItems:"center"
    },
    profile:{
        color: "white",
        fontSize: 30
    },
    historic:{
        fontSize: 30,
        color: "black"
    },
    home: {
        fontSize: 30,
        color: "black"
    },
})
export default NavBarTop
