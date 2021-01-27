import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useCategory } from '../context/CategoryContext';
import { getFormatDate } from '../model/Date';
import { Category } from '../types/Category';
import { Expense } from '../types/Expense';
import IconComponent from './IconComponent';
interface ExpenseCardProps {
  expense:Expense;
  onPressEdit: () => void;
  onPressDelete: () => void;
}

const ExpenseCard = (props: ExpenseCardProps) => {
  const categories = useCategory();
  const [category, setCategory] = useState<Category>()
  const [editMode, setEditMode] = useState<boolean>(false);

  const expenseDirection = () => {
    if(props.expense.isIncome)
      return props.expense.value

    return '-' + props.expense.value
  }

  useEffect(() => {
    const category = categories?.getCategoryById(props.expense?.idCategory)
    setCategory(category)
  },[])

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
            <IconComponent idIcon={category?.idIcon}/>
          </View>
          <View style={styles.information}>
            <View style={styles.topLine}>
              <Text style={styles.date}>{getFormatDate(props.expense?.date)}</Text>
            </View>
            <View style={styles.bottomLine}>
              <Text numberOfLines={editMode ? 4:1} style={styles.description}>{props.expense?.name}</Text>
            </View>
          </View>
          <View style={styles.amountView}>
            <Text style={[styles.amount, props.expense.isIncome ? {color:'#9cffbd'} : {color:'#ffc2c2'}] }>{expenseDirection()}€</Text>
          </View>
        </View>
      </TouchableOpacity>
      {editMode? 
        <View style={styles.editButtonView}>
          <TouchableOpacity onPress={() => props.onPressEdit()} style={{marginRight:5}}>
            <IconComponent import={'MaterialIcons'} iconName="edit" size={24} color="#14B17E"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.onPressDelete()}>
            <IconComponent import={'MaterialCommunityIcons'} iconName="trash-can-outline" size={24} color="#E54200"/>
          </TouchableOpacity>
        </View>
      :
      <></>
      }
    </View>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  container:{
    marginBottom:5,
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
    // fontWeight:'bold',
    fontSize:20,
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
});
