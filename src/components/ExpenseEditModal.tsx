import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, Switch, TextInput, Alert, FlatList } from 'react-native';
import { Input } from "react-native-elements";
import { ModalDatePicker } from "react-native-material-date-picker";
import { useCategory } from '../context/CategoryContext';
import { useExpense } from '../context/ExpenseContext';
import { numberToString, stringToNumber } from '../model/arythmetic';
import { AntDesign } from '@expo/vector-icons';
import { Expense } from '../types/Expense';
import IconComponent from './IconComponent';
import { Category } from '../types/Category';
import { useAuth } from '../context/AuthContext';
import { useStoreActions, useStoreState } from '../store/hooks';

interface ExpenseEditModalProps {
    visible: boolean;
    onPressSave: Function;
    onPressCancel: Function;
    expense?: Expense;
}

const ExpenseEditModal: React.FC<ExpenseEditModalProps> = (props) => {
    const [modalVisible, setModalVisible] = useState<boolean>(props.visible)
    const [isIncomes, setIncomes] = useState<boolean>(props.expense?.isIncome || false)
    const [name, setName] = useState<string>(props.expense?.name || "")
    const [amount, setAmount] = useState<string>(numberToString(props.expense?.value))
    const [date, setDate] = useState<Date>(props.expense?.date != undefined ? new Date(props.expense.date) : new Date())
    const [idCard, setIdCard] = useState<string>(props.expense?.idCard || "")
    const [idCategory, setIdCategory] = useState<string>(props.expense?.idCategory || "")
    const [category, setCategory] = useState<Category | undefined>(undefined)
    const categoriesContext = useCategory()
    const auth = useAuth()
    const soldeStore = useStoreState(state => state.soldeStoreModel)
    const getSoldeStore = useStoreActions(actions => actions.soldeStoreModel.fetchSolde)
    const setSoldeStore = useStoreActions(actions => actions.soldeStoreModel.pushSolde)
    
    const expenseContext = useExpense()

    const initData = () => {
        if (props.expense !== undefined) {
            setName(props.expense.name)
            setAmount(numberToString(props.expense?.value))
            setDate(new Date(props.expense.date))
            setIncomes(props.expense.isIncome)
            const cat = categoriesContext?.getCategoryById(props.expense.idCategory)
            setCategory(cat)
            setIdCategory(props.expense.idCategory)
        } else {
            setName("")
            setAmount("")
            setIncomes(false)
            setDate(new Date())
            const cat = categoriesContext?.getCatgories()[0]
            setCategory(cat)
            if(cat?.id !== undefined) {
                setIdCategory(cat.id)
            }
        }
    }
    useEffect(() => {
        initData()
    }, [])

    useEffect(() => {
        initData()
        setModalVisible(props.visible)
    }, [props.visible])

    const toggleSwitch = () => {
        setIncomes(!isIncomes);
    }

    const onChangedAmount = (text: string) => {
        let newText = '';
        newText = text.replace(".", ",")
        if (newText.charAt(0) === ',') {
            newText = '0' + newText
        }
        if ((newText.split(",").length - 1) > 1 || newText.charAt(newText.length - 1) === '-') {
            newText.substring(0, newText.length - 1)
            return
        }
        setAmount(newText)
    }

    const save = async () => {
        if (amount === '' || name === '') {
            Alert.alert("You must fill all fields")
            return
        }
        const newExpense: Expense = {
            name: name,
            idCard: idCard,
            idCategory: idCategory,
            value: stringToNumber(amount),
            date: date.getTime(),
            isIncome: isIncomes
        }
        if (props.expense === undefined) { // props.expense === undefined -> create new expense
            await expenseContext?.asyncCreateExpense(newExpense)
            
        } else {
            await expenseContext?.asyncUpdateExpense({ ...newExpense, id: props.expense.id })
        }
        props.onPressSave()
    }

    const changeCategory = (item: Category) => {
        if (item.id !== undefined) {
            setIdCategory(item.id)
            setCategory(item)
        }
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    props.onPressCancel();
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <LinearGradient
                            colors={['#2e2f36', '#47484d']}
                            start={{ x: 0.2, y: 0.5 }}
                            end={{ x: 0.5, y: 1 }}
                            style={styles.backgroundlinear}
                        />
                        <View style={styles.viewSwitchIncome}>
                            <Text style={styles.textSwitchButton}>Income</Text>
                            <Switch
                                trackColor={{ false: "#363636", true: "#363636" }}
                                thumbColor={isIncomes ? "#14B17E" : "red"}
                                onValueChange={toggleSwitch}
                                value={!isIncomes}
                                style={{ transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }], marginHorizontal: 12 }}
                            />
                            <Text style={styles.textSwitchButton}>Expense</Text>
                        </View>
                        <View style={styles.dateSelect}>
                            <ModalDatePicker
                                button={<Text style={styles.date}>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</Text>}
                                locale="fr"
                                onSelect={(date: any) => { setDate(date)}}
                                isHideOnSelect={true}
                                initialDate={props.expense ? new Date() : date}
                            />
                        </View>
                        <View style={styles.viewInputText}>
                            <Text style={styles.labelInput}> Name : </Text>
                            <Input
                                value={name}
                                onChangeText={value => setName(value)}
                                style={styles.inputName}
                            />
                        </View>
                        <View style={styles.viewInputText}>
                            <Text style={styles.labelInput}> Value : </Text>
                            <TextInput
                                keyboardType='numeric'
                                onChangeText={(text) => onChangedAmount(text)}
                                value={amount}
                                maxLength={13}  //setting limit of input
                                style={styles.inputAmount}
                            />
                        </View>
                        <View style={styles.viewCategorySelect}>
                                <LinearGradient
                                    colors={['#2A2D34', '#64666A']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.backgroundlinear}
                                />
                                {/* <View style={styles.contentCard}> */}
                                <View style={[styles.categoryView, { backgroundColor: category?.color }]}>
                                    <IconComponent idIcon={category?.idIcon} size={20} />
                                </View>
                                <View style={styles.viewNameCategory}>
                                    <Text style={styles.nameCategoryStyle}>{category?.name}</Text>
                                </View>
                            </View>
                        <View style={styles.viewCategory}>

                            <FlatList
                                data={categoriesContext?.getCatgories()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => changeCategory(item)} >
                                        <View style={styles.card}>
                                            <LinearGradient
                                                colors={item.id === idCategory ? ['#57445e', '#7d5b8a'] : ['#2A2D34', '#64666A']}
                                                start={{ x: 0, y: 0 }}
                                                end={{ x: 1, y: 0 }}
                                                style={styles.backgroundlinear}
                                            />
                                            {/* <View style={styles.contentCard}> */}
                                            <View style={[styles.categoryView, { backgroundColor: item.color }]}>
                                                <IconComponent idIcon={item.idIcon} size={20} />
                                            </View>
                                            <View style={styles.viewNameCategory}>
                                                <Text style={styles.nameCategoryStyle}>{item.name}</Text>
                                            </View>
                                            {/* </View> */}
                                            {item.id === idCategory ?
                                                <AntDesign name="checkcircle" size={24} color="#00994d" style={{ marginRight: 5 }} />
                                                : <></>
                                            }
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => item.id! + index}
                            // contentContainerStyle={styles.listCard}
                            />

                        </View>
                        <View style={styles.modalButtonView}>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                                onPress={() => save()}>
                                <Text style={styles.textStyle}>Save</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: '#FF2300' }}
                                onPress={() => {
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
        height: "98%",
        overflow: 'hidden',
        borderRadius: 20,
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
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        width: "100%",
        bottom: 10
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: 70,
        margin: 10
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    viewSwitchIncome: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
    },
    textSwitchButton: {
        color: 'white',
        fontSize: 18
    },
    labelInput: {
        color: "white",
        fontSize: 14
    },
    viewInputText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        width: "83%",
    },
    dateSelect: {
        marginTop: 20,
        marginLeft: 20,
        alignItems: 'center',
    },
    date: {
        color: 'white',
        fontSize: 20
    },
    inputAmount: {
        marginLeft: 10,
        color: '#f1f1f1',
        fontSize: 30,
        backgroundColor: '#393a40',
        width: "95%",
        borderRadius: 5,
    },
    inputName: {
        color: '#f1f1f1',
        marginTop: 15,
        backgroundColor: '#393a40',
    },
    viewCategory: {
        flex: 1,
        width: "80%",
        marginLeft: "10%",
        marginTop: 10,
        marginBottom: 80,
    },


    card: {
        width: "100%",
        height: 40,
        overflow: "hidden",
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    categoryView: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginVertical: 'auto',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewNameCategory: {
        flex: 1,
        marginLeft: 5,
    },
    nameCategoryStyle: {
        color: '#f1f1f1',
        fontWeight: '500',
        fontSize: 14,
    },
    viewCategorySelect:{
        width: "90%",
        height: 50,
        overflow: "hidden",
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginLeft:"5%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,  
    }
});
