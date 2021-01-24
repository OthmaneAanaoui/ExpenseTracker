import './src/firebase/firebase';
import React, { useEffect } from 'react';
import { AuthContextProvider } from "./src/context/AuthContext";
import MainRouter from "./src/navigators/MainRouter";
import { createStore, StoreProvider } from 'easy-peasy';
import storeModel from './src/store/model/model';
import { LogBox, Platform } from "react-native";

const store = createStore(storeModel)
if(Platform.OS === 'android') {
  LogBox.ignoreLogs(['Setting a timer']);
}

export default function App() {
  return (
    <StoreProvider store={store}>
      <AuthContextProvider>
          <MainRouter/>
      </AuthContextProvider>
    </StoreProvider>
  );
}
