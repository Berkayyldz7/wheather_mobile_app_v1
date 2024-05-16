import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import {Text, View, LogBox} from "react-native";
import HomeScreen from "../screens/HomeScreen";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state'
])

const Stack = createNativeStackNavigator();

const AppNavigations = ()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigations
