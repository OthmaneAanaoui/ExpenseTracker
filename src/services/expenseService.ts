import { queryExpense } from '../types/constants';
import { Expense, ExpenseType } from '../types/types';

export const getExpenses: () => Promise<Expense[]> = async () => {
  const querySnapshot = await queryExpense.get();
  let expenses: Expense[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Expense;
    return { ...data, id: doc.id };
  })
  return expenses;
}

export const getExpense: (id: string) => Promise<Expense> = async (id) => {
  const querySnapshot = await queryExpense.doc(id);
  const doc = await querySnapshot.get();
  let expense: Expense = doc.data() as Expense;
  let newExpense: Expense = {
    ...expense, id: doc.id
  }
  return newExpense;
}

export const addExpense: (name: string, idCategory: string, value: number, idCard: string, isIncome: boolean) => Promise<Expense> = async (name, idCategory, value, idCard, isIncome) => {
  const expense: ExpenseType = {
    date: new Date().getTime(),
    name: name,
    idCategory: idCategory,
    value: value,
    idCard: idCard,
    isIncome: isIncome
  };
  const doc = await queryExpense.add(expense);
  const newExpense: Expense = { ...expense, id: doc.id };
  return newExpense;
};

export const updateExpense: (expense:Expense) => Promise<Expense> = async (expense) => {
    const updateExpense = {...expense}
    await queryExpense.doc(expense.id).update(expense);
    return updateExpense
};

export const deleteExpense: (id: string) => Promise<void> = async (id) => {
    await queryExpense.doc(id).delete();
};

export const getExpenseByCard: (idCard: string) => Promise<Expense[]> = async (idCard) => {
    let newExpenses = getExpenses().then(expenses => {
      return expenses.filter(item => {item.idCard === idCard})
    })
    return newExpenses
};

export const getExpenseByCategory: (idCategory: string) => Promise<Expense[]> = async (idCategory) => {
    let newExpenses = getExpenses().then(expenses => {
      return expenses.filter(item => {item.idCategory === idCategory})
    })
  return newExpenses
}
