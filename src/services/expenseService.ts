import { queryUser } from '../types/constants';
import { Expense, ExpenseType } from '../types/Expense';

const getQuery = (uid: string) => {
  return queryUser.doc(uid).collection('expenses')
}

export const getExpenses: (uid: string) => Promise<Expense[]> = async (uid) => {
  const querySnapshot = await getQuery(uid).get();
  let expenses: Expense[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Expense;
    return { ...data, id: doc.id };
  })
  return expenses;
}

export const getExpense: (uid: string, id: string) => Promise<Expense> = async (uid, id) => {
  const querySnapshot = await getQuery(uid).doc(id);
  const doc = await querySnapshot.get();
  let expense: Expense = doc.data() as Expense;
  let newExpense: Expense = {
    ...expense, id: doc.id
  }
  return newExpense;
}

<<<<<<< HEAD
export const addExpense: (uid: string, name: string, idCategory: string, value: number, idCard: string, isIncome: boolean) => Promise<Expense> = async (uid, name, idCategory, value, idCard, isIncome) => {
  const expense: Expense = {
=======
export const addExpense: (name: string, idCategory: string, value: number, idCard: string, isIncome: boolean) => Promise<Expense> = async (name, idCategory, value, idCard, isIncome) => {
  const expense: ExpenseType = {
>>>>>>> 16d10dd... modal save
    date: new Date().getTime(),
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

export const getExpenseByCard: (uid: string, idCard: string) => Promise<Expense[]> = async (uid, idCard) => {
    let newExpenses = getExpenses(uid).then(expenses => {
      return expenses.filter(item => {item.idCard === idCard})
    })
    return newExpenses
};

export const getExpenseByCategory: (uid: string, idCategory: string) => Promise<Expense[]> = async (uid, idCategory) => {
    let newExpenses = getExpenses(uid).then(expenses => {
      return expenses.filter(item => {item.idCategory === idCategory})
    })
  return newExpenses
}
