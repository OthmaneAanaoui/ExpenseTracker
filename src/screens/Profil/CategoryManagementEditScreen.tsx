import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Platform, SafeAreaView, TextInput, TouchableOpacity, Alert, FlatList } from 'react-native';
import { TriangleColorPicker } from 'react-native-color-picker';
import IconComponent from '../../components/IconComponent';
import { ProfilStackParamList } from '../../navigators/ProfilNavigator';
import { useStoreState } from '../../store/hooks';
import { AntDesign } from '@expo/vector-icons';
import { useCategory } from '../../context/CategoryContext';

type Props = {
  navigation: StackNavigationProp<ProfilStackParamList, 'CategoryEdit'>;
  route: RouteProp<ProfilStackParamList, 'CategoryEdit'>
};

const CategoryManagementEditScreen: React.FC<Props> = ({ route, navigation }) => {
  const iconStore = useStoreState(state => state.iconStoreModel)
  const [inputName, setInputName] = useState<string | undefined>(route.params?.category.name);
  const [colorCategory, setColorCategory] = useState<string | undefined>(route.params?.category.color || '#13a4e8');
  const [iconCategory, setIconcategory] = useState<string | undefined>(route.params?.category.idIcon || iconStore.icons[0].id);
  const [colorEdit, setColorEdit] = useState<boolean>(true);
  const categoryContext = useCategory()

  const save = async () => {
    if (inputName === undefined) {
      Alert.alert("Give a name to category")
      return
    }
    if (route.params?.category === undefined) {
      categoryContext?.asyncCreateCategory(iconCategory!, inputName, colorCategory!)
    } else {
      const updateCategory = {
        id: route.params?.category.id,
        idIcon: iconCategory!,
        name: inputName!,
        color: colorCategory!
      }
      await categoryContext?.asyncUpdateCategory(updateCategory)
    }
    navigation.navigate("Categories", { event: Math.random() })
  }

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={styles.container}>
        <View style={[styles.categoryView, { backgroundColor: colorCategory }]}>
          <IconComponent idIcon={iconCategory} size={33} />
        </View>
        <View style={styles.viewName}>
          <Text style={styles.labelStyle}>Nom : </Text>
          <TextInput
            style={styles.inputNameText}
            onChangeText={text => setInputName(text)}
            value={inputName}
          />
        </View>
        <View style={styles.viewButtonColorIcon}>
          <View>
            <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: '#e30094' }]} onPress={() => setColorEdit(true)} disabled={colorEdit}>
              <Text style={styles.textButtonStyle}>Color</Text>
            </TouchableOpacity>
            {colorEdit ?
              <View style={{ width: 80, height: 10, backgroundColor: '#e30094', top: -20, left: 10 }}></View>
              : <></>
            }
          </View>
          <View>
            <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: '#00ba60' }]} onPress={() => setColorEdit(false)} disabled={!colorEdit}>
              <Text style={styles.textButtonStyle}>Icon</Text>
            </TouchableOpacity>
            {!colorEdit ?
              <View style={{ width: 80, height: 10, backgroundColor: '#00ba60', top: -20, left: 10 }}></View>
              : <></>
            }
          </View>
        </View>
        <View style={[styles.panelLine, colorEdit ? { backgroundColor: '#e30094' } : { backgroundColor: '#00ba60' }]}></View>
      </View>
      {colorEdit ?
        <TriangleColorPicker
          onColorSelected={color => setColorCategory(color)}
          style={styles.colorPicker}
          defaultColor={colorCategory}
        />
        :
        <View style={styles.viewListIcon}>
          <FlatList
            data={iconStore.icons}
            renderItem={({ item }) => (
              <View style={[styles.cellIconList, item.id === iconCategory ? { backgroundColor: '#57445e' } : { backgroundColor: 'transparent' }]}>
                <TouchableOpacity onPress={() => setIconcategory(item.id)} style={styles.iconsButtonInList}>
                  <IconComponent import={item.import} iconName={item.iconName} size={24} color="#f1f1f1" />
                  {item.id === iconCategory ?
                    <AntDesign name="checkcircle" size={24} color="#00994d" style={{ marginRight: 5 }} />
                    : <></>
                  }
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => item.id! + index}
            numColumns={4}

          />
        </View>
      }
      <View style={styles.viewButtons}>
        <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: '#2196F3' }]} onPress={() => save()}>
          <Text style={styles.textButtonStyle}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonStyle, { backgroundColor: '#FF2300' }]} onPress={() => navigation.goBack()}>
          <Text style={styles.textButtonStyle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CategoryManagementEditScreen;

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    width: "100%",
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: "#212227",
  },
  container: {
    marginHorizontal: 20,
    alignItems: 'center'
  },
  categoryView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'silver',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewName: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelStyle: {
    color: '#f1f1f1',
    fontWeight: 'bold'
  },
  inputNameText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color: '#f1f1f1',
    marginLeft: 10,
    padding: 5,
    flex: 1
  },
  viewButtons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonStyle: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    margin: 10
  },
  textButtonStyle: {
    color: '#f1f1f1',
    fontWeight: 'bold',
    fontSize: 16,
    width: 60,
    textAlign: 'center'
  },
  viewButtonColorIcon: {
    flexDirection: 'row',
    marginTop: 15
  },
  colorPicker: {
    width: "60%",
    flex: 1,
    marginLeft: "20%",
    marginBottom: 110
  },
  viewListIcon: {
    flex: 1,
    width: '90%',
    marginBottom: 85,
    marginLeft: '5%',
    backgroundColor: '#2A2D34',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cellIconList: {
    width: '24.5%',
    borderWidth: 1,
    borderColor: '#565f63',
    padding: 5,
    borderRadius: 10,
    paddingLeft: 10,
    margin: 1,
  },
  iconsButtonInList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  panelLine: {
    backgroundColor: 'red',
    width: '100%',
    height: 5,
    top: -22,
    elevation: 2
  }
});
