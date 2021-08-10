import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation"
import StartupScreen from "../screens/StartupScreen"
import AuthScreen from "../screens/users/AuthScreen"
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer"
import { createStackNavigator } from "react-navigation-stack"
import JobsScreen from "../screens/jobs/JobsScreen"
import PostJobsScreen from "../screens/users/PostJobsScreen"
import UserJobScreen from "../screens/users/UserJobScreen"
import EditModeScreen from "../screens/users/EditModeScreen"
import Logout from "../screens/users/Logout"
import { Ionicons } from "@expo/vector-icons"
import { SafeAreaView, Text, View, Image } from "react-native"
import { useSelector } from "react-redux"

const JobsNavigator = createStackNavigator({
    Jobs: JobsScreen
}, {
    defaultNavigationOptions: ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: "#008BDC"
            },
            headerTintColor: "white",
            headerRight: () => <Ionicons style={{ marginRight: 15 }} name="md-menu" size={30} color="white" onPress={() => navigation.toggleDrawer()} />
        }
    }
})

const PostJobsNavigator = createStackNavigator({
    Jobs: PostJobsScreen
}, {
    defaultNavigationOptions: ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: "#008BDC"
            },
            headerTintColor: "white",
            headerRight: () => <Ionicons style={{ marginRight: 15 }} name="md-menu" size={30} color="white" onPress={() => navigation.toggleDrawer()} />
        }
    }
})

const UserJobsNavigator = createStackNavigator({
    Jobs: UserJobScreen,
    EditMode: EditModeScreen
}, {
    defaultNavigationOptions: ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: "#008BDC"
            },
            headerTintColor: "white",
            headerRight: () => <Ionicons style={{ marginRight: 15 }} name="md-menu" size={30} color="white" onPress={() => navigation.toggleDrawer()} />
        }
    }
})

const LogoutNavigator = createStackNavigator({
    Jobs: Logout
}, {
    defaultNavigationOptions: ({ navigation }) => {
        return {
            headerStyle: {
                backgroundColor: "#008BDC"
            },
            headerTintColor: "white",
            headerRight: () => <Ionicons style={{ marginRight: 15 }} name="md-menu" size={30} color="white" onPress={() => navigation.toggleDrawer()} />
        }
    }
})

const DrawerNavigator = createDrawerNavigator({
    LatestJobs: {
        screen: JobsNavigator,
        navigationOptions: {
            drawerLabel: "Latest Jobs",
            drawerIcon: drawerConfig => <Ionicons name="md-reorder" size={25} color="#008BDC" />
        }
    },
    PostNewJobs: {
        screen: PostJobsNavigator,
        navigationOptions: {
            drawerLabel: "Post New Job",
            drawerIcon: drawerConfig => <Ionicons name="md-paper" size={25} color="#008BDC" />
        }
    },
    UserOwnJobs: {
        screen: UserJobsNavigator,
        navigationOptions: {
            drawerLabel: "Your Jobs",
            drawerIcon: drawerConfig => <Ionicons name="md-briefcase" size={25} color="#008BDC" />
        }
    },
    Logout: {
        screen: LogoutNavigator,
        navigationOptions: {
            drawerLabel: "Logout",
            drawerIcon: drawerConfig => <Ionicons name="md-log-out" size={25} color="#008BDC" />
        }
    },
}, {
    contentComponent: props => {
        const authUser = useSelector(state => state.auth.name)
        const image = useSelector(state => state.auth.image)

        return (
            <View style={{ marginTop: 30 }} >
                <SafeAreaView forceInset={{ top: "Always", horizontal: "never" }} >
                    <DrawerItems {...props} />
                    <Text style={{ marginLeft: 20, marginTop: 40, fontSize: 15, fontWeight: "bold" }} ><Ionicons name="md-person" size={23} color="#008BDC" />         {authUser}</Text>
                </SafeAreaView>
            </View>
        )
    },
    drawerWidth: 200,
    drawerType: 'front'
})

const MainNavigator = createSwitchNavigator({
    StartupScreen: StartupScreen,
    Jobs: DrawerNavigator,
    Auth: AuthScreen
})

export default createAppContainer(MainNavigator)