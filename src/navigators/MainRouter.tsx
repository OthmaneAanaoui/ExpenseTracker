import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

export type MainStackParamList = {
    Auth: undefined,
}

export const Stack = createStackNavigator<MainStackParamList>();
export const Tab = createMaterialTopTabNavigator();

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
            {redirection()}
        </NavigationContainer>
    )
}

export default MainRouter

