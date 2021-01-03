import './src/firebase/firebase';
import React from 'react';
import { LogBox, Platform, StyleSheet } from "react-native";
import MainRouter from "./src/navigators/MainRouter";
import {AuthContextProvider} from "./src/context/AuthContext";

if(Platform.OS === 'android') {
  LogBox.ignoreLogs(['Setting a timer']);
}

export default function App() {
  return (
      <AuthContextProvider>
          <MainRouter/>
      </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
