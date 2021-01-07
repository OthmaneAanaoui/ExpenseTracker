import React from "react"
import { createContext, useContext } from "react"
import services from "../services/index"
import {Category, CategoryType, Icon} from "../types/types";

type CategoryContextType = {
    categories: Category[];
    asyncCreateCategory: (icon: Icon, name: string) => Promise<Category>;
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

    const [categories, setCategories] = React.useState<Category[]>([])

    const asyncCreateCategory: (icon: Icon, name: string) => Promise<Category> = async (icon, name) => {
        const category = await services.categoryService.addCategory(icon, name)
        setCategories([ ...categories, category ])
        return category
    }

    const asyncGetAll: () => Promise<Category[]> = async () => {
        try {
            const listCategory: Category[] = await services.categoryService.getCategories()
            setCategories(listCategory)
        } catch (err) {
            throw err
        }
        return categories
    }

    const asyncUpdateCategory: (category:Category) => Promise<void> = async (category) => {
        try {
            const updateCategory: Category = await services.categoryService.updateCategory(category)
            const index = categories.findIndex(category => updateCategory.id === category.id)
            categories[index] = updateCategory
        } catch (err) {
            throw err
        }
    }

    const asyncDeleteCategory = async (id:string) => {
        try {
            await services.categoryService.deleteCategory(id)
            const index = categories.findIndex(category => category.id === id)
            setCategories(categories.splice(index,1))
        } catch (err) {
            throw err
        }
    }

    const getCategoryById = (id:string) => {
        const index = categories.findIndex(category => id === category.id)
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
