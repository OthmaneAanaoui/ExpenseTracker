import { queryUser } from "../types/constants";
import { Card, CardType } from "../types/Card";

const getQuery = (uid: string) => {
  return queryUser.doc(uid).collection('bankCard')
}

export const getCards: (uid:string) => Promise<Card[]> = async (uid) => {
  const querySnapshot = await getQuery(uid).get();
  let cards: Card[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Card;
    return { ...data, id: doc.id };
  });
  return cards;
};

export const addCard: (uid:string, cardNumber: string, cardValidationCode: string, ExpirationDate: number, name: string) => Promise<Card> = async (uid, cardNumber, cardValidationCode, ExpirationDate, name) => {
  const card: CardType = {
    cardNumber: cardNumber,
    cardValidationCode: cardValidationCode,
    ExpirationDate: ExpirationDate,
    name: name
  };
  const doc = await getQuery(uid).add(card);
  const newCard: Card = { ...card, id: doc.id };
  return newCard;
};


export const updateCard: (uid:string, card:Card) => Promise<Card> = async (uid, card) => {
    const updateCard = {...card}
    await getQuery(uid).doc(card.id).update(updateCard);
  return updateCard;
};


export const deleteCard: (uid:string, id: string) => Promise<void> = async (uid, id) => {
    await getQuery(uid).doc(id).delete();
};
