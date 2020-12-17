import { queryBankCard } from "../types/constants";
import { Card } from "../types/types";


export const getCards: () => Promise<Card[]> = async () => {
  const querySnapshot = await queryBankCard.get();
  let cards: Card[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Card;
    return { ...data, id: doc.id };
  });
  return cards;
};


export const getExpense: (id: string) => Promise<Card> = async (id) => {
  const querySnapshot = await queryBankCard.doc(id);
  const doc = await querySnapshot.get();
  let card: Card = doc.data() as Card;
  let newCard: Card = {
    ...card, id: doc.id
  }
  return newCard;
}


export const addCard: (cardNumber: string, cardValidationCode: string, ExpirationDate: number, name: string) => Promise<Card> = async (cardNumber, cardValidationCode, ExpirationDate, name) => {
  const card: Card = {
    cardNumber: cardNumber,
    cardValidationCode: cardValidationCode,
    ExpirationDate: ExpirationDate,
    name: name
  };
  const doc = await queryBankCard.add(card);
  const newCard: Card = { ...card, id: doc.id };
  return newCard;
};


export const updateCard: (card:Card) => Promise<Card> = async (card) => {
    const updateCard = {...card}
    await queryBankCard.doc(card.id).update(updateCard);
  return updateCard;
};


export const deleteCard: (id: string) => Promise<void> = async (id) => {
    await queryBankCard.doc(id).delete();
};