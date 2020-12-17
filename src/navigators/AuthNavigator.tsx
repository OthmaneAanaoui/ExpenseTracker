import * as React from 'react';
import AuthScreen from '../screens/AuthScreen';
//import { useStoreState } from '../store/hooks';
import { Stack } from './MainRouter';

const AuthNavigator = () => {
    //const { theme } = useStoreState(state => state.themeModel)

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Auth" component={AuthScreen} /*options={{

                headerStyle: {
                    backgroundColor: theme.appBackgroundColor,
                },
                headerTintColor: theme.textColor }}/>*/
                />
        </Stack.Navigator>
    );
};

export default AuthNavigator;
