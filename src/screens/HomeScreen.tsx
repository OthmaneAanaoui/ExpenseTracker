import { useStoreState } from "../store/hooks";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, TouchableHighlight, Switch } from "react-native";
import Barcharts from "../chart/BarCharts";
import { Bars } from "../chart/BarType";
import { SelectionTypeEnum } from "../store/model/CurrentSelection";
type Props = {};

// Format de données
const data:Bars = [
  // bar 1
  {
      title: 'Oct',
      idGroupClick:0,
      bars: [
        {
          data: [1359],
          barStyle: [
            {index:0, color:"red", radius:2 },
          ]
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

const HomeScreen: React.FC<Props> = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { currentSelection } = useStoreState(state => state.currentSelectionModel)

  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  let canvas = {
    backgroundColor:'#f1f1f1',
    width:"90%",
    height:300,
    marginHorizontal:"auto",
}

  const onClickBarGraph = () => {
    console.log("onClickBarGraph homescreen : ",currentSelection)
  }
    return (
<>
        <Text>Home</Text>
        <Text>test du mois {currentSelection?.id} - {currentSelection.selectionType}</Text>
        {/* <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      /> */}
      <Barcharts style={canvas} data={data} spacingGroupBar={20} eventBar={() => onClickBarGraph()}/>
</>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
