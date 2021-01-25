import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, Switch, TextInput } from 'react-native';
import { Input } from "react-native-elements";
import { ModalDatePicker } from "react-native-material-date-picker";
import { useExpense } from '../context/ExpenseContext';
import { Expense } from '../types/Expense';

interface ExpenseEditModalProps {
    visible: boolean;
    onPressSave: Function;
    onPressCancel: Function;
    isIncome?: boolean;
    isNew:boolean;
    idExpense?:string;
    idCategory?:string;
    idCard?:string;
    name?:string;
    value?: number;
    date?: number;
}

const ExpenseEditModal = (props: ExpenseEditModalProps) => {
    const [modalVisible, setModalVisible] = useState<boolean>(props.visible)
    const [isIncomes, setIncomes] = useState<boolean>(props.isIncome || false)
    const [name, setName] = useState<string>(props.name || "")
    const [value, setValue] = useState<number>(props.value || 0)
    const [date, setDate] = useState<Date>(props.date != undefined ? new Date(props.date) : new Date())
    const [idCard, setIdCard] = useState<string>(props.idCard || "")
    const [idCategory, setIdCategory] = useState<string>(props.idCategory || "")

    const exp = useExpense()


    useEffect(() => {
        setModalVisible(props.visible)
    }, [props.visible])

    const toggleSwitch = () => {
        setIncomes(!isIncomes);
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
        setValue(Number(newText));
    }

    const save = () => {
        if (props.isNew) return onCreate();
        else return onSave();
    }

    const onCreate = () => {
        if(props.isNew == true && props.idExpense === "") exp?.asyncCreateExpense(props.name!, props.idCategory!, props.value!, props.idCard!, props.isIncome!);
        props.onPressSave();
    }

    const onSave = () => {

        if(props.isNew == false && props.idExpense != "" ) {
            const newExpense: Expense = {
                id:props.idExpense!,
                name: name,
                idCard: idCard,
                idCategory: idCategory,
                value: value,
                date: date.getTime(),
                isIncome: isIncomes
            }
            exp?.asyncUpdateExpense(newExpense);
        }
        props.onPressSave()
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // setModalVisible(!modalVisible)
                    props.onPressCancel();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <LinearGradient
                            colors={['#858D99', '#535963']}
                            start={{x:0,y:0}}
                            end={{x:0.5,y:0.5}}
                            style={styles.backgroundlinear}
                        />
                        <View style={styles.dateSelect}>
                            <ModalDatePicker
                                button={<Text style={styles.date}>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</Text>}
                                locale="fr"
                                onSelect={(date:any) => setDate(date) }
                                isHideOnSelect={true}
                                initialDate={props.isNew?new Date():date}
                            />
                        </View>
                        <View style={styles.viewSwitchIncome}>
                            <Text style={styles.textSwitchButton}>Expense</Text>
                            <Switch
                                trackColor={{ false: "#363636", true: "#363636" }}
                                thumbColor={isIncomes ? "red" : "#14B17E"}
                                onValueChange={toggleSwitch}
                                value={!isIncomes}
                                style={{transform:[{ scaleX: 1.5}, { scaleY: 1.5 }], marginHorizontal:10}}
                            />
                            <Text style={styles.textSwitchButton}>Income</Text>
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.item}> Name : </Text>
                            <Input
                                value={name}
                                onChangeText={value => setName(value)}
                            />
                        </View>
                        <View style={styles.view}>
                            <Text style={styles.item}> Value : </Text>
                            <TextInput
                                keyboardType='numeric'
                                onChangeText={(text)=> onChanged(text)}
                                value={value.toString()}
                                maxLength={10}  //setting limit of input
                            />
                        </View>
                    <Text style={styles.modalText}>Please note that the deletion is irreversible.</Text>
                    <View style={styles.modalButtonView}>
                        <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: '#FF2300' }}
                                onPress={() => props.onPressSave()}>
                                <Text style={styles.textStyle}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                                onPress={() => {
                                    // setModalVisible(!modalVisible);
                                    props.onPressCancel()
                                }}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ExpenseEditModal;

const styles = StyleSheet.create({
    container: {},
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        position: "absolute",
        flex: 1,
        margin: 20,
        width: "95%",
        height: "99%",
        overflow: 'hidden',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    backgroundlinear: {
        position: 'absolute',
        //top: -20,
        height: "100%",
        width: '100%'
    },
    modalText: {
        marginVertical: 15,
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    modalButtonView: {
        flexDirection: 'row',
    },
    modalBackgroundSail: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: 2500,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        margin: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    viewSwitchIncome:{
        flexDirection: 'row',
        marginTop:15,
    },
    textSwitchButton:{
        color: 'white', 
        fontSize:18 
    },
    item: {
        color:"white"
    },
    view: {
        margin: 5
    },
    date: {
        color: 'white',
        fontSize: 10
    },
    dateSelect: {
        flexDirection: "column"
    },
});
