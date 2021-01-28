import { useStoreState } from "../store/hooks";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Barcharts from "../chart/BarCharts";
import { Bars } from "../chart/BarType";
import { SelectionTypeEnum } from "../store/model/CurrentSelection";
import { AntDesign } from '@expo/vector-icons'; 
import Item from '../components/Categories'
import { Category,initCategories } from '../types/Category';
import { FlatList } from "react-native-gesture-handler";
import { useCategory } from "../context/CategoryContext";
import { useExpense } from "../context/ExpenseContext";
import { Expense } from "../types/Expense";
import { getBarsFromExpenses } from "../chart/dataChart";
import IconComponent from "../components/IconComponent";

type Props = {};

const StatScreen: React.FC<Props> = () => {
  
  const { currentSelection } = useStoreState(state => state.currentSelectionModel)
  const categoryContext = useCategory()
  const expenseContext = useExpense();
  const [expenseList, setExpenseList] = useState<Expense[] | undefined>(expenseContext?.getExpenses() || undefined);
  const [dataChart,setDataChart] = useState<Bars>()
  const [categorySelect, setCatgeorySelect] = useState<Category>()
  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    if(expenseList !== undefined && categoryContext !== (undefined || null)){
      const dataBars:Bars = getBarsFromExpenses(expenseList, categoryContext.getCatgories())
      setDataChart(dataBars)
    }
  }, [])

  useEffect(() => {
    const cat = categoryContext?.getCategoryById(currentSelection.id)
    if(cat !== undefined || null){
      setCatgeorySelect(cat)
    }
  },[refresh])

  const onClickBarGraph = () => {
    setRefresh(!refresh)
  }

  const onClickPreviousMonth = ()=> {
    console.log("previous month")
  }

  const onClickNextMonth = () => {
    console.log("next month")
  }

  const onClickPreviousYear = ()=> {
    console.log("previous year")
  }

  const onClickNextYear = () => {
    console.log("next year")
  }
  
    return (
      
<SafeAreaView style={styles.droidSafeArea}>

  {/* <Text style={{color:"white", width:"100%", textAlign:"center", marginTop:10}}>Accueil</Text> */}
      <View style={styles.sectionMonth}>
        <View style={styles.headerSectionMonth}>
          <View style={styles.buttonNavMonth}>
            <TouchableOpacity onPress={onClickPreviousYear} style={styles.buttonPrevMonth}>
              <AntDesign name="left" size={18} color="white" />
            </TouchableOpacity>
            <Text style={styles.textButtonNavYear}>2021</Text>
            <TouchableOpacity onPress={onClickNextYear} style={styles.buttonNextmonth}>
              <AntDesign name="right" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonNavMonth}>
            <TouchableOpacity onPress={onClickPreviousMonth} style={styles.buttonPrevMonth}>
              <AntDesign name="left" size={18} color="white" />
            </TouchableOpacity>
            <Text style={styles.textButtonNavYear}>Jan.</Text>
            <TouchableOpacity onPress={onClickNextMonth} style={styles.buttonNextmonth}>
              <AntDesign name="right" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <Barcharts style={styles.barCharStyle} data={dataChart} spacingGroupBar={20} eventBar={() => onClickBarGraph()}/>
      </View>
      <View style={{...styles.vignetteCategory, backgroundColor:categorySelect?.color}}>
        <View style={styles.categoryType}>
          <IconComponent idIcon={categorySelect?.idIcon} size={50} />
          <Text style={styles.nameCategory}>{categorySelect?.name}</Text>
        </View>
        <View style={styles.viewTextOperation}>
          <Text style={styles.textOperationCategory}>{currentSelection.value} €</Text>
        </View>
      </View>

      {/* <FlatList
      
      data={categoryContext?.getCatgories()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
       
				return <TouchableOpacity>
       
				
					<Item id={item.id} idIcon={item.idIcon} name={item.name} color={item.color} />
				</TouchableOpacity>

        
			}}
      
      />  */}

     
</SafeAreaView>




    );

};

export default StatScreen;

const styles = StyleSheet.create({
  droidSafeArea:{
    flex: 1,
    width: "100%",
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor:"#212227"
  },
    sectionMonth: {
      backgroundColor:"#2A2D34",
      margin:15,
      paddingVertical:10,
      borderRadius:10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    headerSectionMonth:{
      flex:1,
      flexDirection: "row",
      margin:15,
      alignItems: "center",
    },
    barCharStyle:{
      backgroundColor:'#2A2D34',
      width:"100%",
      height:280,
      marginHorizontal:"auto",
      paddingRight:10,
      marginTop:10,
      borderRadius:5,
    },
    buttonNavMonth:{
      flexDirection: "row",
      width:"40%",
    },
    buttonPrevMonth:{
      backgroundColor:"#4E5460", 
      width:"18%", 
      marginRight:1,
      borderTopLeftRadius:30, 
      borderBottomLeftRadius:30,
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,

      elevation: 8,
    },
    buttonNextmonth:{
      backgroundColor:"#4E5460", 
      width:"18%", 
      alignItems: "flex-end",
      borderTopRightRadius:30, 
      borderBottomRightRadius:30,
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,

      elevation: 8,
    },
    textButtonNavYear:{
      color:"white",
      marginHorizontal:8,
      fontSize:16,
    },

    vignetteCategory:{
      flex:1,
      borderRadius:20,
      overflow: 'hidden',
      width:"90%",
      marginLeft:"5%",
      marginBottom:20
    },
    categoryType:{
      flexDirection: "row",
      marginTop:10,
      marginLeft:15,
      justifyContent: "center",
      alignItems: "center"
    },
    nameCategory:{
      color:'#f1f1f1',
      marginLeft:10,
      fontSize:26,
      fontWeight: 'bold',
    },
    viewTextOperation:{
      flex:1,
      marginTop:30,
      alignItems: "center",
    },
    textOperationCategory:{
      color:'#f1f1f1',
      fontSize:50,

    }
    
  });
