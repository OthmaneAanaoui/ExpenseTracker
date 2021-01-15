import { queryUser } from "../types/constants";
<<<<<<< HEAD
import { Category } from "../types/Category";
=======
import { Category, CategoryType, Icon } from "../types/Category";
import { useAuth } from "../context/AuthContext";
>>>>>>> 16d10dd... modal save

const getQuery = (uid: string) => {
  return queryUser.doc(uid).collection('category')
}

export const getCategories: (uid:string) => Promise<Category[]> = async (uid) => {
  const querySnapshot = await getQuery(uid).get();
  let categories: Category[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Category;
    return { ...data, id: doc.id };
  });
  return categories;
};

export const getCategory: (uid:string, id: string) => Promise<Category> = async (uid, id) => {
  const querySnapshot = await getQuery(uid).doc(id);
  const doc = await querySnapshot.get();
  let category: Category = doc.data() as Category;
  let newcategory: Category = {
    ...category, id: doc.id
  }
  return newcategory;
}


<<<<<<< HEAD
export const addCategory: (uid:string, idIcon: string, name: string, color:string) => Promise<Category> = async (uid, idIcon, name, color) => {
  const category: Category = {
=======
export const addCategory: (icon: Icon, name: string, color:string) => Promise<Category> = async (icon, name, color) => {
  const category: CategoryType = {
>>>>>>> 16d10dd... modal save
    name: name,
    idIcon: idIcon,
    color: color,
  };
  const doc = await getQuery(uid).add(category);
  const newcategory: Category = { ...category, id: doc.id };
  return newcategory;
};

export const addCategoryWithUserId: (uid:string, idIcon: string, name: string, color:string) => Promise<Category> = async (uid, idIcon, name, color) => {
  const category: Category = {
    name: name,
    idIcon: idIcon,
    color: color,
  };
  const doc = await getQuery(uid).add(category);
  const newcategory: Category = { ...category, id: doc.id };
  return newcategory;
};

export const updateCategory: (uid:string, category:Category) => Promise<Category> = async (uid, category) => {
  const updateCategory = {...category}
  await getQuery(uid).doc(category.id).update(updateCategory);
  return updateCategory;
};


export const deleteCategory: (uid:string, id: string) => Promise<void> = async (uid, id) => {
    await getQuery(uid).doc(id).delete();
};
