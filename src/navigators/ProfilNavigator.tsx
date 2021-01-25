import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilScreen from "../screens/Profil/ProfilScreen";
import CardManagementScreen from "../screens/Profil/CardManagementScreen";
import AccountScreen from "../screens/Profil/AccountScreen";
import CategoryManagementScreen from '../screens/Profil/CategoryManagementScreen';
import CategoryManagementEditScreen from '../screens/Profil/CategoryManagementEditScreen';
import { Category } from '../types/Category';

export type ProfilStackParamList = {
    Setting: undefined,
    Cards: undefined,
    Categories?: {event:any},
    CategoryEdit?: {category:Category},
    Account: undefined
}

const Stack = createStackNavigator<ProfilStackParamList>();
const ProfilNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ 
            headerStyle: { backgroundColor: '#212227', borderBottomColor:'#009646', borderWidth:1}, 
            headerTintColor: '#f1f1f1',
            headerTitleStyle: {
                fontWeight: 'bold',
              }
        }}
            headerMode = 'float'
        >
            <Stack.Screen name="Setting" component={ProfilScreen}/>
            <Stack.Screen name="Cards" component={CardManagementScreen}/>
            <Stack.Screen name="Categories" component={CategoryManagementScreen}/>
            <Stack.Screen name="CategoryEdit" component={CategoryManagementEditScreen} />
            <Stack.Screen name="Account" component={AccountScreen}/>
        </Stack.Navigator>
    );
};

export default ProfilNavigator;
