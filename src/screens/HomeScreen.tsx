import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";


type Props = {};

const HomeScreen: React.FC<Props> = () => {
    
    const onPressGetIcon = async () => {
        //services.expenseService.getIcon("KcJqlQYjTfYT5oPU13Ze")
    }
    const onPressGetIcons = async () => {
        //services.expenseService.getIcons()
    }

    return (
        <View>
            <Text>Home</Text>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
});
