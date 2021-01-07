import { firestore } from "firebase"

export type Icon = {
  id?: string,
  name: string,
  link: string
}

export type CardType = {
  id?: string,
  cardNumber: string,
  cardValidationCode: string,
  ExpirationDate: number,
  name: string
}

export type Card = {
  id: string,
  cardNumber: string,
  cardValidationCode: string,
  ExpirationDate: number,
  name: string
}

export type Category = {
  id: string,
  icon: Icon,
  name: string
}

export type CategoryType = {
  id?: string,
  icon: Icon,
  name: string
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

export type Expense = {
  id: string,
  name: string,
  idCategory: string,
  date: number,
  value: number,
  idCard: string,
  isIncome: boolean
}

