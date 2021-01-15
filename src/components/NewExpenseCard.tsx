import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Switch, Button, TextInput} from 'react-native';
import {Input} from "react-native-elements";
import { Expense } from '../types/Expense';
import { useExpense } from "../context/ExpenseContext";
import {useCategory} from "../context/CategoryContext";
import {useCard} from "../context/BankcardContext";

type props = {
    isNew:boolean;
    idExpense:string;
    idCategory:string;
    idCard:string;
    isIncome:boolean;
    name:string;
    value:number;
    //closeDisplay:(() => void);
}

const NewExpenseCard: React.FC<props> = (props) => {

    const [id, setId] = useState<string>(props.idExpense)
    const [names, setNames] = useState<string>(props.name)
    const [idCards, setIdCards] = useState<string>(props.idCard)
    const [idCategories, setIdCategories] = useState<string>(props.idCategory)
    const [values, setValues] = useState<number>(props.value)
    const [isIncomes, setIncomes] = useState<boolean>(props.isIncome)


    const cat = useCategory()
    const exp = useExpense()
    const car = useCard()

    useEffect(() => {
        console.log("NewExpenseCard")
    }, [])

    const onCreate = () => {
        /*
        if(props.idExpense === "") exp?.asyncCreateExpense(props.name, props.idCategory, props.value, props.idCard, props.isIncome);*/
        //props.closeDisplay
    }

    const onSave = () => {
        /*
        if(id != "") {
            const newExpense: Expense = {
                id:id,
                name: names,
                idCard: idCards,
                idCategory: idCategories,
                value: values,
                date: dates,
                isIncome: isIncomes
            }
            exp?.asyncUpdateExpense(newExpense);
        }*/
        //props.closeDisplay
    }

    const toggleSwitch = () => {
        setIncomes(!isIncomes);
    }

    return (
        <View style={styles.container}>

            <View style={[styles.eachView, styles.viewIncomeExpense]}>
                <Text style={{color: 'white'}}> Expense </Text>
                <Switch
                    trackColor={{false: "#767577", true: "#f4f3f4"}}
                    thumbColor={"#b6b4b6"}
                    onValueChange={toggleSwitch}
                    value={!isIncomes}
                />
                <Text style={{color: 'white'}}> Income </Text>
            </View>


            <Text style={{color: 'white'}}> choice categories </Text> {/* TODO */}


            <Text style={{color: 'white'}}> choice card </Text> {/* TODO */}


            <View style={[styles.eachView, styles.itemContainer]}>
                <Text style={styles.item}> Name : </Text>
                <Input
                    style={styles.itemInput}
                    value={names}
                    onChangeText={value => setNames(value)}
                />
            </View>

            <View style={[styles.eachView, styles.itemContainer]}>
                <Text style={styles.item}> Value : </Text>
                <TextInput
                    keyboardType='numeric'
                    style={styles.itemInput}

                />
            </View>

            <View style={styles.eachView}>
                {props.isNew
                    ?
                    <Button title={"Create"} onPress={onCreate}/>
                    :
                    <Button title={"Save"} onPress={onSave}/>
                }

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
