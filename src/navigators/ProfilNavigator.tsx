import * as React from 'react';
import { Stack } from './MainRouter';
import { useStoreState } from '../store/hooks';
import ProfilScreen from "../screens/ProfilScreen";
import PasswordManagementScreen from "../screens/PasswordManagmentScreen";
import CardManagementScreen from "../screens/CardManagementScreen";

const ProfilNavigator = () => {
    //const { theme } = useStoreState(state => state.themeModel)

    return (
        <Stack.Navigator>
            <Stack.Screen name="Profil" component={ProfilScreen}/>
            <Stack.Screen name="PasswordManagement" component={PasswordManagementScreen}/>
            <Stack.Screen name="CardManagement" component={CardManagementScreen}/>
        </Stack.Navigator>
    );
};

export default ProfilNavigator;
