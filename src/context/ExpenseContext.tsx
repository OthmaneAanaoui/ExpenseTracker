import React from "react";
import { createContext, useContext } from "react";
import services from "../services/index";
import {Category, Card, Expense, CardType, ExpenseType} from "../types/types";

type ExpenseContextType = {
    expenses: Expense[];
    asyncCreateExpense: (name:string, idCategory:string, value:number, idCard:string, isIncome:boolean) => Promise<Expense>;
    asyncGetAll: () => Promise<Expense[]>;
    asyncUpdateExpense: (expense:Expense) => Promise<void>;
    asyncDeleteExpense: (id:string) => Promise<void>;
    getExpenseById: (id:string) => Expense;
    getExpenseByCard: (idCard: string) => Expense[];
    getExpenseByCategory: (idCategory: string) => Expense[];
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

const ExpenseContext = createContext<ExpenseContextType | null>(null)

export const ExpenseContextProvider: React.FC = ({ children }) => {

    const [expenses, setExpenses] = React.useState<Expense[]>([])

    const asyncCreateExpense: (name: string, idCategory: string, value: number, idCard: string, isIncome: boolean) => Promise<Expense> = async (name, idCategory, value, idCard, isIncome) => {
        const expense = await services.expenseService.addExpense(name, idCategory, value, idCard, isIncome)
        setExpenses([ ...expenses, expense ])
        return expense
    }

    const asyncGetAll: () => Promise<Expense[]> = async () => {
        try {
            const listExpense: Expense[] = await services.expenseService.getExpenses()
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
        } catch (err) {
            throw err
        }
    }

    const getExpenseById = (id:string) => {
        const index = expenses.findIndex(expense => id === expense.id)
        return expenses[index]
    }

    const getExpenseByCard = (idCard:string) => {
        const newExpenses: Expense[] = []
        expenses.forEach(expense => {
            if(expense.idCard === idCard) newExpenses.push(expense)
        })
        return newExpenses
    }

    const getExpenseByCategory = (idCategory:string) => {
        const newExpenses: Expense[] = []
        expenses.forEach(expense => {
            if(expense.idCategory === idCategory) newExpenses.push (expense)
        })
        return newExpenses
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
