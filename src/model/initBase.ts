import { User } from "firebase";
import { initCategories } from '../types/Category';
import services from "../services/index";

export const initBase: (user:User) => Promise<void> = async (user) =>{
    const query = await services.userService.createUser(user);
    if(query){ // création du user donc on initialise la base pour les catégories
        initCategories.forEach(category => {
            services.categoryService.addCategoryWithUserId(user.uid, category.idIcon, category.name, category.color)
        })
    }
}