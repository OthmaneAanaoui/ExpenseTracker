import React, { useEffect, useState } from "react";
import {SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, Platform} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigators/MainRouter';

type Props = {
    navigation: StackNavigationProp<MainStackParamList ,'Cards'>;
};

const CardManagementScreen: React.FC<Props> = ({ navigation }) => {

    // TODO - CardManagement

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <Text>card management</Text>
        </SafeAreaView>
    );
};

export default CardManagementScreen;

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        width: "100%",
        paddingTop: Platform.OS === "android" ? 25 : 0,
        backgroundColor:"#212227"
    },
});
