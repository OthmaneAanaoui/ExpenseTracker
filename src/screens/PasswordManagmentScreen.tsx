import React, { useEffect, useState } from "react";
import {SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, Platform} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigators/MainRouter';

type Props = {
    navigation: StackNavigationProp<MainStackParamList ,'PasswordManagement'>;
};

const PasswordManagementScreen: React.FC<Props> = () => {

    // TODO - PasswordManagement

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <Text>password management</Text>
        </SafeAreaView>
    );
};

export default PasswordManagementScreen;

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        width: "100%",
        paddingTop: Platform.OS === "android" ? 25 : 0
    },
});
