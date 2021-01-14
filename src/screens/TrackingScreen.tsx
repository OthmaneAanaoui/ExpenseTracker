import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface TrackingScreenProps {}

const TrackingScreen = (props: TrackingScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>TrackingScreen</Text>
    </View>
  );
};

export default TrackingScreen;

const styles = StyleSheet.create({
  container: {}
});
