import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface ParamScreenProps {}

const ParamScreen = (props: ParamScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>ParamScreen</Text>
    </View>
  );
};

export default ParamScreen;

const styles = StyleSheet.create({
  container: {}
});
