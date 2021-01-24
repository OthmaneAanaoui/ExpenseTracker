import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import { CategoryContextProvider } from '../context/CategoryContext';

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

