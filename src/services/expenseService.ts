import { queryUser } from '../types/constants';
import { Expense } from '../types/Expense';

const getQuery = (uid: string) => {
  return queryUser.doc(uid).collection('expenses')
}

export const getExpenses: (uid: string) => Promise<Expense[]> = async (uid) => {
  const querySnapshot = await getQuery(uid).get();
  const expenses: Expense[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Expense;
    return { ...data, id: doc.id };
  })
  expenses.sort((a, b) => b.date - a.date)
  return expenses;
}

export const getExpense: (uid: string, id: string) => Promise<Expense> = async (uid, id) => {
  const querySnapshot = await getQuery(uid).doc(id);
  const doc = await querySnapshot.get();
  const expense: Expense = doc.data() as Expense;
  const newExpense: Expense = {
    ...expense, id: doc.id
  }
  return newExpense;
}

export const addExpense: (uid: string, date:number, name: string, idCategory: string, value: number, idCard: string, isIncome: boolean) => Promise<Expense> = async (uid, date, name, idCategory, value, idCard, isIncome) => {
  const expense: Expense = {
    date: date,
    name: name,
    idCategory: idCategory,
    value: value,
    idCard: idCard,
    isIncome: isIncome
  };
  const doc = await getQuery(uid).add(expense);
  const newExpense: Expense = { ...expense, id: doc.id };
  return newExpense;
};

export const updateExpense: (uid: string, expense:Expense) => Promise<Expense> = async (uid, expense) => {
    const updateExpense = {...expense}
    await getQuery(uid).doc(expense.id).update(expense);
    return updateExpense
};

export const deleteExpense: (uid: string, id: string) => Promise<void> = async (uid, id) => {
    await getQuery(uid).doc(id).delete();
};
