import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useCategory } from '../context/CategoryContext';
import { useExpense } from '../context/ExpenseContext';
import { Expense } from '../types/Expense';
import IconComponent from './IconComponent';

interface ExpenseCardProps {
  expense:Expense;
}

const ExpenseCard = (props: ExpenseCardProps) => {
  const categories = useCategory();
  const category = categories?.getCategoryById(props.expense?.idCategory)
  const [editMode, setEditMode] = useState<boolean>(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const expenseContext = useExpense()

  const onPressModalDelete = () => {
    if(props.expense?.id !== undefined) {
      expenseContext?.asyncDeleteExpense(props.expense.id!)
    }
    setModalDeleteVisible(!modalDeleteVisible)
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2A2D34', '#64666A']}
        start={{x:0,y:0}}
        end={{x:1,y:0}}
        style={styles.backgroundlinear}
      />
      <TouchableOpacity onPress={() => setEditMode(!editMode)}>
        <View style={styles.ExpenseView}>
          <View style={[styles.categoryView,{backgroundColor:category?.color}]}>
            <IconComponent iconId={category?.icon.id}/>
          </View>
          <View style={styles.information}>
            <View style={styles.topLine}>
              <Text style={styles.date}>{props.expense?.date}</Text>
            </View>
            <View style={styles.bottomLine}>
              <Text numberOfLines={editMode ? 4:1} style={styles.description}>{props.expense?.name}</Text>
            </View>
          </View>
          <View style={styles.amountView}>
            <Text style={styles.amount}>{props.expense?.value}€</Text>
          </View>
        </View>
      </TouchableOpacity>
      {editMode? 
        <View style={styles.editButtonView}>
          <TouchableOpacity onPress={() => console.log("edit")} style={{marginRight:5}}>
            {/* <MaterialIcons name="edit" size={24} color="#14B17E" /> */}
            <IconComponent import={'MaterialIcons'} iconName="edit" size={24} color="#14B17E"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalDeleteVisible(true)}>
            {/* <MaterialCommunityIcons name="trash-can-outline" size={24} color="#E54200" /> */}
            <IconComponent import={'MaterialCommunityIcons'} iconName="trash-can-outline" size={24} color="#E54200"/>
          </TouchableOpacity>
        </View>
      :
      <></>
      }
      {/* Delete Modal */}
      <View style={styles.centeredView}>        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalDeleteVisible}
          onRequestClose={() => {
            setModalDeleteVisible(!modalDeleteVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <LinearGradient 
                colors={['#858D99','#535963']}
                style={styles.backgroundlinear}
              />
              <Text style={styles.modalText}>Please note that the deletion is irreversible.</Text>
              <View style={styles.modalButtonView}> 
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#FF2300' }}
                  onPress={() => onPressModalDelete()}>
                  <Text style={styles.textStyle}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                  onPress={() => {
                    setModalDeleteVisible(!modalDeleteVisible);
                  }}>
                  <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  container:{
    marginTop:10,
    paddingVertical:5,
    overflow: 'hidden',
    width: '100%',
    backgroundColor: '#64666A',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ExpenseView: {
    flexDirection:'row',

  },
  categoryView:{
    width:40,
    height:40,
    borderRadius:20,
    backgroundColor: 'silver',
    marginVertical:'auto',
    marginLeft:5,
    marginRight:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  information:{
    flex:1
  },
  topLine:{
    marginHorizontal:10,

  },
  bottomLine:{
    marginHorizontal:10,
  },
  date:{
    fontSize:12,
    color:'#f1f1f1'
  },
  amountView:{
    marginVertical:'auto',
    marginRight:10,
    justifyContent: 'center'
  },
  amount:{
    fontWeight:'500',
    fontSize:16,
    color:'white'
  },
  description:{
    color:'white',
    marginTop:5,
  },
  backgroundlinear: {
    position: 'absolute',
    top:-20,
    height: 500,
    width:'100%'
  },
  editButtonView:{
    flexDirection:'row',
    justifyContent: 'flex-end',
    marginRight:10
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    position: "absolute",
    flex:1,
    margin: 20,
    width:"95%",
    height:120,
    overflow: 'hidden',
    // backgroundColor: 'red',
    borderRadius: 20,
    // padding: 35,
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
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin:10
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginVertical: 15,
    color:'white',
    fontSize: 16,
    textAlign: 'center',
  },
  modalButtonView:{
    flexDirection: 'row',
  },
  modalBackgroundSail:{
    flex:1,
    position: 'absolute',
    top:0,
    left:0,
    width:"100%",
    height:2500,
    backgroundColor:'rgba(0,0,0,0.5)'
  }
});
