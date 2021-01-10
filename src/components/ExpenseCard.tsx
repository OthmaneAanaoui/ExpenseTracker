import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useCategory } from '../context/CategoryContext';
import { ExpenseContext } from '../context/ExpenseContext';
import { Expense } from '../types/Expense';

interface ExpenseCardProps {
  expense:Expense;
}

const ExpenseCard = (props: ExpenseCardProps) => {
  const categories = useCategory();
  const category = categories?.getCategoryById(props.expense?.idCategory)
  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2A2D34', '#64666A']}
        start={{x:0,y:0}}
        end={{x:1,y:0}}
        style={styles.backgroundlinear}
      />
      {/* <View style={[styles.categoryView,{backgroundColor:category?.color}]}> */}
      <View style={[styles.categoryView,{backgroundColor:'blue'}]}>
        
      </View>
      <View style={styles.information}>
        <View style={styles.topLine}>
          <Text style={styles.date}>{props.expense?.date}10/01/2021</Text>
        </View>
        <View style={styles.bottomLine}>
          <Text numberOfLines={1} style={styles.description}>{props.expense?.name}description de la dépense</Text>
        </View>
      </View>
      <View style={styles.amountView}>
        <Text style={styles.amount}>{props.expense?.value}22.99€</Text>
      </View>
    </View>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    marginTop:10,
    paddingVertical:5,
    overflow: 'hidden',
    width: '95%',
    backgroundColor: '#64666A',
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  categoryView:{
    width:40,
    height:40,
    borderRadius:20,
    backgroundColor: 'silver',
    marginVertical:'auto',
    marginLeft:5,
    marginRight:10,
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
    marginRight:10
  },
  amount:{
    fontWeight:'500',
    fontSize:14,
    color:'white'
  },
  description:{
    color:'white'
  },
  backgroundlinear: {
    position: 'absolute',
    top:-20,
    height: 500,
    width:'100%'
  },
});
