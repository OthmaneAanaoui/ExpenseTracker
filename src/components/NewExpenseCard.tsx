import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Switch, Button, TextInput, Modal, Picker} from 'react-native';
import {Input} from "react-native-elements";
import { useExpense } from "../context/ExpenseContext";
import {useCategory} from "../context/CategoryContext";
import { useCard } from "../context/BankcardContext";
import { Expense } from '../types/Expense';
import { ModalDatePicker } from "react-native-material-date-picker";

type props = {
    visible: boolean;
    isNew:boolean;
    idExpense:string;
    idCategory:string;
    idCard:string;
    isIncome:boolean;
    name:string;
    value: number;
    date: number;
    closeDisplay:(() => void);
}

const NewExpenseCard: React.FC<props> = (props) => {

    const [state, setState] = useState<boolean>(props.visible)
    const [id, setId] = useState<string>(props.idExpense)
    const [names, setNames] = useState<string>(props.name)
    const [idCards, setIdCards] = useState<string>(props.idCard)
    const [idCategories, setIdCategories] = useState<string>(props.idCategory)
    const [values, setValues] = useState<number>(props.value)
    const [date, setDate] = useState<Date>(new Date(props.date))
    const [isIncomes, setIncomes] = useState<boolean>(props.isIncome)

    const [selectedDay, setSelectedDay] = useState<number>(date.getDay())
    const [selectedMonth, setSelectedMonth] = useState<number>(date.getMonth())
    const [selectedYear, setSelectedYear] = useState<number>(date.getFullYear())

    const cat = useCategory()
    const exp = useExpense()
    const car = useCard()

    useEffect(() => {
        setState(props.visible)
    }, [props.visible])

    const onCreate = () => {
        if(props.isNew == true && props.idExpense === "" && idCards != "0" && idCategories != "0") exp?.asyncCreateExpense(props.name, props.idCategory, props.value, props.idCard, props.isIncome);
        props.closeDisplay
        setState(false)
    }

    const onSave = () => {

        if(props.isNew == false && id != "" && idCards != "0" && idCategories != "0") {
            const newExpense: Expense = {
                id:id,
                name: names,
                idCard: idCards,
                idCategory: idCategories,
                value: values,
                date: date.getTime(),
                isIncome: isIncomes
            }
            exp?.asyncUpdateExpense(newExpense);
        }
        props.closeDisplay
        setState(false)
    }

    const toggleSwitch = () => {
        setIncomes(!isIncomes);
    }

    const getFormatDate = (timestamp: Date) => {
        const day = timestamp
        const options = { day: 'numeric', month: 'long', year: 'numeric' }
        return day.toLocaleDateString("fr-FR", options)
    }

    const pickerCategory = () => {
        var tab = [<Picker.Item label="Choose a Category" value={"0"} />];
        var tabCategory = cat?.getCatgories();
        tabCategory?.forEach((category) => {
            tab.push(
                <Picker.Item label={category.name} value={category.id} />
            )
        })
        return tab;
    }

    const pickerCard = () => {
        var tab = [<Picker.Item label="Choose a Card" value={"0"} />];;
        var tabCard = car?.getCards();
        tabCard?.forEach((card) => {
            tab.push(
                <Picker.Item label={card.name} value={card.id} />
            )
        })
        return tab;
    }

    const onChanged = (text: string) => {
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("please enter numbers only");
            }
        }
        setValues(Number(newText));
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={false}
                visible={state}
                onRequestClose={() => props.closeDisplay()}
            >
                <View style={styles.eachView}>
                    <Text style={styles.date}>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</Text>
                    <View style={styles.dateSelect}>
                        <ModalDatePicker
                            button={<Text>Select Date</Text>}
                            locale="fr"
                            onSelect={(date:any) => console.log(date) }
                            isHideOnSelect={true}
                            initialDate={props.isNew?new Date():date}
                        />
                    </View>
                </View>
                
                <View style={(styles.eachView, styles.viewIncomeExpense)}>
                    <Text style={{ color: 'white' }}> Expense </Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#f4f3f4" }}
                        thumbColor={"#b6b4b6"}
                        onValueChange={toggleSwitch}
                        value={!isIncomes}
                    />
                    <Text style={{ color:'white' }}> Income </Text>
                </View>

                <View style={styles.eachView}>
                    <Text style={{ color: 'white' }}> choice categories </Text>
                    <Picker
                        selectedValue={idCategories}
                        style={styles.selectPicker}
                        onValueChange={(itemValue, itemIndex) => setIdCategories(itemValue)}
                    >
                        {pickerCard}
                    </Picker>
                </View>

                <View style={styles.eachView}>
                    <Text style={{color: 'white'}}> choice card </Text>
                    <Picker
                        selectedValue={idCards}
                        style={styles.selectPicker}
                        onValueChange={(itemValue, itemIndex) => setIdCards(itemValue)}
                    >
                        {pickerCategory}
                    </Picker>
                </View>

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
                        style={styles.itemInput}
                        keyboardType='numeric'
                        onChangeText={(text)=> onChanged(text)}
                        value={values.toString()}
                        maxLength={10}  //setting limit of input
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
            </Modal>
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
    },
    date: {
        color: 'white',
        fontSize: 10
    },
    dateSelect:{
        flexDirection: "column"
    },
    selectPicker:{

    }
});
