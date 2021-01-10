import { useAuth } from "../context/AuthContext";
import { queryUser } from "../types/constants";
import { Card, CardType } from "../types/types";

const getQuery = () => {
  const auth = useAuth()
  return queryUser.doc(auth.user?.uid).collection('bankCard')
}

export const getCards: () => Promise<Card[]> = async () => {
  const querySnapshot = await getQuery().get();
  let cards: Card[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Card;
    return { ...data, id: doc.id };
  });
  return cards;
};

export const addCard: (cardNumber: string, cardValidationCode: string, ExpirationDate: number, name: string) => Promise<Card> = async (cardNumber, cardValidationCode, ExpirationDate, name) => {
  const card: CardType = {
    cardNumber: cardNumber,
    cardValidationCode: cardValidationCode,
    ExpirationDate: ExpirationDate,
    name: name
  };
  const doc = await getQuery().add(card);
  const newCard: Card = { ...card, id: doc.id };
  return newCard;
};


export const updateCard: (card:Card) => Promise<Card> = async (card) => {
    const updateCard = {...card}
    await getQuery().doc(card.id).update(updateCard);
  return updateCard;
};


export const deleteCard: (id: string) => Promise<void> = async (id) => {
    await getQuery().doc(id).delete();
};
