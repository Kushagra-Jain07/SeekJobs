import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { View, Text, StyleSheet } from 'react-native';

export default function OwnJobItem(props) {
    return (
        <Card style={styles.container}>
            <View>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.myView}>
                        <MaterialCommunityIcons name="wrench" size={32} color={'#008BDC'} />
                    </View>
                    <Text style={styles.mainText}> {props.description}</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10, marginLeft: 10 }}>
                    <View style={styles.myView}>
                        <MaterialCommunityIcons name="map-marker" size={25} color={'#008BDC'} />
                    </View>
                    <Text style={styles.nrmlText}> {props.address}</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                    <View style={styles.myView}>
                        <MaterialCommunityIcons name="currency-inr" size={25} color={'#008BDC'} />
                    </View>
                    <Text style={styles.nrmlText}> {props.salary}</Text>
                </View>
            </View>
            <View style={styles.btnView}>
                <Button mode="contained" style={styles.callBtn} onPress={props.editJob} ><MaterialCommunityIcons name="border-color" size={23} color={"rgb(227, 59, 59)"} /></Button>
                <Button mode="contained" style={styles.callBtn} onPress={props.deleteJob} ><MaterialCommunityIcons name="delete" size={23} color={"rgb(227, 59, 59)"} /></Button>
            </View>
        </Card>
    );
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 3,
        marginHorizontal: 5,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "rgb(247, 246, 245)",
        borderColor: "rgb(151, 152, 153)",
        elevation: 2,
        flex: 1
    },
    btnView: {
        flex: 1, flexDirection: "row", justifyContent: "space-evenly", marginTop: 20
    },
    mainText: {
        marginVertical: 5, fontSize: 25, fontWeight: "bold", color: "rgb(62, 63, 64)"
    },
    nrmlText: {
        marginVertical: 5, fontSize: 20, color: "rgb(87, 88, 89)"
    },
    callBtn: {
        borderColor: "#008BDC",
        borderWidth: 1.2,
        backgroundColor: "rgb(245, 246, 247)",
        paddingHorizontal: 10
    },
    myView: {
        marginTop: 5
    }
});

