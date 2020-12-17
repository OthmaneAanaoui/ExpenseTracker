import React from 'react';
import { StyleSheet } from "react-native";
import MainRouter from "./src/navigators/MainRouter";

export default function App() {
  return (
    <MainRouter/>
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
