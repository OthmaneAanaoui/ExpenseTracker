import React, { Component } from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import Modal from 'react-native-modal';
import {useState} from "react";
import NewExpenseCard from '../components/NewExpenseCard';

interface TrackingScreenProps {}

const TrackingScreen = (props: TrackingScreenProps) => {

    const [edition, setEdition] = useState<boolean>(false)

    return (
        <View style={styles.container}>
            <Text>TrackingScreen</Text>

            <Button title={"view modal"} onPress={() => setEdition(true)}/>

            {
                edition
                    ?
                    <Modal isVisible={edition} onBackdropPress={() => setEdition(false)}>
                        <NewExpenseCard
                            //closeDisplay={() => setEdition(false)}
                            isNew={true}
                            idExpense={""}
                            idCategory={""}
                            idCard={""}
                            isIncome={true}
                            name={""}
                            value={0}
                        />
                    </Modal>
                    :
                    <Text>not visible</Text>
            }

        </View>
    );
};

export default TrackingScreen;

const styles = StyleSheet.create({
  container: {}
});
