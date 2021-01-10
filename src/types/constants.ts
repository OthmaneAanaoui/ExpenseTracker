import { useFirebase } from "../firebase/firebase";

// function getIdUser (): string {
//   const auth = useAuth();
//   let i = auth.user?.uid
//   if(i == undefined) return ""
//   else return i;
// }

// const id = getIdUser();

// export const queryBankCard = useFirebase.firestore().collection('user').doc(id).collection('bankCard');
// export const queryCategory = useFirebase.firestore().collection('user').doc(id).collection('category');
// export const queryExpense = useFirebase.firestore().collection('user').doc(id).collection('expenses');
export const queryUser = useFirebase.firestore().collection('user')
export const queryIcon = useFirebase.firestore().collection('icon');