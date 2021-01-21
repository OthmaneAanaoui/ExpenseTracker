import * as React from 'react';
import AuthScreen from '../screens/AuthScreen';
import { createStackNavigator } from '@react-navigation/stack';

export type MainStackParamList = {
    Auth: undefined,
}

export const Stack = createStackNavigator<MainStackParamList>();

const AuthNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={AuthScreen} options={{
                headerStyle: {
                    backgroundColor: "#212227",
                },
                headerTintColor: "white" }}/>
         </Stack.Navigator>
    );
};

export default AuthNavigator;
