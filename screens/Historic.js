import React, { useState, useEffect, useCallback } from "react";
import { Text, View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { collection, query, where, getDocs } from 'firebase/firestore';
import Ecran from "../composants/Ecran";
import HistoricCard from "../composants/HistoricCard";
import Separator from "../composants/Separator";
import { FIREBASE_AUTH, FIREBASE_DB } from '../FirebaseConfig';

export default function Historic() {
    const auth = FIREBASE_AUTH;
    const [medicaments, setMedicaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            const currentUserID = auth.currentUser.uid;
            const historicCollectionRef = collection(FIREBASE_DB, 'userInfo', currentUserID, 'historique_medicaments');
            const querySnapshot = await getDocs(historicCollectionRef);
            const medicamentsData = [];
            querySnapshot.forEach((doc) => {
                medicamentsData.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            const filteredMedicamentsData = medicamentsData.filter(item => item.dateAjout);
            setMedicaments(filteredMedicamentsData);
        } catch (error) {
            console.error('Error fetching medicaments:', error);
        } finally {
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        onRefresh();
    }, []);

    return (
        <Ecran titreNavBar={"Historique"}>
            <View style={styles.container}>
                <FlatList
                    data={medicaments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <HistoricCard
                            children={item.nom}
                            children2={item.dateAjout ? new Date(item.dateAjout.seconds * 1000).toLocaleDateString() : ''}
                        />
                    )}
                    ItemSeparatorComponent={() => <Separator style={styles.separator} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        </Ecran>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        marginTop: 20
    },
    separator: {
        height: 1,
        backgroundColor: "#36454F"
    },
});
