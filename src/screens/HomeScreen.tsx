import { useStoreActions, useStoreState } from "../store/hooks";
import React, { useContext, useEffect, useState } from "react";
import { Platform, SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Modal, Alert, ScrollView, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import ExpenseCard from "../components/ExpenseCard";
import ExpenseEditModal from "../components/ExpenseEditModal";
import { useExpense } from "../context/ExpenseContext";
import { Expense } from "../types/Expense";
import DeleteModal from "../components/DeleteModal";
import { auth } from "firebase";
import { useAuth } from "../context/AuthContext";
type Props = {};

const HomeScreen: React.FC<Props> = () => {

  const [modalExpenseEdit, setModalExpenseEdit] = useState(false);
  const expenseContext = useExpense();
  const [expenseList, setExpenseList] = useState<Expense[] | undefined>(expenseContext?.getExpenses() || undefined);
  const [selection, setSelection] = useState<Expense | undefined>(undefined)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const soldeStore = useStoreState(state => state.soldeStoreModel)
  const getSoldeStore = useStoreActions(actions => actions.soldeStoreModel.fetchSolde)
  const setSoldeStore = useStoreActions(actions => actions.soldeStoreModel.pushSolde)
  const [widthBarSolde, setWidthBarSolde] = useState<number>()

  const auth = useAuth()

  const calcWidthBarSolde = () => {
    let percent = (soldeStore.solde.montant / 1500.00) * 100
    if(percent > 100) percent = 100
    return percent.toString()+'%'
  }

  const onPressAddIncome = () => {
    setSelection(undefined)
    setModalExpenseEdit(true);
  }
  
  const save = () => {
    setModalExpenseEdit(false);
    setRefresh(!refresh)
  }

  const editExpense = (item: Expense) => {
    setSelection(item)
    setModalExpenseEdit(true);
  }

  const openDeleteExpenseConfirm = (item: Expense) => {
      setSelection(item)
      setModalDeleteVisible(true)
  }

  const deleteExpense = () => {
    setModalDeleteVisible(false)
    const expense = expenseContext?.getExpenseById(selection?.id!)
    const newValueSolde = expense?.isIncome ? soldeStore.solde.montant - expense?.value : soldeStore.solde.montant + expense?.value!
    const newSolde = {id:soldeStore.solde.id, montant:newValueSolde}
    expenseContext?.asyncDeleteExpense(selection?.id!)
    setSoldeStore({uid:auth.user!.uid, solde:newSolde})
    setSelection(undefined)
    setRefresh(!refresh)
  }

  useEffect(() => {
    const list =  expenseContext?.getExpenses()
    setExpenseList(list)
  }, [refresh])

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={styles.page}>
      <Text style={styles.titlePage}>Solde</Text>
      <View style={styles.sectionSolde}>
        <Text style={styles.textSolde}>{soldeStore.solde.montant.toFixed(2)} € / 1500 €</Text>
        <View style={styles.viewSolde}>
          <View style={[styles.barSolde, { width: calcWidthBarSolde() }]}></View>
        </View>
      </View>
      <View style={styles.viewLists}>
        <FlatList
          data={expenseList}
          renderItem={({ item }) => (
            <ExpenseCard expense={item} onPressEdit={() => editExpense(item)} onPressDelete={() => openDeleteExpenseConfirm(item)}/>
          )}
          keyExtractor={(item, index) => item.id! + index}
          contentContainerStyle={styles.list}
        />
      </View>
      <TouchableOpacity style={styles.buttonIncome} onPress={onPressAddIncome}>
        <AntDesign name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
      <DeleteModal visible={modalDeleteVisible} onPressDelete={() =>  deleteExpense()} onPressCancel={() => setModalDeleteVisible(!modalDeleteVisible)}/>
      <ExpenseEditModal visible={modalExpenseEdit} expense={selection} onPressSave={save} onPressCancel={() => setModalExpenseEdit(!modalExpenseEdit)} />
    </SafeAreaView>
  );

};

export default HomeScreen;

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: "#212227"
  },
  page:{
    width:"100%",
    height:"100%",
    alignItems: "center",
  },
  titlePage: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
    fontWeight: "500",
    fontSize: 18
  },
  sectionSolde: {
    backgroundColor: "#2A2D34",
    width: "80%",
    marginTop: 10,
    paddingBottom: 15,
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textSolde: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 7,
  },
  viewSolde: {
    flexDirection: "row",
    marginTop: 15,
    marginHorizontal: "auto",
    borderRadius: 3,
    height: 30,
    width: "80%",
    backgroundColor: "red"
  },
  barSolde: {
    backgroundColor: "#14B17E",
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  buttonIncome: {
    position: "absolute",
    backgroundColor: "green",
    width: 40,
    height: 40,
    bottom: 10,
    right: 10,
    borderRadius: 20,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 100,
  },
  buttonExpense: {
    // flexBasis:"40%"
    backgroundColor: "orange",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonFilter: {
    marginRight: 10,
    width: 50,
    height: 50,
    backgroundColor: "black",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  },


  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    position: "absolute",
    flex: 1,
    margin: 20,
    width: "95%",
    height: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  viewLists: {
    flex: 1,
    width: '95%',
    marginTop:10
  },
  list: {
    flexGrow: 1,
    paddingBottom: 60
  }
});
