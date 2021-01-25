import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import ExpenseCard from './ExpenseCard';
import { Expense } from '../types/Expense';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IconComponentProps {
  list: Expense[],
  title: string
}

const TrackingComponent = (props: IconComponentProps) => {
  const [edition, setEdition] = useState<boolean>(true)
  return (
    <View>
      <TouchableOpacity
        onPress={()=>setEdition(!edition)}
      >
        {
          edition
            ?
            <Text style={styles.listTitle}>{props.title} ∧</Text>
            :
            <Text style={styles.listTitle}>{props.title} ∨</Text>
        }
      </TouchableOpacity>
      {
        edition
          ?
          <FlatList
            data={props.list}
            renderItem={({ item }) => (
              <ExpenseCard expense={item} />
            )}
            keyExtractor={item => item.id}
          />
          :
          <View></View>
      }
    </View>
  );
};

export default TrackingComponent;

const styles = StyleSheet.create({
  listTitle: {
    color: "white",
    fontSize: 16
  }
});
