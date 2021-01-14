import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilScreen from "../screens/ProfilScreen";
import CardManagementScreen from "../screens/CardManagementScreen";
import AccountScreen from "../screens/AccountScreen";
import CategoryManagementScreen from "../screens/CategoryManagementScreen";

export type MainStackParamList = {
    Setting: undefined,
    Cards: undefined,
    Categories: undefined,
    Account: undefined
}

const Stack = createStackNavigator<MainStackParamList>();
const ProfilNavigator = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Setting" component={ProfilScreen}/>
            <Stack.Screen name="Cards" component={CardManagementScreen}/>
            <Stack.Screen name="Categories" component={CategoryManagementScreen}/>
            <Stack.Screen name="Account" component={AccountScreen}/>
        </Stack.Navigator>
    );
};

export default ProfilNavigator;
