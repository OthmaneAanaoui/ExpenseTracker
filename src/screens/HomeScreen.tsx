import { useStoreState } from "../store/hooks";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Modal, Alert, ScrollView, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ExpenseCard from "../components/ExpenseCard";
import { Expense } from "../types/Expense";
import ExpenseEditModal from "../components/ExpenseEditModal";
import DeleteModal from "../components/DeleteModal";
type Props = {};


const HomeScreen: React.FC<Props> = () => {

  const [isEnabled, setIsEnabled] = useState(false);
  const { currentSelection } = useStoreState(state => state.currentSelectionModel)
  const [modalExpenseEdit, setModalExpenseEdit] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<string>('date');
  const [show, setShow] = useState(false);

  const onPressAddIncome = () => {
    console.log("add income")
    setModalExpenseEdit(true);
  }

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate)
  };

  useEffect(() => {
    // categoryContext?.asyncGetAll()
  }, [])
  // pour tester une Expense à virer dès que la création est finie
  const testExpense: Expense[] = [{
    id: "11",
    name: "Mes premières courses",
    idCategory: "TH3IwH7f9FqCBgU6kU4Q",
    date: Date.now(),
    value: 124.57,
    idCard: "123",
    isIncome: false
  },
  {
    id: "987",
    name: "Course de la semaine",
    idCategory: "YIFsvV0ATAOoGKxSlvoq",
    date: Date.now(),
    value: 22.99,
    idCard: "123",
    isIncome: false
  },
  {
    id: "987",
    name: "Course de la semaine",
    idCategory: "iwOm7gQIPPlqsPhfBSE7",
    date: Date.now(),
    value: 22.99,
    idCard: "123",
    isIncome: false
  },
  {
    id: "987",
    name: "Course de la semaine",
    idCategory: "aV0uxGRfSLShKmlIdjIO",
    date: Date.now(),
    value: 22.99,
    idCard: "123",
    isIncome: false
  },
  {
    id: "987",
    name: "Contrôle technique",
    idCategory: "aV0uxGRfSLShKmlIdjIO",
    date: Date.now(),
    value: 22.99,
    idCard: "123",
    isIncome: false
  },
  {
    id: "987",
    name: "Course de la semaine",
    idCategory: "Rhe6reWPa83W90AntxEa",
    date: Date.now(),
    value: 22.99,
    idCard: "123",
    isIncome: false
  },
  {
    id: "987",
    name: "Course de la semaine",
    idCategory: "j3UXCSs6SeJt8geOkAXY",
    date: Date.now(),
    value: 22.99,
    idCard: "123",
    isIncome: false
  }
  ]

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Text style={styles.titlePage}>Solde</Text>
      <View style={styles.sectionSolde}>
        <Text style={styles.textSolde}>1236.59 €</Text>
        <View style={styles.viewSolde}>
          <View style={[styles.barSolde, { width: 100 }]}></View>
        </View>
      </View>
      {/* <ScrollView style={styles.viewLists}> */}
      <View style={styles.viewLists}>
        <FlatList
          data={testExpense}
          renderItem={({ item }) => (
            <ExpenseCard expense={item} />
          )}
          keyExtractor={(item, index) => item.id! + index}
          contentContainerStyle={styles.list}
        />
      </View>
      {/* </ScrollView> */}
      <TouchableOpacity style={styles.buttonIncome} onPress={() => onPressAddIncome()}>
        <AntDesign name="plus" size={30} color="white" />
      </TouchableOpacity>
      {/* <View style={styles.centeredView}> */}
      {/* <View style={styles.modalView}>
            <Text style={styles.modalText}>Add operation</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              // mode={mode}
              is24Hour={true}
              display="calendar"
              onChange={onChangeDate}
            />
            
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => console.log("click")}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View> */}
      {/* </View> */}
      {/* fenetre modale afficher pour entrer une nouvelle opération */}
      {/* <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOperationVisible}
        onRequestClose={() => {
          setModalOperationVisible(!modalOperationVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalOperationVisible(!modalOperationVisible);
              }}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View> */}
      <ExpenseEditModal visible={modalExpenseEdit} onPressDelete={() => console.log("delete press")} onPressCancel={() => setModalExpenseEdit(!modalExpenseEdit)} />
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
  },
  list: {
    flexGrow: 1,
    paddingBottom: 60
  }
});
