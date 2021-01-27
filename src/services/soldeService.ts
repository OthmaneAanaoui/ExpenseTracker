import AsyncStorage from "@react-native-async-storage/async-storage";
import { queryUser, STORAGE_SOLDE } from "../types/constants";
import { Solde } from "../types/Solde";


const getQuery = (uid: string) => {
    return queryUser.doc(uid).collection('solde')
}

export const getSolde: (uid: string) => Promise<Solde> = async (uid) => {
    const querySnapshot = await getQuery(uid).get();
    const doc = querySnapshot.docs.map(doc => {
        const data = doc.data() as Solde;
        return { ...data, id: doc.id };
    })
    const solde = doc[0]
    return solde;
}

export const updateSolde: (uid: string, solde: Solde) => Promise<Solde> = async (uid, solde) => {
    const querySnapshot = await getQuery(uid).get();
    let updateSolde:Solde
    if(querySnapshot.docs.length === 0 || solde.id === undefined){
        console.log("update with id solde undefined")
        const doc = await getQuery(uid).add({montant:solde.montant});
        updateSolde = { id: doc.id, montant:solde.montant };
    } else {
        await getQuery(uid).doc(solde.id).update({montant:solde.montant});
        updateSolde = { ...solde}
    }
    return updateSolde
}

export const getLocalSolde = async () => {
    const solde = await AsyncStorage.getItem(STORAGE_SOLDE)
    return solde != null ? JSON.parse(solde) : null;
  }
  
  export const setLocalSolde = async (solde:Solde) => {
    const json = JSON.stringify(solde)
    await AsyncStorage.setItem(STORAGE_SOLDE, json)
  }