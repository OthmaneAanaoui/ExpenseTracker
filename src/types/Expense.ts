export type Expense = {
    id: string,
    name: string,
    idCategory: string,
    date: number,
    value: number,
    idCard: string,
    isIncome: boolean
}

export type ExpenseType = {
    id?: string,
    name: string,
    idCategory: string,
    date: number,
    value: number,
    idCard: string,
    isIncome: boolean
}
