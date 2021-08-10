import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as firebase from "firebase"
import { useDispatch } from "react-redux"
import * as authActions from "../actions/authActions"

var firebaseConfig = {
    apiKey: "AIzaSyBtsXVoI2HomgrcXwPiiawQSgxS_MOWAEQ",
    authDomain: "seekjobs-6c23d.firebaseapp.com",
    databaseURL: "https://seekjobs-6c23d.firebaseio.com",
    projectId: "seekjobs-6c23d",
    storageBucket: "seekjobs-6c23d.appspot.com",
    messagingSenderId: "33221547068",
    appId: "1:33221547068:web:4a6254c559b615152e1f39",
    measurementId: "G-N2BF8EW0ME"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default function StartupScreen(props) {

    const dispatch = useDispatch()

    const tryLogin = async () => {
        try {
            await firebase.auth().onAuthStateChanged(user => {
                if (user != null) {
                    console.log("User is Logged In")
                    dispatch(authActions.loggedIn(user.uid, user.getIdToken, user.displayName, user.photoURL))
                    props.navigation.navigate("Jobs")
                } else {
                    console.log("User not Logged In, Try Logging in!")
                    props.navigation.navigate("Auth")
                }
            })
        } catch (err) {
            console.log("Error: ", err)
        }
    }

    useEffect(() => {
        tryLogin()
    }, [])

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#008BDC" />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

