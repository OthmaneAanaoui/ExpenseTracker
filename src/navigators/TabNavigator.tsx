import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import { Tab } from './MainRouter';
import CardScreen from "../screens/CardScreen";
import ProfilNavigator from "./ProfilNavigator";
// import { useStoreState } from '../store/hooks';

const TabNavigator = () => {
    //const { theme } = useStoreState(state => state.themeModel)

    function ProfilNav() {
        return (
            <ProfilNavigator/>
            )
    }
/*
    function Pass() {
        return (
            <PassNavigator/>
        )
    }*/

    return (
        <Tab.Navigator
            initialRouteName={"Profil"} // TODO - dans la finalité mettre Analytics
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                // showIcon:true,
                /*style: {
                    backgroundColor: theme.appBackgroundColor,
                },*/
                labelStyle: {
                    fontWeight: '500'
                },
                /*
                indicatorStyle: {
                    backgroundColor: theme.borderColor,
                }*/
            }}
        >
            <Tab.Screen name="Card" component={CardScreen}/>
            <Tab.Screen name="Analytics" component={HomeScreen} />
            <Tab.Screen name="Profil" component={ProfilNav}/>
        </Tab.Navigator>
    );
};

export default TabNavigator;
