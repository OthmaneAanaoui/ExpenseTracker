import * as React from 'react';
import HomeScreen from '../screens/HomeScreen';
import { Tab } from './MainRouter';
// import { useStoreState } from '../store/hooks';

const TabNavigator = () => {
    //const { theme } = useStoreState(state => state.themeModel)

    function Home() {

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
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showIcon:true,
                /*style: {
                    backgroundColor: theme.appBackgroundColor,
                },*/
                labelStyle: {
                    fontWeight: '500',
                    upperCaseLabel:true
                },
                /*
                indicatorStyle: {
                    backgroundColor: theme.borderColor,
                }*/
            }}
        >
            <Tab.Screen name="Note" component={Home} />
            {/*<Tab.Screen name="Pass" component={Pass} />
            <Tab.Screen name="Profil" component={ProfilScreen} />*/}
        </Tab.Navigator>
    );
};

export default TabNavigator;
