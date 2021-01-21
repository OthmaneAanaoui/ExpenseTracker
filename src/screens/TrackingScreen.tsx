import React, { Component, useEffect } from 'react';
import {Modal, Text, View, StyleSheet, Button} from 'react-native';
//import Modal from 'react-native-modal';
import {useState} from "react";
import NewExpenseCard from '../components/NewExpenseCard';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigators/MainRouter';

interface TrackingScreenProps {}

const TrackingScreen = (props: TrackingScreenProps) => {

    const [state, setState] = useState<boolean>(false)

    function setModalVisible(visible:boolean) {
        setState(visible);
    }

    return (
        <View style={styles.container}>
            <Text>TrackingScreen</Text>

            <Button title={"view modal"} onPress={() => setModalVisible(true)} />
            
            <NewExpenseCard
                visible={state}
                closeDisplay={() => setModalVisible(false)}
                isNew={true}
                idExpense={""}
                idCategory={""}
                idCard={""}
                isIncome={true}
                name={""}
                date={0}
                value={0}
            />
        </View>
    );
};

export default TrackingScreen;

const styles = StyleSheet.create({
  container: {}
});
