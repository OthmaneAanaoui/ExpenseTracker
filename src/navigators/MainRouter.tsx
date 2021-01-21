import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { CategoryContextProvider } from '../context/CategoryContext';

export type MainStackParamList = {
    Auth: undefined,
    Solde:undefined,
    // Analytics: undefined,
    Setting: undefined,
    // Card: undefined,
    // PasswordManagement: undefined,
    CardManagement: undefined,
    AccountManagement: undefined,
    CategoryManagement: undefined
}

export const Stack = createStackNavigator<MainStackParamList>();


const MainRouter = () => {
    const auth = useAuth()

    const redirection = () => {
        if(!auth.isSignedIn) {
            return  <>
                <AuthNavigator/>
            </>
        } else {
            return <>
                <TabNavigator/>
            </>
        }
    }

    return (
        <NavigationContainer>
            <CategoryContextProvider>
                {redirection()}
            </CategoryContextProvider>
        </NavigationContainer>
    )
}

export default MainRouter

