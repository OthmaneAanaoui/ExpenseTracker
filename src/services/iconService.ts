import AsyncStorage from '@react-native-async-storage/async-storage';
import { queryIcon, storageIcon } from '../types/constants';
import { Icon } from '../types/Icon';

export const getIcons: () => Promise<Icon[]> = async () => {
  const querySnapshot = await queryIcon.get();
  let icons: Icon[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Icon;
    return { ...data, id: doc.id };
  })
  return icons;
}

export const getIcon: (id: string) => Promise<Icon> = async (id) => {
  const querySnapshot = await queryIcon.doc(id);
  const doc = await querySnapshot.get();
  let icon: Icon = doc.data() as Icon;
  let newIcon: Icon = {
    ...icon, id: icon.id
  }
  return newIcon;
}

export const getLocalIcons = async () => {
  const icons = await AsyncStorage.getItem('expenseCategoryIcon')
  return icons != null ? JSON.parse(icons) : null;
}

export const setLocalIcons = async (icons:Icon[]) => {
  const json = JSON.stringify(icons)
  await AsyncStorage.setItem(storageIcon, json)
}