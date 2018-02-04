import { AnyAction } from 'redux';
import { CardDeck } from '../store/type';
import { FibonaciDeck } from '../store/decks';

const cardDeckReducer = (state: CardDeck = FibonaciDeck, action: AnyAction) =>  state;

export default cardDeckReducer;