import React, { Component, useEffect } from 'react';
import {Modal, Text, View, StyleSheet, Button, Platform, SafeAreaView, Picker, FlatList} from 'react-native';
import {useState} from "react";
import { Expense } from '../types/Expense';
import ExpenseCard from "../components/ExpenseCard";
import { useExpense } from '../context/ExpenseContext';
import { useCard } from '../context/BankcardContext';
import { useCategory } from '../context/CategoryContext';
import NewExpenseCard from '../components/NewExpenseCard';

enum Filter {
    date,
    month,
    category,
    card
}

interface TrackingScreenProps { }

const testExpense:Expense[] = [{
    id:"11",
    name: "Mes premières courses",
    idCategory: "123456",
    date: Date.now(),
    value: 124.57,
    idCard: "123",
    isIncome: false
  },
  {
    id:"987",
    name: "Course de la semaine",
    idCategory: "123456",
    date: Date.now(),
    value: 22.99,
    idCard: "123",
    isIncome: false
  },
  {
    id:"987",
    name: "Course de la semaine",
    idCategory: "123456",
    date: Date.now(),
    value: 22.99,
    idCard: "123",
    isIncome: false
  }
]

type TypeListFilter = {
    title:string;
    numberRef: string,
    sublist:Expense[]
}

const ALL = 42; /* sélectionne tous les mois */


const testFilter:TypeListFilter[] = [
    {
    title:"",
    numberRef: ALL.toString(),
    sublist:testExpense
    },
    {
        title:"",
        numberRef:"1",
        sublist:testExpense
    }]

const TrackingScreen = (props: TrackingScreenProps) => {

    const expense = useExpense();
    const card = useCard();
    const category = useCategory();

    const [state, setState] = useState<boolean>(false)
    const [filterPicker, setFilterPicker] = useState<Filter>(Filter.date)
    const [pickerMonth, setPickerMonth] = useState<number>(ALL)
    const [pickerCategory, setPickerCategory] = useState<string>("all") // all - sinon idCategory
    const [pickerCard, setPickerCard] = useState<string>("all") // all - sinon idCard
    const [listFilter, setListFilter] = useState<TypeListFilter[]>([])

    useEffect(() => {
        loadListFilter();
    }, [])

    const setModalVisible = (visible:boolean) => {
        setState(visible);
    }

    const loadListFilter = () => {
        let l = expense?.getExpenses();
        const list: TypeListFilter[] = [{
            title: "",
            numberRef: ALL.toString(),
            sublist: (l == undefined ? [] : l)
        }]
        setListFilter(list);
    }

    const loadListFilterCard = () => {
        let l = card?.getCards();
        const list: TypeListFilter[] = [];
        l?.forEach(async (item) => {
            const exp = await expense?.getExpenseByCard(item.id);
            if (exp != undefined) {
                list.push({
                    title: item.name,
                    numberRef: item.id,
                    sublist: exp
                })
            }
        })
        setListFilter(list);
    }

    const loadListFilterCategory = () => {
        let l = category?.categories;
        const list: TypeListFilter[] = [];
        l?.forEach(async (item) => {
            const exp = await expense?.getExpenseByCategory(item.id);
            if (exp != undefined) {
                list.push({
                    title: item.name,
                    numberRef: item.id,
                    sublist: exp
                })
            }
        })
        setListFilter(list);
    }

    const loadListFilterMonth = () => {
        // TODO

    }

    const onChangePickerFilter = (filter: Filter) => {
        setFilterPicker(filter);

        switch (filter) {
            case Filter.month:
                setPickerMonth(ALL);
                loadListFilterMonth();
                break;
            case Filter.category:
                setPickerCategory("all");
                loadListFilterCategory();
                break;
            case Filter.card:
                setPickerCard("all");
                loadListFilterCard();
                break;
            default:
                loadListFilter();
                break;
        }

        console.log("end onChangePickerFilter");
    }

    const getMonthById = (numero: number) => {
        switch (numero) {
            case 0: return "January";
            case 1: return "February";
            case 2: return "March";
            case 3: return "April";
            case 4: return "May";
            case 5: return "June";
            case 6: return "July";
            case 7: return "August";
            case 8: return "September";
            case 9: return "October";
            case 10: return "November";
            case 11: return "December";
            default: return "";
        }
    }

    const onChangePickerFilterMonth = (filter: number) => {

        
        // TODO
        
        const currentDate = new Date();
        const year = (filter <= currentDate.getMonth()? currentDate.getFullYear(): currentDate.getFullYear() - 1)
        const startDate = new Date(year, filter, 1);
        const endDate = new Date(year, filter, 31);
        const ext = expense?.getExpenseByDate(startDate, endDate);
        
    }

    const loadPickerMonth = () => {

        const currentDate: Date = new Date();
        let y = currentDate.getMonth();
        var tab = [<Picker.Item label="all month" value={ALL}/>];
        for (var i = 0; i < 6; i++) {
            tab.push(<Picker.Item label={getMonthById(y)} value={y} />)
            if (y == 0) y = 11;
            else y--;
        }
        console.log(tab)
        return tab;
    }

    const onChangePickerFilterCategory = (filter: string) => {
        // TODO

    }

    const loadPickerCategory = () => {
        // TODO
        var tab = [<Picker.Item label="All Category" value="all"/>]
        return tab;
    }

    const onChangePickerFilterCard = (filter: string) => {
        // TODO
    }

    const loadPickerCard = () => {
        // TODO
        return (<View></View>)
    }

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <View style={styles.container}>
                <Text>TrackingScreen</Text>
            
                <View style={styles.containerPicker}>
                    <View style={styles.pickerFilter}>
                        <Picker 
                            selectedValue={filterPicker}
                            style={styles.selectPicker}
                            onValueChange={(itemValue, itemIndex) => onChangePickerFilter(itemValue)}
                        >
                            <Picker.Item label="By date" value={Filter.date} />
                            <Picker.Item label="By month" value={Filter.month} />
                            <Picker.Item label="By category" value={Filter.category} />
                            <Picker.Item label="By card" value={Filter.card} />
                        </Picker>
                    </View>
                    {/*
                    {
                        filterPicker == Filter.month
                        ?
                            <View style={styles.pickerFilter}>
                                <Text>filter month</Text>
                                <Picker 
                                    selectedValue={pickerMonth}
                                    style={styles.selectPicker}
                                    onValueChange={(itemValue, itemIndex) => onChangePickerFilterMonth(itemValue)}
                                >
                                    {loadPickerMonth}
                                </Picker>
                            </View>
                            :
                            <Text></Text>
                    }
                */}
                    {/*
                    {
                        filterPicker == Filter.category
                        ?
                            <View style={styles.pickerFilter}>
                                <Text>filter category</Text>
                                <Picker 
                                    selectedValue={pickerCategory}
                                    style={styles.selectPicker}
                                    onValueChange={(itemValue, itemIndex) => onChangePickerFilterCategory(itemValue)}
                                >
                                    {loadPickerCategory}
                                </Picker>
                            </View>
                            :
                            <Text></Text>
                    }*/}
                    {/*
                    {
                        filterPicker == Filter.card
                        ?
                            <View style={styles.pickerFilter}>
                                <Text>filter card</Text>
                                <Picker 
                                    selectedValue={pickerCard}
                                    style={styles.selectPicker}
                                    onValueChange={(itemValue, itemIndex) => onChangePickerFilterCard(itemValue)}
                                >
                                    {loadPickerCard}
                                </Picker>
                            </View>
                            :
                            <Text></Text>
                    }
                */}

                </View>

                <View style={styles.list}>
                    <FlatList
                        data={listFilter}
                        renderItem={({ item }) => (
                            <View style={styles.listBloc}>
                                <Text style={{color:"white"}}>{item.title}</Text>
                                <FlatList
                                    data={item.sublist}
                                    renderItem={({ item }) => (
                                        <ExpenseCard expense={item} />
                                    )}
                                    keyExtractor={item => item.id}
                                />
                            </View>
                            )}
                        keyExtractor={item => item.title + item.numberRef}
                    />
                    
                </View>
            
                {/*
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
            */}
            </View>
        </SafeAreaView>
        
    );
};

export default TrackingScreen;

const styles = StyleSheet.create({
    droidSafeArea:{
        flex: 1,
        width: "100%",
        paddingTop: Platform.OS === "android" ? 25 : 0,
        backgroundColor:"#212227"
    },
    container: {
    },
    containerPicker: {},
    selectPicker: {
        flexDirection: "column"
    },
    pickerFilter: {
        height: 50,
        width: 150
    },
    list: {
        
        
    },
    listBloc:{
        marginTop: 10
    }
});
