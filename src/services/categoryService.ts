import { queryCategory } from "../types/constants";
import { Category, CategoryType, Icon } from "../types/types";


export const getCategories: () => Promise<Category[]> = async () => {
  const querySnapshot = await queryCategory.get();
  let categories: Category[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Category;
    return { ...data, id: doc.id };
  });
  return categories;
};


export const getCategory: (id: string) => Promise<Category> = async (id) => {
  const querySnapshot = await queryCategory.doc(id);
  const doc = await querySnapshot.get();
  let category: Category = doc.data() as Category;
  let newcategory: Category = {
    ...category, id: doc.id
  }
  return newcategory;
}


export const addCategory: (icon: Icon, name: string) => Promise<Category> = async (icon, name) => {
  const category: CategoryType = {
    name: name,
    icon: icon
  };
  const doc = await queryCategory.add(category);
  const newcategory: Category = { ...category, id: doc.id };
  return newcategory;
};


export const updateCategory: (category:Category) => Promise<Category> = async (category) => {
  const updateCategory = {...category}
  await queryCategory.doc(category.id).update(updateCategory);
  return updateCategory;
};


export const deleteCategory: (id: string) => Promise<void> = async (id) => {
    await queryCategory.doc(id).delete();
};
