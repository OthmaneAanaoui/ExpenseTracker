import React, { useEffect, useState } from "react";
import {SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, Platform, Button} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigators/MainRouter';

type Props = {
    navigation: StackNavigationProp<MainStackParamList ,'Profil'>;
};

const ProfilScreen: React.FC<Props> = ({ navigation }) => {

    const changePassword = () => {
        navigation.navigate("PasswordManagement")
    }

    const cardManagement = () => {
        navigation.navigate("CardManagement")
    }

    const logOut = () => {
        // TODO - ProfilScreen - log Out button
    }

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <Text style={styles.title}>Setting</Text>
            <Text style={styles.information}>speudo</Text> // TODO - ProfilScreen - possibilité de changer l'email
            <Text style={styles.information}>email</Text> // TODO - ProfilScreen - possibilité de changer l'email
            <Button title={"to change my password"} onPress={changePassword}/>
            <Button title={"card management"} onPress={cardManagement}/>
            <Text>theme</Text>
            <Button title={"log out"} onPress={logOut}/>
        </SafeAreaView>
    );
};

export default ProfilScreen;

const styles = StyleSheet.create({ // TODO - ProfilScreen - finir stylesheet
    droidSafeArea: {
        flex: 1,
        width: "100%",
        paddingTop: Platform.OS === "android" ? 25 : 0
    },
    title:{
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 15
    },
    information:{
        textAlign: "left"
    }
});
