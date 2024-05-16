import { Text, SafeAreaView, StatusBar, View, TextInput, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import {theme} from "../theme/index";

import {MagnifyingGlassIcon} from "react-native-heroicons/outline";
import { useState } from "react";

const HomeScreen = ()=>{
    return(
        <View className="flex-1 relative">
            <StatusBar barStyle={"light-content"}></StatusBar>
            <Image blurRadius={70} source={require("../assets/bg-img.png")} className="absolute h-full "></Image>
            <SafeAreaView className="flex flex-1">
                {/*Search Section */}
                <View style={{height:'7%'}} className="mx-4 relative z-50">
                    <View className="flex-row justify-end items-center rounded-full"
                    style={{backgroundColor : theme.bgWhite(0.2)}}>
                        <TextInput placeholder="Search City" 
                        placeholderTextColor={"lightgrey"} 
                        className="pl-6 h-10 flex-1 text-base text-white" />
                        <TouchableOpacity 
                        style={{backgroundColor : theme.bgWhite(0.3)}} 
                        className="rounded-full p-3 m-1">
                        <MagnifyingGlassIcon size="25" color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    )
}


export default HomeScreen
