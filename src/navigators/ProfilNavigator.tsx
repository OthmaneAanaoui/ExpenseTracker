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
            <Stack.Screen name="CardManagement" component={CardManagementScreen}/>
            <Stack.Screen name="CategoryManagement" component={CategoryManagementScreen}/>
            <Stack.Screen name="AccountManagement" component={AccountScreen}/>
        </Stack.Navigator>
    );
};

export default ProfilNavigator;
