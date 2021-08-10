import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from "react-redux"
import * as jobActions from "../../actions/jobActions"
import OwnJobItem from "../../components/OwnJobItem"

export default function UserJobScreen(props) {

    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const dispatch = useDispatch()
    const userOwnJobs = useSelector(state => state.job.userOwnJobs)

    const loadOwnJobs = useCallback(async () => {
        setIsRefreshing(true)

        try {
            await dispatch(jobActions.fetchAllJobs())
        } catch (error) {
            console.log(error)
        }

        setIsRefreshing(false)
    }, [dispatch])

    useEffect(() => {
        setIsLoading(true)

        loadOwnJobs().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadOwnJobs])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadOwnJobs)

        return () => {
            willFocusSub.remove()
        }
    }, [dispatch, loadOwnJobs])

    const deleteJob = (jobId) => {
        Alert.alert("Are you Sure", "Do you want to delete?",
            [
                {
                    text: "No",
                    style: "default"
                },
                {
                    text: "Yes",
                    style: 'destructive',
                    onPress: () => {
                        dispatch(jobActions.deleteJob(jobId))
                    }
                }
            ])
    }

    const editJob = (id) => {
        props.navigation.navigate("EditMode", { id: id })
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#008BDC" animating />
            </View>
        )
    }

    if (userOwnJobs.length === 0) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>No Jobs Posted Yet!</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList style={{ flex: 1, width: "100%", marginTop: 3 }}
                data={userOwnJobs}
                refreshControl={<RefreshControl
                    colors={["#008BDC"]}
                    onRefresh={loadOwnJobs}
                    refreshing={isRefreshing} />}
                keyExtractor={item => item.id}
                renderItem={itemData => <OwnJobItem
                    description={itemData.item.description}
                    address={itemData.item.address}
                    salary={itemData.item.salary}
                    deleteJob={() => deleteJob(itemData.item.id)}
                    editJob={() => editJob(itemData.item.id)} />}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

UserJobScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Jobs You Posted"
    }
}
