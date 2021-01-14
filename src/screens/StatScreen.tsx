import { useStoreState } from "../store/hooks";
import React, { useEffect, useState } from "react";
import { Platform, SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Barcharts from "../chart/BarCharts";
import { Bars } from "../chart/BarType";
import { SelectionTypeEnum } from "../store/model/CurrentSelection";
import { AntDesign } from '@expo/vector-icons'; 
type Props = {};

// Format de données
const data:Bars = [
  // bar 1
  {
      title: 'Oct',
      idGroupClick:0,
      bars: [
        {
          data: [536,123,236,140],
          // barStyle: [
          //   {index:4, color:"red", radius:2 },
          // ]
        },
        {
          data: [70,320,164],
          eventBar:[{index:0, idBarClick:22, typeClick:SelectionTypeEnum.category},
            {index:1, idBarClick:53, typeClick:SelectionTypeEnum.category}],
          barStyle: [
            {index:0, color:"blue", radius:2 },
            {index:1, color:"pink", radius:2 },
            {index:2, color:"yellow", radius:2 }            
          ]
        },
      ]
  },
  // bar 2
  {
      title: 'Nov',
      idGroupClick:1,
      bars: [
      {
        data: [1200,236],
        barStyle: [
          {index:0, color:"red", radius:2 },

        ]
      },
      {
        data: [80,254,189,163],
        barStyle: [
          {index:0, color:"blue", radius:2 },
          {index:1, color:"pink", radius:2 },
          {index:2, color:"yellow", radius:2 },            
          {index:3, color:"orange", radius:2 }            
        ]
      }
    ]
  },
    // bar 3
    {
      title: 'Dec',
      bars: [
      {
        data: [1546],
        barStyle: [
          {index:0, color:"red", radius:2 },

        ]
      },
      {
        data: [125,478]
      }
    ]
  },
  // bar 4
  {
    title: 'Jan',
    bars: [
    {
      data: [1442],
      barStyle: [
        {index:0, color:"red", radius:2 },

      ]
    },
    {
      data: [125,478]
    }
  ]
},
// bar 5
{
  title: 'Fev',
  idGroupClick:4,
  bars: [
  {
    data: [1326, 129.99],
    barStyle: [
      {index:0, color:"red", radius:2 },

    ]
  },
  {
    data: [125,478]
  }
]
}
]

const StatScreen: React.FC<Props> = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { currentSelection } = useStoreState(state => state.currentSelectionModel)

  const onClickBarGraph = () => {
    console.log("onClickBarGraph homescreen : ",currentSelection)
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
  <Text style={{color:"white", width:"100%", textAlign:"center", marginTop:10}}>Accueil</Text>
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
            <TouchableOpacity onPress={onClickNextMonth} style={styles.buttonNextmonth}>
              <AntDesign name="right" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <Barcharts style={styles.barCharStyle} data={data} spacingGroupBar={20} eventBar={() => onClickBarGraph()}/>
      </View>
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
  });
