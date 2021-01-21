import { User } from 'firebase';
import { useAuth } from '../context/AuthContext';
import { queryUser } from "../types/constants";

  export const createUser: (user: User) => Promise<boolean> = async (user) => {
    const userExist = await (await queryUser.doc(user.uid).get()).exists
    if(!userExist){
        const newUser = {email: user.email}
        const querySnapshot = await queryUser.doc(user.uid).set(newUser)
        return true
    }
    return false
  };