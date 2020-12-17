import { firestore } from "firebase"

export type Icon = {
  id?: string,
  name: string,
  link: string
}

export type Card = {
  id?: string,
  cardNumber: string,
  cardValidationCode: string,
  ExpirationDate: number,
  name: string
}

export type Category = {
  id?: string,
  icon: Icon,
  name: string
}

export type Expense = {
  id?: string,
  name: string,
  category: Category,
  date: number,
  value: number,
  card: Card,
  isIncome: boolean
}