import * as React from 'react';
import {useContext, useState} from 'react';
import {Text, View, StyleSheet, Switch} from 'react-native';
import {Category} from "../types/Category";
import {Input} from "react-native-elements";

type Props = {
    //category: Category;
    isIncome: boolean;
    name: string;
    value: number;
}

const NewExpenseCard: React.FC<Props> = ({ isIncome, name, value }) => {

    const [isExpense, setIsExpense] = useState<boolean>(!isIncome)
    //const [categories, setCategories] = useState<Category>(category)
    const [title, setTitle] = useState<string>(name)
    const [values, setValues] = useState<number>(value)

    const toggleSwitch = () => setIsExpense(previousState => !previousState);

    return (
        <View style={styles.container}>

            <View style={[styles.eachView, styles.viewIncomeExpense]}>
                <Text style={{color:'white'}}> Expense </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#f4f3f4" }}
                    thumbColor={"#b6b4b6"}
                    onValueChange={toggleSwitch}
                    value={isExpense}
                />
                <Text style={{color:'white'}}> Income </Text>
            </View>


            <Text style={{color:'white'}}> choice categories </Text> {/* TODO */}


            <Text style={{color:'white'}}> choice card </Text> {/* TODO */}

            <View style={[styles.eachView, styles.itemContainer]}>
                <Text style={styles.item}> Name : </Text>
                <Input
                    style={styles.itemInput}
                    value={name}
                    onChangeText={value => setTitle(value)}
                />
            </View>

            <View style={[styles.eachView, styles.itemContainer]}>
                <Text style={styles.item}> Value : </Text>
                <Input
                    style={styles.itemInput}
                    value={title}
                    onChangeText={value => setTitle(value)}
                />
            </View>
        </View>
    );
};

export default NewExpenseCard;

const styles = StyleSheet.create({
    container: {
        marginTop:10,
        paddingVertical:5,
        overflow: 'hidden',
        width: '95%',
        backgroundColor: '#64666A',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    eachView:{
        margin: 5,
    },
    viewIncomeExpense:{
        flexDirection: "row",
    },
    item:{
        color: 'white',
        flex: 1
    },
    itemContainer:{

    },
    itemInput:{
        color: 'white',
        flex:3
    }
});
