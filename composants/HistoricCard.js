// Dans HistoricCard.js

import React from "react";
import { Text, StyleSheet, Platform, View, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import {Swipeable} from "react-native-gesture-handler";

function HistoricCard({ children, children2, style, onPress, renderRightActions }) {
    return (
        <Swipeable
            renderRightActions={renderRightActions}
            overshootRight={false} // Pour empêcher le swipe complet de déborder à droite
        >
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.container, style]}>
                    <View style={styles.codeCIPContainer}>
                        <AppText fontSize={17} fontWeight={500} marginTop={9}>Médicament</AppText>
                        <AppText style={styles.codeCIP} fontSize={14}> {children} </AppText>
                    </View>
                    <View style={styles.dateContainer}>
                        <AppText fontSize={17} fontWeight={500} marginTop={9}>Date</AppText>
                        <AppText style={styles.codeCIP} fontSize={14}>{children2}</AppText>
                    </View>

                </View>
            </TouchableOpacity>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        borderRadius: 15,
        overflow: "hidden",
        flexDirection: "row",
        marginVertical: 5
    },
    codeCIPContainer: {
        flex: 1,
    },
    dateContainer: {
        flex: 1,
    },
    codeCIP: {
        //marginTop: 15
    },
    rightActionsContainer: {
        // Styles pour les actions à droite du composant
        // Par exemple: flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', etc.
    },
});

export default HistoricCard;
