import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import NewExpenseCard from "../components/NewExpenseCard";
import {Category} from "../types/Category";

interface TrackingScreenProps {}

const TrackingScreen = (props: TrackingScreenProps) => {
    //const cat:Category = undefined;
    return (
        <View style={styles.container}>
            <Text>TrackingScreen</Text>
            <NewExpenseCard isIncome={true} name={""} value={0}/>
        </View>
    );
};

export default TrackingScreen;

const styles = StyleSheet.create({
  container: {}
});
