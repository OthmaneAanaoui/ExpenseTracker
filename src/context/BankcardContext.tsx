import React from "react"
import { createContext, useContext } from "react"
import services from "../services/index"
import { Card } from "../types/Card"
import { useAuth } from "./AuthContext"

type CardContextType = {
    cards: Card[];
    asyncCreateCard: (cardNumber: string, cardValidationCode: string, ExpirationDate: number, name: string) => Promise<Card>;
    asyncGetAll: () => Promise<Card[]>;
    asyncUpdateCard: (card:Card) => Promise<void>;
    asyncDeleteCard: (id:string) => Promise<void>;
    getCardById: (id:string) => Card;
    getCards:() => Card[];
}

const defaultCardState = {
    cards: [],
    asyncCreateCard: async () => undefined,
    asyncGetAll: async () => undefined,
    asyncUpdateCard: async () => undefined,
    asyncDeleteCard: async () => undefined,
    getCardById: () => undefined,
    getCards:() => undefined
}

const BankCardContext = createContext<CardContextType | null>(null)

export const BankCardContextProvider: React.FC = ({ children }) => {
    const auth = useAuth()
    const [cards, setCards] = React.useState<Card[]>([])

    const asyncCreateCard: (cardNumber: string, cardValidationCode: string, ExpirationDate: number, name: string) => Promise<Card> = async (cardNumber, cardValidationCode, ExpirationDate, name) => {
        const card = await services.bankcardService.addCard(auth.user!.uid, cardNumber, cardValidationCode, ExpirationDate, name)
        setCards([ ...cards, card ])
        return card
    }

    const asyncGetAll: () => Promise<Card[]> = async () => {
        try{
            const listCard: Card[] = await services.bankcardService.getCards(auth.user!.uid)
            setCards(listCard)
        } catch (err) {
            throw err
        }
        return cards
    }

    const asyncUpdateCard: (card:Card) => Promise<void> = async (card) => {
        try {
            const updateCard: Card = await services.bankcardService.updateCard(auth.user!.uid, card)
            const index = cards.findIndex(card => card.id === updateCard.id)
            cards[index] = updateCard
        } catch (err) {
            throw err
        }
    }

    const asyncDeleteCard: (id:string) => Promise<void> = async (id) => {
        try{
            await services.bankcardService.deleteCard(auth.user!.uid, id)
            const index = cards.findIndex(card => card.id === id)
            setCards(cards.splice(index, 1))
        } catch (err) {
            throw err
        }
    }

    const getCardById = (id:string) => {
        const index = cards.findIndex(card => card.id === id)
        return cards[index]
    }

    const getCards = () => {
        return cards
    }

    return (
        <BankCardContext.Provider
            value={{
                cards: cards,
                asyncCreateCard,
                asyncGetAll,
                asyncUpdateCard,
                asyncDeleteCard,
                getCardById,
                getCards
            }}>
            {children}
        </BankCardContext.Provider>
    );
}

export const useCard = () => {
    const card = useContext(BankCardContext)
    return card
}
