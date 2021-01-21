import * as React from 'react';
import { Stack } from './MainRouter';
import ProfilScreen from "../screens/ProfilScreen";
import CardManagementScreen from "../screens/CardManagementScreen";
import AccountScreen from "../screens/AccountScreen";
import CategoryManagementScreen from "../screens/CategoryManagement";

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
