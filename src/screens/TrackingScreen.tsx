import React, { Component, useEffect } from 'react';
import {Modal, Text, View, StyleSheet, Button} from 'react-native';
//import Modal from 'react-native-modal';
import {useState} from "react";
import NewExpenseCard from '../components/NewExpenseCard';

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
            <Button title={"close modal"} onPress={() => setModalVisible(false)} />

            <Modal
                animationType="slide"
                transparent={false}
                visible={state}
                onRequestClose={() => {console.log('Modal has been closed.');}}
            >
                <NewExpenseCard
                    closeDisplay={() => setModalVisible(false)}
                    isNew={true}
                    idExpense={""}
                    idCategory={""}
                    idCard={""}
                    isIncome={true}
                    name={""}
                    value={0}
                />
            </Modal>
        </View>
    );
};

export default TrackingScreen;

const styles = StyleSheet.create({
  container: {}
});
