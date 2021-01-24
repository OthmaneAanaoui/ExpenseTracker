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

type Item = {
    label: string,
    value: any
}

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

    const loadListFilterMonth = async () => {
        const list: TypeListFilter[] = [];
        const currentDate: Date = new Date();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        for (var i = 0; i < 6; i++){
            let l = await expense?.getExpenseByDate(year, month);
            if (l != undefined) {
                list.push({
                    title: getMonthById(month),
                    numberRef: month.toString(),
                    sublist: l
                })
            }
            if (month == 0) {
                month = 11;
                year--;
            } else {
                month--;
            }
        }

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

    return (
        <SafeAreaView style={styles.droidSafeArea}>
            <View style={styles.container}>
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
                </View>
                <View style={styles.list}>
                    <FlatList
                        data={listFilter}
                        renderItem={({ item }) => (
                            <View style={styles.listBloc}>
                                <Text style={styles.listTitle}>{item.title}</Text>
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
    container: {},
    containerPicker: {},
    selectPicker: {
        flexDirection: "column"
    },
    pickerFilter: {
        height: 50,
        width: 150
    },
    list: {},
    listBloc:{
        marginTop: 10
    },
    listTitle: {
        color: "white",
        fontSize: 16
    }
});
