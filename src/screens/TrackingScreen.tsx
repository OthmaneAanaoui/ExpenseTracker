import React, { Component, useEffect } from 'react';
import {Modal, Text, View, StyleSheet, Button, Platform, SafeAreaView, Picker, FlatList} from 'react-native';
import {useState} from "react";
import { Expense } from '../types/Expense';
import ExpenseCard from "../components/ExpenseCard";

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
    numberRef:number,
    sublist:Expense[]
}

const testFilter:TypeListFilter[] = [
    {
    title:"",
    numberRef:0,
    sublist:testExpense
    },
    {
        title:"",
        numberRef:1,
        sublist:testExpense
    }]

const TrackingScreen = (props: TrackingScreenProps) => {

    const [state, setState] = useState<boolean>(false)
    const [filterPicker, setFilterPicker] = useState<Filter>(Filter.date)
    const [pickerMonth, setPickerMonth] = useState<number>(0) // TODO - change initial month - 0 == all month
    const [pickerCategory, setPickerCategory] = useState<string>("all") // all - sinon idCategory
    const [pickerCard, setPickerCard] = useState<string>("all") // all - sinon idCard
    const [listFilter, setListFilter] = useState<TypeListFilter[]>([])

    useEffect(() => {
        // TODO - get in context - list et listFilter
        setListFilter(testFilter);
    }, [])

    function setModalVisible(visible:boolean) {
        setState(visible);
    }

    function loadListFilter(){
        // TODO
    }

    function loadListFilterCard(){
        // TODO
    }

    function loadListFilterCategory(){
        // TODO
    }

    function loadListFilterMonth(){
        // TODO
    }

    function onChangePickerFilter( filter : Filter ) {
        setFilterPicker(filter);
        switch (filter) {
            case Filter.month:
                setPickerMonth(0);
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
                    {
                        filterPicker == Filter.month
                        ?
                            <View style={styles.pickerFilter}><Text>filter month</Text></View>
                            :
                            <Text></Text>
                    }
                    {
                        filterPicker == Filter.category
                        ?
                            <View style={styles.pickerFilter}><Text>filter category</Text></View>
                            :
                            <Text></Text>
                    }
                    {
                        filterPicker == Filter.card
                        ?
                            <View style={styles.pickerFilter}><Text>filter card</Text></View>
                            :
                            <Text></Text>
                    }

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
            />*/}
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
