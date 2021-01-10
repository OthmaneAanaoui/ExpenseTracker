import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import { Tab } from './MainRouter';
import ProfilScreen from "../screens/ProfilScreen";
import CardScreen from "../screens/CardScreen";
// import { useStoreState } from '../store/hooks';

const TabNavigator = () => {
    //const { theme } = useStoreState(state => state.themeModel)

    function Analytics() {

        return (
            <HomeScreen/>
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
            initialRouteName={"Analytics"}
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
            <Tab.Screen name="Analytics" component={Analytics} />
            <Tab.Screen name="Profil" component={ProfilScreen}/>
        </Tab.Navigator>
    );
};

export default TabNavigator;
