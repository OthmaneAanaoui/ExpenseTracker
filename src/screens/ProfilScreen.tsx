import React, { useEffect, useState } from "react";
import {SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, Platform, Button, Image} from "react-native";
import { Input } from 'react-native-elements';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigators/MainRouter';
import {useAuth} from "../context/AuthContext";
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

type Props = {
    navigation: StackNavigationProp<MainStackParamList ,'Setting'>;
};

const ProfilScreen: React.FC<Props> = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.droidSafeArea}>

            <View style={styles.menu}>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.pictureTouchable}
                        onPress={() => {navigation.navigate("Account")}}
                    >
                        <MaterialCommunityIcons name="account" size={50} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.titleTouchable}>Account</Text>
                </View>

                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.pictureTouchable}
                        onPress={() => {navigation.navigate("Categories")}}
                    >
                        <MaterialCommunityIcons name="bookmark-multiple-outline" size={45} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.titleTouchable}>Category</Text>
                </View>

                <View style={styles.container}>
                    <TouchableOpacity
                        style={styles.pictureTouchable}
                        onPress={() => {navigation.navigate("Cards")}}
                    >
                        <AntDesign name="creditcard" size={45} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.titleTouchable}>Card</Text>
                </View>
            </View>


        </SafeAreaView>
    );
};

export default ProfilScreen;

const styles = StyleSheet.create({ // TODO - ProfilScreen - finir stylesheet
    droidSafeArea: {
        flex: 1,
        width: "100%",
        paddingTop: Platform.OS === "android" ? 25 : 0,
        backgroundColor:"#212227"
    },
    menu:{
        marginTop: 50,
        flexDirection: 'row',
        justifyContent:"space-around"
    },
    container:{
        alignItems: "center",
        margin: 10
    },
    pictureTouchable:{
        borderRadius: 50,
        backgroundColor: '#b4b4b4',
        width: 60,
        height: 60,
        alignItems: "center",
        textAlignVertical: "center",
        paddingTop: 5
    },
    titleTouchable:{
        fontStyle: 'italic',
        color: 'white'
    }
});
