import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import * as jobActions from "../../actions/jobActions"
import { useDispatch, useSelector } from "react-redux"
import JobItem from "../../components/JobItem"

export default function JobsScreen(props) {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const allJobs = useSelector(state => state.job.availableJobs)

    const loadJobs = useCallback(async () => {
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

        loadJobs().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadJobs])

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadJobs)

        return () => {
            willFocusSub.remove()
        }
    }, [dispatch, loadJobs])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#008BDC" animating />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList data={allJobs}
                refreshControl={<RefreshControl
                    colors={["#008BDC"]}
                    onRefresh={loadJobs}
                    refreshing={isRefreshing} />}
                keyExtractor={item => item.id}
                style={{ flex: 1, width: "100%", marginTop: 3 }}
                renderItem={itemData => <JobItem description={itemData.item.description} address={itemData.item.address} salary={itemData.item.salary} phone={itemData.item.phone.toString()} />} />
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

JobsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Latest Available Jobs"
    }
}
