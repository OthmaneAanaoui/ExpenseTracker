import React, { useEffect, useState } from "react";
import {SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, Platform} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigators/MainRouter';

type Props = {
    navigation: StackNavigationProp<MainStackParamList ,'CategoryManagement'>;
};

const CategoryManagementScreen: React.FC<Props> = ({ navigation }) => {

    // TODO - CategoryManagement

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <Text>category management</Text>
        </SafeAreaView>
    );
};

export default CategoryManagementScreen;

const styles = StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        width: "100%",
        paddingTop: Platform.OS === "android" ? 25 : 0
    },
});
