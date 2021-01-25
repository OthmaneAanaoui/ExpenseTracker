import React from "react"
import { createContext, useContext } from "react"
import services from "../services/index"
import {Category } from "../types/Category";
import { useAuth } from "./AuthContext";

type CategoryContextType = {
    categories: Category[];
    asyncCreateCategory: (idIcon: string, name: string, color:string) => Promise<Category>;
    asyncGetAll: () => Promise<Category[]>;
    asyncUpdateCategory: (category:Category) => Promise<void>;
    asyncDeleteCategory: (id:string) => Promise<void>
    getCategoryById: (id:string) => Category;
    getCatgories: () => Category[];
}

const defaultCategoryState = {
    categories: [],
    asyncCreateCategory: async () => undefined,
    asyncGetAll: async () => undefined,
    asyncUpdateCategory: async () => undefined,
    asyncDeleteCategory: async () => undefined,
    getCategoryById: () => undefined,
    getCatgories: () => undefined
}

const CategoryContext = createContext<CategoryContextType | null>(null)

export const CategoryContextProvider: React.FC = ({ children }) => {
    const auth = useAuth()
    const [categories, setCategories] = React.useState<Category[]>([])

    const asyncCreateCategory: (idIcon: string, name: string, color:string) => Promise<Category> = async (idIcon, name, color) => {
        const category = await services.categoryService.addCategory(auth.user!.uid, idIcon, name, color)
        setCategories([ ...categories, category ])
        return category
    }

    const asyncGetAll: () => Promise<Category[]> = async () => {
        try {
            if(auth.user?.uid !== undefined) {
                const listCategory: Category[] = await services.categoryService.getCategories(auth.user?.uid)
                setCategories(listCategory)
            }
        } catch (err) {
            throw err
        }
        return categories
    }

    const asyncUpdateCategory: (category:Category) => Promise<void> = async (category) => {
        try {
            const updateCategory: Category = await services.categoryService.updateCategory(auth.user!.uid, category)
            const index = categories.findIndex(category => updateCategory.id === category.id)
            categories[index] = {...updateCategory}
        } catch (err) {
            throw err
        }
    }

    const asyncDeleteCategory = async (id:string) => {
        try {
            const index = categories.findIndex(category => category.id === id)
            categories.splice(index,1)
            await services.categoryService.deleteCategory(auth.user!.uid, id)
        } catch (err) {
            throw err
        }
    }

    const getCategoryById = (id:string) => {
        const index = categories.findIndex(category => category.id === id)
        return categories[index]
    }

    const getCatgories = () => {
        return categories
    }

    return (
        <CategoryContext.Provider
            value={{
                categories: categories,
                asyncCreateCategory,
                asyncGetAll,
                asyncUpdateCategory,
                asyncDeleteCategory,
                getCategoryById,
                getCatgories
            }}>
            {children}
        </CategoryContext.Provider>
    );
}

export const useCategory = () => {
    const category = useContext(CategoryContext)
    return category
}
