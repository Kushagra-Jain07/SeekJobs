import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from "react-native-paper"
import * as Facebook from 'expo-facebook'
import * as firebase from "firebase"


export default function AuthScreen(props) {

    const facebook = async () => {
        await Facebook.initializeAsync({ appId: "398580471261359" })
        const { type, token } = await Facebook.logInWithReadPermissionsAsync({
            permission: ['public_profile']
        })
        if (type == "success") {
            const credential = firebase.auth.FacebookAuthProvider.credential(token)
            firebase.auth().signInWithCredential(credential)
                .catch(error => {
                    console.log(error)
                })
        }

        props.navigation.navigate("Jobs")
    }

    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require("../../assets/main.jpg")} />
            <View style={styles.myView}>
                <Text style={styles.myText}>Find or Post Jobs!</Text>
                <Button style={styles.myBtn} mode="contained" onPress={facebook}>
                    Login With Facebook
            </Button>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    img: {
        flex: 0.7,
        width: 300,
        height: 40,
        marginTop: 100,
        marginLeft: 40
    },
    myView: {
        marginTop: 120,
        alignItems: "center"
    },
    myText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "rgb(45, 49, 84)"
    },
    myBtn: {
        marginTop: 20,
        backgroundColor: "#008BDC"
    }
});
