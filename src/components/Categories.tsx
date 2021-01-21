
import * as React from 'react';

import { Text, View, StyleSheet,SafeAreaView,FlatList } from 'react-native';


import { Category } from '../types/Category';

interface Categoriesprops {
  category:Category;
}


const Categories = (props : Category) => {
  

  return (
    
      <View style={styles.container}>
          <View style={{...styles.listItem}}>
            <Text style={styles.item}>{props.name}</Text>
          </View>
            
      </View>

  );
};

export default Categories;

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
  item:{

    padding:5,
    fontWeight: '600',
    fontSize:16, 


  },
  listItem :{
    
    
    justifyContent:'center',
  }
  

});
