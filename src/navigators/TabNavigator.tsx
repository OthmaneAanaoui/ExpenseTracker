import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import StatScreen from '../screens/StatScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfilNavigator from "./ProfilNavigator";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import Filter from '../screens/TrackingScreen';
import TrackingScreen from '../screens/TrackingScreen';
// import { useStoreState } from '../store/hooks';
import { useStoreActions, useStoreState } from '../store/hooks';
import { useEffect } from 'react';
import { useCategory } from '../context/CategoryContext';
import { useExpense } from '../context/ExpenseContext';
import { useAuth } from '../context/AuthContext';

export const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const getIconsCategory = useStoreActions(actions => actions.iconStoreModel.fetchIcons)
  const categoryContext = useCategory()
  const expenseContext = useExpense()
    const getSoldeStore = useStoreActions(actions => actions.soldeStoreModel.fetchSolde)
    const setSoldeStore = useStoreActions(actions => actions.soldeStoreModel.pushSolde)
    const soldeStore = useStoreState(state => state.soldeStoreModel)
    const authContext = useAuth()

  useEffect(() => {
    getIconsCategory()
    categoryContext?.asyncGetAll()
    expenseContext?.asyncGetAll()
    if(authContext.user?.uid !== undefined) {
        getSoldeStore(authContext.user?.uid)
        if(soldeStore === undefined){
            setSoldeStore({uid:authContext.user?.uid, solde:{id:undefined, montant:0}})
        }
    }
  }, [])

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
            <TrackingScreen choiceFilter={0}/>
        )
    }

    function Stats() {
        return (
            <StatScreen/>
        )
    }

    return (        
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
    );
};

export default TabNavigator;
