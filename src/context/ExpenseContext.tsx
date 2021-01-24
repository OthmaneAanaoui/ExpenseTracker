import React from "react";
import { createContext, useContext } from "react";
import services from "../services/index";
import {Category} from "../types/Category";
import { Expense } from "../types/Expense";
import { Card } from "../types/types";

type ExpenseContextType = {
    expenses: Expense[];
    asyncCreateExpense: (name:string, idCategory:string, value:number, idCard:string, isIncome:boolean) => Promise<Expense>;
    asyncGetAll: () => Promise<Expense[]>;
    asyncUpdateExpense: (expense:Expense) => Promise<void>;
    asyncDeleteExpense: (id:string) => Promise<void>;
    getExpenseById: (id:string) => Expense;
    getExpenseByCard: (idCard: string) => Promise<Expense[]>;
    getExpenseByCategory: (idCategory: string) => Promise<Expense[]>;
    getExpenseByDate: (year:number, month: number) => Promise<Expense[]>;
    getExpenses: () => Expense[];
}

const defaultExpenseState = {
    expenses: [],
    asyncCreateExpense: async () => undefined,
    asyncGetAll: async () => undefined,
    asyncUpdateExpense: async () => undefined,
    asyncDeleteExpense: async () => undefined,
    getExpenseById: async () => undefined,
    getExpenseByCard: async () => undefined,
    getExpenseByCategory: async () => undefined,
    getExpenses: () => undefined
}

type ExpensesByCard = {
    card:Card,
    expenses:Expense[]
}

type ExpensesByCategory = {
    category:Category,
    expenses:Expense[]
}

export const ExpenseContext = createContext<ExpenseContextType | null>(null)

export const ExpenseContextProvider: React.FC = ({ children }) => {

    const [expenses, setExpenses] = React.useState<Expense[]>([])

    const asyncCreateExpense: (name: string, idCategory: string, value: number, idCard: string, isIncome: boolean) => Promise<Expense> = async (name, idCategory, value, idCard, isIncome) => {
        const expense = await services.expenseService.addExpense(name, idCategory, value, idCard, isIncome)
        setExpenses([...expenses, expense].sort((a, b) => a.date - b.date));
        return expense
    }

    const asyncGetAll: () => Promise<Expense[]> = async () => {
        try {
            const listExpense: Expense[] = await services.expenseService.getExpenses()
            listExpense.sort((a, b) => a.date - b.date);
            setExpenses(listExpense)
        } catch (err) {
            throw err
        }
        return expenses
    }

    const asyncUpdateExpense: (expense:Expense) => Promise<void> = async(expense) => {
        try {
            const updateExpense: Expense = await services.expenseService.updateExpense(expense)
            const index = expenses.findIndex(expense => updateExpense.id === expense.id)
            expenses[index] = updateExpense
        } catch (err) {
            throw err
        }
    }

    const asyncDeleteExpense = async (id:string) => {
        try{
            await services.expenseService.deleteExpense(id)
            const index = expenses.findIndex(expense => expense.id === id)
            setExpenses(expenses.splice(index,1))
        } catch (err) {
            throw err
        }
    }

    const getExpenseById = (id:string) => {
        const index = expenses.findIndex(expense => id === expense.id)
        return expenses[index]
    }

    const getExpenseByCard = async (idCard:string) => {
        const newExpenses = await services.expenseService.getExpenseByCard(idCard);
        newExpenses.sort((a, b) => a.date - b.date);
        return newExpenses
    }

    const getExpenseByCategory = async (idCategory:string) => {
        const newExpenses = await services.expenseService.getExpenseByCategory(idCategory);
        newExpenses.sort((a, b) => a.date - b.date);
        return newExpenses
    }

    const getExpenseByDate = async (year:number, month: number) => {
        const newExpenses = await services.expenseService.getExpenseByDate(year, month);
        newExpenses.sort((a, b) => a.date - b.date);
        return newExpenses;
    }

    const getExpenses = () => {
        return expenses
    }

    return (
        <ExpenseContext.Provider
            value={{
                expenses: expenses,
                asyncCreateExpense,
                asyncGetAll,
                asyncUpdateExpense,
                asyncDeleteExpense,
                getExpenseById,
                getExpenseByCard,
                getExpenseByCategory,
                getExpenseByDate,
                getExpenses
            }}>
            {children}
        </ExpenseContext.Provider>
    );
}

export const useExpense = () => {
    const expense = useContext(ExpenseContext)
    return expense
}
