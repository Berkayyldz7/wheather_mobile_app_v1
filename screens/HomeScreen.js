import { Text, SafeAreaView, StatusBar, View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "react-native";
import {theme} from "../theme/index";

import {CalendarDaysIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {MapPinIcon} from "react-native-heroicons/solid";
import { useState, useCallback } from "react";
import {debounce} from "lodash";
import { fetchForecast, fetchLocations } from "../api/whatherapi";

const HomeScreen = ()=>{
    const [showSearch, setShowSearch] = useState(false);
    const [locations, setLocations] = useState();
    const [wheather, setWheather] = useState();

    const handleLocation = (loc)=>{
        // console.log(loc)
        setLocations([]);

        setShowSearch(false);

        fetchForecast({
            cityName : loc.name,
            days : "7"
        }).then((data)=>{
            setWheather(data)
            console.log("wheather data:", data)
        })
    };

    const handleSearch = (value)=>{
        // console.log("value =", value)
        // Fetch Locations
        if(value.length > 2){
            fetchLocations({cityName : value}).then(data=>{
                // console.log("data",data)
                setLocations(data)
            })
        }
    };

    const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

    const location = wheather?.location;
    const current = wheather?.current;
    return(
        <View className="flex-1 relative">
            <StatusBar barStyle={"light-content"}></StatusBar>
            <Image blurRadius={70} source={require("../assets/bg-img.png")} className="absolute h-full "></Image>
            <SafeAreaView className="flex flex-1">
                {/*Search Section */}
                <View style={{height:'7%'}} className="mx-4 relative z-50">
                    <View className="flex-row justify-end items-center rounded-full"
                    style={{backgroundColor : showSearch ? theme.bgWhite(0.2) : 'transparent'}}>
                        {
                            showSearch ? (
                                <TextInput onChangeText={(value)=>{handleSearch(value)}}
                                placeholder="Search City" 
                                placeholderTextColor={"lightgrey"} 
                                className="pl-6 h-10 flex-1 text-base text-white" />

                            ) : null
                        }
                        <TouchableOpacity 
                        onPress={()=>setShowSearch(!showSearch)}
                        style={{backgroundColor : theme.bgWhite(0.3)}} 
                        className="rounded-full p-3 m-1" 
                        >
                        <MagnifyingGlassIcon size="25" color="white" />
                        </TouchableOpacity>
                    </View>
                    {
                    locations?.length > 0 && showSearch ? (
                        <View className="absolute w-full bg-gray-300 top-16 rounded-3xl">
                            {
                                locations.map((loc, index)=>{
                                    let showBorder = index+1 != locations.length;
                                    let borderClass = showBorder ? " border-b-2 border-b-gray-400" : "";
                                    {/* This codes hides last border's line */}
                                    return (
                                        <TouchableOpacity key={index}
                                        onPress={()=>handleLocation(loc)}
                                        className={"flex-row items-center border-0 p-3 px-4 mb-1"+borderClass}>
                                            <MapPinIcon size="20" color="grey"/>
                                            <Text className="text-lg text-black ml-2"> {loc?.name}, {loc?.country} </Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    ) : null
                }
                </View>

                {/* Forecast Section */}

                <View className="mx-4 flex justify-around flex-1 mb-2">

                    {/*Locations */}

                    <Text className="text-white text-center text-2xl font-bold">
                        {location?.name},
                        <Text className="text-lg font-semibold text-gray-300">
                            {" "+location?.country}
                        </Text>
                    </Text>

                    {/*Wheather Image */}

                    <View className="flex-row justify-center">
                        {/* <Image source={require("../assets/partlycloudy.png")} className="w-52 h-52"/> */}
                        <Image source={{uri : "https:"+current?.condition?.icon}} className="w-52 h-52"/>
                    </View>

                    {/* Degree */}

                    <View className="space-y-2">
                        <Text className="text-white font-bold text-center text-6xl ml-5">
                            {current?.temp_c}&#176;
                        </Text>
                        <Text className="text-white font-bold text-center text-xl tracking-widest">
                            {current?.condition?.text}
                        </Text>
                    </View>

                    {/* Other Stats */}

                    <View className="flex-row justify-between mx-4">

                        <View className="flex-row space-x-2 items-center">
                            <Image source={require("../assets/icons/wind.png")} className="h-6 w-6" />
                            <Text className="text-white font-semibold text-base"> {current?.wind_kph}km </Text>
                        </View>

                        <View className="flex-row space-x-2 items-center">
                            <Image source={require("../assets/icons/drop.png")} className="h-6 w-6" />
                            <Text className="text-white font-semibold text-base"> %{current?.humidity} </Text>
                        </View>

                        <View className="flex-row space-x-2 items-center">
                            <Image source={require("../assets/icons/sun.png")} className="h-6 w-6" />
                            <Text className="text-white font-semibold text-base"> 6:05 AM </Text>
                        </View>
                    </View>

                    {/*Forecast for next days */}

                    <View className="mb-2 space-y-2"> 

                        <View className="flex-row item-center mx-5 space-x-2">
                            
                            <CalendarDaysIcon size="22" color="white" />
                            <Text className="text-white text-base">Daily Forecast</Text>

                        </View>
                        <ScrollView
                        horizontal
                        contentContainerStyle={{paddingHorizontal:15}}
                        showsHorizontalScrollIndicator={false}>

                            {
                                wheather?.forecast?.forecastday?.map((item, index)=>{
                                    return (
                                        <View 
                                        key={index}
                                        className="flex justify-center items-center w-24 rounded-3xl py-3 mr-4 space-y-4"
                                        style={{backgroundColor : theme.bgWhite(0.15)}}>
                                            
                                            <Image source={require("../assets/heavyrain.png")} className="w-11 h-11"/>
                                            <Text className="text-white">{item.date}</Text>
                                            <Text className="text-white text-xl font-semibold">{item?.day?.avgtemp_c}&#176;</Text>
            
                                        </View>
                                    )
                                })
                            }

                            {/* <View className="flex justify-center items-center w-24 rounded-3xl py-3 mr-4 space-y-4"
                            style={{backgroundColor : theme.bgWhite(0.15)}}>
                                
                                <Image source={require("../assets/heavyrain.png")} className="w-11 h-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">13&#176;</Text>

                            </View>

                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 mr-4 space-y-4"
                            style={{backgroundColor : theme.bgWhite(0.15)}}>
                                
                                <Image source={require("../assets/heavyrain.png")} className="w-11 h-11"/>
                                <Text className="text-white">Tuesday</Text>
                                <Text className="text-white text-xl font-semibold">13&#176;</Text>

                            </View>

                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 mr-4 space-y-4"
                            style={{backgroundColor : theme.bgWhite(0.15)}}>
                                
                                <Image source={require("../assets/heavyrain.png")} className="w-11 h-11"/>
                                <Text className="text-white">Wednessday</Text>
                                <Text className="text-white text-xl font-semibold">13&#176;</Text>

                            </View>

                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 mr-4 space-y-4"
                            style={{backgroundColor : theme.bgWhite(0.15)}}>
                                
                                <Image source={require("../assets/heavyrain.png")} className="w-11 h-11"/>
                                <Text className="text-white">Thursday</Text>
                                <Text className="text-white text-xl font-semibold">13&#176;</Text>

                            </View>

                            <View className="flex justify-center items-center w-24 rounded-3xl py-3 mr-4 space-y-4"
                            style={{backgroundColor : theme.bgWhite(0.15)}}>
                                
                                <Image source={require("../assets/heavyrain.png")} className="w-11 h-11"/>
                                <Text className="text-white">Monday</Text>
                                <Text className="text-white text-xl font-semibold">13&#176;</Text>

                            </View> */}

                        </ScrollView>
                    </View>

                </View>
            </SafeAreaView>
        </View>
    )
}


export default HomeScreen

