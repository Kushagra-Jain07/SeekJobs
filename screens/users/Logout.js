import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from "react-native"
import { useDispatch } from "react-redux"
import * as authActions from "../../actions/authActions"

export default function Logout(props) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authActions.loggedOut())
        props.navigation.navigate("Auth")
    }, [dispatch])

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <ActivityIndicator size="large" color="#008BDC" />
        </View>
    );
}


