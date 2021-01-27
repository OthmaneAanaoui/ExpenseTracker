import React, { useEffect, useState } from "react";
import {Modal, Text, View, StyleSheet, Button, Platform, SafeAreaView, Picker, FlatList, TouchableOpacity} from 'react-native';
import { Expense } from '../types/Expense';
import { useExpense } from '../context/ExpenseContext';
import { useCard } from '../context/BankcardContext';
import { useCategory } from '../context/CategoryContext';
import TrackingComponent from "../components/TrackingComponent";

enum Filter {
    date = 0,
    month = 1,
    category = 2,
    card = 3
}

type Props = {
    choiceFilter: Filter
};

type TypeListFilter = {
    title:string;
    numberRef: string,
    sublist:Expense[]
}

const ALL = 42; /* sélectionne tous les mois */

const TrackingScreen: React.FC<Props> = ({ choiceFilter }) => {

    const expense = useExpense();
    const card = useCard();
    const category = useCategory();

    const [state, setState] = useState<boolean>(false)
    const [filterPicker, setFilterPicker] = useState<Filter>(Filter.date)
    const [pickerMonth, setPickerMonth] = useState<string>(ALL.toString())
    const [pickerCategory, setPickerCategory] = useState<string>("all") // all - sinon idCategory
    const [pickerCard, setPickerCard] = useState<string>("all") // all - sinon idCard
    const [listFilter, setListFilter] = useState<TypeListFilter[]>([])

    useEffect(() => {
        onChangePickerFilter(choiceFilter);
    }, [])

    const setModalVisible = (visible:boolean) => {
        setState(visible);
    }

    const loadListFilter = () => {
        let l = expense?.getExpenses();
        const liste: TypeListFilter[] = [{
            title: "",
            numberRef: ALL.toString(),
            sublist: (l == undefined ? [] : l)
        }]
        setListFilter(liste);
    }

    const loadListFilterCard = () => {

        console.log("loadListFilterCard")

        let l = card?.getCards();
        const liste: TypeListFilter[] = [];
        l?.forEach((item) => {
            const exp = expense?.getExpenseByCard(item.id);
            if (exp != undefined) {
                liste.push({
                    title: item.name,
                    numberRef: item.id,
                    sublist: exp
                })
            }
        })
        setListFilter(liste);
    }

    const loadListFilterCategory = () => {

        console.log("loadListFilterCategory")

        let l = category?.categories;
        const liste: TypeListFilter[] = [];
        l?.forEach((item) => {
            const exp = expense?.getExpenseByCategory(item.id!);
            if (exp != undefined) {
                liste.push({
                    title: item.name,
                    numberRef: item.id!,
                    sublist: exp
                })
            }
        })
        setListFilter(liste);
    }

    const loadListFilterMonth = () => {

        console.log("loadListFilterMonth")

        const liste: TypeListFilter[] = [];
        const currentDate: Date = new Date();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        for (var i = 0; i < 6; i++){
            let l = expense?.getExpenseByDate(year, month);
            if (l != undefined) {
                liste.push({
                    title: getMonthById(month) + " " + year.toString(),
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

        setListFilter(liste);

    }

    const loadListPickerMonth = () => {

        const liste = []
        const currentDate: Date = new Date();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();
        for (var i = 0; i < 6; i++){
            liste.push(<Picker.Item label={getMonthById(month) + " " + year.toString()} value={month + ""}/>)
            if (month == 0) {
                month = 11;
                year--;
            } else {
                month--;
            }
        }
        return liste;
    }

    const loadListPickerCategory = () => {
        const liste = [<Picker.Item label="all" value="all"/>]
        let l = category?.categories;
        l?.forEach((item) => {
            liste.push(<Picker.Item label={item.name} value={item.id}/>)
        })
        return liste;
    }

    const loadListPickerCard = () => {
        const liste = [<Picker.Item label="all" value="all"/>]
        let l = card?.cards;
        l?.forEach((item) => {
            liste.push(<Picker.Item label={item.name} value={item.id}/>)
        })
        return liste;
    }


    const onChangePickerFilter = (filter: Filter) => {
        setFilterPicker(filter);

        switch (filter) {
            case Filter.month:
                setPickerMonth(ALL.toString());
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

    const onChangePickerCategory = (filterCategory: string) => {
        setPickerCategory(filterCategory);
        if (filterCategory == "all") loadListFilterCategory()
        else {
            let l: Expense[] = [];
            let isNotFind: Boolean = true;
            for (var i = 0; i < listFilter.length && isNotFind; i++){
                if (listFilter[i].numberRef == filterCategory) {
                    l = listFilter[i].sublist;
                    isNotFind = false;
                }
            }
            let liste: TypeListFilter[] = [
                {
                    title: "",
                    numberRef: filterCategory,
                    sublist: l
                }
            ];
            setListFilter(liste);
        }
    }

    const onChangePickerCard = (filterCard: string) => {
        setPickerCategory(filterCard);
        if (filterCard == "all") loadListFilterCard()
        else {
            let l: Expense[] = [];
            let isNotFind: Boolean = true;
            for (var i = 0; i < listFilter.length && isNotFind; i++){
                if (listFilter[i].numberRef == filterCard) {
                    l = listFilter[i].sublist;
                    isNotFind = false;
                }
            }
            let liste: TypeListFilter[] = [
                {
                    title: "",
                    numberRef: filterCard,
                    sublist: l
                }
            ];
            setListFilter(liste);
        }
    }

    const onChangePickerMonth = (filterMonth: string) => {
        setPickerMonth(filterMonth);
        if (filterMonth == ALL.toString()) loadListFilterMonth();
        else {
            let l: Expense[] = [];
            let isNotFind: Boolean = true;
            for (var i = 0; i < listFilter.length && isNotFind; i++){
                if (listFilter[i].numberRef == filterMonth) {
                    l = listFilter[i].sublist;
                    isNotFind = false;
                }
            }
            let liste: TypeListFilter[] = [
                {
                    title: "",
                    numberRef: filterMonth,
                    sublist: l
                }
            ];
            setListFilter(liste);
        }
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

    const reload = () => {
        expense?.asyncGetAll();
        onChangePickerFilter(filterPicker)
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
                    {
                        filterPicker == Filter.month ?
                            <Picker
                                selectedValue={pickerMonth}
                                style={styles.selectPicker}
                                onValueChange={(itemValue, itemIndex) => onChangePickerMonth(itemValue)}
                            >
                                {loadListPickerMonth()}
                            </Picker>
                            :
                            <View></View>
                    }
                    {
                        filterPicker == Filter.category ?
                            <Picker
                                selectedValue={pickerCategory}
                                style={styles.selectPicker}
                                onValueChange={(itemValue, itemIndex) => onChangePickerCategory(itemValue)}
                            >
                                {loadListPickerCategory()}
                            </Picker>
                            :
                            <View></View>
                    }
                    {
                        filterPicker == Filter.card ?
                            <Picker
                                selectedValue={pickerCard}
                                style={styles.selectPicker}
                                onValueChange={(itemValue, itemIndex) => onChangePickerCard(itemValue)}
                            >
                                <Picker.Item label="all" value="all" />
                                {loadListPickerCard()}
                            </Picker>
                            :
                            <View></View>
                    }
                    <View>
                        
                    </View>
                </View>
                <View style={styles.list}>
                    <FlatList
                        data={listFilter}
                        renderItem={({ item }) => (
                            item.sublist.length != 0 ?
                                <View style={styles.listBloc}><TrackingComponent title={item.title} list={item.sublist} /></View>
                                :
                                <></>
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
    container: {
        margin: 10,
        height: "95%"
    },
    containerPicker: {},
    selectPicker: {
        flexDirection: "column",
        color: "white"
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
