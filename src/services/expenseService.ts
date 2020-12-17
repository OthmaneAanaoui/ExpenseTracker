import { queryExpense } from '../types/constants';
import { Category, Expense, Card } from '../types/types';

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

export const addExpense: (name: string, category: Category, value: number, card: Card, isIncome: boolean) => Promise<Expense> = async (name, category, value, card, isIncome) => {
  const expense: Expense = {
    date: new Date().getTime(),
    name: name,
    category: category,
    value: value,
    card: card,
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