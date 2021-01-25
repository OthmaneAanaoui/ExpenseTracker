
import * as React from 'react';

import { Text, View, StyleSheet,TouchableOpacity,FlatList,Dimensions } from 'react-native';

import { useEffect, useState } from 'react';
import { Category , initCategories} from '../types/Category';
import { Expense} from '../types/Expense';
import { ExpenseContext, useExpense } from '../context/ExpenseContext';

interface Categoriesprops {
  category:Category;
}
interface ExpenseCardProps {
  expense:Expense;
}

const testExpense:Expense[] = [{
  id:"11",
  name: "Mes premières courses",
  idCategory: "1",
  date: Date.now(),
  value: 124.57,
  idCard: "123",
  isIncome: false
},
{
  id:"987",
  name: "Course de la semaine",
  idCategory: "2",
  date: Date.now(),
  value: 22.99,
  idCard: "123",
  isIncome: false
},
{
  id:"987",
  name: "Course de la semaine",
  idCategory: "3",
  date: Date.now(),
  value: 22.99,
  idCard: "123",
  isIncome: false
},

]


const Categories = (props : Category) => {
  
  const expenses = useExpense();
  const expense = expenses?.getExpenseByCategory("1")

 
  return (
    
      
         
        <View  style={[styles.item,{backgroundColor:props.color}]}>
          
             

              <Text  style={[styles.itemIcon,{marginTop:10}]}>
                     
                    {props.idIcon} 
                    
              </Text>

            
              <Text  style={[styles.itemTitle]}>
                    {props.name}
                     
                    
              
              </Text>
        </View>
            
     

  );

  
};

export default Categories;

var styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      flexWrap: 'wrap'
  },
  item: {
      width: Dimensions.get('window').width * 0.5,
      height: 100,
      borderWidth: 1,
      borderColor: "lightgray",
      alignItems: 'center',
      justifyContent: 'center', marginLeft:10       
  },
  itemIcon: {
     
      height: 100,
      resizeMode: 'contain'
  },
  itemTitle: {
    height: "100%",
    
   
  },
});
