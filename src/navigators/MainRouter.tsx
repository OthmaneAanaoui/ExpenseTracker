import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { CategoryContextProvider } from '../context/CategoryContext';
import { ExpenseContextProvider } from '../context/ExpenseContext';

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
                <ExpenseContextProvider>
                    {redirection()}
                </ExpenseContextProvider>
            </CategoryContextProvider>
        </NavigationContainer>
    )
}

export default MainRouter

