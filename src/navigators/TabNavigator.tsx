import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import StatScreen from '../screens/StatScreen';
import { Tab } from './MainRouter';
import CardScreen from "../screens/CardScreen";
import ProfilNavigator from "./ProfilNavigator";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import ParamScreen from '../screens/ParamScreen';
import TrackingScreen from '../screens/TrackingScreen';
import { CategoryContextProvider } from '../context/CategoryContext';

const TabNavigator = () => {
    //const { theme } = useStoreState(state => state.themeModel)

    function ProfilNav() {
        return (
            <ProfilNavigator/>
        )
    }

    function Home() {
        return (
            <HomeScreen/>
            )
    }

    function Tracking() {
        return (
            <TrackingScreen/>
        )
    }

    function Stats() {
        return (
            <StatScreen/>
        )
    }

    return (
        <CategoryContextProvider>
            <Tab.Navigator
                initialRouteName={'Solde'}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let tagsIcon;
                            switch(route.name){
                                case 'Solde':
                                    tagsIcon = <FontAwesome5 name="piggy-bank" size={30} color={color} />
                                    break;
                                case 'Analytics':
                                    tagsIcon = <AntDesign name="barschart" size={30} color={color} />
                                    break;
                                case 'Setting':
                                    tagsIcon = <AntDesign name="setting" size={30} color={color} />
                                    break;
                                case 'Tracking':
                                    tagsIcon = <AntDesign name="profile" size={30} color={color} />
                                    break;
                            }
                        return tagsIcon;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: 'white',
                    inactiveTintColor: 'grey',
                    showLabel: false,
                    style: {
                        backgroundColor: "#212227",
                    },
                    labelStyle: {
                        fontWeight: '500',
                        fontSize:10,
                    },
                }}
            >
                <Tab.Screen name="Solde" component={Home} />
                <Tab.Screen name="Tracking" component={Tracking} />
                <Tab.Screen name="Analytics" component={Stats} />
                <Tab.Screen name="Setting" component={ProfilNav} />
            </Tab.Navigator>
        </CategoryContextProvider>
    );
};

export default TabNavigator;
