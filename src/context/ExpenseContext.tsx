import React from "react";
import { createContext, useContext } from "react";
import services from "../services/index";
import {Category} from "../types/Category";
import { Expense } from "../types/Expense";
import { Card } from "../types/Card";
import { useAuth } from "./AuthContext";

type ExpenseContextType = {
    expenses: Expense[];
    asyncCreateExpenseWithParams: (date:number, name:string, idCategory:string, value:number, idCard:string, isIncome:boolean) => Promise<Expense>;
    asyncCreateExpense: (expense:Expense) => Promise<Expense>;
    asyncGetAll: () => Promise<Expense[]>;
    asyncUpdateExpense: (expense:Expense) => Promise<void>;
    asyncDeleteExpense: (id:string) => Promise<void>;
    getExpenseById: (id:string) => Expense;
    getExpenseByCard: (idCard: string) => Expense[];
    getExpenseByCategory: (idCategory: string) => Expense[];
    getExpenseByDate: (year:number, month: number) => Expense[];
    getExpenses: () => Expense[];
}

const defaultExpenseState = {
    expenses: [],
    asyncCreateExpenseWithParams: async () => undefined,
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
    const auth = useAuth()
    const [expenses, setExpenses] = React.useState<Expense[]>([])
 
    const asyncCreateExpenseWithParams: (date:number, name: string, idCategory: string, value: number, idCard: string, isIncome: boolean) => Promise<Expense> = async (date, name, idCategory, value, idCard, isIncome) => {
        const expense = await services.expenseService.addExpense(auth.user!.uid, date, name, idCategory, value, idCard, isIncome)
        setExpenses([ ...expenses, expense ].sort((a, b) => b.date - a.date))
        return expense
    }

    const asyncCreateExpense: (expense:Expense) => Promise<Expense> = async (expense) => {
        const newExpense = await services.expenseService.addExpense(auth.user!.uid, expense.date, expense.name, expense.idCategory, expense.value, expense.idCard, expense.isIncome)
        const list = [ ...expenses, newExpense ].sort((a, b) => b.date - a.date)
        setExpenses(list)
        return expense
    }

    const asyncGetAll: () => Promise<Expense[]> = async () => {
        try {
            const listExpense: Expense[] = await services.expenseService.getExpenses(auth.user!.uid)
            setExpenses(listExpense)
        } catch (err) {
            throw err
        }
        return expenses
    }

    const asyncUpdateExpense: (expense:Expense) => Promise<void> = async(expense) => {
        try {
            const updateExpense: Expense = await services.expenseService.updateExpense(auth.user!.uid, expense)
            const index = expenses.findIndex(expense => updateExpense.id === expense.id)
            expenses[index] = updateExpense
        } catch (err) {
            throw err
        }
    }

    const asyncDeleteExpense = async (id:string) => {
        try{
            await services.expenseService.deleteExpense(auth.user!.uid, id)
            const asyncNewExpense = await services.expenseService.getExpenses(auth.user!.uid)
            setExpenses([...asyncNewExpense])
        } catch (err) {
            throw err
        }
    }

    const getExpenseById = (id:string) => {
        const index = expenses.findIndex(expense => id === expense.id)
        return expenses[index]
    }

    const getExpenseByCard = (idCard:string) => {
        const newExpenses: Expense[] = expenses.filter(expense => {
            if (expense.idCard == idCard) return expense;
        })
        return newExpenses.sort((a, b) => b.date - a.date);
    }

    const getExpenseByCategory = (idCategory:string) => {
        const newExpenses: Expense[] = expenses.filter(expense => {
            if (expense.idCategory == idCategory) return expense;
        })
        return newExpenses.sort((a, b) => b.date - a.date);
    }

    const getExpenseByDate = (year:number, month: number) => {
        const newExpenses: Expense[] = expenses.filter(expense => {
            const date: Date = new Date(expense.date);
            if(date.getFullYear() == year && date.getMonth() == month) return expense;
        })
        return newExpenses.sort((a, b) => a.date - b.date);
    }

    const getExpenses = () => {
        return expenses
    }

    return (
        <ExpenseContext.Provider
            value={{
                expenses: expenses,
                asyncCreateExpenseWithParams,
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
