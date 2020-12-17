import { queryIcon } from '../types/constants';
import { Icon } from '../types/types';

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