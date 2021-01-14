import { queryUser } from "../types/constants";
import { Category, Icon } from "../types/Category";
import { useAuth } from "../context/AuthContext";

const getQuery = () => {
  const auth = useAuth()
  return queryUser.doc(auth.user?.uid).collection('category')
}

export const getCategories: () => Promise<Category[]> = async () => {
  const querySnapshot = await getQuery().get();
  let categories: Category[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Category;
    return { ...data, id: doc.id };
  });
  return categories;
};


export const getCategory: (id: string) => Promise<Category> = async (id) => {
  const querySnapshot = await getQuery().doc(id);
  const doc = await querySnapshot.get();
  let category: Category = doc.data() as Category;
  let newcategory: Category = {
    ...category, id: doc.id
  }
  return newcategory;
}


export const addCategory: (icon: Icon, name: string, color:string) => Promise<Category> = async (icon, name, color) => {
  const category: Category = {
    name: name,
    icon: icon,
    color: color,
  };
  const doc = await getQuery().add(category);
  const newcategory: Category = { ...category, id: doc.id };
  return newcategory;
};


export const updateCategory: (category:Category) => Promise<Category> = async (category) => {
  const updateCategory = {...category}
  await getQuery().doc(category.id).update(updateCategory);
  return updateCategory;
};


export const deleteCategory: (id: string) => Promise<void> = async (id) => {
    await getQuery().doc(id).delete();
};
